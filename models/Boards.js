import mariadb from './MariaDB';
const ppg = 25;

let boardsql = {
    insert: ' insert into board (title, userid, contents) values (?, ?, ?)',
    select: ' select bno, title, userid, date_format(regdate, "%Y-%m-%d") regdate, ' +
        ' views from board order by bno desc limit ?, 25 ',

    select1: ' select bno, title, userid, date_format(regdate, "%Y-%m-%d") regdate, ' +
        ' views from board ',
    select2: ' order by bno desc limit ?, 25 ',

    selectOne: ' select BNO, TITLE, USERID, date_format(regdate, "%Y-%m-%d %T") REGDATE, CONTENTS ' +
        ' from board where bno = ? ',

    selectCount: 'select count(bno) cnt from board',

    viewOne: ' update board set views = views + 1 where bno = ? ',

    update: ' update board set title = ?, contents = ?, ' +
        ' regdate = current_timestamp where bno = ? ',

    delete: ' delete from board where bno = ? ',
}

// 동적쿼리 생성 함수
const makeWhere = (ftype, fkey) => {
    let where = ` where title = '${fkey}' `;
    if (ftype == 'userid') where = ` where userid = '${fkey}' `
    else if (ftype == 'contents') where = `  where contents like '%${fkey}%'  `
    return where;
};

class Board {

    constructor(bno, title, userid, regdate, contents, views) {
        this.bno = bno;
        this.title = title;
        this.userid = userid;
        this.regdate = regdate;
        this.contents = contents;
        this.views = views;
    }

    static newOne(bno, title, userid, contents){
        return new Board(bno, title, userid, null, contents, null);
    }

    async insert() {
        let conn = null;
        let params = [this.title, this.userid, this.contents];
        let insertcnt = 0;

        try {
            conn = await mariadb.makeConn();
            let result = await conn.query(boardsql.insert, params);
            await conn.commit();
            if (result.affectedRows > 0) insertcnt = result.affectedRows;
        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn();
        }

        return insertcnt;
    }

    async select(stnum, ftype, fkey) {  // 게시판 목록 출력
        let conn = null;
        let params = [stnum, stnum + ppg];
        let [allcnt, idx] = [-1, -1];
        let where = '';
        let rowData = '';     // 결과 저장용

        if (fkey !== undefined) where = makeWhere(ftype, fkey);

        try {
            conn = await mariadb.makeConn();
            allcnt  = await this.selectCount(conn, where);  // 총 게시글수 계산
            idx = allcnt - stnum + 1;


            rowData = await conn.query(
                boardsql.select1 + where + boardsql.select2, params);

        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn();
        }
        let result = {'boards': rowData, 'allcnt': allcnt, 'idx': idx};

        return result;
    }

    async selectCount(conn, where) {  // 총 게시물 수 계산
        let params = [];
        let cnt = -1;   // 결과 저장용

        try {
            cnt = await conn.query(boardsql.selectCount + where, params);
        } catch (e) {
            console.log(e);
        }

        return parseInt(cnt[0].cnt);
    }

    async selectOne(bno) {  // 본문조회
        let conn = null;
        let params = [bno];
        let result = '';

        try {
            conn = await mariadb.makeConn();
            result = await conn.query(boardsql.selectOne, params);

            await conn.query(boardsql.viewOne, params);
            await conn.commit();

        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn();
        }

        return result;
    }

    async update() {
        let conn = null;
        let params = [this.title, this.contents, this.bno];
        let updatecnt = 0;

        try {
            conn = await mariadb.makeConn();
            let result = await conn.query(boardsql.update, params);
            await conn.commit();
            if (result.affectedRows > 0) updatecnt = result.affectedRows;
        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn();
        }

        return updatecnt;
    }

    async delete(bno) {
        let conn = null;
        let params = [bno];
        let deletecnt = 0;

        try {
            conn = await mariadb.makeConn();
            let result = await conn.query(boardsql.delete, params);
            await conn.commit();
            if (result.affectedRows > 0) deletecnt = result.affectedRows;
        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn();
        }

        return deletecnt;
    }

}

module.exports = Board;