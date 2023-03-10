import oracledb from "oracledb"

export default async (req, res) => {
    const Oracle = {
        options : {
            resultSet: true,
            outFormat: oracledb.OUT_FORMAT_OBJECT
        }}

    let conn;
    let result = [];
    oracledb.initOracleClient({libDir: 'c:/Java/instantclient_19_17'});
    const sql = `select MNO, USERID, NAME, EMAIL, to_char(REGDATA, 'yyyy-mm-dd HH24:MI:SS') REGDATA from MEMBER order by MNO asc`;
    const dbconfig = {
        connectString: process.env.ORACLE_HOST,
        user: process.env.ORACLE_USER,
        password: process.env.ORACLE_PWD
    };
    try {
        conn = await oracledb.getConnection(dbconfig);

        const rowdata = await conn.execute(sql);
        let rs = rowdata.resultSet;
        let row = null;
        while((row = await rs.getRow())) {
            let bd = {'MNO':row.MNO, 'USERID':USERID, 'NAME':NAME, 'EMAIL':EMAIL, 'REGDATA':REGDATA};
            result.push(bd);
        }

        res.status(200).json(result);

    } catch (err) {
        console.log(err);
        // 처리 실패 시 응답 : 상태코드 500, 오류내용 반환, 종료
        res.status(500).json(err).end();
    } finally {
        if(conn) await conn.close();
    }
}