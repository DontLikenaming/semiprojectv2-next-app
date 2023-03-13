import mariadb from "mariadb";

const dbconfig = {
    host: process.env.MARIADB_HOST,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PWD,
    database: process.env.MARIADB_DB
};

const MariaDB = {
    makeConn: async () => {
        try {
            return await mariadb.createConnection(dbconfig);
        } catch(e) {
            console.error(e);
        }
    },
    closeConn: async (conn) => {
        if (conn) {
            try {
                await conn.close();
                console.log('마리아 데이터베이스 접속 해제 성공')
            } catch (e) {
                console.error(e);
            }
        }
    }
}
module.exports = MariaDB;

