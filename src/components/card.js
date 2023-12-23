
import { openPopup } from "./modal";

export function createCard(card, deleteCardFunc, likeCardFunc, openImageFunc) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;

  deleteButton.addEventListener('click', () => deleteCardFunc(cardElement));
  likeButton.addEventListener('click', () => likeCardFunc(likeButton));
  cardImage.addEventListener('click', () => openImageFunc(card));

  return cardElement;
}

export function deleteCard(card) {
  card.remove();
}

export function likeCard(likeElement) {
  likeElement.classList.toggle('card__like-button_is-active');
}

export function addCard(evt, formElement, cardsContainer, createCardFunc, deleteCardFunc) {
  evt.preventDefault();

  const nameInput = formElement.querySelector('.popup__input_type_card-name').value;
  const linkInput = formElement.querySelector('.popup__input_type_url').value;
  const newCardData = { name: nameInput, link: linkInput };
  const newCardElement = createCardFunc(newCardData, deleteCardFunc, likeCard, openImage);

  cardsContainer.prepend(newCardElement);
}

export function openImage(card) {
  const imagePopup = document.querySelector('.popup_type_image');
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');

  popupImage.src = card.link;
  popupImage.alt = `Изображение ${card.name}`;
  popupCaption.textContent = card.name;

  openPopup(imagePopup);
}