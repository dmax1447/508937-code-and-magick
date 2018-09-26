// модуль similar-wizards.js
// модуль генерирует волшебников и рисует их в список похожих волшебников
// использует данные и функции из utils.js
'use strict';

(function () {

  var wizardList = document.querySelector('.setup-similar-list'); // находим список волшебников сохраняем в wizardList
  var setupSimilar = document.querySelector('.setup-similar'); // блок похожих волшебников
  var GET_URL = 'https://js.dump.academy/code-and-magick/data';

  // функция для отрисовки волшебника. Вернет сгенерированный DOM элемент согласно шаблону и  переданным данным в виде JS объекта
  var renderWizard = function (wizardData) {
    // берем шаблон разметки и сохраняем в wizardElement
    var wizardElement = document.querySelector('#similar-wizard-template').content.cloneNode(true);
    var wizardName = wizardElement.querySelector('.setup-similar-label');
    var wizardCoat = wizardElement.querySelector('.wizard-coat');
    var wizardEyes = wizardElement.querySelector('.wizard-eyes');
    wizardName.textContent = wizardData.name; // задаем имя волшебника
    wizardCoat.style.fill = wizardData.colorCoat; // задаем цвет плаща
    wizardEyes.style.fill = wizardData.colorEyes; // задаем цвет глаз
    return wizardElement;
  };

  // коллбек для отрисовки списка похожих волшебников при успешной загрузке
  var renderList = function (wizardsData) {
    var fragment = document.createDocumentFragment(); // создаем пустой фрагмент
    for (var i = 0; i < 4; i++) { // циклом по массиву данных о волшебниках
      var wizard = renderWizard(wizardsData[i]); // создаем элемент по данным
      fragment.appendChild(wizard); // вставляем сгенерированный по данным элемент(волшебника) в пустой фрагмент
    }
    wizardList.appendChild(fragment);
    setupSimilar.classList.remove('hidden'); // показываем блок похожих волшебников
  };

  // запускаем функцию hhtp запрос из модуля backend, ей передаем коллбеки:
  // успех: отрисовать список волшебников по загруженным данным, ошибка: вывести сообщение об ошибке, адрес для получения, метод запроса
  window.backend.makeRequest(renderList, window.utils.showError, GET_URL, 'GET');


})();
