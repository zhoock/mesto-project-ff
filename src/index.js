// index.js

import './index.css';
import {
  profileEditButton,
  popupTypeEdit,
  cardsContainer,
  editProfileForm,
  newPlaceForm,
  profileTitle,
  profileDescription,
  profileAddButton,
  popupTypeNewCard,
  inputTypeUrl,
  inputCardName,
  modalImg,
  modalCaption,
  inputName,
  inputDescription,
  modalImagePopup,
} from './components/constants.js';
import initialCards from './components/cards.js';
import { createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

// Обработчик клика удаления карточки
const handleRemoveCard = (card) => card.remove();

// Обработчик клика по кнопке лайка
const handleLikeClick = (e) => {
  e.target.classList.toggle('card__like-button_is-active');
};

// Обработчик клика по изображению карточки. Открывает модальное окно с увеличенной картинкой и подписью
const handleImageClick = (e) => {
  const img = e.target;

  modalImg.onload = () => {
    openModal(modalImagePopup); // Открываем, когда картинка загрузится
  };

  modalImg.src = img.src;
  modalImg.alt = img.alt;
  modalCaption.textContent = img.alt;
};

// Добавление карточек на страницу
const addCards = (initialCards, cardsContainer) =>
  initialCards.forEach((card) =>
    cardsContainer.appendChild(
      createCard(
        card.link,
        card.name,
        handleRemoveCard,
        handleImageClick,
        handleLikeClick
      )
    )
  );

addCards(initialCards, cardsContainer);

// Обработчик отправки формы редактирования профиля: обновляет имя и описание пользователя на странице и закрывает модалку
const handleEditProfileSubmit = (e) => {
  e.preventDefault(); // Отменяем стандартное поведение формы

  // Обновляем текст на странице
  profileTitle.textContent = inputName.value; // Имя пользователя
  profileDescription.textContent = inputDescription.value; // Описание пользователя

  // Закрываем модалку
  closeModal(popupTypeEdit);
};

// Обработчик отправки формы добавления карточки
const handleAddCardSubmit = (e) => {
  e.preventDefault();

  const card = createCard(
    inputTypeUrl.value,
    inputCardName.value,
    handleRemoveCard,
    handleImageClick,
    handleLikeClick
  ); // Создаем карточку

  cardsContainer.prepend(card); // Добавляем карточку в начало контейнера

  newPlaceForm.reset(); // Очищаем поля формы

  closeModal(popupTypeNewCard); // Закрываем модалку
};

// Обработчики отправки форм
editProfileForm.addEventListener('submit', handleEditProfileSubmit);
newPlaceForm.addEventListener('submit', handleAddCardSubmit);

// Массив кнопок для открытия модалок с соответствующими модальными окнами и значениями по умолчанию
const modalOpenButtons = [
  {
    button: profileEditButton,
    modal: popupTypeEdit,
    getValues: () => [profileTitle.textContent, profileDescription.textContent],
  },
  {
    button: profileAddButton,
    modal: popupTypeNewCard,
    getValues: () => [], // если не нужно передавать значения
  },
];

// Функция для добавления обработчиков кликов и открытие модального окна по кнопкам
modalOpenButtons.forEach(({ button, modal, getValues }) => {
  button.addEventListener('click', () => {
    const [firstValue, secondValue] = getValues();

    // Если это модалка для редактирования профиля
    if (modal.classList.contains('popup_type_edit')) {
      // Заполняем поля ввода данными
      inputName.value = firstValue; // Имя пользователя
      inputDescription.value = secondValue; // Описание пользователя
    }

    // Если это модалка для изображения
    else if (modal.classList.contains('popup_type_image')) {
      // Заполняем поля ввода данными
      modalImg.src = firstValue; // Ссылка на изображение
      modalImg.alt = secondValue; // Альтернативный текст
      modalCaption.textContent = secondValue; // Подпись
    }

    openModal(modal);
  });
});
