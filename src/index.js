
/*variables*/
import './style.css';
import './images/close.svg';
import './images/like-active.svg';
import './images/like-inactive.svg';
import './images/logo.svg';
import './images/trash-icon.svg';
import Api from './modules/Api';
import Card from './modules/Card';
import CardList from './modules/CardList';
import FormValidator from './modules/FormValidator';
import Popup from './modules/Popup';
import UserInfo from './modules/UserInfo';
const isDev = process.env.NODE_ENV === 'development';
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
    baseUrl: (isDev ? 'http://praktikum.tk/cohort8': 'https://praktikum.tk/cohort8'),
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
        cardList.addCard(data, data.owner._id);
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




