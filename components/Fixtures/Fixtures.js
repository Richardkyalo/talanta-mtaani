'use client';
import { useState } from 'react';
import Image from 'next/image';

const Fixtures = () => {
    // Fixtures data for both men and women
    const menFixtures = [
        {
            date: 'Saturday 5 October 2024',
            matches: [
                { time: '14:30', home: 'Misuuni Fc', away: 'Kamulamba Fc', location: 'Canaan Grounds Pool A', homeLogo: '/image/1.jpg', awayLogo: '/image/1.jpg' },
                { time: '17:00', home: 'Salama Fc', away: 'Yikisaaya Fc', location: 'Canaan Grounds Pool B', homeLogo: '/image/1.jpg', awayLogo: '/image/1.jpg' },
                { time: '17:00', home: 'Yindundu Fc', away: 'Kamulamba Fc', location: 'Canaan Grounds Pool A', homeLogo: '/image/1.jpg', awayLogo: '/image/1.jpg' },
            ]
        }
    ];

    const womenFixtures = [
        {
            date: 'Sunday 6 October 2024',
            matches: [
                { time: '14:30', home: 'Kamulamba Women Fc', away: 'Salama Women Fc', location: 'Canaan Grounds Pool C', homeLogo: '/image/1.jpg', awayLogo: '/image/1.jpg' },
                { time: '17:00', home: 'Yikisaaya Women Fc', away: 'Misuuni Women Fc', location: 'Canaan Grounds Pool B', homeLogo: '/image/1.jpg', awayLogo: '/image/1.jpg' },
            ]
        }
    ];

    const [isMen, setIsMen] = useState(true);
    const displayedFixtures = isMen ? menFixtures : womenFixtures;

    return (
        <section className="bg-gray-100 mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="py-8 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-lg mb-6">
                <h1 className="text-5xl mx-4 font-bold mb-4">Fixtures</h1>
                <div className="flex flex-row ml-4 gap-4">
                    {/* Men’s Fixtures Button */}
                    <button
                        onClick={() => setIsMen(true)}
                        className={`${isMen ? 'bg-red-600' : 'bg-gray-400'
                            } text-white py-2 px-8 rounded-full text-xs hover:bg-red-700`}
                    >
                        Men
                    </button>
                    {/* Women’s Fixtures Button */}
                    <button
                        onClick={() => setIsMen(false)}
                        className={`${!isMen ? 'bg-blue-600' : 'bg-gray-400'
                            } text-white py-2 px-8 rounded-full text-xs hover:bg-blue-700`}
                    >
                        Women
                    </button>
                </div>
            </div>

            {/* Fixtures Card Display */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                {displayedFixtures.map((fixtureGroup, index) => (
                    <div key={index} className="mb-8">
                        {/* Date Section */}
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            {fixtureGroup.date}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {fixtureGroup.matches.map((match, idx) => (
                                <div key={idx} className="bg-gray-50 rounded-lg p-4 shadow-md flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-gray-500">{match.time}</span>
                                        <div className='flex flex-col gap-2'>
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src={match.homeLogo}
                                                    width={24}
                                                    height={24}
                                                    alt={match.home}
                                                    className="rounded-full"
                                                />
                                                <span className="text-xs font-medium text-gray-900">{match.home}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src={match.awayLogo}
                                                    alt={match.away}
                                                    width={24}
                                                    height={24}
                                                    className="rounded-full"
                                                />
                                                <span className="text-xs font-medium text-gray-900">{match.away}</span>

                                            </div>
                                        </div>
                                        <div className="max-w-12 text-sm text-gray-500 text-right">
                                        {match.location}
                                    </div>
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Fixtures;
