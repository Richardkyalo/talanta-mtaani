"use client";

import { useRouter } from "next/navigation";
import { useMemo, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { CoachService } from "@/app/api/coach/coach";
import { useQuery } from "@tanstack/react-query";
import { pointofContact } from "@/app/api/pointOfContact/pointOfContactService";
import { playerService } from "@/app/api/playerservice/playerService";
import { teamStatisticService } from "@/app/api/teamStat/teamstat";
import Image from "next/image";

// Type Definitions
interface Team {
  id: string;
  name: string;
  logo: string | null;
  gender: "men" | "women";
  coach_id: string;
  team_point_of_contact_id: string;
}

interface Coach {
  id: string;
  name: string;
}

interface PointOfContact {
  id: string;
  name: string;
}

interface Player {
  id: string;
  name: string;
  position: string;
}

interface TeamStat {
  matches_played: string[] | null;
  wins: string[] | null;
  draws: string[] | null;
  losses: string[] | null;
  goals_scored: string[] | null;
  goals_conceded: string[] | null;
}

// API Fetch Functions
const getTeamStatById = async (teamId: string) => {
  try {
    const response = await teamStatisticService.getTeamStatByTeamId(teamId);
    return response;
  } catch (error) {
    console.error("Error in getTeamStatById:", error);
    throw error;
  }
};

const getTeamPlayers = async (teamId: string) => {
  try {
    const response = await playerService.getPlayerByTeamId(teamId);
    return response.data;
  } catch (error) {
    console.error("Error in getTeamPlayers:", error);
    throw error;
  }
};

const getCoachById = async (coachId: string) => {
  try {
    const response = await CoachService.getCoachById(coachId);
    return response.data;
  } catch (error) {
    console.error("Error in getCoachById:", error);
    throw error;
  }
};

const getPOintCById = async (pointofCId: string) => {
  try {
    const response = await pointofContact.getPointOfContactById(pointofCId);
    return response.data;
  } catch (error) {
    console.error("Error in getPOintCById:", error);
    throw error;
  }
};

const TeamViewer = () => {
  const router = useRouter();
  const [team, setTeam] = useState<Team | null>(null);
  const [coach, setCoach] = useState<Coach | null>(null);
  const [pointOfContact, setPointOfContact] = useState<PointOfContact | null>(null);
  const [players, setPlayers] = useState<Player[] | null>(null);
  const [teamStats, setTeamStat] = useState<TeamStat | null>(null);

  const { data: coachData } = useQuery<Coach>({
    queryKey: ["coach"],
    queryFn: () => getCoachById(team?.coach_id || ""),
    enabled: !!team?.coach_id,
  });

  const { data: pointofCData } = useQuery<PointOfContact>({
    queryKey: ["pointofC"],
    queryFn: () => getPOintCById(team?.team_point_of_contact_id || ""),
    enabled: !!team?.team_point_of_contact_id,
  });

  const { data: playersData } = useQuery<Player[]>({
    queryKey: ["players"],
    queryFn: () => getTeamPlayers(team?.id || ""),
    enabled: !!team?.id,
  });

  const { data: teamStat } = useQuery<TeamStat[]>({
    queryKey: ["teamStat"],
    queryFn: () => getTeamStatById(team?.id || ""),
    enabled: !!team?.id,
  });

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
    if (teamStat && teamStat.length > 0) {
      setTeamStat(teamStat[0]); // Extract first team stat object
    }
    const params = new URLSearchParams(window.location.search);
    const teamData = params.get("data");

    if (teamData) {
      setTeam(JSON.parse(decodeURIComponent(teamData)));
    }
  }, [coachData, pointofCData, playersData, teamStat]);

  const teamInfo = useMemo(() => team, [team]);

  const getStatValue = (stat: string[] | null): number => {
    return Array.isArray(stat) && stat.length > 0 ? stat.length : 0;
  };

  const handlePlayerView=async(player:Player)=>{
    const query = encodeURIComponent(JSON.stringify(player));
    router.push(`../playerViewer/${player.id}?data=${query}`);
  }

  if (!teamInfo) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading team data...</p>
      </div>
    );
  }

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
            <Image
              src={teamInfo.logo || "/image/1.jpg"} // Fallback for missing logos
              alt={teamInfo.name}
              width={128}
              height={128}
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
          <div className="bg-gray-100 shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Team Statistics</h2>
            {teamStats && (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                  <h3 className="text-lg font-bold text-gray-700">Matches Played</h3>
                  <p className="text-gray-500 text-sm mt-2">{getStatValue(teamStats.matches_played)}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                  <h3 className="text-lg font-bold text-gray-700">Wins</h3>
                  <p className="text-gray-500 text-sm mt-2">{getStatValue(teamStats.wins)}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                  <h3 className="text-lg font-bold text-gray-700">Draws</h3>
                  <p className="text-gray-500 text-sm mt-2">{getStatValue(teamStats.draws)}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                  <h3 className="text-lg font-bold text-gray-700">Losses</h3>
                  <p className="text-gray-500 text-sm mt-2">{getStatValue(teamStats.losses)}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                  <h3 className="text-lg font-bold text-gray-700">Goals Scored</h3>
                  <p className="text-gray-500 text-sm mt-2">{getStatValue(teamStats.goals_scored)}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                  <h3 className="text-lg font-bold text-gray-700">Goals Conceded</h3>
                  <p className="text-gray-500 text-sm mt-2">{getStatValue(teamStats.goals_conceded)}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                  <h3 className="text-lg font-bold text-gray-700">Goal Difference</h3>
                  <p className="text-gray-500 text-sm mt-2">{getStatValue(teamStats.goals_scored)-getStatValue(teamStats.goals_conceded)}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                  <h3 className="text-lg font-bold text-gray-700">Points</h3>
                  <p className="text-gray-500 text-sm mt-2">{getStatValue(teamStats.wins)*3+getStatValue(teamStats.draws)}</p>
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
              {players.map((player, index) => (
                <li
                onClick={()=>handlePlayerView(player)}
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
