//import fetch from 'isomorphic-unfetch'
import axios from 'axios';

export async function getServerSideProps(ctx) {
    let bno = ctx.query.bno;

    bno = bno ? parseInt(bno) : 1;

    let url = `http://localhost:3000/api/board/view?bno=${bno}`;

    const res = await axios.get(url);
    const board = await res.data[0];

    return { props : {board} }
}

export default function View ({board}) {
    const newOne = () => { location.href = '/board/write' };
    const go2list = () => { location.href = '/board/list' };
    const updateOne = () => { location.href = `/board/update?bno=${board.bno}` };
    const deleteOne = () => {
        if(confirm('정말 삭제하시겠습니까?'))location.href = `/board/delete?bno=${board.bno}`
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
                <button type="button" onClick={newOne}>새글쓰기</button>
                <button type="button" onClick={go2list}>목록으로</button>
                <button type="button" onClick={updateOne}>수정하기</button>
                <button type="button" onClick={deleteOne}>삭제하기</button>
            </div>
        </div>
    )
}