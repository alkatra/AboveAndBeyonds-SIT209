const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiUrl = 'https://api.github.com/networks';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 3000;
const base = `${__dirname}/public`;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${base}/getrepo.html`);
});

app.get('/stats', (req, res) => {
    res.sendFile(`${base}/main.html`);
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});