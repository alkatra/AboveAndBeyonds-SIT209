const express = require('express');
const app = express();

const port = 3000;
const base = `${__dirname}/public`;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${base}/login.html`);
});

app.get('/signup', (req, res) => {
    res.sendFile(`${base}/register.html`);
});

app.get('/success', (req, res) => {
    res.sendFile(`${base}/main.html`);
});

app.get('*', (req,res) => {
    res.sendFile(`${base}/404.html`);
});




app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

