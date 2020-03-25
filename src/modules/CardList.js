export default class CardList {
    constructor(container, card) {
        this.container = container;
        this.card = card;
        
    }

    render(array,id) {
            for (let key of array) {
                this.addCard(key,id)        
        }
    }
     
    addCard(data,id) {
        const placeCard = this.card.createCard(data.name, data.link, data.likes.length, data._id, this.isOwner(data.owner._id, id), this.isLiked(data.likes, id));
        this.container.appendChild(placeCard);
    }
    
    isOwner(value,userId) {
        return value === userId;
    }

    isLiked(value,userId) {
        if(value) 
        return value.some(item => item._id === userId);
    }
    
}
