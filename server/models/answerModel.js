const { query } = require('../utils/database');

const insertAnswer = async (nickname, answer) => {
    try {
        await query(
            'INSERT INTO useranswer (nickname, answer) VALUES (?, ?)', 
            [nickname, answer]
        );
    } catch (error) {
        throw new Error('쿼리 실행 오류');
    }
};

const selectAnswer = async (nickname) => {
    try {
        const results = await query(
            'SELECT * FROM useranswer WHERE nickname = ?',
            [nickname]
        );
        return results; 
    } catch (error) {
        throw new Error('쿼리 실행 오류');
    }
}

module.exports = {
    insertAnswer,
    selectAnswer
};