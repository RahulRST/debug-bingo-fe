/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useState, useEffect } from 'react';

const Game = () => {
  const [challenges, setChallenges] = useState<any>([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    const query = async() => await axios.get(import.meta.env.VITE_API_URL+'/challenge')
      .then((res: any) => {
        setChallenges(res.data);
        setUserInput(res.data[currentChallengeIndex].question);
      })
      .catch((error) => {
        console.error('Error fetching challenges:', error);
      });
    query();
  }, []);

  const handleSubmit = () => {
    // Check if the user's input matches the correct solution
    const currentChallenge: any = challenges[currentChallengeIndex];
    if (userInput.trim() === currentChallenge.solution.trim()) {
      // Update the score and move to the next challenge
      setScore(score + 1);
      setCurrentChallengeIndex(currentChallengeIndex + 1);
      setUserInput(challenges[currentChallengeIndex + 1].question);
    } else {
        // Incorrect solution
        // alert('Incorrect solution, please try again');
        setCurrentChallengeIndex(currentChallengeIndex + 1);
        setUserInput(challenges[currentChallengeIndex + 1].question);
        }
  };

  if (currentChallengeIndex >= challenges.length) {
    // All challenges completed
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-4">Game Over!</h1>
        <p>Your final score: {score}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 items-center mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Debugging Bingo</h1>
      <p>Challenge {currentChallengeIndex + 1}/{challenges.length}</p>
      <h2 className="text-xl font-semibold mb-2">{challenges[currentChallengeIndex].description}</h2>
        <p className="mb-4">{challenges[currentChallengeIndex].question}</p>
      <textarea
        value={userInput}
        className='input input-accent input-lg h-28 w-96'
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter your code here"
      ></textarea>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Game;
