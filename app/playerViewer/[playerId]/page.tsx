'use client';
import { teamService } from '@/app/api/teamservice/teamService';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { playerStatServiceInstance } from '@/app/api/playerStat/playerStat';
// import { useMemo } from 'react';

interface PlayerStatistics{
    id: string;
    matches_played: string[] | null;
    goals: string[] | null;
    yellow_cards: string[] | null;
    red_cards: string[] | null;
}
interface Team {
    id: string;
    name: string;
    logo: string | null;
    gender: "men" | "women";
    coach_id: string;
    team_point_of_contact_id: string;
}
interface Player {
    id: string;
    name: string;
    position: string;
    team_id: string;
    player_stats_id: string;
    age: number;

}

const getTeamById = async (id: string) => {
    const response = await teamService.getTeamById(id);
    return response || {};
};
const getPlayerStatics = async (id: string) => {
    const response = await playerStatServiceInstance.getPlayerStatById(id);
    return response || {};
}

const PlayerStats = () => {

    const [player, setPlayer] = useState<Player | null>(null);
    const [team, setTeam] = useState<Team | null>(null);
    const [playerStats, setPlayerStats] = useState<PlayerStatistics | null>(null);

    const { data: teamData } = useQuery<Team>({
        queryKey: ["team"],
        queryFn: () => getTeamById(player?.team_id || ""),
        enabled: !!player?.team_id,
    });
    const { data: playerStat } = useQuery<PlayerStatistics>({
        queryKey: ["playerStat"],
        queryFn: () => getPlayerStatics(player?.id || ""),
        enabled: !!player?.id,
    })

    useEffect(() => {
        if (teamData) {
            setTeam(teamData);
        }
        if (playerStat) {
            setPlayerStats(playerStat);
        }
        const params = new URLSearchParams(window.location.search);
        const playerData = params.get("data");
        if (playerData) {
            setPlayer(JSON.parse(decodeURIComponent(playerData)));
        }
    }, [teamData, playerStat]);
    // // Sample player data
    // const playerData = {
    //     name: 'John Doe',
    //     position: 'Forward',
    //     team: 'Misuuni FC',
    //     stats: {
    //         matchesPlayed: 20,
    //         goals: 12,
    //         assists: 8,
    //         yellowCards: 3,
    //         redCards: 1,
    //     },
    //     recentMatches: [
    //         { date: '2024-09-21', opponent: 'Kamulamba FC', goals: 2, assists: 1 },
    //         { date: '2024-09-14', opponent: 'Salama FC', goals: 1, assists: 0 },
    //         { date: '2024-09-07', opponent: 'Yikisaaya FC', goals: 0, assists: 2 },
    //         { date: '2024-08-30', opponent: 'Yindundu FC', goals: 3, assists: 1 },
    //     ],
    // };

    console.log(player)
    return (
        <section className="bg-gray-100 mx-auto max-w-screen-lg px-6 py-12">
            {/* Header Section */}
            <div className="bg-white shadow-md rounded-lg p-8 mb-6"><h1 className="text-3xl font-bold text-gray-800">
                {player?.name?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h1>
                <p className="text-lg text-gray-600">
                    {player?.position?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} -
                    {team?.name?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </p>

            </div>

            {/* Player Stats */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Statistics</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-300 rounded-lg p-4 text-center">
                        <h3 className="text-xl font-bold text-gray-700">Matches Played</h3>
                        <p className="text-2xl font-bold text-blue-600">{playerStats?.matches_played?.length || 0}</p>
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 text-center">
                        <h3 className="text-xl font-bold text-gray-700">Goals</h3>
                        <p className="text-2xl font-bold text-blue-600">{playerStats?.goals?.length || 0}</p>
                    </div>
                    {/* <div className="border border-gray-300 rounded-lg p-4 text-center">
                        <h3 className="text-xl font-bold text-gray-700">Assists</h3>
                        <p className="text-2xl font-bold text-blue-600">{playerData.stats.assists}</p>
                    </div> */}
                    <div className="border border-gray-300 rounded-lg p-4 text-center">
                        <h3 className="text-xl font-bold text-gray-700">Yellow Cards</h3>
                        <p className="text-2xl font-bold text-blue-600">{playerStats?.yellow_cards?.length || 0}</p>
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 text-center">
                        <h3 className="text-xl font-bold text-gray-700">Red Cards</h3>
                        <p className="text-2xl font-bold text-blue-600">{playerStats?.red_cards?.length || 0}</p>
                    </div>
                </div>
            </div>

            {/* Recent Matches */}
            {/* <div className="bg-white shadow-md rounded-lg p-6">
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
            </div> */}
        </section>
    );
};

export default PlayerStats;
