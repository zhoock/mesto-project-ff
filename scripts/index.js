// @todo: Темплейт карточки

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function addCard(cardImg, cardTitle) {
  const cardElement = cardTemplate.cloneNode(true).querySelector('.card');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardImg;
  cardImage.alt = cardTitle;

  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardDeleteButton.addEventListener('click', () => removeCard(cardElement));

  placesList.appendChild(cardElement);
}

// @todo: Функция удаления карточки
function removeCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => addCard(card.link, card.name));
