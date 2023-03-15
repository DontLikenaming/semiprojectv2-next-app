import axios from "axios";
import {getSession, signOut} from "next-auth/client";


export async function getServerSideProps(ctx) {
    // 세션 객체 가져오기
    const sess = await getSession(ctx);
    if(!sess){  // 로그인 하지 않은 경우 로그인으로 이동
        return {
            redirect: { parmanent:false, destination:'/member/login' },
            props: {}
        }
    }


    //userid = ctx.query.userid;
    //let userid = '아이디';
    let userid = sess.user.userid;  // 로그인한 사용자 아이디

    let params = `userid=${userid}`;

    let url = `http://localhost:3000/api/member/myinfo?${params}`;

    const res = await axios.get(url);
    const myinfo = await res.data[0];

    return { props : {myinfo: myinfo, session: sess} };
}

export default function Myinfo ({myinfo, session}) {
    //const [session, loading] = useSession();
    //console.log('pages myinfo - ', session?.user?.userid);

    return (
        <div>
            <h2>회원정보</h2>
            <table className="myinfo">
                <tbody>
                <tr>
                    <td>아이디</td>
                    <td>{myinfo.userid}</td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td>{myinfo.name}</td>
                </tr>
                <tr>
                    <td>이메일</td>
                    <td>{myinfo.email}</td>
                </tr>
                <tr>
                    <td>가입일</td>
                    <td>{myinfo.regdate}</td>
                </tr>
                </tbody>
            </table>
            {
                session?
                <button onClick={()=>signOut()}>로그아웃</button>:''
            }
        </div>
    );
}