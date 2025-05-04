// components/validation.js

// Экспортируем объект с настройками
export const validationConfig = {
  formSelector: '.popup__form', // Селектор формы
  inputSelector: '.popup__input', // Селектор инпутов
  submitButtonSelector: '.popup__button', // Селектор кнопки
  inactiveButtonClass: 'popup__button_disabled', // Класс для неактивной кнопки
  inputErrorClass: 'popup__input_type_error', // Класс для ошибки инпута
  errorClass: 'popup__error_visible', // Класс для отображения ошибки
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, config) => {
  // Выбираем элемент ошибки на основе уникального класса
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass); // Добавляем ошибку к полю ввода
  errorElement.textContent = errorMessage; // Отображаем сообщение об ошибке
  errorElement.classList.add(config.errorClass); // Показываем элемент ошибки
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, config) => {
  // Выбираем элемент ошибки на основе уникального класса
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(config.errorClass);
  // Очистим ошибку
  errorElement.textContent = '';
};

// Проверка валидности инпута
const checkInputValidity = (formElement, inputElement, config) => {
  // 1. Сначала задать кастомную ошибку
  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity('');
  }

  // 2. Затем проверить valid и вывести сообщение
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// Проверка наличия невалидных инпутов
const hasInvalidInput = (inputList) => {
  // Проверяем, есть ли хотя бы один инпут с ошибкой
  // Если есть, то возвращаем true, иначе false
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

// Изменение состояния кнопки
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

// Установка обработчиков событий для инпутов
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

// Включение валидации на всех формах
export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

// Очистка ошибок валидации и деактивация кнопки
export const clearValidation = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config); // Используем hideInputError для очистки ошибок
  });

  // Проверяем состояние кнопки на основе валидности полей
  toggleButtonState(inputList, buttonElement, config);
};
