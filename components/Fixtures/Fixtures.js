"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { matchService } from "@/app/api/matches/matches";
import { teamService } from "@/app/api/teamservice/teamService";

const getTodaysMatches = async () => {
    const response = await matchService.getTodayMatches();
    return response;
};

const getTeamById = async (teamId) => {
    const response = await teamService.getTeamById(teamId);
    return response;
};

const Fixtures = () => {
    const [menFixtures, setMenFixtures] = useState([]);
    const [womenFixtures, setWomenFixtures] = useState([]);
    const [isMen, setIsMen] = useState(true);

    useEffect(() => {
        const fetchAndCategorizeMatches = async () => {
            const matches = await getTodaysMatches();

            const menMatches = [];
            const womenMatches = [];

            for (const match of matches) {
                const team1 = await getTeamById(match.team1_id);
                const team2 = await getTeamById(match.team2_id);

                const categorizedMatch = {
                    time: new Date(match.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    home: team1.name,
                    away: team2.name,
                    location: match.match_pool,
                    homeLogo: team1.logo || "/image/1.jpg",
                    awayLogo: team2.logo || "/image/1.jpg",
                };

                if (team1.gender === "men" && team2.gender === "men") {
                    menMatches.push(categorizedMatch);
                } else if (team1.gender === "women" && team2.gender === "women") {
                    womenMatches.push(categorizedMatch);
                }
            }

            setMenFixtures([{ date: new Date().toLocaleDateString(), matches: menMatches }]);
            setWomenFixtures([{ date: new Date().toLocaleDateString(), matches: womenMatches }]);
        };

        fetchAndCategorizeMatches();
    }, []);

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
                        className={`$\{isMen ? 'bg-red-600' : 'bg-gray-400'
                            } text-white py-2 px-8 rounded-full bg-red-600 text-xs hover:bg-red-700`}
                    >
                        Men
                    </button>
                    {/* Women’s Fixtures Button */}
                    <button
                        onClick={() => setIsMen(false)}
                        className={`$\{!isMen ? 'bg-blue-600' : 'bg-gray-400'
                            } text-white py-2 px-8 rounded-full text-xs bg-blue-600 hover:bg-blue-700`}
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
                                        <div className="flex flex-col gap-2">
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
