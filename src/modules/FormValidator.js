export default class FormValidator {
    constructor(popup){
        this.popup = popup;
    }
    //функция проверки инпутов
    checkInputValidity(input,errorMsg){
        errorMsg.textContent = '';
        if (input.value.length === 0)
        errorMsg.textContent = 'Это обязательное поле';
        else if (input.getAttribute('type') === 'url' && !input.validity.valid)
        errorMsg.textContent = 'Здесь должна быть ссылка';
        else if (!input.validity.valid)
        errorMsg.textContent = 'Должно быть от 2 до 30 символов';
        else errorMsg.textContent = '';
            }

    //функция установки статуса кнопки
    setSubmitButtonState(form,button){
        if (form.checkValidity())
                button.removeAttribute('disabled');
        else
               button.setAttribute('disabled', '');
    }

    setEventListeners(){
        const self = this;
        const form = this.popup.querySelector('.popup__form');
        const button = form.querySelector('.popup__button');
        
        function checkValidity(event){
            
            self.checkInputValidity(event.target,event.target.closest('div').querySelector(`.popup__input-error`));
            self.setSubmitButtonState(form,button);
      }
       form.addEventListener('input', checkValidity);
       this.setSubmitButtonState(form,button);
    }
}
