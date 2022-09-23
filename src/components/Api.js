export class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this.headers = config.headers;
  }


  _CheckServerAnswer(res){
    if (res.ok) {return res.json()}
      return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => this._CheckServerAnswer(res))


  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => this._CheckServerAnswer(res))
  }

  changeUserInfo(name, status) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: status
        })
      })
      .then((res) => this._CheckServerAnswer(res))
  }

  makeNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
        })
      })
      .then((res) => this._CheckServerAnswer(res))
  }

  deleteCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      }})
      .then((res) => this._CheckServerAnswer(res))
    }
  changeLikeStatus(cardID, isLiked){
    if (!isLiked) {
      return fetch(`${this._url}/cards/${cardID}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this.headers.authorization,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => this._CheckServerAnswer(res))
    }
    else {
      return fetch(`${this._url}/cards/${cardID}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this.headers.authorization,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => this._CheckServerAnswer(res))
    }
  }

  changeAvatar(avatar){
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
        })
    })
    .then((res) => this._CheckServerAnswer(res))
  }
}

