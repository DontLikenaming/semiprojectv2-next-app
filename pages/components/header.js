import Link from 'next/link'

const Header = () => {
    return (
        <>
            <header><h1>Next.js 프로젝트</h1></header>
            <nav>
                <ul className="navul">
                    <li>
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/member/join">
                            회원가입
                        </Link>
                    </li>
                    <li>
                        <Link href="/member/login">
                            로그인
                        </Link>
                    </li>
                    <li>
                        <Link href="/board/list">
                            게시판
                        </Link>
                    </li>
                    <li>
                        <Link href="/member/myinfo">
                            회원정보
                        </Link>
                    </li>
                </ul>
                <hr className="clear"></hr>
            </nav>
        </>
    );
}

export default Header;