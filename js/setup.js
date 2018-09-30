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
  var form = document.querySelector('.setup-wizard-form');
  var btnSubmit = document.querySelector('.setup-submit'); // кнопка
  var wizardList = document.querySelector('.setup-similar-list'); // список похожих волшеюников
  var DEBOUNCE_INTERVAL = 300; // ms
  var lastTimeout;


  // функции открытия и закрытия окна setup
  var openSetupWindow = function () {
    setupWindow.classList.remove('hidden');
  };
  var closeSetupWindow = function () {
    setupWindow.classList.add('hidden');
  };

  // коллбек по изменению цвета элементов персонажа
  var setColor = function (domElement, domElementProperty, colors, inputElement) {
    var color = window.utils.getRandomElement(colors); // берем случайный цвет из полученного диапазона
    domElement.style[domElementProperty] = color; // меняем цвет заданного элемента на сгенерированный
    inputElement.value = color; // обновляем значение соответствующего инпута
    // window.setup.currentWizard.colorEyes = inputEyesColor.value; // сохраняем цвета инпутов
    // window.setup.currentWizard.colorCoat = inputCoatColor.value;
    // window.setup.currentWizard.colorFireball = inputFireball.value;
    // window.setup.wizardsData.forEach(window.simwiz.addSimilarityData); // рассчитываем похожесть по сохранным данным о инпутах
    // window.setup.wizardsData.sort(window.simwiz.sortBySimilarity); // сортируем по перерасчитанному критерию похожести
    // var newWizards = window.simwiz.renderList(window.setup.wizardsData); // рендерим новый список похожих и сохраяем в фрагмент
    // while (wizardList.firstChild) { // удаляем все дочерние дом ноды из списка похожих волшебников
    //   wizardList.removeChild(wizardList.firstChild);
    // }
    // wizardList.appendChild(newWizards); // заполняем список новыми
    updateSimilarWizards();
  };

  var updateSimilarWizards = function () {
    window.setup.currentWizard.colorEyes = inputEyesColor.value; // сохраняем цвета инпутов
    window.setup.currentWizard.colorCoat = inputCoatColor.value;
    window.setup.currentWizard.colorFireball = inputFireball.value;
    window.setup.wizardsData.forEach(window.simwiz.addSimilarityData); // рассчитываем похожесть по сохранным данным о инпутах
    window.setup.wizardsData.sort(window.simwiz.sortBySimilarity); // сортируем по перерасчитанному критерию похожести
    var newWizards = window.simwiz.renderList(window.setup.wizardsData); // рендерим новый список похожих и сохраяем в фрагмент
    while (wizardList.firstChild) { // удаляем все дочерние дом ноды из списка похожих волшебников
      wizardList.removeChild(wizardList.firstChild);
    }
    wizardList.appendChild(newWizards);
  };

  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  // обработчик клика по кнопке сохранить
  var onBtnSubmitClick = function (evt) {
    evt.preventDefault(); // убираем действие по умолчанию
    // пытаемся отправить данные формы, при успехе - коллбек на закрытие окна, при ошибке - вывести ошибку
    window.backend.sendFormData(closeSetupWindow, window.utils.showError, new FormData(form));
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

  // добавляю обработчик нажатия на кнопку сохранить
  btnSubmit.addEventListener('click', onBtnSubmitClick);

  window.setup = {
    currentWizard: {
      name: userNameInput.value,
      colorEyes: inputEyesColor.value,
      colorCoat: inputCoatColor.value,
      colorFireball: inputFireball.value
    },
    wizardData: [],
  };
})();
