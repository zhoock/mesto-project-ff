// index.js

// Стили
import './index.css';

// Константы
import {
  profileImgEditButton,
  popupTypeImgEdit,
  editAvatarForm,
  inputAvatarUrl,
  profileEditButton,
  popupTypeEdit,
  cardsContainer,
  editProfileForm,
  newPlaceForm,
  profileTitle,
  profileDescription,
  profileAvatar,
  profileAddButton,
  popupTypeNewCard,
  inputTypeUrl,
  inputCardName,
  inputName,
  inputDescription,
  modalImagePopup,
  modalImg,
  modalCaption,
} from './components/constants.js';

// Компоненты
import {
  createCard,
  handleRemoveCard,
  handleLikeClick,
} from './components/card.js';
import {
  openModal,
  closeModal,
  setCloseButtonsEventListeners,
} from './components/modal.js';
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from './components/validation.js';
import {
  updateAvatar,
  getUserInfo,
  updateUserInfo,
  getCards,
  addCard,
} from './components/api.js';

// ======= ФУНКЦИИ-ОБРАБОТЧИКИ =======

// ОБработчик клика по кнопке редактирования аватара
const handleEditAvatarSubmit = (e) => {
  e.preventDefault(); // Отменяем стандартное поведение формы

  const button = e.submitter;
  const originalText = button.textContent;
  button.textContent = 'Сохранение...';
  const avatarUrl = inputAvatarUrl.value;

  // Обновляем аватар
  updateAvatar(avatarUrl)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url("${data.avatar}")`;
      closeModal(popupTypeImgEdit); // Закрываем модалку
    })
    .catch((err) => {
      console.error('Ошибка при загрузке данных:', err);
    })
    .finally(() => {
      button.textContent = originalText; // Возвращаем текст кнопки
    });
};

// Обработчик клика по изображению карточки. Открывает модальное окно с увеличенной картинкой и подписью
const handleImageClick = (e) => {
  const img = e.target;

  modalImg.onload = () => {
    openModal(modalImagePopup); // Открываем, когда картинка загрузится
  };

  modalImg.src = img.src;
  modalImg.alt = img.alt;
  modalCaption.textContent = img.alt;
};

// Обновление профиля
const handleEditProfileSubmit = (e) => {
  e.preventDefault(); // Отменяем стандартное поведение формы

  const button = e.submitter;
  const originalText = button.textContent;
  button.disabled = true; // Делает кнопку неактивной
  button.textContent = 'Сохранение...';

  const name = inputName.value;
  const about = inputDescription.value;

  // Обновляем данные профиля
  updateUserInfo({ name, about })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      profileAvatar.style.backgroundImage = `url("${data.avatar}")`;

      closeModal(popupTypeEdit); // Закрываем модалку
    })
    .catch((err) => {
      console.error('Ошибка при загрузке данных:', err);
    })
    .finally(() => {
      button.disabled = false; // Возвращаем кнопку в активное состояние
      button.textContent = originalText; // Возвращаем текст кнопки
    });
};

// Добавления новой карточки
const handleAddCardSubmit = (e) => {
  e.preventDefault(); // Отменяем стандартное поведение формы

  const name = inputCardName.value;
  const link = inputTypeUrl.value;

  const button = e.submitter;
  const originalText = button.textContent;
  button.disabled = true; // Делает кнопку неактивной
  button.textContent = 'Сохранение...';

  // Добавляем карточку на сервер
  addCard({ name, link })
    .then((cardData) => {
      // Создаем карточку и добавляем ее в контейнер
      const card = createCard(
        cardData.link,
        cardData.name,
        handleRemoveCard,
        handleImageClick,
        handleLikeClick,
        currentUserId, // передаем id текущего пользователя для проверки владельца
        cardData.owner._id, // передаем id владельца карточки для проверки
        cardData._id, // передаем id карточки для удаления
        cardData.likes // передаем массив лайков для отображения количества лайков
      );
      cardsContainer.prepend(card); // Добавляем карточку в начало контейнера
      newPlaceForm.reset(); // Очищаем поля формы
      closeModal(popupTypeNewCard); // Закрываем модалку
      clearValidation(newPlaceForm, validationConfig); // Очистка ошибок валидации после успешной отправки
    })
    .catch((err) => {
      console.error('Ошибка при добавлении карточки:', err);
    })
    .finally(() => {
      button.disabled = false; // Возвращаем кнопку в активное состояние
      button.textContent = originalText; // Возвращаем текст кнопки
    });
};

// ======= ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =======

// Добавление карточек на страницу
const addCards = (initialCards, cardsContainer, currentUserId) => {
  // Перебираем массив карточек и добавляем их в контейнер
  initialCards.forEach((card) =>
    cardsContainer.appendChild(
      createCard(
        card.link,
        card.name,
        handleRemoveCard,
        handleImageClick,
        handleLikeClick,
        currentUserId, // передаем id текущего пользователя для проверки владельца
        card.owner._id, // передаем id владельца карточки для проверки
        card._id, // передаем id карточки для удаления
        card.likes // передаем массив лайков для отображения количества лайков
      )
    )
  );
};

// Переменная для хранения id текущего пользователя
let currentUserId;

// ======= СЛУШАТЕЛИ СОБЫТИЙ =======

// Назначаем обработчики событий на формы
editProfileForm.addEventListener('submit', handleEditProfileSubmit);
newPlaceForm.addEventListener('submit', handleAddCardSubmit);
editAvatarForm.addEventListener('submit', handleEditAvatarSubmit);

// Массив кнопок для открытия модалок с соответствующими модальными окнами и значениями по умолчанию
const modalOpenButtons = [
  {
    button: profileImgEditButton,
    modal: popupTypeImgEdit,
    getValues: () => [], // если не нужно передавать значения
  },
  {
    button: profileEditButton,
    modal: popupTypeEdit,
    getValues: () => [profileTitle.textContent, profileDescription.textContent],
  },
  {
    button: profileAddButton,
    modal: popupTypeNewCard,
    getValues: () => [], // если не нужно передавать значения
  },
];

// Функция для добавления обработчиков кликов и открытие модального окна по кнопкам
modalOpenButtons.forEach(({ button, modal, getValues }) => {
  button.addEventListener('click', () => {
    const [firstValue, secondValue] = getValues();
    const form = modal.querySelector('.popup__form');

    // Если это модалка для обновления аватара
    if (modal.classList.contains('popup_type_img_edit')) {
      form.reset(); // очищаем поле ввода
    }

    // Если это модалка для редактирования профиля
    if (modal.classList.contains('popup_type_edit')) {
      // Заполняем поля ввода данными
      inputName.value = firstValue; // Имя пользователя
      inputDescription.value = secondValue; // Описание пользователя
      clearValidation(form, validationConfig);
    }

    // Если это модалка для добавления карточки
    if (modal.classList.contains('popup_type_new-card')) {
      // Оставляем значения, если они уже есть
      inputCardName.value = inputCardName.value || '';
      inputTypeUrl.value = inputTypeUrl.value || '';
    }

    openModal(modal);
  });
});

// ======= ИНИЦИАЛИЗАЦИЯ =======

setCloseButtonsEventListeners(); // Назначает обработчики на все кнопки закрытия модалок (крестики) один раз при запуске
enableValidation(validationConfig); // Валидация форм

// Запрос на сервер для получения данных профиля и карточек
Promise.all([
  getUserInfo(), // Запрос на сервер для получения данных профиля
  getCards(), // Запрос на сервер для получения карточек
])
  .then(([userData, cardsData]) => {
    currentUserId = userData._id; // Сохраняем id пользователя

    // Обновляем профиль
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url("${userData.avatar}")`;

    // Добавляем карточки на страницу
    addCards(cardsData, cardsContainer, currentUserId);
  })
  .catch((err) => {
    console.error('Ошибка при загрузке данных:', err);
  });
