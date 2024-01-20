import { userId} from '../index.js';

export function createCard(card, deleteCardFunc, likeCardFunc, openImageFunc) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');
  const isLiked = card.likes.some(user => user._id === userId);

  cardImage.src = card.link;
  cardImage.alt = card.name;
  likeCount.textContent = card.likes.length;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardImage.addEventListener('click', () => openImageFunc(card));

  if (card.owner._id !== userId) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener('click', () => deleteCardFunc(card._id, cardElement));
  }

  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', () => likeCardFunc(likeButton, card._id));

  return cardElement;
}