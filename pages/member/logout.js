import {getSession, signOut} from "next-auth/client";
import Layout from "../../components/layouts/layout";
import Home from "../index";

export async function getServerSideProps(ctx) {
    const sess = await getSession(ctx);
    if (!sess) {
        return {
            redirect: {parmanent: false, destination: '/member/login'},
            props: {}
        }
    }

    return { props : {sess} };
}

export default function Logout () {
    return(
        <main>
        <button className='logout'
            onClick={()=>signOut().then(r=>location.href='/')}>로그아웃</button>
        </main>
    );
}

Logout.getLayout = (page) => (
    <Layout meta = {{title:'로그아웃'}}>
        {page}
    </Layout>
)