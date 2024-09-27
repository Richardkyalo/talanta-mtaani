// components/Layout.js
import Head from 'next/head';
import Navigation from './header/navigation/Navigation.js';
import Header from './header/Header';
import Footer from '../components/footer/footer.js'
const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Kuza Talanta Mtaani</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className='sticky top-0 z-50'> {/* Add Header Component */}
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
