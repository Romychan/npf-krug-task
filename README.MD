<div align="center">
 <h2>Тестовое задание НПФ «КРУГ»</h2>
 <p>
  <a href="#описание">Описание</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#технологии">Технологии</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#начало-работы">Начало работы</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#описание-команд">Описание команд</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#скриншоты">Скриншоты</a>
 </p>
</div>

## Описание

![Главная страница](https://github.com/Romychan/npf-krug-task/assets/60140867/9c155712-6cde-48fd-bd8b-8bfd8db16b4e)

Решение тестового задания по разработке приложения для управления пользователями. Приложение состоит из одной главной страницы, где отображаются данные о пользователях в виде таблицы. Все основные и дополнительные требования тестового задания были выполнены.

- [Ссылка на приложение](https://romychan-npf-krug-task.netlify.app/)
- [Ссылка на Storybook приложения](https://romychan-npf-krug-task-storybook.netlify.app/)

## Функционал

### Основной

- Отображение списка пользователей в таблице
- Удаление пользователя из списка
- Добавление пользователя в список
- Загрузка дополнительных пользователей
- Использование [Webpack](https://webpack.js.org/) для настройки проекта
- Модульное тестирование с использованием [Vitest](https://vitest.dev/) и [React Testing Library](https://testing-library.com/)

### Дополнительный

- Адаптация приложения под различные экраны устройств
- [Redux-Saga](https://redux-saga.js.org/) для асинхронных операций
- [Storybook](https://storybook.js.org/) с компонентами приложения
- End-to-End тестирование проекта с использованием [Cypress](https://www.cypress.io/)
- Имитация ответов с сервера с использованием [Mock Service Worker (MSW)](https://mswjs.io/), [@mswjs/data](https://www.npmjs.com/package/@mswjs/data) и [Faker.js](https://fakerjs.dev/)
- [Husky](https://typicode.github.io/husky/) для Pre-Commit хуков

## Технологии

### Frontend

- [Webpack](https://webpack.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Redux](https://redux.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)

### Тестирование

- [React Testing Library](https://testing-library.com/)
- [Vitest](https://vitest.dev/)
- [Cypress](https://www.cypress.io/)
- [Storybook](https://storybook.js.org/)
- [Mock Service Worker](https://mswjs.io/)

### Качество кода

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Stylelint](https://stylelint.io/)
- [Husky](https://typicode.github.io/husky/)
- [Lint-Staged](https://www.npmjs.com/package/lint-staged/)

## Начало работы

### Требования

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Установка

1. Клонировать репозиторий и перейти в папку проекта

   ```sh
   # Клонировать этот репозиторий
   git clone https://github.com/Romychan/npf-krug-task.git
   # Перейти в папку проекта
   cd npf-krug-task
   ```

2. Установить зависимости проекта

   ```sh
   npm install
   ```

3. Создать файл `.env` и добавить в него следующие переменные:

   ```sh
   # Адрес сервера для API-запросов
   BASE_API_URL=<YOUR_API_URL>
   ```

4. Запустить проект в режиме разработки

   ```sh
   npm run dev
   ```

   Приложение будет доступно по адресу <http://localhost:3000>

## Описание команд

| Команда&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Описание                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `npm run dev`                                                                                                                                                                                                       | Запускает приложение в режиме разработки. Приложение будет доступно по адресу <http://localhost:3000> |
| `npm run build`                                                                                                                                                                                                     | Запускает сборку проекта в prod режиме. Собранный проект будет находиться в папке `dist`              |
| `npm run test:unit`                                                                                                                                                                                                 | Запускает модульные тесты                                                                             |
| `npm run test:cy:run`                                                                                                                                                                                               | Запускает тесты Cypress без графического интерфейса                                                   |
| `npm run test:cy:open`                                                                                                                                                                                              | Запускает тесты Cypress в режиме интерактивного интерфейса                                            |
| `npm run test:e2e`                                                                                                                                                                                                  | Запускает сервер приложения и тестов Cypress без графического интерфейса                              |
| `npm run test:e2e:open`                                                                                                                                                                                             | Запускает сервер приложения и тестов Cypress в режиме интерактивного интерфейса                       |
| `npm run lint:eslint`                                                                                                                                                                                               | Запускает ESLint для проверки и отображения проблем с кодом                                           |
| `npm run lint:eslint:fix`                                                                                                                                                                                           | Запускает ESLint для устранения обнаруженных проблем с кодом                                          |
| `npm run lint:stylelint`                                                                                                                                                                                            | Запускает Stylelint для проверки и отображения проблем со стилями                                     |
| `npm run lint:stylelint:fix`                                                                                                                                                                                        | Запускает Stylelint для устранения обнаруженных проблем со стилями                                    |
| `npm run lint:prettier`                                                                                                                                                                                             | Запускает Prettier для устранения проблем с форматированием кода                                      |
| `npm run lint:types`                                                                                                                                                                                                | Запускает проверку типов для проекта                                                                  |
| `npm run lint`                                                                                                                                                                                                      | Последовательно выполняет все проверки качества кода                                                  |
| `npm run storybook`                                                                                                                                                                                                 | Запускает Storybook в режиме разработки. Storybook будет доступен по адресу <http://localhost:6006>   |
| `npm run storybook:build`                                                                                                                                                                                           | Запускает сборку Storybook. Собранный Storybook будет находиться в папке `storybook-static`           |
| `npm run prepare`                                                                                                                                                                                                   | Запускает инициализацию Husky для работы pre-commit хуков                                             |

## Скриншоты

Главная страница

![Страница каталога](https://github.com/Romychan/npf-krug-task/assets/60140867/9820e697-e59e-4391-86f4-10fb94ea0a81)

Форма добавления пользователя

![Форма добавления пользователя](https://github.com/Romychan/npf-krug-task/assets/60140867/dfa850ff-fa2c-4d24-a3d8-d522b4cf8dff)
