//import fetch from 'isomorphic-unfetch'
import {useState} from "react";
import axios from 'axios';
import Link from "next/link";

const getStpgns = (cpg, alpg) => {
    let stpgns = [];
    let stpgn = parseInt((cpg - 1) / 10) * 10 + 1; // 페이지네이션 시작값 계산
    for (let i = stpgn; i < stpgn + 10; ++i) {
        if (i <= alpg) {  // i가 총페이지수보다 같거나 작을때 i 출력
            let iscpg = (i == cpg) ? true : false;  // 현재페이지 표시
            let pgn = {'num': i, 'iscpg': iscpg};
            stpgns.push(pgn);
        }
    }
    return stpgns;
}

const getPgns = (cpg, alpg) => {
    let isprev = (cpg - 1 > 0);  // 이전 버튼 표시 여부
    let isnext = (cpg < alpg);   // 다음 버튼 표시 여부
    let isprev10 = (cpg - 10 > 0);
    let isnext10 = (parseInt((cpg + 10)/10)*10 < (parseInt(alpg/10))*10+10);
    let pgn = {'prev': cpg - 1, 'next': cpg + 1, // 이전 : 현재페이지 - 1, 다음 : 현재페이지 + 1
        'prev10': cpg - 10, 'next10': cpg + 10,
        'isprev': isprev, 'isnext': isnext,
        'isprev10': isprev10, 'isnext10': isnext10};

    return pgn;
}

export async function getServerSideProps(ctx) {
    let [ cpg, ftype, fkey ] = [ ctx.query.cpg, ctx.query.ftype, ctx.query.fkey ];

    cpg = cpg ? parseInt(cpg) : 1;
    let params = `cpg=${cpg}`;          // 질의문자열 생성
    if(fkey) params += `&ftype=${ftype}&fkey=${fkey}`;

    let url = `http://localhost:3000/api/board/list?${params}`;

    const res = await axios.get(url);
    const boards = await res.data;

    let alpg = Math.ceil(parseInt(boards.allcnt) / 15);  // 총 페이지수 계산

    // 페이지네이션 처리 1
    let stpgns = getStpgns(cpg, alpg);

    // 페이지네이션 처리 2
    let pgn = getPgns(cpg, alpg);

    // 검색 시 검색관련 질의문자열 생성
    let qry = fkey ? `&ftype=${ftype}&fkey=${fkey}` : '';

    // 처리 결과를 boards 객체에 추가
    boards.stpgns = stpgns;
    boards.pgn = pgn;
    boards.qry = qry;

    return { props : {boards} }
}

export default function List ({boards}) {
    const [ ftype, setFtype] = useState('title');
    const [ fkey, setFkey] = useState(undefined);

    const handletype = (e) => { setFtype(e.target.value); };

    const handlekey = (e) => { setFkey(e.target.value); };

    const handlefind = (e) => {
        if(fkey) location.href = `?ftype=${ftype}&fkey=${fkey}`;
    }

    return (
        <div>
            <h2>게시판</h2>
            <table className="board">
                <colgroup>
                    <col style={{width: '10%'}} />
                    <col />
                    <col style={{width: '15%'}} />
                    <col style={{width: '15%'}} />
                    <col style={{width: '10%'}} />
                </colgroup>
                <tbody>
                <tr>
                    <td colSpan="3" className="alignlft">
                        <select name="ftype" id="ftype" onChange={handletype}>
                            <option value="title">제목</option>
                            <option value="contents">본문</option>
                            <option value="userid">작성자</option>
                        </select>
                        <input type="text" name="fkey" id="fkey" onChange={handlekey}></input>
                        <button type="button" name="findbtn" id="findbtn" onClick={handlefind}>
                            검색하기</button>
                    </td>
                    <td colSpan="2" className="alignrgt">

                        <button type="button" id="newbtn" name="newbtn"
                                disabled>새글쓰기
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회</th>
                </tr>

                {boards.boards.map(bd =>
                    <tr>
                        <td key={bd.BNO}>{bd.bno}</td>
                        <td><Link href={`/board/view?bno=${bd.bno}`}>{bd.title}</Link></td>
                        <td>{bd.userid}</td>
                        <td>{bd.regdate}</td>
                        <td>{bd.views}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <ul className="pagenation">
                {boards.pgn.isprev10 ?
                    <li> <a href={`?cpg=${boards.pgn.prev10}${boards.qry}`}>더 이전</a> </li> : ''}

                {boards.pgn.isprev ?
                    <li> <a href={`?cpg=${boards.pgn.prev}${boards.qry}`}>이전</a> </li> : ''}

                {boards.stpgns.map(pgn => (
                    pgn.iscpg ?
                        <li key={pgn.num} className='cpage'>{pgn.num}</li> :
                        <li key={pgn.num}><a href={`?cpg=${pgn.num}${boards.qry}`}>{pgn.num}</a></li>
                ))}

                {boards.pgn.isnext ?
                    <li> <a href={`?cpg=${boards.pgn.next}${boards.qry}`}>다음</a> </li> : ''}

                {boards.pgn.isnext10 ?
                    <li> <a href={`?cpg=${boards.pgn.next10}${boards.qry}`}>더 다음</a> </li> : ''}
            </ul>
        </div>
    );
}