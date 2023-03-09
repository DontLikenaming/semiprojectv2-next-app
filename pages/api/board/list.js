import mariadb from "mariadb"

export default async (req, res) => {
    let conn;
    const sql = `select bno, title, userid, date_format(regdate,\'%Y-%m-%d\') as regdate, views from board order by bno desc limit 0, 10`;
    const dbconfig = {
        host: process.env.MARIADB_HOST,
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PWD,
        database: process.env.MARIADB_DB
    };
    try {
        conn = await mariadb.createConnection(dbconfig);

        const rowdata = await conn.query(sql);
        res.status(200).json(rowdata);

    } catch (err) {
        console.log(err);
        // 처리 실패 시 응답 : 상태코드 500, 오류내용 반환, 종료
        res.status(500).json(err);
    } finally {
        if(conn) await conn.close();
    }
}