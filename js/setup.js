'use strict';

// массивы для генерации волшебников
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

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

// циклом генерим волшебников и добавляем их в wizardList
for (i = 0; i < wizards.length; i++) {
  var wizard = renderWizard(wizards[i]);
  wizardList.appendChild(wizard);
}

// включаем видимость блока похожих волшебников 'setup-similar' после добавления в него волшебников
document.querySelector('.setup-similar').classList.remove('hidden');

