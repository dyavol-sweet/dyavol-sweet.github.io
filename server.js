// 1️⃣ Подключаем модули
const express = require('express');
const fs = require('fs');
const path = require('path');

// 2️⃣ Создаём приложение
const app = express();
const PORT = 3000;

// 3️⃣ Подключаем middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 4️⃣ Маршрут регистрации пользователей
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const data = `${new Date().toISOString()} | ${name} | ${email} | ${password}\n`;
  fs.appendFileSync('users.txt', data);
  res.redirect(`/success.html?name=${encodeURIComponent(name)}`);
});

// 5️⃣ Маршрут отображения пользователей (тот, что с паролями скрытыми)
app.get('/users', (req, res) => {
  const { login, password } = req.query;

  if (login === 'root' && password === '123456789') {
    const users = fs.existsSync('users.txt') ? fs.readFileSync('users.txt', 'utf-8') : '';
    const rows = users.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        const cols = line.split(' | ').map(c => c.trim());
        return `<tr>
                  <td>${cols[0]}</td>
                  <td>${cols[1]}</td>
                  <td>${cols[2]}</td>
                  <td class="password-cell" data-real="${cols[3]}">${'*'.repeat(cols[3].length)}</td>
                </tr>`;
      }).join('');

    res.send(`
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <title>Список пользователей</title>
        <link rel="stylesheet" href="style.css">
        <style>
          body {
            background: linear-gradient(135deg, #89f7fe, #66a6ff);
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            padding: 50px 0;
          }
          .table-container {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            max-width: 900px;
            width: 100%;
          }
          h1 { text-align:center; color:#2d89ef; margin-bottom:20px; }
          table { width:100%; border-collapse:collapse; }
          th, td { padding:12px 15px; border-bottom:1px solid #ddd; text-align:left; }
          th { background:#2d89ef; color:white; }
          tr:hover { background:#f1f1f1; }
          .show-password-btn { display:inline-block; margin:15px 0; padding:10px 20px; background-color:#f44336; color:white; border:none; border-radius:8px; cursor:pointer; }
          .show-password-btn:hover { background-color:#d32f2f; }
          a { display:inline-block; margin-top:20px; padding:10px 20px; background-color:#4CAF50; color:white; text-decoration:none; border-radius:8px; }
          a:hover { background-color:#45a049; }
        </style>
      </head>
      <body>
        <div class="table-container">
          <h1>Список зарегистрированных пользователей</h1>
          <button class="show-password-btn" onclick="showPasswords()">Показать пароли</button>
          <table>
            <tr>
              <th>Дата</th>
              <th>Имя</th>
              <th>Email</th>
              <th>Пароль</th>
            </tr>
            ${rows}
          </table>
          <div style="text-align:center;">
            <a href="/">⬅ Вернуться на главную</a>
          </div>
        </div>
        <script>
          function showPasswords() {
            const adminPass = prompt("Введите пароль админа:");
            if(adminPass === "123456789") {
              document.querySelectorAll('.password-cell').forEach(cell => {
                cell.textContent = cell.getAttribute('data-real');
              });
            } else {
              alert("Неверный пароль админа!");
            }
          }
        </script>
      </body>
      </html>
    `);
  } else {
    res.send('<h1>Доступ запрещён!</h1><a href="/">⬅ Вернуться на главную</a>');
  }
});

// 6️⃣ Запуск сервера
app.listen(PORT, () => console.log(`Сервер запущен: http://localhost:${PORT}`));
