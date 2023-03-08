import '../styles/globals.css'
import '../styles/normalize.css'
import '../styles/main.css'
import '../styles/project2.css'
import '../styles/index.css'
import '../styles/myinfo.css'
import '../styles/list.css'
import Layout from "./components/layout";

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
      <Component {...pageProps} />
      </Layout>
      );
}

export default MyApp
