//import fetch from 'isomorphic-unfetch'
import axios from 'axios';
import {getSession} from "next-auth/client";
import Layout from "../../components/layouts/layout";
import Home from "../index";

export async function getServerSideProps(ctx) {
    const sess = await getSession(ctx);

    let bno = ctx.query.bno;

    let url = `http://localhost:3000/api/board/view?bno=${bno}`;

    const res = await axios.get(url);
    const board = await res.data[0];
    return { props : {board: board, session: sess} }
}

export default function View ({board, session}) {
    const newOne = () => { location.href = '/board/write' };
    const go2list = () => { location.href = '/board/list' };
    const updateOne = () => { location.href = `/board/update?bno=${board.BNO}` };
    const deleteOne = () => {
        if(confirm('정말 삭제하시겠습니까?'))location.href = `/api/board/delete?bno=${board.BNO}`
    };

    return (
        <div id="view">
            <div>
                <label id="ViewLabel">제목</label>
                {<span>{board.TITLE}</span>}
            </div>
            <div>
                    <label id="ViewLabel">작성자</label>
                    {<span>{board.USERID}</span>}
            </div>
            <div>
                    <label id="ViewLabel">작성일</label>
                    {<span>{board.REGDATE}</span>}
            </div>
            <div>
                    <label id="ViewLabel">본 문</label>
                    {<span id="Viewcontents">{board.CONTENTS}</span>}
            </div>
            <div>
                <input type="hidden" id="bno" value={board.BNO} />
                <input type="hidden" id="userid" value={board.USERID} />
            </div>
            <div id="ViewBtn">
                {
                    session?
                <button type="button" onClick={newOne}>새글쓰기</button>:''
                }
                <button type="button" onClick={go2list}>목록으로</button>
                {
                    session?
                         <button type="button" onClick={updateOne}>수정하기</button>:''
                }
                {
                    session?
                         <button type="button" onClick={deleteOne}>삭제하기</button>:''
                }


            </div>
        </div>
    )
}

View.getLayout = (page) => (
    <Layout meta = {{title:'게시판 본문 보기'}}>
        {page}
    </Layout>
)