// card.js

import {
  cardTemplate,
  modalImagePopup,
  modalImg,
  modalCaption,
} from './constants.js';
import { openModal } from './modal.js';

// Функция создания карточки
export const createCard = (
  link,
  name,
  handleRemoveCard,
  handleImageClick,
  handleLikeClickFn
) => {
  const card = cardTemplate.content.cloneNode(true).querySelector('.card');

  const cardImg = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardDeleteBtn = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');

  cardImg.src = link;
  cardImg.alt = name;
  cardTitle.textContent = name;

  // Удаление карточки
  cardDeleteBtn.addEventListener('click', () => handleRemoveCard(card));

  // Открытие попапа с изображением
  cardImg.addEventListener('click', handleImageClick);

  // Лайк
  likeButton.addEventListener('click', handleLikeClickFn);

  return card;
};

// Обработчик клика удаления карточки
export const handleRemoveCard = (card) => card.remove();

// Обработчик клика по кнопке лайка
export const handleLikeClick = (e) => {
  e.target.classList.toggle('card__like-button_is-active');
};

// Обработчик клика по изображению карточки. Открывает модальное окно с увеличенной картинкой и подписью
export const handleImageClick = (e) => {
  const img = e.target;

  modalImg.onload = () => {
    openModal(modalImagePopup); // Открываем, когда картинка загрузится
  };

  modalImg.src = img.src;
  modalImg.alt = img.alt;
  modalCaption.textContent = img.alt;
};
