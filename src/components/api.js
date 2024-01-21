const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: '250f3e4e-4aeb-4f65-90a8-d3a63a67b685',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(handleResponse);
}

export const profileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(handleResponse);
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
  .then(handleResponse);
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
  .then(handleResponse);
}

export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then(handleResponse);
}

export const deleteCardApi = (cardId) => {
  return fetch (`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse);
}

export const likeCardApi = (cardId, isLiked) => {
  const likeMethod = isLiked ? 'DELETE' : 'PUT';
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, { 
      method: likeMethod, 
      headers: config.headers 
    })
  .then(handleResponse);
}