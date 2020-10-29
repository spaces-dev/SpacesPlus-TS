SpacesPlus — Powerfull userscript for Spaces.ru
===============================================

![Version](https://img.shields.io/github/package-json/v/spaces-dev/SpacesPlus?color=blue)
![Travis](https://img.shields.io/travis/spaces-dev/SpacesPlus)
![GitHub](https://img.shields.io/github/license/spaces-dev/SpacesPlus?label=license&color=brightgreen)

- Возможности:
    - Пакетное удаление комментариев
    - Пакетное удаление блогов
    - Пакетное удаление читателей
    - Возможность добавлять пользователей в закладки
    - Кнопка поворота фото в просмотрщике
    - Кнопка ускорения видео
    - ~~Открытые разделы удаленных пользователей~~
    - Прокрутка страницы справа
    - Скрытие правого меню
    - Кнопка загрузки трека из плеера
    - Переход через внешние ссылки без редиректа
    - Автоматический сбор бонусных монет
    - Автоматическое подтверждение кармы
    - ~~Темная тема~~
    - Точное время онлайн в анкетах
    - Блокировщик рекламы
    - Возможность изменять звук уведомлений
    - Панель друзей онлайн
    - Бесплатные стикеры
    - Возвращает кнопку почту и ленты на свои прежние места
    - Возможность изменять фон сайта
    - ~~Виджет почты~~
    - Виджет погоды
- Встроенные возможности сайта:
    - API Отладчик
    - Вход в Beta-песочницу
    - Включение полосы загрузки страницы как на телефоне
    - Закрепить аудиоплеер в левом меню
    - Скрытие квеста новичка
- Дополнительно:
    - ~~Редактор cookies~~

Разработка:
-----------
1. Установите зависимости `npm install`
2. Запустить сервер для разработки `npm run dev`
3. Откройте `https://localhost:8080/spaces-plus.proxy.user.js` в браузере (нажмите `Advanced` -> `continue`, если отображается предупреждение безопасности), чтобы установить прокси-скрипт
4. Код для разработки находится в папке `src`, для применения изменений обновляйте страницу браузера
5. Для сборки используйте `npm run build` (для публикации сборки необходимо будет создать [GitHub Pages](https://pages.github.com))

Конфигурация Google Chrome (рекомендуется):
-----------------------------------
1. В файле `webpack.config.ts` измените переменную `isChrome` на `true`
2. Включите insecure-localhost: перейдите к `chrome://flags/#allow-insecure-localhost` и включите insecure-localhost.
3. Включите доступ к URL-адресу файла для расширения: перейдите к `chrome://extensions/?id=dhdgffkkebhmkfjojejmpbldmpobfkfo` (Страница управления [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)) и включите `Allow access to file URLs` (если вам нужно вручную перезагрузить страницу браузера при разработке скрипта, см. [#475](https://github.com/Tampermonkey/tampermonkey/issues/475#issuecomment-348594785) для более подробной информации)

Конфигурация Mozilla Firefox:
--------------------------------------
1. В файле `webpack.config.ts` переменная `isChrome` должна быть `false`
2. Для установки расширения используйте [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
3. Для обновления внесенных изменений требуется несколько раз обновлять страницу браузера (не самый продуктивный браузер для разработки)
