// components/api.js

import { AUTH_TOKEN, COHORT } from './constants.js';

// URL API
const config = {
  baseUrl: `https://nomoreparties.co/v1/${COHORT}`,
  headers: {
    authorization: AUTH_TOKEN,
    'Content-Type': 'application/json',
  },
};

// Общая функция обработки ответа
const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

// Обновить аватар
export const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  }).then(handleResponse);
};

// Получить данные профиля
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
};

// Обновить профиль
export const updateUserInfo = ({ name, about }) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then(handleResponse);
};

// Получить карточки
export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

// Добавить карточку
export const addCard = ({ name, link }) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  }).then(handleResponse);
};
