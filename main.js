(()=>{"use strict";class e{constructor(e){this._popupElement=document.querySelector(e)}openPopup(){this._popupElement.classList.add("popup_opened"),this._popupElement.addEventListener("mousedown",this._handleClickOnOverlayClose),document.addEventListener("keydown",this._handleEscClose)}closePopup(){this._popupElement.classList.remove("popup_opened"),this._popupElement.removeEventListener("mousedown",this._handleClickOnOverlayClose),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose=e=>{if("Escape"===e.key){const e=document.querySelector(".popup_opened");this.closePopup(e)}};_handleClickOnOverlayClose=e=>{const t=document.querySelector(".popup_opened");e.target===t&&this.closePopup()};setEventListeners(){this._popupElement.querySelector(".popup__button-close").addEventListener("click",(()=>{this.closePopup()}))}}class t extends e{constructor(e,t){super(e),this._handleSubmit=t,this._form=this._popupElement.querySelector(".popup__form"),this._inputList=[...this._popupElement.querySelectorAll(".popup__input")]}_getInputValues(){return this._formValues={},this._inputList.forEach((e=>{this._formValues[e.name]=e.value})),this._formValues}setEventListeners(){super.setEventListeners(),this._popupElement.addEventListener("submit",(e=>{e.preventDefault(),this._handleSubmit(this._getInputValues()),this.closePopup()}))}closePopup(){super.closePopup(),this._form.reset()}}class s{constructor({data:e,operateCardClic:t,handleLikeClickActive:s,handleLikeClickDeactive:r,handleDeleteClick:i},n,o){this._name=e.name,this._link=e.link,this._likes=e.likes,this._likesCounter=e.likes.length,this._templateSelector=n,this.operateCardClic=t,this.handleLikeClickActive=s,this.handleLikeClickDeactive=r,this.handleDeleteClick=i,this._userId=o,this._ownerId=e.owner._id,this._id=e._id}_getTemplate(){return this._templateSelector.content.querySelector(".element").cloneNode(!0)}_setEventListeners(){this._cardElement.querySelector(".element__like-button").addEventListener("click",(e=>{this._handleLikeClick(e)})),this._cardElement.querySelector(".element__ithem").addEventListener("click",(()=>{this.operateCardClic()})),this._userId===this._ownerId&&this._cardElement.querySelector(".element__delite-button").addEventListener("click",this.handleDeleteClick)}_addLikes(e){this._likes.forEach((t=>{t._id===e&&this._cardElement.querySelector(".element__like-button").classList.add("element__like-button_active")}))}handleDeleteCard=()=>{this._cardElement.remove(),this._cardElement=""};countLikes=e=>{const t=this._cardElement.querySelector(".element__like-button");this._elementCardLikes.textContent=e,t.classList.contains("element__like-button_active")?t.classList.remove("element__like-button_active"):t.classList.add("element__like-button_active")};_handleLikeClick(e){e.target.classList.contains("element__like-button_active")?this.handleLikeClickDeactive(this._id,this.countLikes):this.handleLikeClickActive(this._id,this.countLikes)}createCard=()=>(this._cardElement=this._getTemplate(),this._elementCardLikes=this._cardElement.querySelector(".element__like-counter"),this._setEventListeners(),this._cardElement.querySelector(".element__ithem").src=this._link,this._cardElement.querySelector(".element__title").textContent=this._name,this._cardElement.querySelector(".element__ithem").alt=this._name,this._elementCardLikes.textContent=this._likesCounter,this._addLikes(this._userId),this._removeDeleteButton(this._userId),this._cardElement);_removeDeleteButton(e){this._ownerId!==e&&(this._cardElement.querySelector(".element__delite-button").style.display="none")}}class r{constructor(e,t){this._formElement=t,this._formSelector=e.formSelector,this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._buttonElement=this._formElement.querySelector(this._submitButtonSelector)}_showInputError=(e,t)=>{const s=this._formElement.querySelector(`.popup__input-error_${e.id}`);e.classList.add(this._inputErrorClass),s.textContent=t,s.classList.add(this._errorClass)};_hideInputError=e=>{const t=this._formElement.querySelector(`.popup__input-error_${e.id}`);e.classList.add(this._inputErrorClass),t.textContent="",e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass)};_checkInputValidity=e=>{e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)};_hasInvalidInput=()=>this._inputList.some((e=>!e.validity.valid));_toggleButtonState=()=>{this._hasInvalidInput()?(this._buttonElement.disabled=!0,this._buttonElement.classList.add(this._inactiveButtonClass)):(this._buttonElement.disabled=!1,this._buttonElement.classList.remove(this._inactiveButtonClass))};_setEventListeners=()=>{this._toggleButtonState(),this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))};enableValidation=()=>{this._formElement.addEventListener("submit",(e=>{e.preventDefault()})),this._setEventListeners()};resetValidation=()=>{this._toggleButtonState()}}const i=document.querySelector(".elements"),n=".popup_type_edit",o=document.querySelector(".profile__title"),a=document.querySelector(".profile__subtitle"),l=document.querySelector(".element-template"),c=document.querySelector(".profile__edit-button"),u=".popup_type_add",_=document.querySelector(".profile__add-button"),p=document.forms["user-profile"],h=document.forms["user-add"],d=document.forms["avatar-update"],m=document.querySelector(".popup__input_name"),v=document.querySelector(".popup__input_business"),E=".popup_type_avatar",k=document.querySelector(".profile__avatar"),C=(e,t=!1)=>{document.querySelector(`${e} .popup__button-save`).textContent=t?"Загрузка...":"Сохранить"},L={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button-save",inactiveButtonClass:"popup__button-save_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},f=new class{constructor({userName:e,userDescription:t,avatar:s}){this._userName=e,this._userDescription=t,this._avatar=document.querySelector(s)}getUserInfo(){return this._userProfile={name:this._userName.textContent,description:this._userDescription.textContent},this._userProfile}setUserInfo({profilename:e,description:t,avatar:s}){e&&(this._userName.textContent=e),t&&(this._userDescription.textContent=t),s&&(this._avatar.src=s)}}({userName:o,userDescription:a,avatar:".profile__avatar"});let y;new r(L,p).enableValidation();const S=new class{constructor(e){this._url=e.url,this._headers=e.headers,this._body=e.body}_prepareDate=e=>e.ok?e.json():Promise.reject(e.status);getProfileData(){return fetch(`${this._url}users/me`,{headers:this._headers}).then((e=>this._prepareDate(e)))}editProfile(e,t){return fetch(`${this._url}users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then((e=>this._prepareDate(e)))}editAvatar(e){return fetch(`${this._url}users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((e=>this._prepareDate(e)))}getCardsData(){return fetch(`${this._url}cards`,{headers:this._headers}).then((e=>this._prepareDate(e)))}addNewCard(e,t){return fetch(`${this._url}cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then((e=>this._prepareDate(e)))}deleteCard(e){return fetch(`${this._url}cards/${e}`,{method:"DELETE",headers:this._headers}).then((e=>this._prepareDate(e)))}0;putCardLikes(e){return fetch(`${this._url}cards/${e}/likes`,{method:"PUT",headers:this._headers}).then((e=>this._prepareDate(e)))}deleteCardLikes(e){return fetch(`${this._url}cards/${e}/likes`,{method:"DELETE",headers:this._headers}).then((e=>this._prepareDate(e)))}}({url:"https://nomoreparties.co/v1/cohort-33/",headers:{authorization:"3d4f0a21-bd6c-486b-9469-94ae61cb738c","content-type":"application/json"}}),b=S.getProfileData(),D=S.getCardsData();c.addEventListener("click",(function(){x.openPopup();const e=f.getUserInfo();m.value=e.name,v.value=e.description}));const q=new class extends e{constructor(e){super(e),this._link=this._popupElement.querySelector(".popup__img"),this._name=this._popupElement.querySelector(".popup__title-img")}openPopup({name:e,link:t}){super.openPopup(),this._link.src=t,this._name.textContent=e,this._name.alt=e}}(".popup_type_img");q.setEventListeners();const P=new class extends e{constructor(e){super(e)}submit(e){this._submiter=e}setEventListeners(){super.setEventListeners(),this._popupElement.addEventListener("submit",(e=>{e.preventDefault(),this._submiter()}))}}(".popup_type_card-delete");function g(e,t){const r=new s({data:e,operateCardClic:()=>{q.openPopup(e)},handleLikeClickActive:$,handleLikeClickDeactive:B,handleDeleteClick:()=>{P.openPopup(),P.submit((()=>{S.deleteCard(e._id).then((()=>{r.handleDeleteCard(),P.closePopup()})).catch((e=>{alert(`Возникла ошибка: ${e}`)}))}))}},t,y);return r.createCard()}P.setEventListeners();const I=new class{constructor({renderer:e},t){this._renderer=e,this._conteinerSelector=t}renderItems(e){e.forEach((e=>this._renderer(e)))}addItem(e){this._conteinerSelector.prepend(e)}}({renderer:e=>{const t=g(e,l);I.addItem(t)}},i);Promise.all([D,b]).then((e=>{y=e[1]._id,b.then((e=>{f.setUserInfo({profilename:e.name,description:e.about,avatar:e.avatar})})).catch((e=>{alert(`Возникла ошибка: ${e}`)})),D.then((e=>(I.renderItems(e),I))).catch((e=>{alert(`Возникла ошибка: ${e}`)}))}));const w=new r(L,h);w.enableValidation(),_.addEventListener("click",(function(){V.openPopup(),w.resetValidation()}));const $=(e,t)=>{S.putCardLikes(e).then((e=>{t(e.likes.length)})).catch((e=>{alert(`Возникла ошибка: ${e}`)}))},B=(e,t)=>{S.deleteCardLikes(e).then((e=>{t(e.likes.length)})).catch((e=>{alert(`Возникла ошибка: ${e}`)}))},x=new t(n,(e=>{C(n,!0),S.editProfile(e.profilename,e.description).then((e=>{f.setUserInfo({profilename:e.name,description:e.about,avatar:e.avatar}),x.closePopup()})).catch((e=>{alert(`Возникла ошибка: ${e}`)})).finally((()=>{C(n,!1)}))}));x.setEventListeners();const V=new t(u,(e=>{C(u,!0),S.addNewCard(e.name,e.link).then((e=>{const t=g(e,l);I.addItem(t),V.closePopup()})).catch((e=>{alert(`Возникла ошибка: ${e}`)})).finally((()=>{C(u,!1)}))}));V.setEventListeners();const A=new r(L,d);A.enableValidation();const N=new t(E,(e=>{C(E,!0),S.editAvatar(e.link).then((e=>{f.setUserInfo({profilename:e.name,userDescription:e.about,avatar:e.avatar}),N.closePopup()})).catch((e=>{alert(`Возникла ошибка: ${e}`)})).finally((()=>{C(E,!1)}))}));N.setEventListeners(),k.addEventListener("click",(function(){A.resetValidation(),N.openPopup()}))})();