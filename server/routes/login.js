const express = require('express');
const serverError = require('../utils/error.js')
const router = express.Router();
const { query } = require('../utils/database.js');

router.post('/', async (req, res) => {
  try {
    const { nickname, gender, job } = req.body;
    const results = await query('SELECT * FROM users WHERE nickname = ?', [nickname]);
    if (results.length) {
      res.status(409).json('이미 존재하는 닉네임'); 
    } else {
      await query('INSERT INTO users (nickname, gender, job) VALUES (?, ?, ?)', [nickname, gender, job]);
      res.status(200).json('데이터 삽입 성공');
    }
  } catch (error) {
    serverError(error, res) 
  }
});

module.exports = router;