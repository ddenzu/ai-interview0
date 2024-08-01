const answerModel = require('../models/answerModel');
const serverError = require('../utils/error.js')

exports.storeAnswer = async (req, res) => {
    try {
        const { nickname, answer } = req.body;
        await answerModel.insertAnswer(nickname, answer);
        res.status(200).json('데이터 삽입 성공');
    } catch (error) {
        serverError(error, res);
    }
};

exports.findAnswer = async (req, res) => {
    try {
      const results = await answerModel.selectAnswer(req.params.nickname);
      const answerArray = results.map((item) => item.answer);
      return res.status(200).json({ answerArray });
    } catch (error) {
      serverError(error, res)
    }
}
  