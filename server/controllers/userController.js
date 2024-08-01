const userModel = require('../models/userModel');
const serverError = require('../utils/error');

exports.registerUser = async (req, res) => {
    try {
        const { nickname, gender, job } = req.body;
        const existingUser = await userModel.findUserByNickname(nickname);
        if (existingUser.length) {
            return res.status(409).json('이미 존재하는 닉네임'); 
        } 
        await userModel.createUser(nickname, gender, job);
        return res.status(200).json('데이터 삽입 성공');
    } catch (error) {
        serverError(error, res);
    }
};