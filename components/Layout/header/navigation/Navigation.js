'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const Navigation = () => {
    const pathname = usePathname(); // Get the current path
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const isActive = (href) => {
        return pathname === href ? 'border-b-4 border-red-500 pb-2' : 'hover:border-b-4 hover:border-red-500 pb-2';
    };

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <>
            <nav className="bg-indigo-500 md:h-20 hidden md:flex font-semibold py-4 shadow-lg">
                <div className="container mx-auto flex items-center justify-between space-x-6">
                    {/* Logo Section */}


                    {/* Menu Items */}
                    <div className="flex space-x-8">
                        <a href="/" className={`text-white ${isActive('/')}`}>HOME</a>
                        <a href="/LiveScore" className={`text-white ${isActive('/LiveScore')}`}>LIVE SCORE</a>
                        <a href="/PlayerStats" className={`text-white ${isActive('/PlayerStats')}`}>PLAYER STATS</a>
                        <a href="/TeamReg" className={`text-white ${isActive('/TeamReg')}`}>TEAM REGISTRATION</a>
                        <a href="/FanZone" className={`text-white ${isActive('/FanZone')}`}>FAN ZONE</a>
                        <a href="/blog" className={`text-white ${isActive('/blog')}`}>BLOG</a>
                        <a href="/ContactUs" className={`text-white ${isActive('/ContactUs')}`}>CONTACT US</a>

                        {/* Admin Dropdown */}
                        {/* {session && session.user?.role === 'admin' && ( */}
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="text-white flex items-center space-x-2 font-semibold hover:text-red-500 focus:outline-none"
                            >
                                <span>ADMIN</span>
                                <IoIosArrowDown
                                    className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 z-50 w-56 bg-blue-700 rounded-lg shadow-lg overflow-hidden">
                                    <ul className="py-2">
                                        <li>
                                            <a
                                                href="/admin/roles"
                                                className="block px-4 py-2 text-sm font-semibold text-white hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                            >
                                                Manage Roles
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/admin/users"
                                                className="block px-4 py-2 text-sm font-semibold text-white hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                            >
                                                Manage Users
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/admin/teams"
                                                className="block px-4 py-2 text-sm font-semibold text-white hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                            >
                                                Manage Teams
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/admin/fixtures"
                                                className="block px-4 py-2 text-sm font-semibold text-white hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                            >
                                                Manage Fixtures
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/admin/results"
                                                className="block px-4 py-2 text-sm font-semibold text-white hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                            >
                                                Manage Results
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* )} */}
                    </div>


                </div>
            </nav>
        </>
    );
};

export default Navigation;
