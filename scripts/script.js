(function () {
/*variables*/
const popUpAddButton = document.querySelector('.user-info__button');
const popUpEditButton = document.querySelector('.user-edit__button');
const popUpAddCloseButton = document.querySelector('.popup__close-add');
const popUpEditCloseButton = document.querySelector('.popup__close-edit');
const popUpImageCloseButton = document.querySelector('.popup__close-image');
const popUpAvatarCloseButton = document.querySelector('.popup__close-avatar');
const formAdd = document.forms.new;
const formEdit = document.forms.edit;
const formAvatar = document.forms.avatar;
//вызовы классов
const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort8',
    headers: {
      authorization: '5f12b6e1-3a62-4ec8-9dbd-21faf0d03926',
      'Content-Type': 'application/json'
    }
});
const card = new Card();
const cardList = new CardList(document.querySelector('.places-list'), card);
const popUpAdd = new Popup(document.querySelector('.popup_add'));
const popUpEdit = new Popup(document.querySelector('.popup_edit'));
const popUpImage = new Popup(document.querySelector('.popup_image'));
const popUpAvatar = new Popup(document.querySelector('.popup_avatar'));
const userInfo = new UserInfo(formEdit,document.querySelector('.user-info__name'),document.querySelector('.user-info__job'),document.querySelector('.user-info__photo'));
const formAddValidator = new FormValidator(popUpAdd.container);
const formAvatarValidator = new FormValidator(popUpAvatar.container);
const formEditValidator = new FormValidator(popUpEdit.container);

/*Fuctions*/




/*REVIEW.Надо исправить. Вы правильно рассудили, что этот функционал проверки можно вынести в отдельную функцию и не повторять
его каждый раз. Только в script.js - точке входа в приложении, задача которого инициализировать весь функционал, а не создавать новый,
не положено объявлять каких-либо функций. Например, checkResponse надо сделать методом класса Api и вызывать его там же
в других методах Api, например так:
getInitialCards() {
        return fetch(this.options.baseUrl + `/cards`, {
            method: 'GET',
            headers: {
                authorization: this.options.headers.authorization
            }
        })
}.then(res => this.checkResponse(res));

И так можно сделать у всех методов класса Api. То есть, в методах класса Api, общающихся с сервером, Вы оставляете первый блок, где указываются
опции запроса и блок с первым  then, где используете checkResponse. Обрабатываете результаты запроса во втором методе then и ловите ошибки в catch
в script.js - это правильно Вы делаете, только обработку результатов
запроса надо делать имеющимися методами классов, а не вводить новые функции.

*/



/*REVIEW.Надо исправить. Здесь не надо обёртывать api.getInitialCards в функцию renderCards, а затем вызывать её, просто используете метод
api.getInitialCards(), преобразованный в соответствии с комментарием выше, то есть получается так:

api.getInitialCards().then((data) => {

        cardList.render();
    })
    .catch(err => console.log(`Ошибка: ${err}`));

При этом. Надо исправить: const cardList = new CardList(document.querySelector('.places-list'), data, card, formAdd);
нужно вынести из метода then и писать инструкции new создания экземпляров (можно создавать, ведь, не один экземпляр класса)
просто в коде script.js вне методов и функций.

По этому образцу надо преобразовать вызов в script.js и других методов Api.
*/





 
/*REVIEW.Надо исправить. Рендер данных о профиле при загрузке страницы нужно так же сделать по образцу рендера карточек - не обёртывать метод
api функцией userInfoData, а для непосредственного рендера данных использовать метод updateUserInfo класса  UserInfo, преобразовав его
для рендера аватара, вместо renderUserInfo. */


/*

/*Events*/
//отрисовка карточек и информации о пользователе
window.addEventListener('load', () => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cardsData, userData]) => {
        userInfo.updateUserInfo(userData.name, userData.about, userData._id);
        userInfo.updateUserAvatar(userData.avatar);
        cardList.render(cardsData, userInfo._id);
        
    }
    )
    .catch(err => console.log(`Ошибка: ${err}`));
}
)
//отслеживание кликов
document.querySelector('.places-list').addEventListener('click',(event) => card.clickEvents(event,api,popUpImage));

//открытие формы добавления
popUpAddButton.addEventListener('click', () =>{
    popUpAdd.open();
    formAddValidator.setEventListeners(popUpAdd);
});

document.querySelector('.user-info__photo').addEventListener('click', () => {
    popUpAvatar.open();
    formAvatarValidator.setEventListeners();
})

popUpAddCloseButton.addEventListener('click', () => popUpAdd.close());

popUpImageCloseButton.addEventListener('click', () => popUpImage.closeImage());

popUpEditCloseButton.addEventListener('click', () => popUpEdit.close());

popUpAvatarCloseButton.addEventListener('click', () => popUpAvatar.close());
//открытие и валидация формы редактирования
popUpEditButton.addEventListener('click', ()=>{
    popUpEdit.open();
    userInfo.setUserInfo();
    formEdit.querySelectorAll('.popup__input-error').forEach(item=> item.textContent = '');//чистим элементы ошибок от лишнего текста
    formEditValidator.setEventListeners(popUpEdit);
});

//обновние информации о себе
formEdit.addEventListener('submit',(event)=>{
    event.preventDefault();
    api.updateUserInfo(formEdit.username.value, formEdit.job.value)
    .then(data => {
        userInfo.updateUserInfo(data.name, data.about);
        popUpEdit.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`));
});

//добавление новой карточки
formAdd.addEventListener('submit', (event)=>{
    event.preventDefault();
    api.addNewCard(formAdd.name.value, formAdd.link.value)
    .then(data => {
        cardList.addCard(data);
        formAdd.reset();
        popUpAdd.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`));

});
//слушатель обновления аватарки
formAvatar.addEventListener('submit', (event)=>{
    event.preventDefault();
    api.updateUserAvatar(formAvatar.avatar.value)
    .then(data => {
        userInfo.updateUserAvatar(data.avatar);
        formAvatar.reset();
        popUpAvatar.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`));

});

//слушатель закрытия попапа через Esc
document.addEventListener('keydown',(event)=>{
        if (event.key === 'Escape') {
            popUpAdd.close();
            popUpEdit.close();
            popUpAvatar.close();
            popUpImage.closeImage();
        }
})

//слушатель закрытия попапа при клике вне формы
document.addEventListener('click',(event)=>{
        if (event.target.classList.contains('popup_is-opened')){
            popUpAdd.close();
            popUpEdit.close();
            popUpAvatar.close();
            popUpImage.closeImage();
    }
}
)

})();


/*REVIEW. Резюме.

Функционал взаимодействия с сервером работает правильно (кроме закрытия формы профиля при сабмите).
Выполнены все дополнительные пункты задания.

Что надо исправить.
1. Не делать объявления функций в script.js (подробности в ревью в этом модуле).
2. Если это требуется, создать новые методы в имеющихся классах (подробности в ревью в этом модуле).
3. Преобразовать код методов класса Api по рекомендациям ревью.
4. Не создавать экземпляров классов в методах then (подробности в ревью в этом модуле).
5. Использовать метод класса UserInfo при работе с сервером.
6. Перенести инструкцию закрытия формы профиля при сабмите в метод then обработки
ответа сервера (подробности в ревью в этом модуле).
7. Надо осуществлять удаление сообщений об ошибках с формы профиля при её открытии (невыполненный пункт 8-го задания!) - наконец-то нашел как вызвать эту ошибку, исправил в форме редактирования профайла, больше она нигде не вылезает

У меня к Вам небольшая просьба, я перенес все функции связаные с кликами по карточкам и лайками в класс Card
 и там опять возникла нужда вызвать метод того же класс, сделать это через this.addLike()... 
 и привязкой биндом в конструкторе у меня не вышло, сделал через self = this внутри метода, 
 можете прямо в коде показать как сделать привязку через конструктор, видимо я что-то не так понимаю

*/

