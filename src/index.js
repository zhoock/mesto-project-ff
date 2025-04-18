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
  inputName,
  inputDescription,
} from './components/constants.js';
import initialCards from './components/cards.js';
import {
  createCard,
  handleRemoveCard,
  handleLikeClick,
  handleImageClick,
} from './components/card.js';
import {
  openModal,
  closeModal,
  setCloseButtonsEventListeners,
} from './components/modal.js';

// Назначает обработчики на все кнопки закрытия модалок (крестики) один раз при запуске, чтобы не дублировались
setCloseButtonsEventListeners();

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

    openModal(modal);
  });
});
