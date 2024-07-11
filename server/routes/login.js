const express = require('express');
const router = express.Router();
const { query } = require('../database.js');

router.post('/', async (req, res) => {
  try {
    const { nickname, gender, job } = req.body;
    const results = await query('SELECT * FROM users WHERE nickname = ?', [nickname]);

    if (results.length) {
      res.status(200).json('이미 존재하는 닉네임');
    } else {
      await query('INSERT INTO users (nickname, gender, job) VALUES (?, ?, ?)', [nickname, gender, job]);
      res.status(200).json('데이터 삽입 성공');
    }
  } catch (error) {
    console.error('서버 오류:', error);
    res.status(500).json('서버 에러');
  }
});

module.exports = router;