export class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers= config.headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        authorization: this._headers.authorization,
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
        authorization: this._headers.authorization,
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
      authorization: this._headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: status
    })
  })
}




}

