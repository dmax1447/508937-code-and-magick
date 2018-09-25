// модуль backend.js
// здесь работаем с сетью
'use strict';

(function () {

  var getURL = 'https://js.dump.academy/code-and-magick/data';
  var postURL = 'https://js.dump.academy/code-and-magick';

  window.backend = {
    // функция загрузки данных, принимает параметры:
    // onSucc
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Список волшебников не загрузился: ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Список волшебников не загрузился: запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = 10000; // 10s
      xhr.open('GET', getURL);
      xhr.send();
    },
    // функция сохрания данных формы, принимает параметры:
    // data - данные формы для отправки
    // onload (xhr.response) - коллбек который выполнится когда произойдет событие загрузки
    save: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        onSuccess(xhr.response);
      });
      xhr.addEventListener('error', function () {
        onError('Форма не загружена на сервер: ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Форма не загружена на сервер: запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = 10000; // 10s
      xhr.open('POST', postURL);
      xhr.send(data);
    }
  };
})();

