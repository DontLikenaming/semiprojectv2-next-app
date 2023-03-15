import Header from "./header";
import Footer from "./footer";


const Layout = ({children, menu}) => {
    return (
        <html lang="ko">
        <head>
            <meta charSet="UTF-8" />
            <title>Next.js 프로젝트</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
        <div id="wrapper">
        <Header menu={menu}/>
        <main>{children}</main>
        <Footer />
        </div>
        </body>
        </html>
    );
}

export default Layout;