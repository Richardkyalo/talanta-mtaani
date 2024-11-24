'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { IoIosArrowDown } from 'react-icons/io';
import { userRoleService } from '@/app/api/rbac/userRoleCreate';

const getRoleById = async (id) => {
    try {
        const response = await userRoleService.getRoleById(id);
        return response;
    } catch (error) {
        console.error("Error in getRoleById:", error);
        throw error;
    }
};

const Navigation = () => {
    const { data: session } = useSession();
    const [roles, setRoles] = useState([]);
    const pathname = usePathname(); // Get the current path
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // console.log(session);

    const roleIds= session?.role_ids || [];

    const isActive = (href) => {
        return pathname === href ? 'border-b-4 border-red-500 pb-2' : 'hover:border-b-4 hover:border-red-500 pb-2';
    };

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    // Fetch roles on mount or when `roleIds` changes
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const fetchedRoles = await Promise.all(
          roleIds.map(async (roleId) => {
            const response = await getRoleById(roleId);
            // console.log("Response from getRoleById:", response); // Ensure you see the correct role data here
            return {
              id: roleId,
              name: response?.data?.data?.data?.name || "Unknown Role",
            };
          })
        );
        // console.log("Fetched roles:", fetchedRoles); // Debug: Ensure this array has correct names
        setRoles(fetchedRoles); // Update state with correct fetched roles
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
  
    if (roleIds.length > 0) fetchRoles();
  }, [roleIds]);

  const hasAdminRole = roles.some((role) => role.name === "admin");

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
                        {hasAdminRole && (
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
                                                href="/admin/users"
                                                className="block px-4 py-2 text-sm font-semibold text-white hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                            >
                                                Manage Users
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/admin/Matches"
                                                className="block px-4 py-2 text-sm font-semibold text-white hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                            >
                                                Manage Matches
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

                         )}
                    </div>


                </div>
            </nav>
        </>
    );
};

export default Navigation;
