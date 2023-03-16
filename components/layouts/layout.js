import Header from "./header";
import Footer from "./footer";
import Head from "next/head";


const Layout = ({children, menu, meta}) => {
    const {title, description, icon} = meta;
    return (
        <>
        <Head>
            <title>{title}</title>
            <link rel="icon" href={icon || '/favicon.ico'} />
        </Head>
        <div id="wrapper">
        <Header menu={menu}/>
        {children}
        <Footer />
        </div>
        </>
    );
}

export default Layout;