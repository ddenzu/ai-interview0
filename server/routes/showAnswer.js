const express = require('express');
const serverError = require('../utils/error.js')
const router = express.Router();
const { query } = require('../utils/database.js');

router.post('/', async (req, res) => {
  try {
    const results = await query('SELECT * FROM useranswer WHERE nickname = ?', [req.body.nickname]);
    const answerArray = results.map((item) => item.answer);
    res.status(200).json({ answerArray });
  } catch (error) {
    serverError(error, res)
  }
});

module.exports = router;