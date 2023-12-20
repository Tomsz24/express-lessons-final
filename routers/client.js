const express = require('express');
const res = require('express/lib/response');
const { db } = require('../utils/db');

const clientRouter = express.Router();

clientRouter
  .get('/', (req, res) => {
    res.render('client/list-all', {
      clients: db.getAll(),
    });
  })

  .get('/:id', (req, res) => {
    res.render('client/one', {
      client: db.getOne(req.params.id),
    });
  })

  .post('/', (req, res) => {
    res.send('dodaj!');
  })

  .put('/:id', (req, res) => {
    res.send('ZModyfikuj');
  })

  .delete('/:id', (req, res) => {
    db.delete(req.params.id);
    res.render('client/delete');
  });

module.exports = {
  clientRouter,
};
