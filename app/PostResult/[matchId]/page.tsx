'use client';
import { useState, useEffect } from 'react';
import { playerService } from '@/app/api/playerservice/playerService';
import { useSearchParams } from 'next/navigation';
import { teamService } from '@/app/api/teamservice/teamService';
import { matchService } from '@/app/api/matches/matches';

const getTeamById = async (id: string) => {
  const response = await teamService.getTeamById(id);
  return response || {};
};

interface Player {
  id: string;
  name: string;
}

interface MatchData {
  team1_id: string;
  team2_id: string;
  team1_first_11_ids: string[];
  team2_first_11_ids: string[];
}

export default function PostMatchResult({ matchData }: { matchData?: MatchData }) {
  const [team1Players, setTeam1Players] = useState<Player[]>([]);
  const [team2Players, setTeam2Players] = useState<Player[]>([]);
  const [team1GoalScorers, setTeam1GoalScorers] = useState<string[]>([]);
  const [team2GoalScorers, setTeam2GoalScorers] = useState<string[]>([]);
  const [team1PenaltyScorers, setTeam1PenaltyScorers] = useState<string[]>([]);
  const [team2PenaltyScorers, setTeam2PenaltyScorers] = useState<string[]>([]);
  const [team1RedCardPlayers, setTeam1RedCardPlayers] = useState<string[]>([]);
  const [team2RedCardPlayers, setTeam2RedCardPlayers] = useState<string[]>([]);
  const [team1YellowCardPlayers, setTeam1YellowCardPlayers] = useState<string[]>([]);
  const [team2YellowCardPlayers, setTeam2YellowCardPlayers] = useState<string[]>([]);

  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");

  

  const searchParams = useSearchParams();
  const data = searchParams.get('data');
  const match = data ? JSON.parse(decodeURIComponent(data)) : matchData; // Use matchData prop if available

  useEffect(() => {
    if (!match) {
      console.error('No match data available');
      return;
    }

    const fetchPlayers = async (playerIds: string[]): Promise<Player[]> => {
      try {
        // console.log('Fetching players for IDs:', playerIds);
    
        // Use Promise.all to fetch players concurrently for all IDs
        const responses = await Promise.all(
          playerIds.map((id) => playerService.getPlayerById(id))
        );
    
        // Extract data from all responses
        const players = responses
          .map((response) => response.data)
          .filter((data) => data); // Ensure we filter out any invalid responses
    
        // console.log('Fetched player data:', players);
    
        // If players array is not empty, return the data
        if (players.length > 0) {
          return players;
        } else {
          console.error('Failed to fetch players or no valid data returned');
          return [];
        }
      } catch (error) {
        console.error('Error fetching players:', error);
        return [];
      }
    };
    

    const fetchTeamPlayers = async () => {
      try {
        // Concatenate the first 11 players and substitutes for each team
        const team1PlayerIds = [...match.team1_first_11_ids, ...match.team1_sub_ids];
        const team2PlayerIds = [...match.team2_first_11_ids, ...match.team2_sub_ids];
    
        // Fetch players concurrently for both teams
        const team1 = await fetchPlayers(team1PlayerIds);
        const team2 = await fetchPlayers(team2PlayerIds);
    
        // Update the state with the fetched players
        setTeam1Players(team1);
        setTeam2Players(team2);
      } catch (error) {
        console.error('Error fetching team players:', error);
      }
    };
    

    fetchTeamPlayers();
  }, [match]);

  const togglePlayerSelection = (
    team: 'team1' | 'team2',
    category: 'goals' | 'penalties' | 'red' | 'yellow',
    playerId: string
  ) => {
    const setFunctionMap: Record<string, React.Dispatch<React.SetStateAction<string[]>>> = {
      goals: team === 'team1' ? setTeam1GoalScorers : setTeam2GoalScorers,
      penalties: team === 'team1' ? setTeam1PenaltyScorers : setTeam2PenaltyScorers,
      red: team === 'team1' ? setTeam1RedCardPlayers : setTeam2RedCardPlayers,
      yellow: team === 'team1' ? setTeam1YellowCardPlayers : setTeam2YellowCardPlayers,
    };

    const selectedPlayers =
      team === 'team1'
        ? category === 'goals'
          ? team1GoalScorers
          : category === 'penalties'
            ? team1PenaltyScorers
            : category === 'red'
              ? team1RedCardPlayers
              : team1YellowCardPlayers
        : category === 'goals'
          ? team2GoalScorers
          : category === 'penalties'
            ? team2PenaltyScorers
            : category === 'red'
              ? team2RedCardPlayers
              : team2YellowCardPlayers;

    if (selectedPlayers.includes(playerId)) {
      setFunctionMap[category](selectedPlayers.filter((id) => id !== playerId));
    } else {
      setFunctionMap[category]([...selectedPlayers, playerId]);
    }
  };

  // console.log(match)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const resultData = [
      {
        type: 'team1_penalties',
        matchStat_id: match?.id,
        data: team1PenaltyScorers,
        flag: false,
      },
      {
        type: 'team2_penalties',
        matchStat_id: match?.id,
        data: team2PenaltyScorers,
        flag: false,
      },  
      {
        type: 'team1_id_goals',
        matchStat_id: match?.id,
        data: team1GoalScorers,
        flag: false,
      },
      {
        type: 'team2_id_goals',
        matchStat_id: match?.id,
        data: team2GoalScorers,
        flag: false,  
      },
      {
        type: 'team1_yellow_cards',
        matchStat_id: match?.id,
        data: team1YellowCardPlayers,
        flag: false,
      },
      {
        type: 'team2_yellow_cards',
        matchStat_id: match?.id,
        data: team2YellowCardPlayers,
        flag: false,
      },
      {
        type: 'team1_red_cards',
        matchStat_id: match?.id,
        data: team1RedCardPlayers,
        flag: false,
      },
      {
        type: 'team2_red_cards',
        matchStat_id: match?.id,
        data: team2RedCardPlayers,
        flag: false,
      }
    ];
  
    const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));
  
    try {
      for (const update of resultData) {
        console.log(`Update ${update.type} started...`, update);
        await matchService.updateMatchStat(update);
        console.log(`Update ${update.type} succeeded`);
        await delay(100); // Wait 100ms before sending the next request
      }
      // Display success alert
      alert("Match result successfully updated!");
  
      // Reset selections
      setTeam1GoalScorers([]);
      setTeam2GoalScorers([]);
      setTeam1PenaltyScorers([]);
      setTeam2PenaltyScorers([]);
      setTeam1RedCardPlayers([]);
      setTeam2RedCardPlayers([]);
      setTeam1YellowCardPlayers([]);
      setTeam2YellowCardPlayers([]);
    } catch (err) {
      console.error("Error updating match results:", err);
      alert("An error occurred while updating the match results. Please try again.");
    }
  };
  

  if (!match) {
    return <div>Invalid match data</div>;
  }

  useEffect (() => {
    const fetchTeams = async () => {
      try {
        const team1 = await getTeamById(match?.team1_id || '');
        const team2 = await getTeamById(match?.team2_id || '');
        setTeam1Name(team1.name);
        setTeam2Name(team2.name);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    fetchTeams();
  }, [match?.team1_id, match?.team2_id]);


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Post Match Result for <span className='text-pink-600'>{team1Name}</span> vs <span className='text-pink-600'>{team2Name}</span></h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {['goals', 'penalties', 'red', 'yellow'].map((category) => (
          <div key={category}>
            <h2 className="text-xl font-semibold text-pink-600 mb-2 capitalize">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {[team1Players, team2Players].map((players, index) => (
                <div key={index}>
                  <h3 className="font-medium text-purple-600 text-lg">Team {index + 1}</h3>
                  {Array.isArray(players) &&
                  players.map((player) => (
                    <div key={player.id} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={
                          (index === 0
                            ? category === 'goals'
                              ? team1GoalScorers
                              : category === 'penalties'
                                ? team1PenaltyScorers
                                : category === 'red'
                                  ? team1RedCardPlayers
                                  : team1YellowCardPlayers
                            : category === 'goals'
                              ? team2GoalScorers
                              : category === 'penalties'
                                ? team2PenaltyScorers
                                : category === 'red'
                                  ? team2RedCardPlayers
                                  : team2YellowCardPlayers
                          ).includes(player.id)
                        }
                        onChange={() =>
                          togglePlayerSelection(
                            index === 0 ? 'team1' : 'team2',
                            category as 'goals' | 'penalties' | 'red' | 'yellow',
                            player.id
                          )
                        }
                      />
                      <label className='text-gray-600'>{player.name}</label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-8">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Submit Match Result
          </button>
        </div>
      </form>
    </div>
  );
}
