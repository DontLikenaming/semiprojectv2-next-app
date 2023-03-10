import {useState} from "react";

export default function Write () {
    const [title, setTitle] = useState('');
    const [userid, setUserid] = useState('asdf');
    const [contents, setContents] = useState('');
    return (
        <div>
        <h3>게시판 본문글</h3>
            <form name="write" id="writefrm">
                <div>
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" name="title" />
                </div>

                <div>
                    <label htmlFor="uid">작성자</label>
                    <input type="text" id="userid" name="userid" value="{userid}" readOnly />
                </div>

                <div>
                    <label htmlFor="contents" className="dragup">본문</label>
                    <textarea id="contents" name="contents" rows="7" cols="55"></textarea>
                </div>

                <div>
                    <label></label>
                    <button type="button" id="wrtbtn" name="wrtbtn">입력완료</button>
                    <button type="reset">다시입력</button>
                </div>
            </form>
        </div>
);
}