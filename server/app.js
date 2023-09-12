const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

const registers = [];

app.get('/registers', (req, res) => {
  res.send(registers);
});

app.post('/registers', (req, res) => {
  const randNum = Math.random();
  if (randNum < 0.1) {
    res.status(500).json({ status: 500, message: 'UNEXPECTED_ERROR' });
    return;
  }
  const newRegister = req.body;
  registers.push(newRegister);
  res.sendStatus(200);
});

app.listen(port, () => console.log('서버 구동 완료: http://localhost:8080'));
