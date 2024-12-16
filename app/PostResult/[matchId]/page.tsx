'use client';
import { useState, useEffect } from 'react';
import { playerService } from '@/app/api/playerservice/playerService';
import { useSearchParams } from 'next/navigation';
import { teamService } from '@/app/api/teamservice/teamService';
import { matchService } from '@/app/api/matches/matches';
import { teamStatisticService } from '@/app/api/teamStat/teamstat'
import { playerStatServiceInstance } from '@/app/api/playerStat/playerStat';

const getTeamById = async (id: string) => {
  const response = await teamService.getTeamById(id);
  return response || {};
};

interface Player {
  id: string;
  name: string;
}



export default function PostMatchResult() {
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
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');

  const searchParams = useSearchParams();
  const data = searchParams.get('data');
  const match = data ? JSON.parse(decodeURIComponent(data)) : {};

  useEffect(() => {
    if (!match) {
      console.error('No match data available');
      return;
    }

    const fetchTeamsAndPlayers = async () => {
      try {
        // Fetch team names
        const [team1, team2] = await Promise.all([
          getTeamById(match.team1_id),
          getTeamById(match.team2_id),
        ]);
        setTeam1Name(team1.name || '');
        setTeam2Name(team2.name || '');

        // Fetch players
        const fetchPlayers = async (playerIds: string[]): Promise<Player[]> => {
          const responses = await Promise.all(
            playerIds.map((id) => playerService.getPlayerById(id))
          );
          return responses.map((response) => response.data).filter(Boolean);
        };

        const team1PlayerIds = [...match.team1_first_11_ids];
        const team2PlayerIds = [...match.team2_first_11_ids];

        const [team1Players, team2Players] = await Promise.all([
          fetchPlayers(team1PlayerIds),
          fetchPlayers(team2PlayerIds),
        ]);

        setTeam1Players(team1Players);
        setTeam2Players(team2Players);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTeamsAndPlayers();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const prepareDeletion = (type: string, teamId: number | undefined, data: string[], flag = true) => ({
      type,
      flag,
      team_stat_id: teamId,
      data,
    })
    const prepareUpdate = (type: string, teamId: number | undefined, data: string[], flag = false) => ({
      type,
      flag,
      team_stat_id: teamId,
      data,
    });

    try {
      // Prepare match statistics updates
      const matchStatId = match?.id;
      const resultData = [
        { type: 'team1_penalties', data: team1PenaltyScorers },
        { type: 'team2_penalties', data: team2PenaltyScorers },
        { type: 'team1_id_goals', data: team1GoalScorers },
        { type: 'team2_id_goals', data: team2GoalScorers },
        { type: 'team1_yellow_cards', data: team1YellowCardPlayers },
        { type: 'team2_yellow_cards', data: team2YellowCardPlayers },
        { type: 'team1_red_cards', data: team1RedCardPlayers },
        { type: 'team2_red_cards', data: team2RedCardPlayers },
      ].map((item) => ({ ...item, matchStat_id: matchStatId, flag: false }));

      // Update match statistics
      for (const update of resultData) {
        console.log(`Updating ${update.type}...`, update);
        await matchService.updateMatchStat(update);
        console.log(`${update.type} updated successfully`);
        await delay(100);
      }

      // Prepare team statistics updates
      // tell david to allow duplicarion of goals_scored, goals_conceded, but not matches_played
      const teamStatUpdates = [
        prepareUpdate('goals_scored', match?.team1_id, [...team1GoalScorers, ...team1PenaltyScorers]),
        prepareUpdate('goals_conceded', match?.team1_id, [...team2GoalScorers, ...team2PenaltyScorers]),
        prepareUpdate('goals_scored', match?.team2_id, [...team2GoalScorers, ...team2PenaltyScorers]),
        prepareUpdate('goals_conceded', match?.team2_id, [...team1GoalScorers, ...team1PenaltyScorers]),
        prepareUpdate('matches_played', match?.team1_id, [matchStatId]),
        prepareUpdate('matches_played', match?.team2_id, [matchStatId]),
      ];

      for (const update of teamStatUpdates) {
        console.log(`Updating ${update.type}...`, update);
        await teamStatisticService.updateTeamStat(update);
        console.log(`${update.type} updated successfully`);
        await delay(100);
      }

      // Determine match outcome
      const matchStats = await matchService.getMatchStatById(matchStatId);
      if (matchStats?.id) {
        const team1TotalGoals = (matchStats.team1_id_goals?.length || 0) + (matchStats.team1_penalties?.length || 0);
        const team2TotalGoals = (matchStats.team2_id_goals?.length || 0) + (matchStats.team2_penalties?.length || 0);

        // first delete any existing draws, wins and losses for the two teams
        await teamStatisticService.updateTeamStat(prepareDeletion('draws', match?.team1_id, [matchStatId]));
        await teamStatisticService.updateTeamStat(prepareDeletion('draws', match?.team2_id, [matchStatId]));
        await teamStatisticService.updateTeamStat(prepareDeletion('wins', match?.team1_id, [matchStatId]));
        await teamStatisticService.updateTeamStat(prepareDeletion('wins', match?.team2_id, [matchStatId]));
        await teamStatisticService.updateTeamStat(prepareDeletion('losses', match?.team1_id, [matchStatId]));
        await teamStatisticService.updateTeamStat(prepareDeletion('losses', match?.team2_id, [matchStatId]));

        let outcomeUpdates: { type: string; flag: boolean; team_stat_id: number | undefined; data: string[]; }[] = [];
        if (team1TotalGoals > team2TotalGoals) {
          outcomeUpdates = [
            prepareUpdate('wins', match?.team1_id, [matchStatId]),
            prepareUpdate('losses', match?.team2_id, [matchStatId]),
          ];
        } 
        if (team2TotalGoals > team1TotalGoals) {
          outcomeUpdates = [
            prepareUpdate('wins', match?.team2_id, [matchStatId]),
            prepareUpdate('losses', match?.team1_id, [matchStatId]),
          ];
        } 
        if(team1TotalGoals === team2TotalGoals){
          outcomeUpdates = [
            prepareUpdate('draws', match?.team1_id, [matchStatId]),
            prepareUpdate('draws', match?.team2_id, [matchStatId]),
          ];
        }

        for (const update of outcomeUpdates) {
          console.log(`Updating ${update.type}...`, update);
          await teamStatisticService.updateTeamStat(update);
          console.log(`${update.type} updated successfully`);
          await delay(100);
        }
      }
      // update player stats for goals
      // tell david to allow duplicarion of matchid goals, matchid yellow cards, matchid red cards
      for (const scorer of [...team1GoalScorers, ...team2GoalScorers, ...team1PenaltyScorers, ...team2PenaltyScorers]) {
        await playerStatServiceInstance.updatePlayerStat(
          {
            type: 'goals', data: [matchStatId], player_stat_id: scorer, flag: false
          }
        );
        await delay(100);
      }
      // update player stats for yellow cards
      for (const player of [...team1YellowCardPlayers, ...team2YellowCardPlayers]) {
        await playerStatServiceInstance.updatePlayerStat(
          {
            type: 'yellow_cards', data: [matchStatId], player_stat_id: player, flag: false
          }
        );
        await delay(100);
      }

      // update player stats for red cards
      for (const player of [...team1RedCardPlayers, ...team2RedCardPlayers]) {
        await playerStatServiceInstance.updatePlayerStat(
          {
            type: 'red_cards', data: [matchStatId], player_stat_id: player, flag: false
          }
        );
        await delay(100);
      }

      // Reset state
      alert('Match result successfully updated!');
      setTeam1GoalScorers([]);
      setTeam2GoalScorers([]);
      setTeam1PenaltyScorers([]);
      setTeam2PenaltyScorers([]);
      setTeam1RedCardPlayers([]);
      setTeam2RedCardPlayers([]);
      setTeam1YellowCardPlayers([]);
      setTeam2YellowCardPlayers([]);
    } catch (err) {
      console.error('Error updating match results:', err);
      alert('An error occurred while updating the match results. Please try again.');
    }
  };


  if (!match) {
    return <div>Invalid match data</div>;
  }

  // useEffect (() => {
  //   const fetchTeams = async () => {
  //     try {
  //       const team1 = await getTeamById(match?.team1_id || '');
  //       const team2 = await getTeamById(match?.team2_id || '');
  //       setTeam1Name(team1.name);
  //       setTeam2Name(team2.name);
  //     } catch (error) {
  //       console.error('Error fetching teams:', error);
  //     }
  //   };
  //   fetchTeams();
  // }, [match?.team1_id, match?.team2_id]);


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
