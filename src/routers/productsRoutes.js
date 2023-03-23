const express = require('express');

const router = express.Router();

router
  .get('/', (_req, res) => {
    res.send('I work!');
  })
  .get('/:id', (_req, res) => {
    res.send('I work too');
  });

module.exports = router;