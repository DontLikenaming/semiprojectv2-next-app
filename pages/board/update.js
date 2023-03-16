import axios from "axios";
import {useState} from "react";
import {check_captcha, handleInput, process_submit} from "../../components/Utils";
import Layout from "../../components/layouts/layout";
import Home from "../index";

export async function getServerSideProps(ctx) {
    let bno = ctx.query.bno;

    let url = `http://localhost:3000/api/board/view?bno=${bno}`;

    const res = await axios.get(url);
    const board = await res.data[0];

    return { props : {board} }
}

export default function Update ({board}) {
    const [title, setTitle] = useState(board.TITLE);
    const [userid, setUserid] = useState('asdf');
    const [contents, setContents] = useState(board.CONTENTS);
    const [bno, setBno] = useState(board.BNO);

    const handleUpdate = async () => {
        if(grecaptcha.getResponse()
            && check_captcha(grecaptcha.getResponse())) {
            switch (true) {
                case title === '':
                    alert('제목을 입력하세요!');
                    break;
                case contents === '':
                    alert('본문을 입력하세요!');
                    break;
                default: {
                    const data = {title: title, contents: contents, bno: bno};
                    if (await process_submit('/api/board/update', data) > 0) {
                        location.href = '/board/view?bno='+board.BNO;
                    }
                    break;
                }
            }
        }
    };
    return (
        <div>
            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            <h3>본문글 수정</h3>
            <form name="write" id="writefrm">
                <div>
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" name="title"
                           value={title} onChange={e => handleInput(setTitle, e)} />
                </div>

                <div>
                    <label htmlFor="uid">작성자</label>
                    <input type="text" id="userid" name="userid" value={userid} readOnly />
                </div>

                <div>
                    <label htmlFor="contents" className="dragup">본문</label>
                    <textarea id="contents" name="contents" rows="7" cols="55"
                              value={contents}
                              onChange={e => handleInput(setContents, e)} />
                </div>

                <div><label></label>
                    <div className="g-recaptcha cap" data-sitekey='6LdD4OskAAAAAH6Uazf4s8YBShdvsgMUbU5KkmDK'></div>
                </div>


                <div>
                    <label></label>
                    <button type="button" id="wrtbtn" name="wrtbtn" onClick={handleUpdate}>수정완료</button>
                    <button type="reset">다시입력</button>
                </div>
            </form>
        </div>
    );
}

Update.getLayout = (page) => (
    <Layout meta = {{title:'게시글 수정하기'}}>
        {page}
    </Layout>
)