// 경로 : pages/auth/login.js

import {signIn, signOut, useSession} from "next-auth/client";

const Login = () => {
    const [session, loading] = useSession();

    if(session){    // 세션이 존재할 때의 분기
        return (
            <>
                <h3>{session.user.userid}님 환영합니다!</h3>
                <button onClick={()=>signOut()}>로그아웃</button>
            </>
        );
    }

    return (    // 세션이 존재하지 않을 때의 분기
        <>
            <h3>로그인이 필요합니다!</h3>
            <button onClick={()=>signIn()}>로그인</button>
        </>
    );
}

export default Login;