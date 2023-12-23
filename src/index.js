import './pages/index.css';
import initialCards from './cards.js';
import { createCard, deleteCard, likeCard, addCard, openImage } from './components/card.js';
import { openPopup, closePopup, closeMouseDown, editButtonClick, editFormSubmit } from './components/modal.js';

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const newPopup = document.querySelector('.popup_type_new-card');
const newCardForm = document.querySelector('.popup_type_new-card .popup__form');


initialCards.forEach(card => cardsContainer.append(createCard(card, deleteCard, likeCard, openImage)));

document.addEventListener('mousedown', closeMouseDown);

addButton.addEventListener('click', function () {
  openPopup(newPopup);
});

newCardForm.addEventListener('submit', function (evt) {
  addCard(evt, newCardForm, cardsContainer, createCard, deleteCard);
  closePopup(newPopup);
  newCardForm.reset();
});

editButton.addEventListener('click', editButtonClick); 

