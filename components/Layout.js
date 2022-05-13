import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/layout.module.css';

//const Layout = (props) => {
export default function Layout({ children }) {
    //const { title, description, children } = props
    const title = 'Let us know'
    const siteTitle = 'leeds.gov.uk'
    const description = "Leeds City Council - 'Do It Online' Portal."

    return (
        <div className={styles.container}>
            <Head>
                <title>{title ? `${title} - ${siteTitle}` : siteTitle}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
                    <a href="https://www.leeds.gov.uk" style={{color: "white",textDecoration: "none",marginRight:"1000px"}}>LEEDS.GOV.UK</a>
                    <Link href="/" style={{color: "white",textDecoration: "none"}}>{siteTitle}</Link>
            </header>

            <main>
                <div className={styles.main}>
                    {children}
                </div>
            </main>

            <footer>
                <div className={styles.footer}>
                    <a href="https://www.leeds.gov.uk/formaccessibility"
                        target="_blank"
                        rel="noopener noreferrer">Accessibility</a>
                    <div className={styles.copyright}>
                        <p><small>Sample Inc.</small></p>
                    </div>
                </div>
            </footer>

        </div>
    )
}

//export default Layout