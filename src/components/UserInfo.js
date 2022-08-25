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
