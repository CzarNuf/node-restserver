require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(require('./routes/user'));

mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
  if (err) throw err;

  console.log('Database online');
});

app.listen(process.env.PORT, () => {
  console.log('Listening port:', process.env.PORT);
});