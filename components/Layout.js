// components/Layout.js
import Head from 'next/head';
import Navigation from './Layout/header/navigation/Navigation.js';
import Header from './Layout/header/Header.js';
import Footer from './Layout/footer/footer.js'
const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Kuza Talanta Mtaani</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header > {/* Add Header Component */}
        <Header/>
        <Navigation/>
         </header>
      <main>{children}</main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};

export default Layout;
