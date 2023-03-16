import {useState} from "react";
import {check_captcha, handleInput, process_submit} from "../../components/Utils";

export default function Write () {
    const [title, setTitle] = useState('');
    const [userid, setUserid] = useState('asdf');
    const [contents, setContents] = useState('');

    const handlewrite = async () => {
        // recaptcha를 진행하지 않으면 글을 서버로 넘길 수 없음
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
                    const data = {title: title, userid: userid, contents: contents};
                    if (await process_submit('/api/board/write', data) > 0) {
                        location.href = '/board/list';
                    }
                    break;
                }
            }
        }
    };
    return (
        <div>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
        <h3>게시판 본문글</h3>
            <form name="write" id="writefrm">
                <div>
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" name="title" onChange={e => handleInput(setTitle, e)} />
                </div>

                <div>
                    <label htmlFor="uid">작성자</label>
                    <input type="text" id="userid" name="userid" value={userid} readOnly />
                </div>

                <div>
                    <label htmlFor="contents" className="dragup">본문</label>
                    <textarea id="contents" name="contents" rows="7" cols="55" onChange={e => handleInput(setContents, e)}></textarea>
                </div>

                <div><label></label>
                    <div className="g-recaptcha cap" data-sitekey='6LdD4OskAAAAAH6Uazf4s8YBShdvsgMUbU5KkmDK'></div>
                </div>


                <div>
                    <label></label>
                    <button type="button" id="wrtbtn" name="wrtbtn" onClick={handlewrite}>입력완료</button>
                    <button type="reset">다시입력</button>
                </div>
            </form>
        </div>
);
}