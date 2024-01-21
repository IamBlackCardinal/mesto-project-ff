import './pages/index.css';
import { createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getInitialCards, profileData, updateProfileData, addNewCard, updateAvatar } from './components/api.js';

export let userId;

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const profileTitlePlace = document.querySelector('.profile__title');
const profileDescriptionPlace = document.querySelector('.profile__description');
const editPopup = document.querySelector('.popup_type_edit');
const editPopupForm = editPopup.querySelector('.popup__form');
const profileNameInput = editPopup.querySelector('.popup__input_type_name');
const profileDescriptionInput = editPopup.querySelector('.popup__input_type_description');
const profileImagePlace = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_new-avatar');
const avatarPopupForm = avatarPopup.querySelector('.popup__form');
const avatarPopupLink = avatarPopup.querySelector('.popup__input_type_url');
const avatarButtonSubmit = avatarPopupForm.querySelector('.popup__button');
const cardPopup = document.querySelector('.popup_type_image');
const cardPopupImage = cardPopup.querySelector('.popup__image');
const cardPopupCaption = cardPopup.querySelector('.popup__caption');
const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardPopupForm = document.querySelector('.popup_type_new-card .popup__form');
const newCardButtonSubmit = newCardPopupForm.querySelector('.popup__button');
const newCardNameInput = newCardPopupForm.querySelector('.popup__input_type_card-name');
const newCardLinkInput = newCardPopupForm.querySelector('.popup__input_type_url');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

Promise.all([profileData(), getInitialCards()])
  .then(([userData, postsData]) => {
    profileTitlePlace.textContent = userData.name;
    profileDescriptionPlace.textContent = userData.about;
    profileImagePlace.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;

    postsData.forEach((card) => {
      cardsContainer.append(createCard(card, openImage, userId));
    });
  })
  .catch((err) => {
    console.log('Ошибка при выполнении запросов: ', err);
  });

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
  newCardPopupForm.reset();
  clearValidation(newCardPopupForm, validationConfig);
  openPopup(newCardPopup);
});

newCardPopupForm.addEventListener('submit', function (evt) {
  addCard(evt, newCardNameInput, newCardLinkInput, cardsContainer, createCard);
});

editButton.addEventListener('click', editButtonClick);

function addCard(evt, cardNameInput, cardLinkInput, cardsContainer, createCardFunc) {

  evt.preventDefault();

  const nameInput = cardNameInput.value;
  const linkInput = cardLinkInput.value;
  const originalButtonText = newCardButtonSubmit.textContent;

  newCardButtonSubmit.textContent = 'Сохранение...';

  addNewCard(nameInput, linkInput)
    .then((newCard) => {
      cardsContainer.prepend(createCard(newCard, openImage, userId));
      closePopup(newCardPopup);
      newCardPopupForm.reset();
      clearValidation(newCardPopupForm, validationConfig);
    })
    .catch((err) => {
      console.log('Ошибка при добавлении новой карточки: ', err);
    })
    .finally(() => {
      newCardButtonSubmit.textContent = originalButtonText;
    });
}

function openImage(card) {
  cardPopupImage.src = card.link;
  cardPopupImage.alt = `Изображение ${card.name}`;
  cardPopupCaption.textContent = card.name;
  openPopup(cardPopup);
}

function editButtonClick() {
  const profileTitle = profileTitlePlace.textContent;
  const profileDescription = profileDescriptionPlace.textContent;
  
  clearValidation(editPopupForm, validationConfig);
  profileNameInput.value = profileTitle;
  profileDescriptionInput.value = profileDescription;
  openPopup(editPopup);
}

editPopupForm.addEventListener('submit', editFormSubmit);

function editFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = profileNameInput.value;
  const jobInput = profileDescriptionInput.value;
  const submitButton = editPopupForm.querySelector('.popup__button');
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

profileImagePlace.addEventListener('click', avatarClick);

function avatarClick() {
  clearValidation(avatarPopupForm, validationConfig);
  openPopup(avatarPopup);
}

avatarPopupForm.addEventListener('submit', newAvatarSubmit);

function newAvatarSubmit(evt) {
  evt.preventDefault();

  const avatarUrl = avatarPopupLink.value;
  const originalButtonText = avatarButtonSubmit.textContent;

  avatarButtonSubmit.textContent = 'Сохранение...';
  updateAvatar(avatarUrl)
  .then((updatedUserData) => {
    profileImagePlace.style.backgroundImage = `url(${updatedUserData.avatar})`;
    closePopup(avatarPopup);
  })
  .catch((err) => {
    console.log('Ошибка при обновлении аватара: ', err);
  })
  .finally(() => {
    avatarButtonSubmit.textContent = originalButtonText;
  });
}