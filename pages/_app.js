import '../public/css/globals.css'
import '../public/css/normalize.css'
import '../public/css/main.css'
import '../public/css/project2.css'
import '../public/css/index.css'
import '../public/css/myinfo.css'
import '../public/css/list.css'
import Layout from "./layouts/layout";

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
      <Component {...pageProps} />
      </Layout>
      );
}

export default MyApp
