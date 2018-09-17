// модуль similar-wizards.js
// модуль генерирует волшебников и рисует их в список похожих волшебников
// использует данные и функции из utils.js
'use strict';

(function () {

  // функция генерации случайного волшебника. Вернет объект, одного волшебника
  var getRandomWizard = function () {
    var wizard = {};
    wizard.name = window.utils.getRandomElement(window.utils.names) + ' ' + window.utils.getRandomElement(window.utils.surnames);
    wizard.coatColor = window.utils.getRandomElement(window.utils.coatColors);
    wizard.eyesColor = window.utils.getRandomElement(window.utils.eyesColors);
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
})();
