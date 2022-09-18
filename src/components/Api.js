export class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headerAuth = config.headers.authorization;
  }

  getInitialCards() {
    return fetch(this._url, {
      headers: {
        authorization: this._headerAuth
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
}

