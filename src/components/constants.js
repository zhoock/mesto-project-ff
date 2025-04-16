// constants.js

// Контейнер для карточек
export const cardsContainer = document.querySelector('.places__list');

// Элементы профиля
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector(
  '.profile__description'
);

// Элементы формы редактирования профиля
export const editProfileForm = document.forms['edit-profile'];
export const inputName = editProfileForm.querySelector(
  '.popup__input_type_name'
);
export const inputDescription = editProfileForm.querySelector(
  '.popup__input_type_description'
);

// Элементы формы добавления карточки
export const newPlaceForm = document.forms['new-place'];
export const inputCardName = newPlaceForm.querySelector(
  '.popup__input_type_card-name'
);
export const inputTypeUrl = newPlaceForm.querySelector(
  '.popup__input_type_url'
);

// Элементы попапа с изображением
export const modalImg = document.querySelector('.popup__image');
export const modalCaption = document.querySelector('.popup__caption');

// Кнопка закрытия модалок
export const popupCloseBtns = document.querySelectorAll('.popup__close');
