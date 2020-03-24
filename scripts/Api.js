class Api {
    constructor(options) {
        this.options = options;
    }

    checkResponse(res) {
        if (res.ok)
            return res.json();
        else return Promise.reject(res.status);
    }

    getInitialCards() {
        return fetch(this.options.baseUrl + `/cards`, {
            method: 'GET',
            headers: {
                authorization: this.options.headers.authorization
            }
        })
            .then(res => this.checkResponse(res));
    }

    addNewCard(name, link) {
        return fetch(this.options.baseUrl + `/cards`, {
            method: 'POST',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        }
        )
            .then(res => this.checkResponse(res));
    }

    removeCard(id) {
        return fetch(this.options.baseUrl + `/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.options.headers.authorization
            }
        }
        )
        .then(res => this.checkResponse(res));
    }

    getUserInfo() {
        return fetch(this.options.baseUrl + `/users/me`, {
            method: 'GET',
            headers: {
                authorization: this.options.headers.authorization
            }
        })
        .then(res => this.checkResponse(res));
    }

    updateUserInfo(name, job) {
        return fetch(this.options.baseUrl + `/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: job
            })
        })
        .then(res => this.checkResponse(res));
    }

    addLike(id) {
        return fetch(this.options.baseUrl + `/cards/like/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this.options.headers.authorization
            }
        }
        )
        .then(res => this.checkResponse(res));
    }

    removeLike(id) {
        return fetch(this.options.baseUrl + `/cards/like/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.options.headers.authorization
            }

        }
        )
        .then(res => this.checkResponse(res));
    }

    updateUserAvatar(url) {
        return fetch(this.options.baseUrl + `/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: url
            })
        })
        .then(res => this.checkResponse(res));
    }
}
