
'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var HISTOGRAM_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;

// функция отрисовки облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {
  // рисуем тень облака
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.3)');
  // рисуем облако
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  // рисуем сообщение сверху в облаке
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + 20, CLOUD_Y + 30);
  ctx.fillText('Список результатов:', CLOUD_X + 20, CLOUD_Y + 46);
  // Ищем максимальное значение колонки для гистограммы
  var maxTime = 0;
  var currentTime;
  for (var i = 0; i < times.length; i++) {
    currentTime = Math.round(times[i]);
    if (maxTime < currentTime) {
      maxTime = currentTime;
    }
  }
  // Рисуем для каждого игрока колонку и пишем его имя
  var columnHeight;
  var columnX;
  var columnY;
  for (i = 0; i < names.length; i++) {
    // рассчитываем координаты столбца и его высоту
    columnX = CLOUD_X + 20 + (COLUMN_GAP + COLUMN_WIDTH) * i;
    columnY = CLOUD_Y + CLOUD_HEIGHT - 40;
    columnHeight = (Math.round(times[i]) * HISTOGRAM_HEIGHT) / maxTime;
    // задаем цвет столбца диаграммы в зависимости от игрока
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';

    } else {
      var saturation = Math.round(Math.random() * 100);
      var colorCode = 'hsl(240, ' + saturation + '%, 50%)';
      ctx.fillStyle = colorCode;
    }
    // рисуем столбец диаграммы
    ctx.fillRect(columnX, columnY, COLUMN_WIDTH, -columnHeight);
    // рисуем имя игрока под стобцом диаграммы
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], columnX, columnY + 20);
    // рисуем счет игрока над столбцом диаграммы
    ctx.fillText(Math.round(times[i]), columnX, columnY - columnHeight - 10);
  }
};


