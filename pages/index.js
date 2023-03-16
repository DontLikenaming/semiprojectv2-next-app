import Image from 'next/image'
import Layout from "../components/layouts/layout";

export default function Home() {
  return (
      <div id="MainImg">
              <Image src='/img/img.png' alt="golden" width={1000} height={580} />
      </div>
  );
}

Home.getLayout = (page) => (
    <Layout meta = {{title:'NextJs 프로젝트'}}>
        {page}
    </Layout>
)