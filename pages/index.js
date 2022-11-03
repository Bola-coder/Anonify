import Head from 'next/head'
import Banner from '../Components/Banner'
import Footer from '../Components/Footer'
import WhyAnonify from '../Components/WhyAnonify'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Anonify</title>
        <meta name="description" content="A simple anonymous message web app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <WhyAnonify />
      <Footer />
    </div>
  )
}
