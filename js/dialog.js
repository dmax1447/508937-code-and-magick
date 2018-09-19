// модуль dialog.js
// реализация перетаскивания окна setup
/*
*    Диалог должен начинать двигаться за курсором мыши при нажатии (mousedown) на блок .setup-user-pic;
*    Диалог должен переставать двигаться за курсором мыши при отпускании (mouseup) кнопки мыши и оставаться на новом месте;
*    При повторном открытии/закрытии диалога, положение диалога должно сбрасываться на изначальное;
*/

'use strict';
(function () {

  var SETUP_START_TOP = '80px';
  var SETUP_START_LEFT = '50%';
  var setup = document.querySelector('.setup');
  var setupUserPic = setup.querySelector('input[name="avatar"]');
  var setupCloseIcon = setup.querySelector('.setup-close');

  // обработчик нажатия кнопки мышки
  var onMouseDown = function (evt) {
    // опишем обработчик перемещения мышки
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };
    // опишем обработчик отпускания мышки
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        // если движение мыши было отключаем открытие диалога выбора файлов
        var onClickPreventDefault = function (event) {
          event.preventDefault();
          setupUserPic.removeEventListener('click', onClickPreventDefault);
        };
        setupUserPic.addEventListener('click', onClickPreventDefault);
      }

    };
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // по нажатию кнопки мыши на юзерпике диалога запускаем обработчик onMouseDown
  setupUserPic.addEventListener('mousedown', onMouseDown);

  // при клике мышкой по иконке закрытия вернем начальные координаты окна setup
  setupCloseIcon.addEventListener('click', function () {
    setup.style.top = SETUP_START_TOP;
    setup.style.left = SETUP_START_LEFT;
  });

})();
