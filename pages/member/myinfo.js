const Myinfo = () => {
    return (
        <div>
            <h2>회원정보</h2>
            <table className="myinfo">
                <tbody>
                <tr>
                    <td>아이디</td>
                    <td>[아이디]</td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td>[이름]</td>
                </tr>
                <tr>
                    <td>이메일</td>
                    <td>[이메일]</td>
                </tr>
                <tr>
                    <td>가입일</td>
                    <td>[가입일]</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Myinfo;