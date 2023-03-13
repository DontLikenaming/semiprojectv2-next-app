import {useState} from "react";
import {check_captcha, handleInput, process_submit} from "../../models/Utils";

const Join = () => {
    const [userid, setUserid] = useState('');
    const [passwd, setPasswd] = useState('');
    const [check, setCheck] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


    const handlejoin = async () => {
        // recaptcha를 진행하지 않으면 글을 서버로 넘길 수 없음
            switch ((grecaptcha.getResponse()
            && check_captcha(grecaptcha.getResponse()))){
                case userid==='': alert('아이디를 입력하세요!'); break;
                case passwd==='': alert('비밀번호를 입력하세요!'); break;
                case check==='': alert('비밀번호 확인란을 입력하세요!'); break;
                case name==='': alert('이름을 입력하세요!'); break;
                case email==='': alert('이메일을 입력하세요!'); break;
                case passwd!==check: alert('비밀번호를 다시 확인해주세요!'); break;
                default: {
                    const data = {userid: userid, passwd: passwd, name: name, email: email};
                    if (await process_submit('/api/member/join', data) > 0) {
                        console.log('확인용2');
                        location.href = '/member/myinfo';
                    }
                    break;
                }
            }
    };
    return (
        <div>
            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            <h2>회원가입</h2>
            <form name="jnfrm">
                <div>
                    <label htmlFor="userid">아이디 </label>
                    <input type="text" id="userid" name="userid"
                           onChange={e => handleInput(setUserid, e)} />
                </div>
                <div>
                    <label htmlFor="passwd">비밀번호 </label>
                    <input type="password" id="passwd" name="passwd"
                           onChange={e => handleInput(setPasswd, e)} />
                </div>
                <div>
                    <label htmlFor="check">비밀번호 확인 </label>
                    <input type="password" id="check" name="check"
                           onChange={e => handleInput(setCheck, e)} />
                </div>
                <div>
                    <label htmlFor="name">이름 </label>
                    <input type="text" id="name" name="name"
                           onChange={e => handleInput(setName, e)} />
                </div>
                <div>
                    <label htmlFor="email">이메일 </label>
                    <input type="text" id="email" name="email"
                           onChange={e => handleInput(setEmail, e)} />
                </div>
                <div><label></label>
                    <div className="g-recaptcha cap" data-sitekey='6LdD4OskAAAAAH6Uazf4s8YBShdvsgMUbU5KkmDK'></div>
                </div>
                <div>
                    <label></label>
                    <button type="button" id="jnbtn" name="jnbtn"
                            onClick={handlejoin}>입력완료</button>
                    <button type="reset">다시입력</button>
                </div>
            </form>
        </div>
    );
}

export default Join;