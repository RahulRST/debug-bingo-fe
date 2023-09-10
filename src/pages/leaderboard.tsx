/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/loader';

const Leaderboard: () => JSX.Element = () => {
  const [leaderboardData, setLeaderboardData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const query: () => Promise<void> = async () => await axios.get(import.meta.env.VITE_API_URL+'/leaderboard/game', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
      .then((response) => {
        if(response.data.leaderBoard.length === 0) {
          setLeaderboardData([]);
          setLoading(false);
        }
        setLeaderboardData(response.data.leaderBoard);
        setLoading(false);
  }).catch((error) => {
        console.error('Error fetching leaderboard data:', error);
      });
    query();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Leaderboard</h1>
      {loading ? (
        <Loader />
      ) : (
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry: any, index: any) => (
              <tr key={entry.userId}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{entry.user.name}</td>
                <td className="border px-4 py-2">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
