const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8080;

/**
 * Data Interface
 * id: number;
 * hospitalName: string;
 * registerTime: string;
 * symptom: string;
 * note: string;
 */
const registers = [];

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json',
  );
  next();
});

app.use(cors());
app.use(bodyParser.json());

app.get('/test', (req, res) => {
  res.send('NETWORK OK');
});

app.get('/test/error', (req, res) => {
  res.status(400).send({
    message: 'Error Occur!',
  });
});

app.get('/registers', (req, res) => {
  res.send(registers);
});

app.post('/registers', (req, res) => {
  const randNum = Math.random();
  if (randNum < 0.1) {
    res.status(500).json({ status: 500, message: 'UNEXPECTED_ERROR' });
    return;
  }
  const { body } = req;
  const id = registers.length + 1;
  const { hospitalName, registerTime, symptom, note } = body;
  registers.push({
    id,
    hospitalName,
    registerTime,
    symptom,
    note,
  });
  res.sendStatus(200);
});

app.listen(port, () => console.log('서버 구동 완료: http://localhost:8080'));
