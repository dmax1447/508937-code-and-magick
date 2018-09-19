'use strict';
// модуль setup.js
// здесь работаем с окном настройки персонажа
// использует utils.js
(function () {
  // находим и включаем видимость блока настройки персонажа
  // найдем и сохраним окно и элементы его управления
  var setupWindow = document.querySelector('.setup');
  var setupOpenIcon = document.querySelector('.setup-open');
  var setupCloseIcon = setupWindow.querySelector('.setup-close');
  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var inputCoatColor = document.querySelector('input[name="coat-color"]');
  var setupFireball = document.querySelector('.setup-fireball-wrap');
  var inputFireball = document.querySelector('input[name="fireball-color"]');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var inputEyesColor = document.querySelector('input[name="eyes-color"]');
  var userNameInput = document.querySelector('.setup-user-name');

  // функции открытия и закрытия окна setup
  var openSetupWindow = function () {
    setupWindow.classList.remove('hidden');
  };
  var closeSetupWindow = function () {
    setupWindow.classList.add('hidden');
  };

  // функция для изменения цвета элемента волшебника и соответствующего инпута
  var setColor = function (domElement, domElementProperty, colors, inputElement) {
    var color = window.utils.getRandomElement(colors);
    domElement.style[domElementProperty] = color;
    inputElement.value = color;
  };

  // добавляем обработчик: открытие окна по клику на иконку пользователя
  setupOpenIcon.addEventListener('click', function () {
    openSetupWindow();
  });

  // добавляем обработчик: закрытие окна по клику на иконку крестик
  setupCloseIcon.addEventListener('click', function () {
    closeSetupWindow();
  });

  // добавляем обработчик: открытие окна по нажатию ENTER
  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      openSetupWindow();
    }
  });

  // добавляем обработчик: закрытие окна ESC при условии что поле ввода имени не в фокусе
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE && document.activeElement !== userNameInput) {
      closeSetupWindow();
    }
  });

  // добавляем обработчик: закрытие окна по ENTER когда в фокусе иконка крестик
  setupCloseIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      closeSetupWindow();
    }
  });

  // добавляем обработчик: по клику на плащ меняем цвет плаща и значение цвета в инпуте
  wizardCoat.addEventListener('click', function () {
    setColor(wizardCoat, 'fill', window.utils.coatColors, inputCoatColor);
  });

  // добавляем обработчик: по клику на глаза меняем цвет глаз и значение цвета в инпуте
  wizardEyes.addEventListener('click', function () {
    setColor(wizardEyes, 'fill', window.utils.eyesColors, inputEyesColor);
  });

  // добавляем обработчик: по клику на глаза меняем цвет глаз и значение цвета в инпуте
  setupFireball.addEventListener('click', function () {
    setColor(setupFireball, 'background', window.utils.fireballColors, inputFireball);
  });

  // обработка ошибок при вводе имени, добавим сообщения на русском
  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });
})();

