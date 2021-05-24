const mongoose = require('mongoose');

const CONNECTION_URL = process.env.DB_URL;

const db = mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

mongoose.set('useFindAndModify', true);

module.exports = db;
