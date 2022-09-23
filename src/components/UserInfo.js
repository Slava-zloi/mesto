export default class UserInfo{
  constructor(dataSelector){
    this._userName = document.querySelector(dataSelector.name);
    this._userStatus = document.querySelector(dataSelector.status);
    this._userAvatar = document.querySelector(dataSelector.avatar);
  }

  getUserInfo(){
    this._userData = {name: this._userName.textContent, status: this._userStatus.textContent};
    return this._userData;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userStatus.textContent = data.status;
    this._userAvatar.style.backgroundImage = `url(${data.avatar})`;
  }
}
