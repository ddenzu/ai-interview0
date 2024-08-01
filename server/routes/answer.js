const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

router.post('/', answerController.storeAnswer);
router.get('/:nickname', answerController.findAnswer);

module.exports = router;