import mariadb from './MariaDB';

let membersql = {
    insertsql : ' insert into member (userid, passwd, name, email) values (?, ?, ?, ?) ',
    loginsql : ' select count(userid) cnt, name, email from member where userid = ? and passwd = ? ',
    selectOne : ` select userid, name, email, date_format(regdate, "%Y-%m-%d %T") regdate from member where userid = ? `
};

class Member {
    constructor(userid, passwd, name, email) {
        this.userid = userid;
        this.passwd = passwd;
        this.name = name;
        this.email = email;
    }
    async insert(){
        let conn = null;
        let params = [];
        let insertcnt = 0;

        try{
            conn = await mariadb.makeConn();
            params = [this.userid, this.passwd, this.name, this.email];

            let result = await conn.query(membersql.insertsql, params);
            await conn.commit();
            if(result.affectedRows > 0){
                console.log('회원 데이터 입력 성공');
                insertcnt = result.affectedRows;
            }


        }catch (e){console.log(e)}
        finally {
            await mariadb.closeConn(conn);
        }

        return insertcnt;
    }
    async login(uid, pwd){
        let conn = null;
        let params = [uid, pwd];
        let result = '';
        try{
            conn = await mariadb.makeConn();

            result = await conn.query(membersql.loginsql, params);
            await conn.commit();

        }catch (e){console.log(e)}
        finally {
            await mariadb.closeConn(conn);
        }
        //console.log(result);
        return result;
    }
    async selectOne(uid){
        let conn = null;
        let params = [uid];
        let result = '';
        try{
            conn = await mariadb.makeConn();

            result = await conn.query(membersql.selectOne, params);
            await conn.commit();

        }catch (e){console.log(e)}
        finally {
            await mariadb.closeConn(conn);
        }
        //console.log(mem);
        return result;
    }
}
module.exports = Member;