
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEscape);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEscape);
}

export function closeEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}