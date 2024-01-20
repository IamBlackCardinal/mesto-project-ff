const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: '250f3e4e-4aeb-4f65-90a8-d3a63a67b685',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}

export const profileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}

export const updateProfileData = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log('Ошибка при обновлении профиля: ', err);
  });
}

export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log('Ошибка при добавлении новой карточки: ', err);
  });
}

export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log('Ошибка при обновлении аватара: ', err);
  });
}

export const deleteCard = (cardId, cardElement) => {
  fetch (`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      cardElement.remove();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log('Ошибка при удалении карточки: ', err);
  });
}

export const likeCard = (likeElement, cardId) => {
  const isLiked = likeElement.classList.contains('card__like-button_is-active');

  if (isLiked) {
    fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((cardData) => {
      likeElement.classList.toggle('card__like-button_is-active');
      const likeCountElement = likeElement.closest('.card').querySelector('.card__like-count');
      likeCountElement.textContent = cardData.likes.length;
      isLiked = !isLiked;
    })
    .catch((err) => {
      console.log('Ошибка при лайке: ', err);
    });
  } else {
    fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
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
}