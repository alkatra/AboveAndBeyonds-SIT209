const express = require('express');
const app = express();

// import 'bootstrap/dist/js/bootstrap.bundle';

const port = 3000;
const base = `${__dirname}/public`;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${base}/landing.html`);
});

app.get('*', (req,res) => {
    res.sendFile(`${base}/404.html`);
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});