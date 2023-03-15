import {useState} from "react";
import {handleInput} from "../../models/Utils";
import {getSession, signIn} from "next-auth/client";

export async function getServerSideProps(ctx) {
    const sess = await getSession(ctx);
    if(sess){
        return {
            redirect: { parmanent:false, destination:'/member/myinfo' },
            props: {}
        }
    }
    return { props: {} }
}

export default function Login () {
    const [userid, setUserid] = useState('');
    const [passwd, setPasswd] = useState('');


    const handleLogin = async () => {
        //const data = {userid: userid, passwd: passwd};

        // signIn('인증 할 때 활용할 Credentials id',{'인증할 때 사용할 정보'}
        //const res = await signIn('userid-passwd-credentials',{
        const {error} = await signIn('userid-passwd-credentials',{
            userid, passwd, redirect:false
        });

        // res는 인증성공 여부를 http 상태코드로 알려줌
        // 인증 성공하면 200, 실패하면 401
        //console.log('pages/login - ', await res.status);

        //error는 인증 성공하면 null, 실패하면 CredentialsSignin로 알려줌
        console.log('pages/login - ', await error);

        if(error){location.href='/member/failogin'}else {location.href='/member/myinfo'}

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