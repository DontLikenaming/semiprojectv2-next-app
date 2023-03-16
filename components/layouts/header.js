import {getSession, signOut} from "next-auth/client";

// component에는 getServerSideProps 사용불가
/*export async function getServerSideProps(ctx) {
    const sess = await getSession(ctx);
    console.log('header myinfo - ', sess);

    return { props: {sess} }
}*/

const Header = ({menu}) => {
    //console.log('header myinfo - ', menu);

    return (
        <>
            <header><h1>Next.js 프로젝트</h1></header>
            <nav>
                <ul className="navul">
                    <li>
                        <a href="/">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/member/join">
                            회원가입
                        </a>
                    </li>
                    {/*문자열을 html 태그로 출력할 때 dangerouslySetInnerHTML={{__html:'내용'}}*/}
                    {/*<li dangerouslySetInnerHTML={{__html:menu}}></li>*/}
                    <li><a href="/member/login">로그인</a></li>
                    <li>
                        <a href="/board/list">
                            게시판
                        </a>
                    </li>
                    <li>
                        <a href="/member/myinfo">
                            회원정보
                        </a>
                    </li>
                </ul>
                <hr className="clear"></hr>
            </nav>
        </>
    );
}

export default Header;