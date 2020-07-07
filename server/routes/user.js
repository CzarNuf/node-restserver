const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('underscore');

const User = require('../models/user');
const { verifyToken, verifyAdminRole } = require('../middlewares/authorization');

const app = express();

app.get('/user', verifyToken, (req, res) => {
  let page = Number(req.query.page || 1);
  page = page <= 0 ? 1 : page;
  const fetch = Number(req.query.fetch || 5);
  const skip = (page - 1) * fetch;
  const state = req.query.state === undefined ? true : req.query.state === 'true';
  const filters = { state };
  console.log(req.query.state, filters);

  User
    .find(filters, 'name email role state google img')
    .skip(skip)
    .limit(fetch)
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      User.count(filters, (err, count) => {
        res.json({
          ok: true,
          users,
          count
        });
      })

    });
});

app.post('/user', [verifyToken, verifyAdminRole], function(req, res) {
  const body = req.body;

  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      user: userDB
    });
  });
});

app.put('/user/:id', [verifyToken, verifyAdminRole], function(req, res) {
  const id = req.params.id
  const body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state']);

  User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      user: userDB
    });
  });
});

app.delete('/user/:id', [verifyToken, verifyAdminRole], function(req, res) {
  let id = req.params.id;

  User.findByIdAndUpdate(id, { state: false }, { new: true }, (err, userDeleted) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      user: userDeleted
    });
  });
});

module.exports = app;