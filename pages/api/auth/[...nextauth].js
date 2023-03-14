// npm install next-auth@3.29.10 --save-dev
// 경로 : pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {hashPassword} from "../../../models/Utils";
import axios from "axios";

export default NextAuth({
    providers: [
        Credentials({   // 로그인 폼 정의
            id: 'userid-passwd-credentials',
            name: 'userid-passwd-credentials',
            credentials: {
                userid: { label: "아이디", type: "text" },
                passwd: {  label: "비밀번호", type: "password" }
            },
            async authorize(credentials, req) {
                const userid= credentials.userid;
                const passwd= credentials.passwd;

/*                let hshpwd = '';
                (passwd==='')?hshpwd = '':hshpwd = await hashPassword(passwd);*/

                //console.log('hshpwd: ',hshpwd);
                let params = `userid=${userid}&passwd=${passwd}`;
                const url = `http://localhost:3000/api/member/login?${params}`;
                const res = await axios.get(url);
                const result = await res.data;

                if(result.cnt===1) {
                    //console.log(credentials);
                    return credentials;
                }
            }
        })
    ],
    pages:{ // 인증에 사용자 정의 로그인 페이지 사용
        signIn: '/member/login'
    },
    callbacks:{
        async jwt(token,
                   user,
                   account,
                   profile,
                   isNewUser){
            //console.log('jwt - ', token);
            if(user?.userid)token.userid = user.userid;
            return token;
        },
        async session(session, userOrToken){
            //console.log('session - ', userOrToken);
            session.user.userid = userOrToken.userid;
            return session;
        }
    }
});