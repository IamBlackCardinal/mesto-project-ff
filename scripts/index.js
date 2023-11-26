// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

function addCard(card, deleteFunction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;

  deleteButton.addEventListener('click', () => deleteFunction(cardElement));

  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

initialCards.forEach(card => cardsContainer.append(addCard(card, deleteCard)));