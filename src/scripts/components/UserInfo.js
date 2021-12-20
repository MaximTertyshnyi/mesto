export class UserInfo {
    constructor({ userName, userDescription }) {
        this._userName = userName,
            this._userDescription = userDescription;
    }

    getUserInfo() {
        this._userProfile = {
            name: this._userName.textContent,
            description: this._userDescription.textContent,
        }
        return this._userProfile
    }

    setUserInfo({ profilename, description }) {
        this._userName.textContent = profilename;
        this._userDescription.textContent = description;
    }
}