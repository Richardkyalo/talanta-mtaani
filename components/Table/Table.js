'use client';
import { useState } from 'react';

const LeagueTable = () => {
    // League Table data for both men and women
    const menLeagueTable = [
        { position: 1, team: 'Misuuni Fc', played: 10, won: 8, drawn: 1, lost: 1, goalsFor: 22, goalsAgainst: 8, points: 25, logo: '/image/1.jpg' },
        { position: 2, team: 'Kamulamba Fc', played: 10, won: 7, drawn: 2, lost: 1, goalsFor: 20, goalsAgainst: 10, points: 23, logo: '/image/1.jpg' },
        { position: 3, team: 'Salama Fc', played: 10, won: 6, drawn: 1, lost: 3, goalsFor: 18, goalsAgainst: 12, points: 19, logo: '/image/1.jpg' },
        // Add more teams
    ];

    const womenLeagueTable = [
        { position: 1, team: 'Salama Women Fc', played: 10, won: 9, drawn: 0, lost: 1, goalsFor: 30, goalsAgainst: 5, points: 27, logo: '/image/1.jpg' },
        { position: 2, team: 'Misuuni Women Fc', played: 10, won: 8, drawn: 1, lost: 1, goalsFor: 25, goalsAgainst: 7, points: 25, logo: '/image/1.jpg' },
        { position: 3, team: 'Kamulamba Women Fc', played: 10, won: 7, drawn: 1, lost: 2, goalsFor: 22, goalsAgainst: 10, points: 22, logo: '/image/1.jpg' },
        // Add more teams
    ];

    const [isMen, setIsMen] = useState(true);

    const displayedLeagueTable = isMen ? menLeagueTable : womenLeagueTable;

    return (
        <section className="bg-gray-100 mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="py-8 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-lg mb-6">
                <h1 className="text-5xl mx-4 font-bold mb-4">League Table</h1>
                <div className="flex flex-row ml-4 gap-4">
                    {/* Men’s League Table Button */}
                    <button
                        onClick={() => setIsMen(true)}
                        className={`${
                            isMen ? 'bg-red-600' : 'bg-gray-400'
                        } text-white py-2 px-8 rounded-full text-xs hover:bg-red-700`}
                    >
                        Men
                    </button>
                    {/* Women’s League Table Button */}
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

            {/* League Table Display */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pos</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Played</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Won</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Drawn</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Lost</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">GF</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">GA</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {displayedLeagueTable.map((team, index) => (
                                <tr key={index}>
                                    {/* Position */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {team.position}
                                    </td>
                                    {/* Team Name */}
                                    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                                        <img
                                            src={team.logo}
                                            alt={team.team}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <span className="text-sm font-medium text-gray-900">{team.team}</span>
                                    </td>
                                    {/* Played */}
                                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                                        {team.played}
                                    </td>
                                    {/* Won */}
                                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                                        {team.won}
                                    </td>
                                    {/* Drawn */}
                                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                                        {team.drawn}
                                    </td>
                                    {/* Lost */}
                                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                                        {team.lost}
                                    </td>
                                    {/* Goals For */}
                                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                                        {team.goalsFor}
                                    </td>
                                    {/* Goals Against */}
                                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                                        {team.goalsAgainst}
                                    </td>
                                    {/* Points */}
                                    <td className="px-6 py-4 text-center text-sm text-gray-900 font-bold">
                                        {team.points}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default LeagueTable;
