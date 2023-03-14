import axios from "axios";

export async function getServerSideProps(ctx) {
    //userid = ctx.query.userid;
    let userid = '아이디';

    let params = `userid=${userid}`;

    let url = `http://localhost:3000/api/member/myinfo?${params}`;

    const res = await axios.get(url);
    const myinfo = await res.data[0];

    return { props : {myinfo} }
}

export default function Myinfo ({myinfo}) {
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
        </div>
    );
}