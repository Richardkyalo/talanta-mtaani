'use client';
import { useEffect, useState } from 'react';

const LiveScore = () => {
    // Example match data for men and women live scores
    const menMatches = [
        { id: 1, homeTeam: 'Misuuni Fc', awayTeam: 'Kamulamba Fc', homeScore: 2, awayScore: 1, status: 'Full-Time', logoHome: '/image/1.jpg', logoAway: '/image/1.jpg', time: '90:00' },
        { id: 2, homeTeam: 'Salama Fc', awayTeam: 'Yikisaaya Fc', homeScore: 1, awayScore: 1, status: 'In Progress', logoHome: '/image/1.jpg', logoAway: '/image/1.jpg', time: '75:30' },
        // Add more matches
    ];

    const womenMatches = [
        { id: 1, homeTeam: 'Salama Women Fc', awayTeam: 'Misuuni Women Fc', homeScore: 3, awayScore: 0, status: 'Full-Time', logoHome: '/image/1.jpg', logoAway: '/image/1.jpg', time: '90:00' },
        { id: 2, homeTeam: 'Kamulamba Women Fc', awayTeam: 'Yikisaaya Women Fc', homeScore: 1, awayScore: 2, status: 'In Progress', logoHome: '/image/1.jpg', logoAway: '/image/1.jpg', time: '65:12' },
        // Add more matches
    ];

    const [isMen, setIsMen] = useState(true);

    // Example of automatically updating match times (for in-progress matches)
    useEffect(() => {
        const interval = setInterval(() => {
            // Logic for updating time or scores in real-time
        }, 10000); // Update every 10 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const displayedMatches = isMen ? menMatches : womenMatches;

    return (
        <section className="bg-gray-100 mx-auto px-4 py-8 max-w-screen-lg">
            {/* Header Section */}
            <div className="py-8 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg mb-6">
                <h1 className="text-4xl sm:text-5xl mx-4 font-bold mb-4">Live Scores</h1>
                <div className="flex flex-row ml-4 gap-4">
                    {/* Men's Live Score Button */}
                    <button
                        onClick={() => setIsMen(true)}
                        className={`${
                            isMen ? 'bg-red-600' : 'bg-gray-400'
                        } text-white py-2 px-4 sm:px-8 rounded-full text-xs hover:bg-red-700`}
                    >
                        Men
                    </button>
                    {/* Women's Live Score Button */}
                    <button
                        onClick={() => setIsMen(false)}
                        className={`${
                            !isMen ? 'bg-blue-600' : 'bg-gray-400'
                        } text-white py-2 px-4 sm:px-8 rounded-full text-xs hover:bg-blue-700`}
                    >
                        Women
                    </button>
                </div>
            </div>

            {/* Live Scores Display */}
            <div className="space-y-6">
                {displayedMatches.map((match) => (
                    <div key={match.id} className="bg-white shadow-lg rounded-lg p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 sm:gap-6">
                            {/* Home Team */}
                            <div className="flex flex-col items-center sm:items-start gap-2">
                                <img src={match.logoHome} alt={match.homeTeam} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full" />
                                <div className="text-center sm:text-left">
                                    <p className="text-lg font-semibold text-gray-800">{match.homeTeam}</p>
                                    <p className="text-gray-600 text-sm">Home</p>
                                </div>
                            </div>

                            {/* Score and Status */}
                            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 sm:gap-6">
                                {/* Match Status */}
                                <div className={`${
                                    match.status === 'In Progress' ? 'text-green-500' : 'text-red-500'
                                } text-lg font-semibold sm:hidden`}>
                                    {match.status}
                                </div>

                                <div className="flex items-center justify-center gap-4 sm:gap-6">
                                    <p className="text-4xl sm:text-5xl font-bold text-gray-800">{match.homeScore}</p>
                                    <p className="text-2xl text-gray-600">vs</p>
                                    <p className="text-4xl sm:text-5xl font-bold text-gray-800">{match.awayScore}</p>
                                </div>
                                <div className="text-gray-600 text-sm">{match.time}</div>
                            </div>

                            {/* Away Team */}
                            <div className="flex flex-col items-center sm:items-end gap-2">
                                <img src={match.logoAway} alt={match.awayTeam} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full" />
                                <div className="text-center sm:text-right">
                                    <p className="text-lg font-semibold text-gray-800">{match.awayTeam}</p>
                                    <p className="text-gray-600 text-sm">Away</p>
                                </div>
                            </div>
                        </div>
                        {/* Match Status (visible on larger screens) */}
                        <div className="mt-4 flex items-center justify-between sm:justify-end">
                            <div className={`${
                                match.status === 'In Progress' ? 'text-green-500' : 'text-red-500'
                            } text-lg font-semibold hidden sm:block`}>
                                {match.status}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LiveScore;
