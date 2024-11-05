"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname(); // Get the current path

    const toggle = () => {
        setOpen(!open);
    };

    const isActiveLink = (href) => {
        return pathname === href ? 'text-red-500' : 'text-gray-700 hover:text-blue-500';
    }

    return (
        <header className={`${open ? 'absolute inset-0' : 'bg-white'} font-bold shadow-md p-4`}>
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}

                {!open &&
                    <div className="flex items-center">
                        <img src="/image/1.jpg" alt="Logo" className="h-8 rounded-full" />
                        <h1 className="text-xl text-black font-bold ml-2">Kuza Talanta Mtaani</h1>
                    </div>
                }


                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-4">
                    <a href="/AboutUs" className={isActiveLink('/AboutUs')}>About Us</a>
                    <a href="/Teams" className={isActiveLink('/Teams')}>Teams</a>
                    <a href="/Fixtures" className={isActiveLink('/Fixtures')}>Fixtures</a>
                    <a href="/Results" className={isActiveLink('/Results')}>Results</a>
                    <a href="/Table" className={isActiveLink('/Table')}>League Table</a>
                </nav>

                {/* Right Section (Search and Language) */}
                <div className="hidden md:flex items-center space-x-4">
                    <a href='/Login' className="btn btn-sm border border-blue-500 text-blue-500 px-4 py-2 hover:bg-blue-500 hover:text-white rounded-full">Login</a>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden justify-end items-center">
                    <button
                        className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-black focus:outline-none"
                        onClick={toggle}
                    >
                        {open ? (
                            <div className='hidden'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 z-30 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-1000 ${open ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex justify-end items-center p-4 border-b">
                    <div className="flex items-center">
                        <img src="/image/1.jpg" alt="Logo" className="h-8 rounded-full" />
                        <h1 className="text-xl text-black font-bold ml-2">Kuza Talanta Mtaani</h1>
                    </div>
                    <button onClick={toggle} className="text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav className="flex flex-col bg-white space-y-4 p-4">
                    <a href="/" className={`text-gray-700 hover:text-blue-500 ${pathname === '/' ? 'text-red-500' : ''}`}>Home</a>
                    <a href="/AboutUs" className={`text-gray-700 hover:text-blue-500 ${pathname === '/AboutUs' ? 'text-red-500' : ''}`}>About Us</a>
                    <a href="/Teams" className={`text-gray-700 hover:text-blue-500 ${pathname === '/Teams' ? 'text-red-500' : ''}`}>Teams</a>
                    <a href="/Fixtures" className={`text-gray-700 hover:text-blue-500 ${pathname === '/Fixtures' ? 'text-red-500' : ''}`}>Fixtures</a>
                    <a href="/Results" className={`text-gray-700 hover:text-blue-500 ${pathname === '/Results' ? 'text-red-500' : ''}`}>Results</a>
                    <a href="/Table" className={`text-gray-700 hover:text-blue-500 ${pathname === '/Table' ? 'text-red-500' : ''}`}>League Table</a>
                    <a href="/LiveScore" className={`text-gray-700 hover:text-blue-500 ${pathname === '/LiveScore' ? 'text-red-500' : ''}`}>Live Score</a>
                    <a href="/PlayerStats" className={`text-gray-700 hover:text-blue-500 ${pathname === '/PlayerStats' ? 'text-red-500' : ''}`}>Player Stats</a>
                    <a href="/TeamReg" className={`text-gray-700 hover:text-blue-500 ${pathname === '/TeamReg' ? 'text-red-500' : ''}`}>Team Registration</a>
                    <a href="#" className={`text-gray-700 hover:text-blue-500 ${pathname === '/FanZone' ? 'text-red-500' : ''}`}>Fan Zone</a>
                    <a href="/Blog" className={`text-gray-700 hover:text-blue-500 ${pathname === '/Blog' ? 'text-red-500' : ''}`}>Blog</a>
                    <a href="/ContactUs" className={`text-gray-700 hover:text-blue-500 ${pathname === '/ContactUs' ? 'text-red-500' : ''}`}>Contact Us</a>
                    <div className='flex flex-col space-y-4 p-8 w-full text-center'>
                        <a href='/Login' className="btn btn-sm w-full border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white">Login</a>
                    </div>
                </nav>
            </div>
        </header >
    );
};

export default Header;
