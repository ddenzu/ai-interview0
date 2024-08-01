const { query } = require('../utils/database'); // 데이터베이스 쿼리를 실행하는 유틸리티 함수

// 사용자 닉네임으로 조회
const findUserByNickname = async (nickname) => {
    try {
        const results = await query(
            'SELECT * FROM users WHERE nickname = ?', 
            [nickname]
        );
        return results;
    } catch (error) {
        throw new Error('사용자 조회 오류');
    }
};

// 사용자 정보를 삽입
const createUser = async (nickname, gender, job) => {
    try {
        await query(
            'INSERT INTO users (nickname, gender, job) VALUES (?, ?, ?)', 
            [nickname, gender, job]
        );
    } catch (error) {
        throw new Error('사용자 삽입 오류');
    }
};

module.exports = {
    findUserByNickname,
    createUser
};