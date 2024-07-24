const express = require('express');
const serverError = require('../utils/error.js')
const router = express.Router();
const { query } = require('../utils/database.js');

router.post('/', async (req, res) => {
    try {
      const { nickname, answer } = req.body;
      await query('INSERT INTO useranswer (nickname, answer) VALUES (?, ?)', [nickname, answer]);
      res.status(200).json('데이터 삽입 성공');
    } catch (error) {
      serverError(error, res)
    }
  });
  
  module.exports = router;