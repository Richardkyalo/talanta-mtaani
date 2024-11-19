"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { IoIosLogIn } from "react-icons/io";
import { useSession, signOut } from 'next-auth/react';
import { CiLogout } from "react-icons/ci";

const Header = () => {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const [adminDropdownOpen, setAdminDropdownOpen] = useState(false); // Dropdown state for Admin
    const pathname = usePathname(); // Get the current path

    const toggle = () => {
        setOpen(!open);
    };

    const toggleAdminDropdown = () => {
        setAdminDropdownOpen(!adminDropdownOpen);
    };

    const isActiveLink = (href) => {
        return pathname === href ? 'text-red-500' : 'text-gray-700 hover:text-blue-500';
    };

    return (
        <header className={`${open ? 'absolute inset-0' : 'bg-white'} font-bold shadow-md p-4`}>
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                {!open && (
                    <div className="flex items-center">
                        <img src="/image/1.jpg" alt="Logo" className="h-8 rounded-full" />
                        <h1 className="text-xl text-black font-bold ml-2">Kuza Talanta Mtaani</h1>
                    </div>
                )}

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-4">
                    <a href="/AboutUs" className={isActiveLink('/AboutUs')}>About Us</a>
                    <a href="/Teams" className={isActiveLink('/Teams')}>Teams</a>
                    <a href="/Fixtures" className={isActiveLink('/Fixtures')}>Fixtures</a>
                    <a href="/Results" className={isActiveLink('/Results')}>Results</a>
                    <a href="/Table" className={isActiveLink('/Table')}>League Table</a>
                    <a href="/Highlights" className={isActiveLink('/Highlights')}>Highlights</a>
                    {/* <a href="/Blog" className={isActiveLink('/Blog')}>Blog</a> */}
                    <a href="/ContactUs" className={isActiveLink('/ContactUs')}>Contact Us</a>
                </nav>

                {/* Right Section */}
                {session ? (
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex items-center">
                            <span className="ml-2 text-black font-bold">{session.username}</span>
                        </div>
                        <button
                            onClick={() => signOut()}
                            className="flex flex-row items-center btn btn-sm border border-red-500 text-blue-500 px-4 py-2 hover:bg-red-500 hover:text-white rounded-full"
                        >
                            <CiLogout className='mr-2' />
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="hidden md:flex items-center space-x-4">
                        <a
                            href='/Login'
                            className="flex flex-row items-center btn btn-sm border border-blue-500 text-blue-500 px-4 py-2 hover:bg-blue-500 hover:text-white rounded-full"
                        >
                            <IoIosLogIn className='mr-2' />
                            Login
                        </a>
                    </div>
                )}

                {/* Mobile Menu Button */}
                <div className="flex md:hidden justify-end items-center">
                    <button
                        className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-black focus:outline-none"
                        onClick={toggle}
                    >
                        {open ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
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
                className={`fixed top-0 z-30 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-1000 ${open ? 'translate-x-0' : 'translate-x-full'}`}
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
                    <a href="/" className={isActiveLink('/')}>Home</a>
                    <a href="/AboutUs" className={isActiveLink('/AboutUs')}>About Us</a>
                    <a href="/Teams" className={isActiveLink('/Teams')}>Teams</a>
                    <a href="/Fixtures" className={isActiveLink('/Fixtures')}>Fixtures</a>
                    <a href="/Results" className={isActiveLink('/Results')}>Results</a>
                    <a href="/Table" className={isActiveLink('/Table')}>League Table</a>
                    <a href="/LiveScore" className={isActiveLink('/LiveScore')}>Live Score</a>
                    <a href="/PlayerStats" className={isActiveLink('/PlayerStats')}>Player Stats</a>
                    <a href="/TeamReg" className={isActiveLink('/TeamReg')}>Team Registration</a>
                    <a href="/FanZone" className={isActiveLink('/FanZone')}>Fan Zone</a>
                    <a href="/Highlights" className={isActiveLink('/Highlights')}>Highlights</a>
                    <a href="/blog" className={isActiveLink('/blog')}>Blog</a>
                    <a href="/ContactUs" className={isActiveLink('/ContactUs')}>Contact Us</a>

                    {/* Admin Dropdown */}
                    {/* {session?.role === 'admin' && ( */}
                    <div>
                        <button
                            onClick={toggleAdminDropdown}
                            className={`flex justify-between w-full text-gray-700 hover:text-blue-500 ${adminDropdownOpen ? 'text-red-500' : ''}`}
                        >
                            Admin
                            <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 transform ${adminDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {adminDropdownOpen && (
                            <div className="ml-4 flex flex-col space-y-2">
                                {/* <a href="/admin/roles" className="text-gray-700 hover:text-blue-500">Manage Roles</a> */}
                                <a href="/admin/users" className="text-gray-700 hover:text-blue-500">Manage Users</a>
                                <a href="/admin/matches" className="text-gray-700 hover:text-blue-500">Manage Matches</a>
                                <a href="/admin/teams" className="text-gray-700 hover:text-blue-500">Manage Teams</a>
                                <a href="/admin/fixtures" className="text-gray-700 hover:text-blue-500">Manage Fixtures</a>
                                <a href="/admin/results" className="text-gray-700 hover:text-blue-500">Manage Results</a>
                            </div>
                        )}
                    </div>
                    {/* )} */}
                    {!session && (
                        <div className='flex flex-col space-y-4 p-8 w-full text-center'>
                            <a
                                href='/Login'
                                className="btn btn-sm w-full border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white"
                            >
                                Login
                            </a>
                        </div>
                    )}

                </nav>
            </div>
        </header>
    );
};

export default Header;
