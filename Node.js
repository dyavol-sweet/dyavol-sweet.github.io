const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.urlencoded({ extended: true }));

app.post('/save', (req, res) => {
    const data = `${req.body.name} | ${req.body.email}\n`;
    fs.appendFileSync('users.txt', data);
    res.send('Данные сохранены!');
});

app.listen(3000, () => console.log('Server running'));
