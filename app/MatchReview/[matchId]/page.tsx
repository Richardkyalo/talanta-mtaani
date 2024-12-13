"use client";
import { Key, useState, useEffect, useMemo } from 'react';
import { playerService } from '@/app/api/playerservice/playerService';
import { userService } from '@/app/api/userService/userService';
import { useSearchParams } from 'next/navigation';

interface MatchDetailsProps {
  params: {
    matchId: string;
  };
}

interface Referee {
  id: string;
  name: string;
}

interface Player {
  id: string;
  name: string;
}

const getPlayerById = async (id: string): Promise<Player> => {
  const response = await playerService.getPlayerById(id);
  return response?.data || { id: '', name: '' };
};

const getRefereeById = async (id: string): Promise<Referee> => {
  const response = await userService.getRefereeById(id);
  return response?.data || { id: '', name: '' };
};

export default function MatchDetails({ params }: MatchDetailsProps) {
  const searchParams = useSearchParams();
  const data = searchParams.get('data');

  const match = useMemo(
    () => (data ? JSON.parse(decodeURIComponent(data as string)) : null),
    [data]
  );

  const [refereeNames, setRefereeNames] = useState<string[]>([]);
  const [homePlayerNames, setHomePlayerNames] = useState<string[]>([]);
  const [awayPlayerNames, setAwayPlayerNames] = useState<string[]>([]);
  const [homeSubNames, setHomeSubNames] = useState<string[]>([]);
  const [awaySubNames, setAwaySubNames] = useState<string[]>([]);

  useEffect(() => {
    if (match) {
      // Fetch referee names
      Promise.all(match.referees.map((id: string) => getRefereeById(id))).then(
        (results) => {
          setRefereeNames(results.map((ref) => ref.name));
        }
      );

      // Fetch home team player names
      Promise.all(match.first11Home.map((id: string) => getPlayerById(id))).then(
        (results) => {
          setHomePlayerNames(results.map((player) => player.name));
        }
      );

      // Fetch away team player names
      Promise.all(match.first11Away.map((id: string) => getPlayerById(id))).then(
        (results) => {
          setAwayPlayerNames(results.map((player) => player.name));
        }
      );

      // Fetch home substitutes
      Promise.all(match.subsHome.map((id: string) => getPlayerById(id))).then(
        (results) => {
          setHomeSubNames(results.map((player) => player.name));
        }
      );

      // Fetch away substitutes
      Promise.all(match.subsAway.map((id: string) => getPlayerById(id))).then(
        (results) => {
          setAwaySubNames(results.map((player) => player.name));
        }
      );
    }
  }, [match]);

  if (!match) {
    return <div>Loading match details...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {match.home} vs {match.away} Match Details
        </h1>

        {/* Match Overview */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Location</h2>
            <p className="text-gray-600">{match.location}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Referees</h2>
            <ul className="text-gray-600">
              {refereeNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-6" />

        {/* Teams */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
          {/* Home Team */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {match.home}
            </h2>

            <h3 className="font-medium text-gray-600">First 11</h3>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              {homePlayerNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>

            <h3 className="font-medium text-gray-600">Substitutes</h3>
            <ul className="list-disc list-inside text-gray-600">
              {homeSubNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>

          {/* Away Team */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {match.away}
            </h2>

            <h3 className="font-medium text-gray-600">First 11</h3>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              {awayPlayerNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>

            <h3 className="font-medium text-gray-600">Substitutes</h3>
            <ul className="list-disc list-inside text-gray-600">
              {awaySubNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
