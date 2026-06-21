# Service Requests App
Веб-приложение для подачи и обработки заявок на обслуживание (MERN).

## Деплой
### https://service-requests-app-production.up.railway.app/
Для входа в роли Мастер используйте:\
login: `master@test.com`\
password: `123456`

В роли Клиент:\
login: `client@test.com`\
password: `123456`

## Возможности

- Регистрация и вход (JWT, bcrypt)
- Роли: **client** (свои заявки) и **master** (все заявки, смена статуса)
- CRUD заявок через REST API (MongoDB)
- Загрузка фото к заявке
- Архив заявок со статусом `done`

## Стек

Frontend: React, React Router, Redux, Axios\
Backend: Node.js, Express, Mongoose, Multer\
БД: MongoDB Atlas

## Структура

```
service-requests-app/
├── frontend/     # React SPA
├── backend/      # Express API
└── package.json  # скрипты запуска
```

## Запуск

1. Установить зависимости:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. Настроить переменные окружения:

   **backend/.env**
   ```
   MONGO_DB_URL=<строка подключения MongoDB>
   JWT_SECRET=<секрет для JWT>
   ```

   **frontend/.env**
   ```
   REACT_APP_API_URL=<ссылка на backend>
   ```

3. Запустить из корня проекта:
   ```bash
   npm run start:backend
   npm run start:frontend
   ```

## API (кратко)

| Метод | Путь | Описание |
|-------|------|----------|
| POST | `/auth/register` | Регистрация |
| POST | `/auth/login` | Вход |
| GET | `/requests` | Список заявок (по роли) |
| POST | `/requests` | Создание (client) |
| PUT | `/requests/:id` | Статус (master) |
| DELETE | `/requests/:id` | Удаление (владелец) |

Защищённые маршруты требуют заголовок `Authorization: Bearer <token>`.
