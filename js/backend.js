// модуль backend.js
// здесь работаем с сетью
'use strict';

(function () {

  var GET_URL = 'https://js.dump.academy/code-and-magick/data';
  var POST_URL = 'https://js.dump.academy/code-and-magick';
  var TIMEOUT = 10000;
  var Code = {
    SUCCESS: 200,
    NOT_FROUND_ERROR: 404,
    SERVER_ERROR: 500
  };

  window.backend = {

    // функция загрузки данных
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
      xhr.timeout = TIMEOUT; // 10s
      xhr.open('GET', GET_URL);
      xhr.send();
    },

    // функция отправки данных
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
      xhr.timeout = TIMEOUT; // 10s
      xhr.open('POST', POST_URL);
      xhr.send(data);
    },

    // функция выполнения запроса, принимает параметры:
    // data: данные для отправки
    // onSuccses: коллбек на успешное завершение запроса
    // onError: коллбек на НЕуспешное завершение запроса
    // url: адрес сервиса, строка
    // reqType: тип запроса, GET / POST, строка
    makeRequest: function (onSuccess, onError, url, reqType, data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        /*
        if (xhr.status === Code.SUCCESS) {
          onSuccess(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
        */
        switch (xhr.status) {
          case Code.SUCCESS:
            onSuccess(xhr.response);
            break;
          case Code.NOT_FROUND_ERROR:
            onError('Адрес не найден (404)');
            break;
          case Code.SERVER_ERROR:
            onError('Внутренняя ошибка сервера (500)');
            break;
          default:
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
            break;
        }
      });
      xhr.addEventListener('error', function () {
        onError('Ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Данные не загружены: запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = TIMEOUT;
      xhr.open(reqType, url);
      xhr.send(data);
    }

  };
})();

