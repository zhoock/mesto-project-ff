// card.js

// Функция создания карточки
export const createCard = (
  link,
  name,
  handleRemoveCard,
  handleImageClick,
  handleLikeClickFn
) => {
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

  // Удаление карточки
  cardDeleteBtn.addEventListener('click', () => handleRemoveCard(card));

  // Открытие попапа с изображением
  cardImg.addEventListener('click', handleImageClick);

  // Лайк
  likeButton.addEventListener('click', handleLikeClickFn);

  return card;
};
