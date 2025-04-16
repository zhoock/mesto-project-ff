// index.js

import './index.css';
import initialCards from './components/cards.js';
import {
  cardsContainer,
  editProfileForm,
  newPlaceForm,
  profileTitle,
  profileDescription,
} from './components/constants.js';
import { addCards } from './components/render.js';
import { openModal } from './components/modal.js';
import {
  handleFormSubmit,
  handleAddCardSubmit,
} from './components/handlers.js';

// Добавление карточек на страницу
addCards(initialCards, cardsContainer);

// Обработчик отправки формы
editProfileForm.addEventListener('submit', handleFormSubmit);
newPlaceForm.addEventListener('submit', handleAddCardSubmit);

// Функция для добавления обработчиков кликов и открытие модального окнапо кнопкам с data-target
export const addModalOpenListeners = () => {
  document.querySelectorAll('[data-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = document.querySelector(btn.dataset.target);

      const values = modal.classList.contains('popup_type_edit')
        ? [profileTitle.textContent, profileDescription.textContent]
        : [btn.src, btn.alt];

      openModal(modal, ...values);
    });
  });
};

addModalOpenListeners();
