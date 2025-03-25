// @todo: Темплейт карточки

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard(link, name, fn) {
  const card = cardTemplate.cloneNode(true).querySelector('.card');
  const cardDeleteButton = card.querySelector('.card__delete-button');

  const cardImg = card.querySelector('.card__image');
  cardImg.src = link;
  cardImg.alt = name;

  card.querySelector('.card__title').textContent = name;

  cardDeleteButton.addEventListener('click', fn);

  //   cardDeleteButton.addEventListener('click', () => fn(card)); // можно использовать вариант с замыканием

  return card;
}

// @todo: Функция удаления карточки
function removeCard(e) {
  e.target.closest('.card').remove();
}

// можно использовать вариант с замыканием
// function removeCard(card) {
//   card.remove();
// }

// @todo: Вывести карточки на страницу
function addCard(arr) {
  arr.forEach((card) =>
    placesList.appendChild(createCard(card.link, card.name, removeCard))
  );
}

addCard(initialCards);
