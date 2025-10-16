const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Настройка Express для обработки POST-запросов
app.use(express.urlencoded({ extended: true }));

// Обслуживание статических файлов из папки "public"
app.use(express.static(path.join(__dirname, 'public')));

// Обработка данных формы
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Формируем строку с текущей датой и данными
  const data = `${new Date().toISOString()} | ${name} | ${email} | ${password}\n`;

  // Добавляем в файл
  fs.appendFileSync('users.txt', data);

  // Отправляем ответ пользователю
  res.send(`
    <h2>Спасибо за регистрацию, ${name}!</h2>
    <a href="/">Вернуться на форму</a>
  `);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
