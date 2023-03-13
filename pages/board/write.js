import {useState} from "react";
import axios from "axios";

const check_captcha = async (response) => {
    let url = '/api/board/recaptcha?response='+response;
    const data = axios.get(url).then(data => data.data);
    //console.log((await data).success);

    return (await data).success;
};
const process_write = async (data) => {
    console.log(data);
    const cnt = fetch('/api/board/write',
        {
            method: 'POST', mode: 'cors', body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json());
    console.log(cnt);
    return (await cnt).cnt;
};
export default function Write () {
    const [title, setTitle] = useState('');
    const [userid, setUserid] = useState('asdf');
    const [contents, setContents] = useState('');

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleContents = (e) => {
        setContents(e.target.value);
    };
    const handlewrite = async () => {
        // recaptcha를 진행하지 않으면 글을 서버로 넘길 수 없음
            if (grecaptcha.getResponse()
                && check_captcha(grecaptcha.getResponse())) {
                if(title!==null||contents!==null){
                const data = {title: title, userid: userid, contents: contents};
                //console.log(data);
                if (await process_write(data) > 0) {
                    location.href = '/board/list';
                }
            } else {return false;}
        }
    };
    return (
        <div>
        <h3>게시판 본문글</h3>
            <form name="write" id="writefrm">
                <div>
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" name="title" onChange={handleTitle} />
                </div>

                <div>
                    <label htmlFor="uid">작성자</label>
                    <input type="text" id="userid" name="userid" value={userid} readOnly />
                </div>

                <div>
                    <label htmlFor="contents" className="dragup">본문</label>
                    <textarea id="contents" name="contents" rows="7" cols="55" onChange={handleContents}></textarea>
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