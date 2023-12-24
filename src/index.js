import './pages/index.css';
import initialCards from './cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openPopup, closePopup, closeEscape } from './components/modal.js';

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const newPopup = document.querySelector('.popup_type_new-card');
const newCardForm = document.querySelector('.popup_type_new-card .popup__form');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const editPopup = document.querySelector('.popup_type_edit');
const formElement = editPopup.querySelector('.popup__form');
const inputName = editPopup.querySelector('.popup__input_type_name');
const inputDescription = editPopup.querySelector('.popup__input_type_description');

initialCards.forEach(card => cardsContainer.append(createCard(card, deleteCard, likeCard, openImage)));

document.querySelectorAll('.popup').forEach( popup => {
  popup.classList.add('popup_is-animated');

  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closePopup(popup));

  popup.addEventListener('mousedown', (evt) => { 
    if (evt.target.classList.contains('popup')) { 
      closePopup(popup); 
    }; 
  }); 
});

addButton.addEventListener('click', function () {
  openPopup(newPopup);
});

newCardForm.addEventListener('submit', function (evt) {
  addCard(evt, newCardForm, cardsContainer, createCard, deleteCard);
  closePopup(newPopup);
  newCardForm.reset();
});

editButton.addEventListener('click', editButtonClick); 

function addCard(evt, formElement, cardsContainer, createCardFunc, deleteCardFunc) {
  evt.preventDefault();

  const nameInput = formElement.querySelector('.popup__input_type_card-name').value;
  const linkInput = formElement.querySelector('.popup__input_type_url').value;
  const newCardData = { name: nameInput, link: linkInput };
  const newCardElement = createCardFunc(newCardData, deleteCardFunc, likeCard, openImage);

  cardsContainer.prepend(newCardElement);
}


function openImage(card) {
  popupImage.src = card.link;
  popupImage.alt = `Изображение ${card.name}`;
  popupCaption.textContent = card.name;
  openPopup(imagePopup);
}


function editButtonClick() {
  const profileTitle = document.querySelector('.profile__title').textContent;
  const profileDescription = document.querySelector('.profile__description').textContent;

  inputName.value = profileTitle;
  inputDescription.value = profileDescription;
  openPopup(editPopup);
}

formElement.addEventListener('submit', editFormSubmit);


function editFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = inputName.value;
  const jobInput = inputDescription.value;

  document.querySelector('.profile__title').textContent = nameInput;
  document.querySelector('.profile__description').textContent = jobInput;
  closePopup(editPopup);
}