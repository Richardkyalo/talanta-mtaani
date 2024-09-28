'use client';
import { useState } from 'react';

const Fixtures = () => {
    // Fixtures data for both men and women
    const menFixtures = [
        {
            date: 'Saturday 5 October 2024',
            matches: [
                { time: '14:30', home: 'Misuuni Fc', away: 'Kamulamba Fc', location: 'Canaan Grounds Pool A', homeLogo: '/image/1.jpg', awayLogo: '/image/1.jpg' },
                { time: '17:00', home: 'Salama Fc', away: 'Yikisaaya Fc', location: 'Canaan Grounds Pool B', homeLogo: '/image/1.jpg', awayLogo: '/image/1.jpg' },
                { time: '17:00', home: 'Yindundu Fc', away: 'Kamulamba Fc', location: 'Canaan Grounds Pool A', homeLogo: '/image/1.jpg', awayLogo: '/image/1.jpg' },
                // Add more men's fixtures
            ]
        }
        // Add more date blocks if needed
    ];

    const womenFixtures = [
        {
            date: 'Sunday 6 October 2024',
            matches: [
                { time: '14:30', home: 'Kamulamba Women Fc', away: 'Salama Women Fc', location: 'Canaan Grounds Pool C', homeLogo: '/image/1.jpg', awayLogo: '/image/1.jpg' },
                { time: '17:00', home: 'Yikisaaya Women Fc', away: 'Misuuni Women Fc', location: 'Canaan Grounds Pool B', homeLogo: '/image/1.jpg', awayLogo: '/image/1.jpg' },
                // Add more women's fixtures
            ]
        }
    ];

    const [isMen, setIsMen] = useState(true);

    const displayedFixtures = isMen ? menFixtures : womenFixtures;

    return (
        <section className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="py-8 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-lg mb-6">
                <h1 className="text-5xl mx-4 font-bold mb-4">Fixtures</h1>
                <div className="flex flex-row ml-4 gap-4">
                    {/* Men’s Fixtures Button */}
                    <button
                        onClick={() => setIsMen(true)}
                        className={`${
                            isMen ? 'bg-red-600' : 'bg-gray-400'
                        } text-white py-2 px-8 rounded-full text-xs hover:bg-red-700`}
                    >
                        Men
                    </button>
                    {/* Women’s Fixtures Button */}
                    <button
                        onClick={() => setIsMen(false)}
                        className={`${
                            !isMen ? 'bg-blue-600' : 'bg-gray-400'
                        } text-white py-2 px-8 rounded-full text-xs hover:bg-blue-700`}
                    >
                        Women
                    </button>
                </div>
            </div>

            {/* Fixtures Display */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                {displayedFixtures.map((fixtureGroup, index) => (
                    <div key={index} className="mb-8">
                        {/* Date Section */}
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            {fixtureGroup.date}
                        </h2>
                        <div className="space-y-4">
                            {fixtureGroup.matches.map((match, idx) => (
                                <div key={idx} className="grid grid-cols-4 items-center gap-4 py-4 border-b">
                                    {/* Home Team */}
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={match.homeLogo}
                                            alt={match.home}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <span className="text-lg font-medium">{match.home}</span>
                                    </div>
                                    {/* Time */}
                                    <div className="text-center text-lg text-gray-700">
                                        {match.time}
                                    </div>
                                    {/* Away Team */}
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="text-lg font-medium">{match.away}</span>
                                        <img
                                            src={match.awayLogo}
                                            alt={match.away}
                                            className="w-8 h-8 rounded-full"
                                        />
                                    </div>
                                    {/* Location */}
                                    <div className="text-right text-sm text-gray-500">
                                        {match.location}
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
