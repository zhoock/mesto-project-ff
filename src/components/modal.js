// modals.js

import {
  inputName,
  inputDescription,
  modalImg,
  modalCaption,
} from './constants.js';

// Открытие модалки
export const openModal = (modal, firstValue, secondValue) => {
  modal.classList.add('popup_is-opened');

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
};
