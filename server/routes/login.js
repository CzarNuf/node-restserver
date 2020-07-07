const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const app = express();

app.post('/login', (req, res) => {
  const body = req.body;

  User.findOne({ email: body.email }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!userDB) {
      return res.status(400).json({
        ok: false,
        err: 'Email incorrect'
      });
    }

    if (!bcrypt.compareSync(body.password, userDB.password)) {
      return res.status(400).json({
        ok: false,
        err: 'Password incorrect'
      });
    }

    let token = jwt.sign({
      user: userDB
    }, process.env.TOKEN_SEED, { expiresIn: process.env.TOKEN_EXP });

    res.json({
      ok: true,
      user: userDB,
      token
    });
  });
});

module.exports = app;