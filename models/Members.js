import mariadb from './MariaDB';
import {comparePasswd} from './Utils';

let membersql = {
    insertsql : ' insert into member (userid, passwd, name, email) values (?, ?, ?, ?) ',
    loginsql1 : ' select passwd from member where userid = ? ',
    loginsql2 : ' select count(userid) cnt, name, email from member where userid = ? and passwd = ? ',
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
        let check = '';
        let result = '';
        let asdf = '';
        try{
            conn = await mariadb.makeConn();

/*            check = await conn.query(membersql.loginsql1, params);
            check = check[2];
            //console.log(check.passwd);
            if(check.passwd!==''){
                console.log('psd: ',pwd,' check.passwd: ',check.passwd);
                asdf = await comparePasswd(pwd,(check.passwd));
                console.log(asdf);
            }*/

            result = await conn.query(membersql.loginsql2, params);
            await conn.commit();

        }catch (e){console.log(e)}
        finally {
            await mariadb.closeConn(conn);
        }
        console.log(result);
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