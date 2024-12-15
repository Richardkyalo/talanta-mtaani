"use client";

import { useRouter } from "next/navigation";
import { useMemo, useEffect, useState, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { CoachService } from "@/app/api/coach/coach";
import { useQuery } from "@tanstack/react-query";
import { pointofContact } from "@/app/api/pointOfContact/pointOfContactService";
import { playerService } from "@/app/api/playerservice/playerService";
import { teamStatisticService } from "@/app/api/teamStat/teamstat";

const getTeamStatById = async (teamId: string) => {
    try {
        const response = await teamStatisticService.getTeamStatByTeamId(teamId);
        console.log("res yetu",response)
        return response;
    } catch (error) {
        console.error("Error in getTeamStatById:", error);
        throw error;
    }
}

const getTeamPlayers = async (teamId: string) => {
    try {
        const response = await playerService.getPlayerByTeamId(teamId);
        return response.data;
    } catch (error) {
        console.error("Error in getTeamPlayers:", error);
        throw error;
    }
}

const getCoachById = async (coachId: string) => {
    try {
        const response = await CoachService.getCoachById(coachId);
        return response.data;
    } catch (error) {
        console.error("Error in getCoachById:", error);
        throw error;
    }
}
const getPOintCById = async (pointofCId: string) => {
    try {
        const response = await pointofContact.getPointOfContactById(pointofCId);
        return response.data;
    } catch (error) {
        console.error("Error in getCoachById:", error);
        throw error;
    }
}

const TeamViewer = () => {
    const router = useRouter();
    const [team, setTeam] = useState<any>(null);
    const [coach, setCoach] = useState<any>(null);
    const [pointOfContact, setPointOfContact] = useState<any>(null);
    const [players, setPlayers] = useState<any>(null);
    const [teamStats, setTeamStat] = useState<any>(null);


    const { data: coachData } = useQuery({
        queryKey: ["coach"],
        queryFn: () => getCoachById(team.coach_id),
        enabled: !!team?.coach_id
    });

    const { data: pointofCData } = useQuery({
        queryKey: ["pointofC"],
        queryFn: () => getPOintCById(team.team_point_of_contact_id),
        enabled: !!team?.team_point_of_contact_id
    });
    const { data: playersData } = useQuery({
        queryKey: ["players"],
        queryFn: () => getTeamPlayers(team.id),
        enabled: !!team?.id
    })
    const { data: teamStat } = useQuery({
        queryKey: ["teamStat"],
        queryFn: () => getTeamStatById(team.id),
        enabled: !!team?.id
    })



    useEffect(() => {
        if (coachData) {
            setCoach(coachData);
        }
        if (pointofCData) {
            setPointOfContact(pointofCData);
        }
        if (playersData) {
            setPlayers(playersData);
        }
        if (teamStat) {
            setTeamStat(teamStat)
        }
        const params = new URLSearchParams(window.location.search);
        const teamData = params.get("data");

        if (teamData) {
            setTeam(JSON.parse(decodeURIComponent(teamData)));
        }
    }, [coachData, pointofCData, playersData, teamStat]);

    const teamInfo = useMemo(() => team, [team]);

    if (!teamInfo) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">Loading team data...</p>
            </div>
        );
    }

    console.log(teamInfo)
    console.log(coach)
    console.log("teamstat", teamStats)
    console.log("coaches", coachData)
    return (
        <div className="container mx-auto p-6">
            {/* Header Section */}
            <div className="flex items-center mb-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-blue-500 hover:text-blue-700"
                >
                    <FaArrowLeft className="mr-2" /> Back to Clubs
                </button>
            </div>

            {/* Team Details */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="mb-6 flex flex-col md:flex-row justify-between">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <img
                            src={teamInfo.logo || "/image/1.jpg"} // Fallback for missing logos
                            alt={teamInfo.name}
                            className="w-32 h-32 object-cover rounded-full"
                        />

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">{teamInfo.name}</h1>
                            <p className="text-gray-600">{teamInfo.gender === "men" ? "Men's Team" : "Women's Team"}</p>
                            <p className="text-gray-600">Coach: {coach?.name}</p>
                            <p className="text-gray-600">Point of Contact: {pointOfContact?.name}</p>
                        </div>
                    </div>

                    {/* Team Statistics */}
                    {/* Team Statistics */}
                    <div className="bg-gray-100 shadow-md rounded-lg p-6 mt-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Team Statistics</h2>
                        {teamStats && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                                    <h3 className="text-lg font-bold text-gray-700">Matches Played</h3>
                                    <p className="text-gray-500 text-sm mt-2">{teamStats[0].matches_played.length || 0}</p>
                                </div>
                                <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                                    <h3 className="text-lg font-bold text-gray-700">Wins</h3>
                                    <p className="text-gray-500 text-sm mt-2">{teamStats[0].wins || 0}</p>
                                </div>
                                <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                                    <h3 className="text-lg font-bold text-gray-700">Draws</h3>
                                    <p className="text-gray-500 text-sm mt-2">{teamStats[0].draws.length || 0}</p>
                                </div>
                                <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                                    <h3 className="text-lg font-bold text-gray-700">Losses</h3>
                                    <p className="text-gray-500 text-sm mt-2">{teamStats[0].losses || 0}</p>
                                </div>
                                <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                                    <h3 className="text-lg font-bold text-gray-700">Goals Scored</h3>
                                    <p className="text-gray-500 text-sm mt-2">{teamStats[0].goals_scored.length || 0}</p>
                                </div>
                                <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                                    <h3 className="text-lg font-bold text-gray-700">Goals Conceded</h3>
                                    <p className="text-gray-500 text-sm mt-2">{teamStats[0].goals_conceded.length || 0}</p>
                                </div>
                            </div>
                        )}
                    </div>

                </div>


                {/* Players List */}
                {players && players.length > 0 && (
                    <div className="mt-6 max-h-96 overflow-y-auto">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Players</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {players.map((player: { name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; position: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, index: Key | null | undefined) => (
                                <li
                                    key={index}
                                    className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center justify-between"
                                >
                                    <span className="text-gray-800 font-medium">{player.name}</span>
                                    <span className="text-gray-500 text-sm">{player.position}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamViewer;
