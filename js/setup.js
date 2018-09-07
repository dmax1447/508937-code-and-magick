'use strict';

// массивы для генерации волшебников
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

// функция генерации случайного волшебника
var getRandomWizard = function () {
  var wizard = {};
  var nameRandomIndex = Math.floor(names.length * Math.random());
  var surnameRandomIndex = Math.floor(surnames.length * Math.random());
  wizard.name = names[nameRandomIndex] + ' ' + surnames[surnameRandomIndex];
  wizard.coatColor = coatColors[Math.floor(coatColors.length * Math.random())];
  wizard.eyesColor = eyesColors[Math.floor(eyesColors.length * Math.random())];
  return wizard;
};

// создадим массив объектов волшебников
var wizards = [];
for (var i = 0; i < 4; i++) {
  wizards[i] = getRandomWizard();
}

// включаем блок настройки персонажа 'setup'
document.querySelector('.setup').classList.remove('hidden');

// сохраним шаблон разметки в переменную wizardTemplate
var wizardTemplate = document.querySelector('#similar-wizard-template').content;
// список волшебников сохраним в wizardList
var wizardList = document.querySelector('.setup-similar-list');

for (i = 0; i < wizards.length; i++) {
  // клонируем шаблон
  var wizard = wizardTemplate.cloneNode(true);
  // задаем имя волшебника
  var wizardName = wizard.querySelector('.setup-similar-label');
  wizardName.textContent = wizards[i].name;
  // изменим цвет плаща
  var wizardCoat = wizard.querySelector('.wizard-coat');
  wizardCoat.style.fill = wizards[i].coatColor;
  // изменим цвет глаз
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  wizardEyes.style.fill = wizards[i].eyesColor;
  wizardList.appendChild(wizard);
}

// включаем видимость блока похожих персонажей 'setup-similar'
document.querySelector('.setup-similar').classList.remove('hidden');
