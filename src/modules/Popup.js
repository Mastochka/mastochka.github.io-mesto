export default class Popup {
    constructor(container){
        this.container = container;
    }

    open(){
        this.container.classList.add('popup_is-opened')
    };

    close(){
        this.container.classList.remove('popup_is-opened')
    };

    openImage(event){
        this.container.classList.add('popup_is-opened');
        const image = document.createElement('img');
        const imageSrc = event.target.style.backgroundImage.slice(5,-2); //убираем url и ковычки из ссылки
        image.src = imageSrc;
        image.classList.add('popup__image');
        const wrapper = document.querySelector('.popup__image-wrapper');
        wrapper.append(image);
    };

    closeImage(){
        this.container.classList.remove('popup_is-opened');
        const image = document.querySelector('.popup__image');
        if (image)
        image.remove();
    }
}