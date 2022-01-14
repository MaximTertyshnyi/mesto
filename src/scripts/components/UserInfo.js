export class UserInfo {
    constructor({ userName, userDescription, avatar }) {
        this._userName = userName,
            this._userDescription = userDescription;
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        this._userProfile = {
            name: this._userName.textContent,
            description: this._userDescription.textContent,
        }
        return this._userProfile
    }

    setUserInfo({ profilename, description, avatar }) {
        if (profilename) {
            this._userName.textContent = profilename;
        }
        if (description) {
            this._userDescription.textContent = description;
        }
        if (avatar) {
            this._avatar.src = avatar;
        }
    }
}