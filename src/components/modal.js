// components/modals.js

// Открытие модалки
export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
  document.addEventListener('mousedown', handleOverlayClose);
};

// Закрытие модалки
export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
  document.removeEventListener('mousedown', handleOverlayClose);
};

// Закрытие модалки по кнопке
export const setCloseButtonsEventListeners = () => {
  document
    .querySelectorAll('.popup__close')
    .forEach((btn) =>
      btn.addEventListener('click', (e) =>
        closeModal(e.target.closest('.popup'))
      )
    );
};

// Глобальный обработчик Escape
const handleEscClose = (e) => {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (e.key === 'Escape') e.key === 'Escape' && closeModal(openedPopup);
};

// Глобальный обработчик клика по оверлею
const handleOverlayClose = (e) => {
  e.target.classList.contains('popup') && closeModal(e.target);
};
