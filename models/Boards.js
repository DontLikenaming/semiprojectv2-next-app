import mariadb from "./MariaDB"

let boardsql = {
    insert : ' insert into board (title, userid, contents) values ' +
        ' (?, ?, ?) ' ,
    select : ` select bno, title, userid, date_format(regdate,\'%Y-%m-%d\') as regdate, views from board order by bno desc limit 0, 15 `,
    select1 : ` select bno, title, userid, date_format(regdate,'%Y-%m-%d') as regdate, views from board `,
    select2 : ` order by bno desc limit ?, 15 `,
    selectCount : ` select count(bno) cnt from board `,
    selectOne : ` select bno, title, userid, contents, date_format(regdate,'%Y-%m-%d') as regdate ` +
        ` from board where bno = ? `,
    viewOne : ` update board set views = views+1 where bno = ? `,
    update: ' update board set title = ?, contents = ?, ' +
        ' regdate = current_timestamp where bno = ? ',
    delete : ` delete from board where bno = ? `,
    check : ` select bno from board where  `
};

const makewhere = (ftype, fkey) =>{
    let where = ` where title = '${fkey}' `;
    if(ftype==='userid') where = ` where userid = '${fkey}' `;
    else if(ftype==='contents') where = ` where contents like '%${fkey}' `;
    return where;
}
class Board {

    constructor(bno, title, userid, contents, views, regdate) {
        this.bno = bno;
        this.title = title;
        this.userid = userid;
        this.contents = contents;
        this.views = views;
        this.regdate = regdate;
    }
    async insert(){
        let conn = null;
        let params = [this.title, this.userid, this.contents];
        let insertcnt = 0;
        //console.log(this.title, this.userid, this.contents);
        try{
            conn = await mariadb.makeConn(dbconfig);
            let result = await conn.query(boardsql.insert, params);
            await conn.commit();

            if(result.rowsAffected > 0) insertcnt = result.rowsAffected;

            return insertcnt;

        }catch (e){console.log(e)}
        finally {
            await mariadb.closeConn(conn);
        }
    }
    async select(cpg, ftype, fkey){
        let conn = null;
        let result = null;

        let ppg = 15
        let maxnum = cpg * ppg;
        let minnum = maxnum - (ppg - 1);
        let params = [minnum, maxnum];
        let [ cnt, idx ] = [-1, -1];
        let where = '';
        let rowData = '';   // 결과저장용
        if(fkey!==undefined)where=makewhere(ftype, fkey)

        try{
            conn = await mariadb.makeConn();

            cnt = await this.selectCount(conn, where);   //총 게시글 수 계산
            idx = cnt-(ppg*(cpg-1));
            rowData = await conn.query(boardsql.select1 + where + boardsql.select2, params);

        }catch (e){console.log(e)}
        finally {
            await mariadb.closeConn(conn);
        }
        result = {'boards': rowData, 'cnt': cnt, 'idx': idx};
        return result;
    }
    async selectOne(bno){
        let conn = null;
        let params = [bno];
        let bds = [];

        try{
            conn = await mariadb.makeConn();

            let result = await conn.query(boardsql.selectOne, params, mariadb.options);
            await conn.commit();
            let rs = result.resultSet;
            let row = null;
            while(row = await rs.getRow()){
                let bd = new Board(row.BNO, row.TITLE, row.USERID, row.CONTENTS, null, row.REGDATE);
                bds.push(bd);
            }
            await conn.query(boardsql.viewOne, params);
            await conn.commit();
            /*            for(let i=0;i<brd.length;i++){
                            console.log(brd[i]);
                        }*/
        }catch (e){console.log(e)}
        finally {
            await mariadb.closeConn(conn);
        }
        return bds;
    }
    async update(){
        let conn = null;
        let params = [this.title, this.contents, this.bno];
        console.log(this.title, this.contents, this.bno);
        let updatecnt = 0;
        let bds = [];
        try{
            conn = await mariadb.makeConn();
            let result = await conn.query(boardsql.update, params);
            await conn.commit();

            if(result.rowsAffected > 0) updatecnt = result.rowsAffected;

            return updatecnt;
        }catch (e){console.log(e)}
        finally {
            await mariadb.closeConn(conn);
        }
    }
    async delete(bno){
        let conn = null;
        let insertcnt = 0;
        let check = 0;
        let params = [bno];
        try{
            conn = await mariadb.makeConn();
            let result = await conn.query(boardsql.delete, params);
            await conn.commit();

            if(result.rowsAffected > 0) insertcnt = result.rowsAffected;

            return insertcnt;
        }catch (e){console.log(e)}
        finally {
            await mariadb.closeConn(conn);
        }
    }
    async selectCount(conn, where){
        let params = [];
        let cnt = 0
        try{
            cnt = await conn.query(boardsql.selectCount + where, params);


        }catch (e){console.log(e)}

        return parseInt(cnt[0].cnt);
    }
}
module.exports = Board;