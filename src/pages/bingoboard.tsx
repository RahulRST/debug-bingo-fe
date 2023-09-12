/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/loader';

const Bingoboard: () => JSX.Element = () => {
  const [leaderboardData, setLeaderboardData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    // Fetch leaderboard data from your backend API
    const query: () => Promise<void> = async () => await axios.get(import.meta.env.VITE_API_URL+'/leaderboard/bingo', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }) // Replace with the actual API endpoint
      .then((response) => {
        if(response.data.leaderBoard.length === 0) {
            setLeaderboardData([]);
            setLoading(false);
        }
        setLeaderboardData(response.data.leaderBoard);
        console.log(response.data.leaderBoard)
        setLoading(false);
  }).catch((error) => {
        console.error('Error fetching leaderboard data:', error);
      });
    query();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-semibold mb-4">Leaderboard</h1>
      {loading ? (
        <Loader />
      ) : (
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">State</th>
              <th className="px-4 py-2">Duration</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry: any, index: any) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{entry.user.name}</td>
                <td className="border px-4 py-2">
                  <div className='flex flex-row items-center justify-center'>
                    <div className={entry.state > 0 ? 'badge badge-success' : 'badge badge-neutral'}></div>
                    <div className={entry.state > 1 ? 'badge badge-success' : 'badge badge-neutral'}></div>
                    <div className={entry.state > 2 ? 'badge badge-success' : 'badge badge-neutral'}></div>
                    <div className={entry.state > 3 ? 'badge badge-success' : 'badge badge-neutral'}></div>
                    <div className={entry.state > 4 ? 'badge badge-success' : 'badge badge-neutral'}></div>
                  </div>
                </td>
                <td className="border px-4 py-2">{entry.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bingoboard;
