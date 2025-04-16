// render.js

import createCard from './card.js';
import { handleLikeClick, removeCard } from './handlers.js';

// Добавление карточек на страницу
export const addCards = (initialCards, cardsContainer) =>
  initialCards.forEach((card) =>
    cardsContainer.appendChild(
      createCard(card.link, card.name, removeCard, handleLikeClick)
    )
  );
