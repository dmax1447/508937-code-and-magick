// модуль utils.js
// здесь храним данные для генерации и вспомогательную функцию выборки случайного элемента
'use strict';

(function () {
  window.utils = {
    names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    eyesColors: ['black', 'red', 'blue', 'yellow', 'green'],
    fireballColors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    getRandomElement: function (array) {
      var index = Math.floor(array.length * Math.random());
      return array[index];
    },
    showError: function (errMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100, margin: 0 auto, text-align: center; background-color: red;';
      node.style.position = 'fixed';
      node.style.left = 0;
      node.style.right = 0;
      node.style.zIndex = '10';
      node.style.top = '20px';
      node.style.height = '60px';
      node.style.fontSize = '24px';
      node.style.margin = 'auto';
      node.style.textAlign = 'center';
      node.style.padding = '10px';
      node.style.width = '50%';
      node.textContent = errMessage;
      document.querySelector('header').appendChild(node);
    }
  };
})();
