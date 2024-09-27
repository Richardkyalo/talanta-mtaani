"use client";
import React, { useState } from 'react';

const Header = () => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    return (
        <header className={`${open ? 'absolute inset-0 bg-black bg-opacity-40' : 'bg-white'} font-bold shadow-md p-4`}>
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                {open ? (
                    <div className="hidden transform transition-transform duration-1000 p-4">
                        <img src="/image/1.jpg" alt="Logo" className="h-8 rounded-full" />
                        <h1 className="text-xl  text-black font-bold ml-2">Kuza Talanta Mtaani</h1>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <img src="/image/1.jpg" alt="Logo" className="h-8 rounded-full" />
                        <h1 className="text-xl text-black font-bold ml-2">Kuza Talanta Mtaani</h1>
                    </div>
                )}


                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-4">
                    <a href="#" className="text-gray-700 hover:text-blue-500">Teams</a>
                    <a href="#" className="text-gray-700 hover:text-blue-500">Fixtures</a>
                    <a href="#" className="text-gray-700 hover:text-blue-500">Results</a>
                    <a href="#" className="text-gray-700 hover:text-blue-500">League Table</a>
                </nav>

                {/* Right Section (Search and Language) */}
                <div className="hidden md:flex items-center space-x-4">
                    <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full">Search</button>
                    <button className="text-gray-700">🌍</button>
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
                className={`fixed top-0 z-30 right-0 h-full w-64 bg-white  shadow-lg transform transition-transform duration-1000 ${open ? 'translate-x-0' : 'translate-x-full'
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
                <a href="/" className="text-gray-700 hover:text-blue-500">Home</a>
                    <a href="#" className="text-gray-700 hover:text-blue-500">Teams</a>
                    <a href="#" className="text-gray-700 hover:text-blue-500">Fixtures</a>
                    <a href="#" className="text-gray-700 hover:text-blue-500">Results</a>
                    <a href="#" className="text-gray-700 hover:text-blue-500">League Table</a>
                    <a href="#" className="text-gray-700 hover:text-blue-500">Live Score</a>
                    <a href="#" className="text-gray-700 hover:text-blue-500">Player Stats</a>
                    <a href="#" className="text-gray-700 hover:text-blue-500">Team Registration</a>
                    <a href="#" className="text-gray-700 hover:text-blue-500">Fan Zone</a>
                    <div className='flex flex-col space-y-4 p-8'>
                        <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full">Search</button>
                        <button className="text-gray-700">🌍</button>
                    </div>
                </nav>

            </div>
        </header>
    );
};

export default Header;
