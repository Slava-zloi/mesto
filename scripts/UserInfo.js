export default class UserInfo{
  constructor(dataSelector){
    this._userNameSelector = dataSelector.name;
    this._userName = document.querySelector(this._userNameSelector).textContent;
    this._userStatusSelector = dataSelector.status;
    this._userStatus = document.querySelector(this._userStatusSelector).textContent;
  }

  getUserInfo(){
    this._userData = {name: document.querySelector(this._userNameSelector).textContent, status: document.querySelector(this._userStatusSelector).textContent}
    return this._userData;
  }

  setUserInfo(data){
    document.querySelector(this._userNameSelector).textContent = data.name;
    document.querySelector(this._userStatusSelector).textContent = data.status;
  }
}

// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
