Интеграция с amoCRM на фронтенде
Этот проект представляет собой интеграцию с платформой amoCRM через ее API для отображения сделок на веб-странице и предоставления функциональности, такой как пагинация и сортировка. Ниже приведены подробности проекта, его функциональности и необходимые зависимости.

Описание проекта

Получать доступ к учетной записи amoCRM через API.
Отображать сделки из учетной записи в виде таблицы на веб-странице.
Реализовать пагинацию для удобного просмотра сделок.
Возможность сортировки сделок по бюджету и названию.
Необходимые зависимости
Для запуска проекта необходимы следующие зависимости:

HTML, CSS, JavaScript: для создания интерфейса и взаимодействия с пользователем.
jQuery: при необходимости, для удобной работы с DOM элементами.
Прокси-сервер: для обхода проблем CORS при обращении к API amoCRM.
Установка и запуск проекта
Клонируйте репозиторий на свой компьютер:git clone git@github.com:Art3m1z/FrontenDeveloper25.05.git
Откройте файл index.html в вашем браузере.

Перейдите к разделу "Настройка интеграции" и следуйте инструкциям для получения access_token через созданную внешнюю интеграцию amoCRM.

После получения access_token, сделки будут автоматически загружены и отображены на странице.

Пагинация и сортировка
Для удобства пользователя скрипт предоставляет возможность пагинации сделок на странице. Пользователь может выбрать количество сделок на странице: 2, 5, 10 или вывести все сделки сразу. При этом, для эффективного использования ресурсов и обеспечения плавной работы, установлены следующие ограничения:

Максимум 5 сделок получаются за один запрос при выгрузке всех сделок к API amoCRM.
Не более 2 запросов в секунду отправляется к API.
Для удобства пользователя также реализована сортировка сделок по бюджету и названию.

Инструкция по использованию пагинации и сортировки
Выберите количество сделок на странице с помощью соответствующего выпадающего списка.
Для вывода всех сделок нажмите на кнопку "Overall".
Для сортировки сделок по бюджету или названию, нажмите на заголовок соответствующего столбца таблицы. Первое нажатие сортирует по возрастанию, второе — по убыванию.

Для запуска сервера и фронтенд-части проекта, вам нужно выполнить следующие шаги:

Поднятие прокси-сервера

Установите Node.js.
Откройте терминал, перейдите в директорию проекта выполните следующую команду:
npm install express cors node-fetch

После установки зависимостей запустите сервер командой:
node server.js
Ваш прокси-сервер будет доступен по адресу http://localhost:3000.

Запуск фронтенд-части
Откройте файл mainPage.html в вашем браузере.

Важно
В рамках выполнения тестового задания безопасностью можно пренебречь, поэтому сохранение refresh и access токенов напрямую в скрипте допустимо только для целей демонстрации.
При разработке используйте локальный сервер для тестирования, чтобы избежать проблем с CORS.
Убедитесь, что ваша интеграция с amoCRM настроена правильно и имеет соответствующие разрешения для доступа к данным.
![Снимок экрана 2024-02-26 в 11 01 49](https://github.com/Art3m1z/FrontenDeveloper25.05/assets/92216309/49e97ec9-a274-4930-9d85-2226c6da6333)
![Снимок экрана 2024-02-26 в 11 02 41](https://github.com/Art3m1z/FrontenDeveloper25.05/assets/92216309/e7d3bcbf-85af-4e13-b8f3-18629b4b58cf)
