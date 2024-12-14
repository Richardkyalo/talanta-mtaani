'use client';

import { useSearchParams } from 'next/navigation';
import { userService } from '@/app/api/userService/userService';
import React, {
  useState,
  useEffect,
  useMemo,
} from 'react';

interface Referee {
  id: string;
  name: string;
}

const getRefereeById = async (id: string): Promise<Referee> => {
  const response = await userService.getRefereeById(id);
  return response?.data || { id: '', name: '' };
};

const MatchStatPage = () => {
  const searchParams = useSearchParams();
  const data = searchParams.get('data');

  const match = useMemo(
    () => (data ? JSON.parse(decodeURIComponent(data as string)) : null),
    [data]
  );

  const [referees, setReferees] = useState<Referee[]>([]);

  useEffect(() => {
    const fetchReferees = async () => {
      if (match?.referee_ids?.length > 0) {
        const fetchedReferees = await Promise.all(
          match.referee_ids.map((id: string) => getRefereeById(id))
        );
        setReferees(fetchedReferees);
      }
    };
    fetchReferees();
  }, [match]);

  if (!match) {
    return <div>Loading...</div>;
  }

  console.log("match",match)
  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Match Info Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-3xl font-semibold text-gray-800">
            {match.team1Name} vs {match.team2Name}
          </div>
          <div className="text-lg text-gray-500">
            {new Date(match.date).toLocaleString('en-US')}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Team 1 Stats */}
          <div className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow-sm">
            <div className="text-xl font-semibold text-blue-600 mb-4">
              {match.team1Name}
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {match.team1TotalGoals}
            </div>
            <div className="text-sm text-gray-500">Goals</div>
            <div className="mt-4">
              <div className="text-gray-500">Goal Scorers:</div>
              <ol className="list-disc list-inside text-gray-700">
                {match.team1goalscorerNames?.map((scorer: string, index: number) => (
                  <li key={index}>{scorer}</li>
                ))}
              </ol>
            </div>
            <div className='mt-4'>
              <div className="text-gray-500">Penalty Scorers:</div>
              <ol className="list-disc list-inside text-gray-700">
                {match.team1penaltyScorerNames?.map((scorer: string, index: number) => (
                  <li key={index}>{scorer}</li>
                ))}
              </ol>

            </div>
            <div className="mt-4">
              <div className="text-amber-400">
                <p>Yellow Cards: {match.team1TotalYellowCards}</p>
                <ol className="list-disc list-inside">
                  {match.team1yellowcardNames?.map((name: string, index: number) => (
                    <li key={index}>{name}</li>
                  ))}
                </ol>
              </div>
              <div className="text-rose-600">
                <p>Red Cards: {match.team1TotalRedCards}</p>
                <ol className="list-disc list-inside">
                  {match.team1redcardNames?.map((name: string, index: number) => (
                    <li key={index}>{name}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Team 2 Stats */}
          <div className="flex flex-col items-center bg-green-50 p-4 rounded-lg shadow-sm">
            <div className="text-xl font-semibold text-green-600 mb-4">
              {match.team2Name}
            </div>
            <div className="text-3xl font-bold text-green-600">
              {match.team2TotalGoals}
            </div>
            <div className="text-sm text-gray-500">Goals</div>
            <div className="mt-4">
              <div className="text-gray-500">Goal Scorers:</div>
              <ol className="list-disc list-inside text-gray-700">
                {match.team2goalscorerNames?.map((scorer: string, index: number) => (
                  <li key={index}>{scorer}</li>
                ))}
              </ol>
            </div>
            <div className='mt-4'>
              <div className="text-gray-500">Penalty Scorers:</div>
              <ol className="list-disc list-inside text-gray-700">
                {match.team2penaltyScorerNames?.map((scorer: string, index: number) => (
                  <li key={index}>{scorer}</li>
                ))}
              </ol>
            </div>
            <div className="mt-4">
              <div className="text-amber-400">
                <p>Yellow Cards: {match.team2TotalYellowCards}</p>
                <ol className="list-disc list-inside">
                  {match.team2yellowcardNames?.map((name: string, index: number) => (
                    <li key={index}>{name}</li>
                  ))}
                </ol>
              </div>
              <div className="text-rose-600">
                <p>Red Cards: {match.team2TotalRedCards}</p>
                <ol className="list-disc list-inside">
                  {match.team2redcardNames?.map((name: string, index: number) => (
                    <li key={index}>{name}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Match Info */}
        <div className="mt-8">
          <div className="text-xl font-semibold text-gray-800 mb-4">
            Match Venue: {match.match_pool}
          </div>
          <div className="text-gray-600 text-sm">
            <span className="font-semibold">Referees:</span>
            <ol className="list-disc list-inside">
              {referees.map((referee) => (
                <li key={referee.id}>{referee.name}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchStatPage;
