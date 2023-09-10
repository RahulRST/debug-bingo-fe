import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Welcome to Debug Bingo!</h1>
      <p className="text-lg mb-4">
        Test your coding skills by debugging challenges and earn high scores!
      </p>
      <div className="flex flex-col space-y-4">
        {/* <Link
          to="/game" // Replace with the actual route to start a new game
          className="btn btn-secondary"
        >
          Start a New Game
        </Link> */}
        <Link
          to="/bingo"
          className="btn btn-secondary"
        >
          Start a New Bingo Game
        </Link>
        {/* <Link
          to="/leaderboard" // Replace with the actual route to view the leaderboard
          className="btn btn-glass"
        >
          View Leaderboard
        </Link> */}
        <Link
          to="/bingoboard"
          className="btn btn-glass"
        >
          View Bingo Leaderboard
        </Link>
      </div>
    </div>
  );
};

export default Home;
