export class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this.headers = config.headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
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
    .then(res => {
        if (res.ok) {
            return res.json ();
        }
    })
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
    .then(res => {
      if (res.ok) {
        return res.json ();
      }
    })
  }

  deleteCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      }
      .then(res => {
        if (res.ok) {
          return res.json ();
      }})
    })
  }
}

