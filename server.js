const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = 4100; // ← 3000番等、使用していないポート番号であればOKです。
const auth = require('./routes/auth');
const post = require('./routes/post');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/post', post);

app.get('/', (req, res) => {
    res.status(404).send('Something broke!')
});

app.listen(PORT, () => {
    console.log('サーバーを起動中・・・');
});