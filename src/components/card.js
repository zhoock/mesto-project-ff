// components/card.js

import { cardTemplate, AUTH_TOKEN, COHORT } from './constants.js';

// Функция создания карточки
export const createCard = (
  link,
  name,
  handleRemoveCard,
  handleImageClick,
  handleLikeClick,
  currentUserId,
  ownerId,
  cardId,
  likes
) => {
  const card = cardTemplate.content.cloneNode(true).querySelector('.card');

  const cardImg = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardDeleteBtn = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  const likeCounter = card.querySelector('.card__like-count');

  cardImg.src = link;
  cardImg.alt = name;
  cardTitle.textContent = name;

  // Удаление кнопки закрытия в зависимости от того, является ли текущий пользователь владельцем карточки
  if (ownerId === currentUserId) {
    cardDeleteBtn.addEventListener('click', () =>
      handleRemoveCard(card, cardId)
    );
  } else cardDeleteBtn.remove();

  // Открытие попапа с изображением
  cardImg.addEventListener('click', handleImageClick);

  // Лайк
  likeButton.addEventListener('click', (e) => handleLikeClick(e, cardId));

  likeCounter.textContent = likes.length; // Устанавливаем количество лайков
  if (likes.some((like) => like._id === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active'); // Если лайкнут, добавляем класс
  } else {
    likeButton.classList.remove('card__like-button_is-active'); // Если не лайкнут, убираем класс
  }

  return card;
};

// Обработчик клика удаления карточки
export const handleRemoveCard = (card, cardId) => {
  // Отправляем запрос на удаление карточки с сервера
  fetch(`https://nomoreparties.co/v1/${COHORT}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: AUTH_TOKEN, // Мой токен
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка при удалении карточки: ${res.status}`);
      }
      return res.json();
    })
    .then(() => {
      // Удаляем карточку из DOM
      card.remove();
    })
    .catch((err) => {
      console.error('Ошибка при удалении карточки:', err);
    });
};

// Обработчик клика по кнопке лайка
export const handleLikeClick = (e, cardId) => {
  const likeButton = e.target;
  const isLiked = likeButton.classList.contains('card__like-button_is-active'); // Проверяем, лайкнут ли уже

  // Отправляем запрос на постановку или снятие лайка в зависимости от состояния
  const method = isLiked ? 'DELETE' : 'PUT'; // Если лайкнут — DELETE, если не лайкнут — PUT

  fetch(`https://nomoreparties.co/v1/${COHORT}/cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: AUTH_TOKEN,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка при лайкинге карточки: ${res.status}`);
      }
      return res.json();
    })
    .then((updatedCard) => {
      // Обновляем количество лайков и цвет кнопки
      likeButton.classList.toggle('card__like-button_is-active'); // Переключаем класс для цвета кнопки
      const likeCount = updatedCard.likes.length; // Считаем количество лайков из ответа сервера

      // Обновляем отображение количества лайков
      const likeCounter = likeButton
        .closest('.card')
        .querySelector('.card__like-count');
      if (likeCounter) {
        likeCounter.textContent = likeCount; // Обновляем счётчик лайков
      }
    })
    .catch((err) => {
      console.error('Ошибка при обновлении лайка:', err);
    });
};
