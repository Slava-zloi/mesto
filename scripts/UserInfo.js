export default class UserInfo{
  constructor({ nameSelector, statusSelector }){
    this._nameSelector = dataSelectors.name;
    this._statusSelector = dataSele.status
  }

  getUserInfo(){
    this._userData = { document.querySelector() };
    return this._userData;
  }

  setUserInfo(){

  }
}






// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
