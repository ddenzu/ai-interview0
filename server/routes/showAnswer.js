const express = require('express');
const router = express.Router();
const { query } = require('../database.js');

router.post('/', async (req, res) => {
  try {
    const results = await query('SELECT * FROM useranswer WHERE nickname = ?', [req.body.nickname]);
    const answerArray = results.map((item) => item.answer);
    res.status(200).json({ answerArray });
  } catch (error) {
    console.error('서버 오류:', error);
    res.status(500).json('서버 에러');
  }
});

module.exports = router;