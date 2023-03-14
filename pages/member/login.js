import axios from "axios";
import {useState} from "react";
import {handleInput} from "../../models/Utils";

/*export async function getServerSideProps(ctx) {
    //userid = ctx.query.userid;
    let userid = '아이디';
    let passwd = 'qlalfqjsgh';

    let params = `userid=${userid}&passwd=${passwd}`;

    let url = `http://localhost:3000/api/member/myinfo?${params}`;

    const res = await axios.get(url);
    const member = await res.data[0];
    console.log(member);

    return { props : {member} }
}*/
export default function Login () {
    const [userid, setUserid] = useState('');
    const [passwd, setPasswd] = useState('');

    const handleLogin = async () => {
        //const data = {userid: userid, passwd: passwd};

        let params = `userid=${userid}&passwd=${passwd}`;
        const url = `http://localhost:3000/api/member/login?${params}`;
        const res = await axios.get(url);
        const result = await res.data;

    };

    return (
        <div>
            <h2>로그인</h2>
            <form name="logfrm">
                <div>
                    <label htmlFor="userid">아이디</label>
                    <input type="text" id="userid"
                           onChange={e => handleInput(setUserid, e)} />
                </div>
                <div>
                    <label htmlFor="passwd">비밀번호 </label>
                    <input type="password" id="passwd"
                           onChange={e => handleInput(setPasswd, e)} />
                </div>
                <div><label></label>
                    <button type="button" id="loginbtn" name="loginbtn"
                    onClick={handleLogin}>로그인</button>
                </div>
            </form>
        </div>
    );
}