const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// import routers
const postRoutes = require('./routes/post');

// use routes
app.use('/posts', postRoutes);

module.exports = app;
