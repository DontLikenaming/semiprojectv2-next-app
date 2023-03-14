// npm install next-auth@3.29.10 --save-dev
// 경로 : pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        Credentials({   // 로그인 폼 정의
            name: 'email-passwd-credentials',
            credentials: {
                email: { label: "이메일", type: "email" },
                passwd: {  label: "비밀번호", type: "password" }
            },
            async authorize(credentials, req) {
                // 현 상태에선 아무 것도 안쓰거나
                // 이메일 양식에 맞추면 아무거나 로그인 됨
                console.log(credentials);
                return credentials;
            }
        })
    ]
});