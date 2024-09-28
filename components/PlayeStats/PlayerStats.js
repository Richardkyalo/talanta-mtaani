'use client';
import React from 'react';

const PlayerStats = () => {
    // Sample player data
    const playerData = {
        name: 'John Doe',
        position: 'Forward',
        team: 'Misuuni FC',
        stats: {
            matchesPlayed: 20,
            goals: 12,
            assists: 8,
            yellowCards: 3,
            redCards: 1,
        },
        recentMatches: [
            { date: '2024-09-21', opponent: 'Kamulamba FC', goals: 2, assists: 1 },
            { date: '2024-09-14', opponent: 'Salama FC', goals: 1, assists: 0 },
            { date: '2024-09-07', opponent: 'Yikisaaya FC', goals: 0, assists: 2 },
            { date: '2024-08-30', opponent: 'Yindundu FC', goals: 3, assists: 1 },
        ],
    };

    return (
        <section className="bg-gray-100 mx-auto max-w-screen-lg px-6 py-12">
            {/* Header Section */}
            <div className="bg-white shadow-md rounded-lg p-8 mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{playerData.name}</h1>
                <p className="text-lg text-gray-600">{playerData.position} - {playerData.team}</p>
            </div>

            {/* Player Stats */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Statistics</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-300 rounded-lg p-4 text-center">
                        <h3 className="text-xl font-bold text-gray-700">Matches Played</h3>
                        <p className="text-2xl font-bold text-blue-600">{playerData.stats.matchesPlayed}</p>
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 text-center">
                        <h3 className="text-xl font-bold text-gray-700">Goals</h3>
                        <p className="text-2xl font-bold text-blue-600">{playerData.stats.goals}</p>
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 text-center">
                        <h3 className="text-xl font-bold text-gray-700">Assists</h3>
                        <p className="text-2xl font-bold text-blue-600">{playerData.stats.assists}</p>
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 text-center">
                        <h3 className="text-xl font-bold text-gray-700">Yellow Cards</h3>
                        <p className="text-2xl font-bold text-blue-600">{playerData.stats.yellowCards}</p>
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 text-center">
                        <h3 className="text-xl font-bold text-gray-700">Red Cards</h3>
                        <p className="text-2xl font-bold text-blue-600">{playerData.stats.redCards}</p>
                    </div>
                </div>
            </div>

            {/* Recent Matches */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Matches</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-2 px-4 border-b">Date</th>
                            <th className="py-2 px-4 border-b">Opponent</th>
                            <th className="py-2 px-4 border-b">Goals</th>
                            <th className="py-2 px-4 border-b">Assists</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerData.recentMatches.map((match, index) => (
                            <tr key={index} className="hover:bg-gray-100 text-black">
                                <td className="py-2 px-4 border-b">{match.date}</td>
                                <td className="py-2 px-4 border-b">{match.opponent}</td>
                                <td className="py-2 px-4 border-b text-center">{match.goals}</td>
                                <td className="py-2 px-4 border-b text-center">{match.assists}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default PlayerStats;
