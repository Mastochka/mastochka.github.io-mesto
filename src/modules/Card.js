export default class Card {
    constructor() {

    }
    //тут пришлось сделать несколько проверок. Их надо выносить в отдельные функции или методы?
    createCard(name, link, likeNumber, card_id, isOwner, isLiked) {
        const placeCard = document.createElement('div');
        placeCard.classList.add('place-card');
        placeCard.dataset.cardId = card_id;
        const placeCardImage = document.createElement('div');
        placeCardImage.classList.add('place-card__image');
        placeCardImage.style.backgroundImage = `url('${link}')`;
        if (isOwner) {
            const deleteIcon = document.createElement('button');
            deleteIcon.classList.add('place-card__delete-icon');
            placeCardImage.appendChild(deleteIcon);
        }
        const placeCardDescription = document.createElement('div');
        placeCardDescription.classList.add('place-card__description');

        const placeCardName = document.createElement('h3');
        placeCardName.classList.add('place-card__name');
        placeCardName.textContent = name;

        const likeWrapper = document.createElement('div');
        likeWrapper.classList.add('like-wrapper');
        const likeCounter = document.createElement('div');
        likeCounter.textContent = likeNumber;
        likeCounter.classList.add('like-counter');
        const likeButton = document.createElement('button');
        likeButton.classList.add('place-card__like-icon');
        if (isLiked) {
            likeButton.classList.add('place-card__like-icon_liked');
        }
        likeWrapper.appendChild(likeButton);
        likeWrapper.appendChild(likeCounter);
        placeCardDescription.appendChild(placeCardName);
        placeCardDescription.appendChild(likeWrapper);

        placeCard.appendChild(placeCardImage);
        placeCard.appendChild(placeCardDescription);

        return placeCard;
    }
    
    addLike(event, api, counter) {
        event.target.classList.toggle('place-card__like-icon_liked');
        api.addLike(event.target.closest('.place-card').dataset.cardId)
            .then(data => counter.textContent = data.likes.length)
            .catch(err => console.log(`Ошибка: ${err}`));
    }
    removeLike(event, api, counter) {
        event.target.classList.toggle('place-card__like-icon_liked');
        api.removeLike(event.target.closest('.place-card').dataset.cardId)
            .then(data => counter.textContent = data.likes.length)
            .catch(err => console.log(`Ошибка: ${err}`));
    }
    removeCard(event, api) {
        api.removeCard(event.target.closest('.place-card').dataset.cardId)
            .catch(err => console.log(`Ошибка: ${err}`));
        event.target.closest('.place-card').remove();
    }

    clickEvents(event, api, popUpImage) {
        const self = this;
        if (event.target.classList.contains('place-card__like-icon')) {
            const likeCounter = event.target.closest('.place-card').querySelector('.like-counter');
            if (!event.target.classList.contains('place-card__like-icon_liked'))
            self.addLike(event, api, likeCounter);
            else
            self.removeLike(event, api, likeCounter);
        }
        if (event.target.classList.contains('place-card__delete-icon')) {
            if (window.confirm('Вы точно хотите удалить карточку?'))
            self.removeCard(event, api);
        }
        if (event.target.classList.contains('place-card__image')) {
            popUpImage.openImage(event);
        }
    }
    
}