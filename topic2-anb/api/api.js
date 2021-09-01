const express = require('express');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbAdmin:dbAdmin@cluster0.2dme8.mongodb.net/mydb?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true });

const Light = require('./models/light');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = 5000;

app.get('/api/test', (req, res) => {
    res.send('The API is working!');
}); //works

app.get('/api/lights', (req, res) => {
    Light.find({}, (err, lights) => {
    return err
    ? res.send(err)
    : res.send(lights);
});
});

app.post('/api/lights', (req, res) => {
    const { id, name } = req.body;
    const newLight = new Light({
        id,
        name
    });
    newLight.save(err => {
        return err
        ? res.send(err)
        : res.send('successfully added new light');
    });
});

app.listen(port, () => {
console.log(`listening on port ${port}`);
});
  