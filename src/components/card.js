// card.js

// Функция создания карточки
export default function createCard(link, name, handleLikeClickFn) {
  const card = document
    .querySelector('#card-template')
    .content.cloneNode(true)
    .querySelector('.card');

  const cardImg = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardDeleteBtn = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');

  cardImg.src = link;
  cardImg.alt = name;
  cardTitle.textContent = name;

  // Встроенное удаление карточки
  cardDeleteBtn.addEventListener('click', () => card.remove());

  // Лайк
  likeButton.addEventListener('click', handleLikeClickFn);

  return card;
}
