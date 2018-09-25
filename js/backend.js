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
          console.log('загрузка списка волшебников с сервера: УСПЕШНО');
          onSuccess(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
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
      xhr.addEventListener = ('load', function () {
        // console.log('загрузка формы НА сервер: УСПЕШНО');
        onSuccess();
      });
      xhr.addEventListener('error', function () {
        console.log('ошибка соединения - зовем onError');
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        console.log('ошибка: таймаут - зовем onError');
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = 10000; // 10s
      xhr.open('POST', postURL);
      xhr.send(data);
    }
  };
})();

