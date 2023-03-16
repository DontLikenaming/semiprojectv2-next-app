import Image from './img/img.jpg'
import Layout from "../components/layouts/layout";

export default function Home() {
  return (
      <div>
          <a href="/zipcode">
              <img src={Image} alt="golden" />
          </a>
      </div>
  );
}

Home.getLayout = (page) => (
    <Layout meta = {{title:'index'}}>
        {page}
    </Layout>
)