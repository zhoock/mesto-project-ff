// handlers.js

import {
  popupCloseBtns,
  cardsContainer,
  profileTitle,
  profileDescription,
  inputName,
  inputDescription,
  inputTypeUrl,
  inputCardName,
} from './constants.js';
import createCard from './card.js';
import { addModalOpenListeners } from '../index.js';

const getOpenedModal = () => document.querySelector('.popup_is-opened');

// Функция закрытие модалки
export const closeModal = (modal) => modal.classList.remove('popup_is-opened');

// Обработчик клика по кнопке лайка:
export const handleLikeClick = (e) => {
  e.target.classList.toggle('card__like-button_is-active');
};

// Обработчик отправки формы редактирования профиля:
// обновляет имя и описание пользователя на странице и закрывает модалку
export const handleFormSubmit = (e) => {
  e.preventDefault(); // Отменяем стандартное поведение формы

  // Обновляем текст на странице
  profileTitle.textContent = inputName.value; // Имя пользователя
  profileDescription.textContent = inputDescription.value; // Описание пользователя

  // Закрываем модалку
  closeModal(e.target.closest('.popup'));
};

// Обработчик отправки формы добавления карточки:
export const handleAddCardSubmit = (e) => {
  e.preventDefault(); // Отменяем стандартное поведение формы

  const card = createCard(
    inputTypeUrl.value,
    inputCardName.value,
    handleLikeClick
  ); // Создаем карточку

  cardsContainer.prepend(card); // Добавляем карточку в начало контейнера

  // Очищаем поля ввода
  inputTypeUrl.value = ''; // Ссылка на изображение
  inputCardName.value = ''; // Название карточки

  closeModal(e.target.closest('.popup')); // Закрываем модалку

  // Добавляем обработчики для новой карточки
  addModalOpenListeners();
};

// Закрытие по кнопке
popupCloseBtns.forEach((btn) =>
  btn.addEventListener('click', (e) => closeModal(e.target.closest('.popup')))
);

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
  e.key === 'Escape' && closeModal(getOpenedModal());
});

// Закрытие по клику на оверлей
document.addEventListener('mousedown', (e) => {
  e.target === getOpenedModal() && closeModal(e.target);
});
