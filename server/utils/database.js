const mysql = require('mysql2');
require('dotenv').config();

let connection;

function handleConnect() {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  connection.connect(function(err) {
    if (err) {
      console.error('MySQL 연결 오류:', err);
      console.log('다시 연결을 시도합니다.');
      setTimeout(handleConnect, 2000);
    } else {
      console.log('MySQL에 성공적으로 연결되었습니다.');
    }
  });

  // 연결 에러 핸들링
  connection.on('error', function(err) {
    console.error('MySQL 연결 오류:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('MySQL 연결이 끊어졌습니다. 다시 연결을 시도합니다.');
      handleConnect();
    } else {
      throw err;
    }
  });
}

function query(sql, params) {
    return new Promise((resolve, reject) => {
      connection.query(sql, params, (error, results) => {
        if (error) {
          return reject(error); // route 의 catch 로 이동
        }
        resolve(results);
      });
    });
}

handleConnect();

module.exports = { query };