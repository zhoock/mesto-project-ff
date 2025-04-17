// constants.js

// Контейнер для карточек
export const cardsContainer = document.querySelector('.places__list');

// Элементы профиля
export const profileEditButton = document.querySelector(
  '.profile__edit-button'
);
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector(
  '.profile__description'
);

// Элементы попапа редактирования профиля
export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const editProfileForm = document.forms['edit-profile'];
export const inputName = editProfileForm.querySelector(
  '.popup__input_type_name'
);
export const inputDescription = editProfileForm.querySelector(
  '.popup__input_type_description'
);

// Элементы добавления карточки
export const profileAddButton = document.querySelector('.profile__add-button');

// Элементы попапа добавления карточки
export const popupTypeNewCard = document.querySelector('.popup_type_new-card');
export const newPlaceForm = document.forms['new-place'];
export const inputCardName = newPlaceForm.querySelector(
  '.popup__input_type_card-name'
);
export const inputTypeUrl = newPlaceForm.querySelector(
  '.popup__input_type_url'
);

// Элементы попапа с изображением
export const modalImagePopup = document.querySelector('.popup_type_image');
export const modalImg = document.querySelector('.popup__image');
export const modalCaption = document.querySelector('.popup__caption');
