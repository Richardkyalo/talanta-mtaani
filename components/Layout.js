// components/Layout.js
'use client';
import Head from 'next/head';
import { usePathname } from 'next/navigation'; // Updated import
import Navigation from './Layout/header/navigation/Navigation.js';
import Header from './Layout/header/Header.js';
import Footer from './Layout/footer/footer.js';

const Layout = ({ children }) => {
  const pathname = usePathname(); // Use usePathname to get the current path

  // Define routes without header and footer (e.g., login page)
  const noLayoutRoutes = ['/Login', '/Register', '/Forgot-password'];
  const isNoLayoutPage = noLayoutRoutes.includes(pathname);

  return (
    <div>
      <Head>
        <title>Kuza Talanta Mtaani</title>
        <link rel="icon" href="/image/1.jpg" />
      </Head>
      
      {/* Conditionally render Header and Navigation */}
      {!isNoLayoutPage && (
        <header>
          <Header />
          <Navigation />
        </header>
      )}
      
      {/* Main content */}
      <main>{children}</main>
      
      {/* Conditionally render Footer */}
      {!isNoLayoutPage && <footer><Footer /></footer>}
    </div>
  );
};

export default Layout;
