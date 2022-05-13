import '../styles/globals.css'
import Layout from '../components/Layout'

//Initialise pages
//Custom App to add layout
//Component is active page
function MyApp({ Component, pageProps }) {
  return  (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
