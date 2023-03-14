// npm install next-auth@3.29.10 --save-dev
// 경로 : pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        Credentials({   // 로그인 폼 정의
            name: 'userid-passwd-credentials',
            credentials: {
                userid: { label: "아이디", type: "text" },
                passwd: {  label: "비밀번호", type: "password" }
            },
            async authorize(credentials, req) {
                const userid= credentials.userid;
                const passwd= credentials.passwd;
                if(userid==='asdf'&&passwd==='asdf') {
                    console.log(credentials);
                    return credentials;
                }
            }
        })
    ], callbacks:{
        async jwt(token,
                   user,
                   account,
                   profile,
                   isNewUser){
            console.log('jwt - ', token);
            if(user?.userid)token.userid = user.userid;
            return token;
        },
        async session(session, userOrToken){
            console.log('session - ', userOrToken);
            session.user.userid = userOrToken.userid;
            return session;
        }
    }
});