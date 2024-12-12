'use client';
import { useEffect, useState } from 'react';
import { matchService } from '@/app/api/matches/matches';
import { teamService } from '@/app/api/teamservice/teamService';
import { playerService } from '@/app/api/playerservice/playerService';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const getAllMatchStats = async () => {
    try {
        const response = await matchService.getAllMatchStats();
        return response;
    } catch (error) {
        console.error("Error in getAllMatchStats:", error);
        throw error;
    }
};
const groupMatchesByDate = (matches) => {
    return matches.reduce((acc, match) => {
        const matchDate = new Date(match.date).toLocaleDateString();
        if (!acc[matchDate]) acc[matchDate] = [];
        acc[matchDate].push(match);
        return acc;
    }, {});
};

const getMatchesById = async (id) => {
    try {
        const response = await matchService.getMatchById(id);
        return response;
    } catch (error) {
        console.error("Error in getMatchesById:", error);
        throw error;
    }
};

const getTeamById = async (id) => {
    try {
        const response = await teamService.getTeamById(id);
        return response;
    } catch (error) {
        console.error("Error in getTeamById:", error);
        throw error;
    }
};

const getPlayerById = async (id) => {
    try {
        const response = await playerService.getPlayerById(id);
        return response;
    } catch (error) {
        console.error("Error in getPlayerById:", error);
        throw error;
    }
};

const Results = () => {
    const [matchStats, setMatchStats] = useState([]);
    const [matchDetails, setMatchDetails] = useState([]);
    const [isMen, setIsMen] = useState(true);
    const router= useRouter();

    const { data: fetchStats } = useQuery({
        queryKey: ['matchStats'],
        queryFn: getAllMatchStats,
        onSuccess: (data) => setMatchStats(data),
    });

    useEffect(() => {
        if (fetchStats) {
            setMatchStats(fetchStats);
        }
    }, [fetchStats]);

    useEffect(() => {
        if (matchStats?.length > 0) {
            const fetchMatchDetails = async () => {
                const details = await Promise.all(
                    matchStats.map(async (match) => {
                        const matchData = await getMatchesById(match.id);
                        const team1 = await getTeamById(matchData?.team1_id);
                        const team2 = await getTeamById(matchData?.team2_id);

                        return {
                            ...matchData,
                            team1gender: team1?.gender ?? "unknown",
                            team1Name: team1?.name ?? "Unknown",
                            team2Name: team2?.name ?? "Unknown",
                            team1TotalGoals: (match?.team1_id_goals?.length ?? 0) + (match?.team1_penalties?.length ?? 0),
                            team2TotalGoals: (match?.team2_id_goals?.length ?? 0) + (match?.team2_penalties?.length ?? 0),
                            team1TotalRedCards: match?.team1_red_cards?.length ?? 0,
                            team2TotalRedCards: match?.team2_red_cards?.length ?? 0,
                            team1TotalYellowCards: match?.team1_yellow_cards?.length ?? 0,
                            team2TotalYellowCards: match?.team2_yellow_cards?.length ?? 0,
                            team1goalScorers: match?.team1_id_goals ?? [],
                            team2goalScorers: match?.team2_id_goals ?? [],
                            team1penaltyScorers: match?.team1_penalties ?? [],
                            team2penaltyScorers: match?.team2_penalties ?? [],
                            team1redCards: match?.team1_red_cards ?? [],
                            team2redCards: match?.team2_red_cards ?? [],
                            team1yellowCards: match?.team1_yellow_cards ?? [],
                            team2yellowCards: match?.team2_yellow_cards ?? [],
                        };
                    })
                );
                setMatchDetails(details);
            };

            fetchMatchDetails();
        }
    }, [matchStats]);

    const getPlayerNames = async (ids) => {
        return await Promise.all(
            ids.map(async (id) => {
                const player = await getPlayerById(id);
                // console.log("player", player)
                return player?.data?.name ?? "Unknown Player";
            })
        );
    };

    useEffect(() => {
        const fetchPlayerNames = async () => {
            const updatedDetails = await Promise.all(
                matchDetails.map(async (match) => {
                    const team1goalScorers = await getPlayerNames(match.team1goalScorers);
                    const team2goalScorers = await getPlayerNames(match.team2goalScorers);
                    const team1penaltyScorers = await getPlayerNames(match.team1penaltyScorers);
                    const team2penaltyScorers = await getPlayerNames(match.team2penaltyScorers);
                    const team1redCards = await getPlayerNames(match.team1redCards);
                    const team2redCards = await getPlayerNames(match.team2redCards);
                    const team1yellowCards = await getPlayerNames(match.team1yellowCards);
                    const team2yellowCards = await getPlayerNames(match.team2yellowCards);

                    return {
                        ...match,
                        team1goalscorerNames: team1goalScorers,
                        team2goalscorerNames: team2goalScorers,
                        team1penaltyscorerNames: team1penaltyScorers,
                        team2penaltyscorerNames: team2penaltyScorers,
                        team1redcardNames: team1redCards,
                        team2redcardNames: team2redCards,
                        team1yellowcardNames: team1yellowCards,
                        team2yellowcardNames: team2yellowCards,
                    };
                })
            );

            console.log("updated details", updatedDetails)
            setMatchDetails(updatedDetails);
        };

        if (matchDetails.length > 0) {
            fetchPlayerNames();
        }
    }, [matchDetails]);

    console.log("Match Stats:", matchStats);
    console.log("Match Details:", matchDetails);

    const menMatches = matchDetails.filter((match) => match.team1gender === 'men');
    const womenMatches = matchDetails.filter((match) => match.team1gender === 'women');


    const menResults = Object.entries(groupMatchesByDate(menMatches)).map(([date, matches]) => ({
        date,
        matches,
    }));
    const womenResults = Object.entries(groupMatchesByDate(womenMatches)).map(([date, matches]) => ({
        date,
        matches,
    }));

    const displayedResults = isMen ? menResults : womenResults;

    const handleMatchStatDisplay =(match)=>{
        const query=encodeURIComponent(JSON.stringify(match));
        router.push(`../matchStat/${match.id}?data=${query}`);
    }


    console.log("mens", menResults)

    return (
        <section className="bg-gray-100 mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="py-8 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-lg mb-6">
                <h1 className="text-5xl mx-4 font-bold mb-4">Results</h1>
                <div className="flex flex-row ml-4 gap-4">
                    <button
                        onClick={() => setIsMen(true)}
                        className={`${isMen ? 'bg-red-600' : 'bg-gray-400'
                            } text-white py-2 px-8 rounded-full text-xs hover:bg-red-700`}
                    >
                        Men
                    </button>
                    <button
                        onClick={() => setIsMen(false)}
                        className={`${!isMen ? 'bg-blue-600' : 'bg-gray-400'
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
                                        <tr key={idx}
                                        onClick={()=>handleMatchStatDisplay(match)}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                                                <img
                                                    src={match.homeLogo || 'image/1.jpg'}
                                                    alt={match.team1Name}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <span className="text-sm font-medium text-gray-900">{match.team1Name}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm text-gray-500">
                                                {`${match.team1TotalGoals} - ${match.team2TotalGoals}`}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end items-center gap-2">
                                                <span className="text-sm font-medium text-gray-900">{match.team2Name}</span>
                                                <img
                                                    src={match.awayLogo || 'image/1.jpg'}
                                                    alt={match.team2Name}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                                {match.match_pool}
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