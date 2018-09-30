// модуль similar-wizards.js
// модуль генерирует волшебников и рисует их в список похожих волшебников
// использует данные и функции из utils.js
'use strict';

(function () {

  var wizardList = document.querySelector('.setup-similar-list'); // находим список волшебников сохраняем в wizardList
  var setupSimilar = document.querySelector('.setup-similar'); // блок похожих волшебников

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

  // функция расчета критерия похожести
  var addSimilarityData = function (wizardData) {
    var currentWizard = window.setup.currentWizard;
    wizardData.similarity = 0;
    if (currentWizard.colorEyes === wizardData.colorEyes) {
      wizardData.similarity++;
    }
    if (currentWizard.colorCoat === wizardData.colorCoat) {
      wizardData.similarity += 2;
    }
  };

  // функция сортировки в обратном порядке по полю "похожесть"
  var sortBySimilarity = function (first, second) {
    if (first.similarity < second.similarity) {
      return 1;
    } else if (first.similarity > second.similarity) {
      return -1;
    } else {
      return 0;
    }
  };

  // коллбек для вызова по загрузке, принимает загруженные данные
  var onListLoad = function (data) {
    window.setup.wizardsData = data.slice(0); // создаем копию загруженного массива данных волшебников
    data.forEach(addSimilarityData); // обрабатываем данные: рассчитываем для каждого волшебника похожесть
    data.sort(sortBySimilarity); // сортируем данные по критерию похожести
    var wizardsNodeList = renderList(data); // рендерим в фрагмент волшебников по обработнным данным
    wizardList.appendChild(wizardsNodeList); // вставляем в список похожих волшебников готовый фрагмент
    setupSimilar.classList.remove('hidden'); // показываем список похожих волшебников в блоке
  };

  // функция возвращает htmlFragment с отрисованными волшебниками, на входе массив данных о волшебниках
  var renderList = function (data) {
    var fragment = document.createDocumentFragment(); // создаем пустой фрагмент
    for (var i = 0; i < 4; i++) { // циклом по массиву данных о волшебниках
      var wizard = renderWizard(data[i]); // создаем элемент по данным
      fragment.appendChild(wizard); // вставляем сгенерированный по данным элемент(волшебника) в пустой фрагмент
    }
    return fragment;
  };

  // экспортируем функции
  window.simwiz = {
    renderList: renderList,
    sortBySimilarity: sortBySimilarity,
    addSimilarityData: addSimilarityData
  };

  // пытаемся загрузить волшебников, если удачно - то рендерим в список, если нет то выводим сообщение об ошибке
  window.backend.loadSimilarWizards(onListLoad, window.utils.showError);
})();
