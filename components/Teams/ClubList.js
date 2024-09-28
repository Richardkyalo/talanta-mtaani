"use client";
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaArrowRight } from "react-icons/fa";
const ClubList = () => {
    // Example club data, replace with dynamic data as needed
    const clubs = [
        { name: "Kamulamba FC", logo: "/image/tourn4.jpg" },
        { name: "Yikisaaya FC", logo: "/image/tourn4.jpg" },
        { name: "Yindundu Fc", logo: "/image/tourn4.jpg" },
        { name: "Misuuni Fc", logo: "/image/tourn4.jpg" },
        { name: "Salama Fc", logo: "/image/tourn4.jpg" },
        // Add more clubs here
    ];

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredClubs = clubs.filter((club) =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center py-8 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-lg mb-6">
                <h1 className="text-5xl font-bold mb-4">Clubs</h1>
                <div className="relative max-w-lg mx-auto">
                    <input
                        type="text"
                        className="w-full p-4 rounded-full text-black"
                        placeholder="Search Clubs"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <FaSearch className="absolute top-4 right-4 text-gray-500" />
                </div>
            </div>

            {/* Filter Section */}
            {/* <div className="flex justify-between items-center mb-8">
                <button className="bg-gray-200 text-gray-700 py-2 px-6 rounded-md shadow-md">
                    Filter
                </button>
            </div> */}

            {/* Club Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredClubs.map((club, index) => (
                    <div key={index} className="bg-white border-b border-red-500 shadow-lg rounded-lg p-6 flex flex-col items-center">
                        <img
                            src={club.logo}
                            alt={club.name}
                            className="object-contain mb-4 rounded rounded-t-lg"
                        />
                        <div className='flex flex-row items-center justify-between gap-8'>
                        <h2 className="text-xl font-bold text-gray-800">{club.name}</h2>
                        <span className="text-red-600 text-sm">
                        <FaArrowRight />
                        </span>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
};

export default ClubList;
