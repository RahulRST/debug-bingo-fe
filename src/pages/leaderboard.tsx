/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch leaderboard data from your backend API
    const query = async () => await axios.get(import.meta.env.VITE_API_URL+'/leaderboard', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }) // Replace with the actual API endpoint
      .then((response) => {
        if(response.data.leaderBoard.length === 0) {
            return;
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
        <p>Loading...</p>
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
                <td className="border px-4 py-2">{entry.username}</td>
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
