'use client';
import { useState, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { usePathname } from 'next/navigation'; // Updated import
import Navigation from './Layout/header/navigation/Navigation.js';
import Header from './Layout/header/Header.js';
import Footer from './Layout/footer/footer.js';
import { MantineProvider } from '@mantine/core';
import HashLoader from 'react-spinners/HashLoader'; // Import HashLoader

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  const pathname = usePathname(); // Use usePathname to get the current path

  // Define routes without header and footer (e.g., login page)
  const noLayoutRoutes = ['/Login', '/Register', '/ForgotPassword'];
  const isNoLayoutPage = noLayoutRoutes.includes(pathname);

  useEffect(() => {
    // Simulate loading duration
    const timer = setTimeout(() => setIsLoading(false), 5000); // 1-second delay

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [pathname]); // Re-run effect when pathname changes

  return (
    <SessionProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <div>
          <Head>
            <title>Kuza Talanta Mtaani</title>
            <link rel="icon" href="/image/1.jpg" />
          </Head>

          {/* Show loader if loading */}
          {isLoading ? (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <HashLoader color="blue" size={50} />
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </MantineProvider>
    </SessionProvider>
  );
};

export default Layout;
