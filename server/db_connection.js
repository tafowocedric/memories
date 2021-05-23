const mongoose = require('mongoose');

const CONNECTION_URL = 'mongodb+srv://vegas:kH5sAYLsVipCrv9@cluster0.pxuty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const db = mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.set('useFindAndModify', true);

module.exports = db;
