// modals.js

// Открытие модалки
export const openModal = (modal) => {
  setModalWindowEventListeners(modal);
  modal.classList.add('popup_is-opened');
};

// Закрытие модалки
export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');

  // Убираем обработчики
  document.removeEventListener('keydown', modal._handleEscClose);
  modal.removeEventListener('mousedown', modal._handleOverlayClose);
};

export const setModalWindowEventListeners = (modal) => {
  // Закрытие модалки по кнопке
  document
    .querySelectorAll('.popup__close')
    .forEach((btn) =>
      btn.addEventListener('click', (e) =>
        closeModal(e.target.closest('.popup'))
      )
    );

  // Callback закрытие модалки по Esc
  const handleEscClose = (e) => {
    e.key === 'Escape' && closeModal(modal);
  };

  // Callback закрытие модалки по клику на оверлей
  const handleOverlayClose = (e) => {
    e.target === modal && closeModal(modal);
  };

  // Навешиваем обработчики
  document.addEventListener('keydown', handleEscClose);
  modal.addEventListener('mousedown', handleOverlayClose);

  // Сохраняем обработчики в объект модалки
  modal._handleEscClose = handleEscClose;
  modal._handleOverlayClose = handleOverlayClose;
};
