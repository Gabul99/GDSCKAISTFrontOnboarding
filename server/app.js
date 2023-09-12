const express = require('express');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send({
    userName: '이희찬',
    userNickname: 'Gabul',
  });
});

app.listen(port, () => console.log('서버 성공적 실행'));
