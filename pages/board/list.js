import fetch from 'isomorphic-unfetch'

List.getInitialProps = async function(ctx) {
    const res = await fetch('http://localhost:3000/api/board/list');
    const board = await res.json();
    return {board: board};
}

export default function List (props) {
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
                        <select name="ftype" id="ftype">
                            <option value="title">제목</option>
                            <option value="contents">본문</option>
                            <option value="userid">작성자</option>
                        </select>
                        <input type="text" name="fkey" id="fkey"></input>
                            <button type="button" name="findbtn" id="findbtn">검색하기</button>
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

                {props.board.map(board =>
                    <tr>
                        <td key={board.BNO}>{board.bno}</td>
                        <td>{board.title}</td>
                        <td>{board.userid}</td>
                        <td>{board.regdate}</td>
                        <td>{board.views}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <ul className="pagenation">
                <li>
                    {/*<a href="#">  </a>*/}
                </li>
                <li>
                    {/*<a href="#">이전</a>*/}
                </li>
                <li className="cpage"></li>
                <li>
                    {/*<a href="#">다음</a>*/}
                </li>
                <li>
                    {/*<a href="#"> >> </a>*/}
                </li>
            </ul>
        </div>
    );
}