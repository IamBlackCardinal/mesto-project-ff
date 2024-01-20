import './pages/index.css';
import { createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import {enableValidation, clearValidation } from './components/validation.js';
import { getInitialCards, profileData, updateProfileData, addNewCard, updateAvatar, deleteCard, likeCard } from './components/api.js';

export let userId;
export let cardId;
const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const newPopup = document.querySelector('.popup_type_new-card');
const newCardForm = document.querySelector('.popup_type_new-card .popup__form');
const newCardButtonSubmit = newCardForm.querySelector('.popup__button');
const imagePopup = document.querySelector('.popup_type_image');
const avatarPopup = document.querySelector('.popup_type_new-avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const newAvatarButton = avatarForm.querySelector('.popup__button');
const avatarLink = avatarPopup.querySelector('.popup__input_type_url');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const editPopup = document.querySelector('.popup_type_edit');
const formElement = editPopup.querySelector('.popup__form');
const inputName = editPopup.querySelector('.popup__input_type_name');
const inputDescription = editPopup.querySelector('.popup__input_type_description');
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardForm.querySelector('.popup__input_type_url');
const profileTitlePlace = document.querySelector('.profile__title');
const profileDescriptionPlace = document.querySelector('.profile__description');
const profileImagePlace = document.querySelector('.profile__image');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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
  newCardForm.reset();
  clearValidation(newPopup, validationConfig);
  openPopup(newPopup);
});

newCardForm.addEventListener('submit', function (evt) {
  addCard(evt, cardNameInput, cardLinkInput, cardsContainer, createCard, deleteCard);
});

editButton.addEventListener('click', editButtonClick);

function addCard(evt, cardNameInput, cardLinkInput, cardsContainer, createCardFunc, deleteCardFunc) {
  evt.preventDefault();

  const nameInput = cardNameInput.value;
  const linkInput = cardLinkInput.value;
  const originalButtonText = newCardButtonSubmit.textContent;

  newCardButtonSubmit.textContent = 'Сохранение...';

  addNewCard(nameInput, linkInput)
    .then((newCard) => {
      cardsContainer.prepend(createCardFunc(newCard, deleteCardFunc, likeCard, openImage));
      closePopup(newPopup);
      newCardForm.reset();
      clearValidation(newPopup, validationConfig);
    })
    .catch((err) => {
      console.log('Ошибка при добавлении новой карточки: ', err);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

function openImage(card) {
  popupImage.src = card.link;
  popupImage.alt = `Изображение ${card.name}`;
  popupCaption.textContent = card.name;
  openPopup(imagePopup);
}

function editButtonClick() {
  const profileTitle = profileTitlePlace.textContent;
  const profileDescription = profileDescriptionPlace.textContent;

  inputName.value = profileTitle;
  inputDescription.value = profileDescription;
  clearValidation(editPopup, validationConfig);
  openPopup(editPopup);
}

formElement.addEventListener('submit', editFormSubmit);

function editFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = inputName.value;
  const jobInput = inputDescription.value;
  const submitButton = formElement.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  updateProfileData(nameInput, jobInput)
    .then((updatedUserData) => {
      profileTitlePlace.textContent = updatedUserData.name;
      profileDescriptionPlace.textContent = updatedUserData.about;
    })
    .then(() => {
      closePopup(editPopup);
    })
    .catch((err) => {
      console.log('Ошибка при обновлении профиля: ', err);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

enableValidation(validationConfig);

Promise.all([profileData(), getInitialCards()])
  .then(([userData, postsData]) => {
    profileTitlePlace.textContent = userData.name;
    profileDescriptionPlace.textContent = userData.about;
    profileImagePlace.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;

    postsData.forEach((card) => {
      cardsContainer.append(createCard(card, deleteCard, likeCard, openImage));
    });
  })
  .catch((err) => {
    console.log('Ошибка при выполнении запросов: ', err);
  });

profileImagePlace.addEventListener('click', avatarClick)

function avatarClick() {
  clearValidation(avatarPopup, validationConfig);
  openPopup(avatarPopup);
}

avatarForm.addEventListener('submit', newAvatarSubmit);

function newAvatarSubmit(evt) {
  evt.preventDefault();

  const avatarUrl = avatarLink.value;
  const originalButtonText = newAvatarButton.textContent;

  newAvatarButton.textContent = 'Сохранение...';

  updateAvatar(avatarUrl)
  .then((updatedUserData) => {
    profileImagePlace.style.backgroundImage = `url(${updatedUserData.avatar})`;
    closePopup(avatarPopup);
  })
  .catch((err) => {
    console.log('Ошибка при обновлении аватара: ', err);
  })
  .finally(() => {
    submitButton.textContent = originalButtonText;
  });
}