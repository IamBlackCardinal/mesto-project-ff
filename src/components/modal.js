
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');

  const closeButton = popup.querySelector('.popup__close');

  closeButton.addEventListener('click', () => closePopup(popup));
  document.addEventListener('keydown', closeEscape);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEscape);
}

export function closeEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
    closePopup(openedPopup);}
  }
}

export function closeMouseDown(evt) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (openedPopup && evt.target === openedPopup) {
    closePopup(openedPopup);
  }
}

export function editButtonClick() {
  const editPopup = document.querySelector('.popup_type_edit');
  const formElement = editPopup.querySelector('.popup__form');
  const profileTitle = document.querySelector('.profile__title').textContent;
  const profileDescription = document.querySelector('.profile__description').textContent;

  editPopup.querySelector('.popup__input_type_name').value = profileTitle;
  editPopup.querySelector('.popup__input_type_description').value = profileDescription;

  openPopup(editPopup);
  formElement.addEventListener('submit', editFormSubmit);
}

export function editFormSubmit(evt) {
  evt.preventDefault();
  const editPopup = document.querySelector('.popup_type_edit');
  const nameInput = editPopup.querySelector('.popup__input_type_name').value;
  const jobInput = editPopup.querySelector('.popup__input_type_description').value;

  document.querySelector('.profile__title').textContent = nameInput;
  document.querySelector('.profile__description').textContent = jobInput;

  closePopup(editPopup);
}