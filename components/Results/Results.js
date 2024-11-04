'use client';
import { useState } from 'react';

const Results = () => {
    // Results data for both men and women
    const menResults = [
        {
            date: 'Saturday 5 October 2024',
            matches: [
                { home: 'Misuuni Fc', away: 'Kamulamba Fc', score: '2 - 1', location: 'Canaan Grounds Pool A', homeLogo: '/image/1.jpg', awayLogo: '/image/1.jpg' },
                { home: 'Salama Fc', away: 'Yikisaaya Fc', score: '3 - 2', location: 'Canaan Grounds Pool B', homeLogo: '/image/1.jpg', awayLogo: '/image/1.jpg' },
                { home: 'Yindundu Fc', away: 'Kamulamba Fc', score: '1 - 1', location: 'Canaan Grounds Pool A', homeLogo: '/image/1.jpg', awayLogo: '/image/1.jpg' },
                // Add more men's results
            ]
        }
    ];

    const womenResults = [
        {
            date: 'Sunday 6 October 2024',
            matches: [
                { home: 'Kamulamba Women Fc', away: 'Salama Women Fc', score: '1 - 2', location: 'Canaan Grounds Pool C', homeLogo: '/image/1.jpg', awayLogo: '/image/1.jpg' },
                { home: 'Yikisaaya Women Fc', away: 'Misuuni Women Fc', score: '0 - 3', location: 'Canaan Grounds Pool B', homeLogo: '/image/1.jpg', awayLogo: '/image/1.jpg' },
                // Add more women's results
            ]
        }
    ];

    const [isMen, setIsMen] = useState(true);

    const displayedResults = isMen ? menResults : womenResults;

    return (
        <section className="bg-gray-100 mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="py-8 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-lg mb-6">
                <h1 className="text-5xl mx-4 font-bold mb-4">Results</h1>
                <div className="flex flex-row ml-4 gap-4">
                    {/* Men’s Results Button */}
                    <button
                        onClick={() => setIsMen(true)}
                        className={`${
                            isMen ? 'bg-red-600' : 'bg-gray-400'
                        } text-white py-2 px-8 rounded-full text-xs hover:bg-red-700`}
                    >
                        Men
                    </button>
                    {/* Women’s Results Button */}
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

            {/* Results Table Display */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                {displayedResults.map((resultGroup, index) => (
                    <div key={index} className="mb-8">
                        {/* Date Section */}
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            {resultGroup.date}
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team A</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Team B</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {resultGroup.matches.map((match, idx) => (
                                        <tr key={idx}>
                                            {/* Home Team */}
                                            <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                                                <img
                                                    src={match.homeLogo}
                                                    alt={match.home}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <span className="text-sm font-medium text-gray-900">{match.home}</span>
                                            </td>
                                            {/* Score */}
                                            <td className="px-6 py-4 text-center text-sm text-gray-500">
                                                {match.score}
                                            </td>
                                            {/* Away Team */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end items-center gap-2">
                                                <span className="text-sm font-medium text-gray-900">{match.away}</span>
                                                <img
                                                    src={match.awayLogo}
                                                    alt={match.away}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                            </td>
                                            {/* Location */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                                {match.location}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Results;