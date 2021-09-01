var userDB = require('../models/model');

exports.updateTemp = (req,res) => {{
        username =  req.body.username_;
        newtemp = req.body.newtemp;
        userDB.findOneAndUpdate({"username": username}, {$set: {"climSetting": newtemp}}).then(res.status(200).send({message: `done`}));
}}

exports.updateSeat = (req,res) => {{
    username =  req.body.username_;
    newseat = req.body.newseat;
    userDB.findOneAndUpdate({"username": username}, {$set: {"seatSetting": newseat}}).then(res.status(200).send({message: `done`}));
}}

exports.addAddress = (req,res) => {{
    username =  req.body.username_;
    newaddress = req.body.newaddress;
    userDB.findOneAndUpdate({"username": username}, {$push: {"addresses": newaddress}}).then(res.status(200).send({message: `dones`}));
}}

exports.changeColor = (req,res) => {{
    username =  req.body.username_;
    newcolor = req.body.newcolor;
    userDB.findOneAndUpdate({"username": username}, {$set: {"lightColor": newcolor}}).then(res.status(200).send({message: `dones`}));
}}



