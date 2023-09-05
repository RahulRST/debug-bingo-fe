import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Welcome to Debugging Bingo!</h1>
      <p className="text-lg mb-4">
        Test your coding skills by debugging challenges and earn high scores!
      </p>
      <div className="flex flex-col space-y-4">
        <Link
          to="/game" // Replace with the actual route to start a new game
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-center"
        >
          Start a New Game
        </Link>
        <Link
          to="/leaderboard" // Replace with the actual route to view the leaderboard
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded text-center"
        >
          View Leaderboard
        </Link>
      </div>
    </div>
  );
};

export default Home;
