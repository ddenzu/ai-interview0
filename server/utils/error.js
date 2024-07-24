const serverError = (err, res) => {
    console.error(err.stack); // 단순한 성공 실패 메세지 전달엔 send 가 유리함
    return res.status(500).json('서버 오류가 발생했습니다.');// 변환 과정 필요없고 오버헤드 적음
};

module.exports = serverError;