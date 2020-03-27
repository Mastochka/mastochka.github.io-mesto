export default class UserInfo {
    constructor(form,username,job,avatar){
    this.form = form;    
    this.username = username;
    this.job = job;
    this.avatar = avatar;
    this._id = '';
    }
    
    setUserInfo(){
        this.form.username.value = this.username.textContent;
        this.form.job.value = this.job.textContent; 
    }

    updateUserInfo(name, about,id){
        this.username.textContent = name;
        this.job.textContent = about;
        this._id = id;
    }

    updateUserAvatar(avatar){
        this.avatar.style.backgroundImage = `url(${avatar})`;
    }
}