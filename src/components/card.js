import { deleteCardApi, likeCardApi } from "./api.js";

export function createCard(card, openImageFunc, userId) {
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
    deleteButton.addEventListener('click', () => deleteCard(card._id, cardElement));
  }

  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', () => likeCard(likeButton, card._id));

  return cardElement;
}

const deleteCard = (cardId, cardElement) => {
  deleteCardApi(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log('Ошибка при удалении карточки: ', err);
    });
};

const likeCard = (likeElement, cardId) => {
  const isLiked = likeElement.classList.contains('card__like-button_is-active');

  likeCardApi(cardId, isLiked)
    .then((cardData) => {
      likeElement.classList.toggle('card__like-button_is-active');
      const likeCountElement = likeElement.closest('.card').querySelector('.card__like-count');
      likeCountElement.textContent = cardData.likes.length;
      isLiked = !isLiked;
    })
    .catch((err) => {
      console.log('Ошибка при лайке: ', err);
    });
  }