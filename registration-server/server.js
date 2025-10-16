const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // для index.html и style.css

app.post('/save', (req, res) => {
    const { name, email, password } = req.body;
    const data = `${new Date().toISOString()} | ${name} | ${email} | ${password}\n`;
    fs.appendFileSync('users.txt', data);
    res.send(`Спасибо, ${name}! <a href="/">Вернуться</a>`);
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
