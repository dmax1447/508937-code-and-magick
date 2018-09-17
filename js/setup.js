'use strict';


// -- utils.js НАЧАЛО: служебные данные и функции
// массивы для генерации волшебников
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// функция для выбора рандомного элемента в массиве
var getRandomElement = function (array) {
  var index = Math.floor(array.length * Math.random());
  return array[index];
};

// функция генерации случайного волшебника. Вернет объект, одного волшебника
var getRandomWizard = function () {
  var wizard = {};
  var nameRandomIndex = Math.floor(names.length * Math.random());
  var surnameRandomIndex = Math.floor(surnames.length * Math.random());
  wizard.name = names[nameRandomIndex] + ' ' + surnames[surnameRandomIndex];
  wizard.coatColor = coatColors[Math.floor(coatColors.length * Math.random())];
  wizard.eyesColor = eyesColors[Math.floor(eyesColors.length * Math.random())];
  return wizard;
};

// функция для отрисовки волшебника. Вернет сгенерированный DOM элемент согласно шаблону и  переданным данным в виде JS объекта
var renderWizard = function (wizardData) {
  // берем шаблон разметки и сохраняем в wizardElement
  var wizardElement = document.querySelector('#similar-wizard-template').content.cloneNode(true);
  // задаем имя волшебника
  var wizardName = wizardElement.querySelector('.setup-similar-label');
  wizardName.textContent = wizardData.name;
  // задаем цвет плаща
  var wizardCoat = wizardElement.querySelector('.wizard-coat');
  wizardCoat.style.fill = wizardData.coatColor;
  // задаем цвет глаз
  var wizardEyes = wizardElement.querySelector('.wizard-eyes');
  wizardEyes.style.fill = wizardData.eyesColor;
  return wizardElement;
};

// создаем массив объектов волшебников
var wizards = [];
for (var i = 0; i < 4; i++) {
  wizards[i] = getRandomWizard();
}

// находим и включаем видимость блока настройки волшебника
document.querySelector('.setup').classList.remove('hidden');

// находим список волшебников сохраняем в wizardList
var wizardList = document.querySelector('.setup-similar-list');

// циклом генерим волшебников и добавляем их в фрагмент
// фрагмент после заполнения добавим в wizardlist
var fragment = document.createDocumentFragment();
for (i = 0; i < wizards.length; i++) {
  var wizard = renderWizard(wizards[i]);
  fragment.appendChild(wizard);
}
wizardList.appendChild(fragment);

// включаем видимость блока похожих волшебников 'setup-similar' после добавления в него волшебников
document.querySelector('.setup-similar').classList.remove('hidden');


// --- модуль: работа с окном setup
// найдем и сохраним окно и элементы его управления
var setupWindow = document.querySelector('.setup');
var setupOpenIcon = document.querySelector('.setup-open');
var setupCloseIcon = setupWindow.querySelector('.setup-close');
var setupWizard = document.querySelector('.setup-wizard');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// функции открытия и закрытия окна setup
var openSetupWindow = function () {
  setupWindow.classList.remove('hidden');
};
var closeSetupWindow = function () {
  setupWindow.classList.add('hidden');
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
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetupWindow();
  }
});

// добавляем обработчик: закрытие окна ESC при условии что поле ввода имени не в фокусе
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !(document.activeElement === userNameInput)) {
    closeSetupWindow();
  }
});

// добавляем обработчик: закрытие окна по ENTER когда в фокусе иконка крестик
setupCloseIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetupWindow();
  }
});

// функция для изменения цвета элемента волшебника и соответствующего инпута
var setColor = function (domElement, domElementProperty, colors, inputElement) {
  var color = getRandomElement(colors);
  domElement.style[domElementProperty] = color;
  inputElement.value = color;
};
// добавляем обработчик: по клику на плащ меняем цвет плаща и значение цвета в инпуте
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var inputCoatColor = document.querySelector('input[name="coat-color"]');
wizardCoat.addEventListener('click', function () {
  setColor(wizardCoat, 'fill', coatColors, inputCoatColor);
});
// добавляем обработчик: по клику на глаза меняем цвет глаз и значение цвета в инпуте
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var inputEyesColor = document.querySelector('input[name="eyes-color"]');
wizardEyes.addEventListener('click', function () {
  setColor(wizardEyes, 'fill', eyesColors, inputEyesColor);
});
// добавляем обработчик: по клику на глаза меняем цвет глаз и значение цвета в инпуте
var setupFireball = document.querySelector('.setup-fireball-wrap');
var inputFireball = document.querySelector('input[name="fireball-color"]');
setupFireball.addEventListener('click', function () {
  setColor(setupFireball, 'background', fireballColors, inputFireball);
});


// обработка ошибок при вводе имени, добавим сообщения на русском
var userNameInput = document.querySelector('.setup-user-name');
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
