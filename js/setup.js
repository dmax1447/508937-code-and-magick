'use strict';

// массивы для генерации волшебников
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;


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

var getRandomElement = function (array) {
  var index = Math.floor(array.length * Math.random());
  return array[index];
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

// циклом генерим волшебников и добавляем их в wizardList
for (i = 0; i < wizards.length; i++) {
  var wizard = renderWizard(wizards[i]);
  wizardList.appendChild(wizard);
}

// включаем видимость блока похожих волшебников 'setup-similar' после добавления в него волшебников
document.querySelector('.setup-similar').classList.remove('hidden');

// найдем и сохраним окно и элементы его управления
var setupWindow = document.querySelector('.setup');
var setupOpenIcon = document.querySelector('.setup-open');
var setupCloseIcon = setupWindow.querySelector('.setup-close');
var userNameInput = document.querySelector('.setup-user-name');
var setupWizard = document.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireball = document.querySelector('.setup-fireball-wrap');
var inputCoatColor = document.querySelector('input[name="coat-color"]');
var inputEyesColor = document.querySelector('input[name="eyes-color"]');
var inputFireball = document.querySelector('input[name="fireball-color"]');
var randomColor;

// функции открытия и закрытия окна setup
var openSetupWindow = function () {
  setupWindow.classList.remove('hidden');
};

var closeSetupWindow = function () {
  setupWindow.classList.add('hidden');
};

// Окно.setup должно открываться по нажатию на блок.setup-open. Открытие окна производится удалением класса hidden у блока
setupOpenIcon.addEventListener('click', function () {
  openSetupWindow();
});

// Окно.setup должно закрываться по нажатию на элемент.setup-close, расположенный внутри окна
setupCloseIcon.addEventListener('click', function () {
  closeSetupWindow();
});

// Когда иконка пользователя в фокусе .setup-open-icon, то окно настройки персонажа должно открываться по нажатию кнопки ENTER
setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetupWindow();
  }
});

// Когда окно настройки персонажа открыто, нажатие на клавишу ESC должно закрывать диалог
// Если фокус находится на форме ввода имени, то окно закрываться не должно.
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !(document.activeElement === userNameInput)) {
    closeSetupWindow();
  }
});

// Если окно открыто и фокус находится на кнопке закрытия окна, то нажатие клавиши ENTER должно приводить к закрытию диалога
setupCloseIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetupWindow();
  }
});

// Изменение цвета мантии персонажа по нажатию. Цвет мантии .setup-wizard .wizard-coat должен обновляться по нажатию на неё.
wizardCoat.addEventListener('click', function () {
  randomColor = getRandomElement(coatColors);
  wizardCoat.style.fill = randomColor;
  inputCoatColor.value = randomColor;

});

// Изменение цвета глаз персонажа по нажатию. Цвет глаз волшебника меняется по нажатию на блок .setup-wizard .wizard-eyes.
wizardEyes.addEventListener('click', function () {
  randomColor = getRandomElement(eyesColors);
  wizardEyes.style.fill = randomColor;
  inputEyesColor.value = randomColor;
});

// Изменение цвета фаерболов по нажатию. Цвет задаётся через изменение фона у блока .setup-fireball-wrap
setupFireball.addEventListener('click', function () {
  randomColor = getRandomElement(fireballColors);
  setupFireball.style.background = randomColor;
  inputFireball.value = randomColor;
});


// обработка ошибок при вводе имени
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
