/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../components/loader";

const Game = () => {
  const [challenges, setChallenges] = useState<any>();
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    setStartTime(Date.now());
    const query = async () =>
      await axios
        .get(import.meta.env.VITE_API_URL + "/challenge", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res: any) => {
          setChallenges(res.data);
          setUserInput(res.data[currentChallengeIndex].question);
        })
        .catch((error) => {
          console.error("Error fetching challenges:", error);
        });
    query();
  }, []);

  const handleSubmit = () => {
    const currentChallenge: any = challenges[currentChallengeIndex];
    if (userInput.trim() === currentChallenge.solution.trim()) {
      setScore(score + 1);
    }
    setCurrentChallengeIndex(currentChallengeIndex + 1);
    setUserInput(
      challenges[currentChallengeIndex + 1]
        ? challenges[currentChallengeIndex + 1].question
        : ""
    );
    if (currentChallengeIndex + 1 >= challenges.length) {
      setFinished(true);
      const handle = async () =>
        await axios
          .post(
            import.meta.env.VITE_API_URL + "/leaderboard/add",
            {
              score: score,
              duration: (Date.now() - startTime) / 1000,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res: any) => {
            console.log(res);
          })
          .catch((error) => {
            console.error("Error adding score to leaderboard:", error);
          });
      handle();
    }
  };

  return (
    <div className="container mx-auto">
      <div className="text-3xl font-semibold mb-4 text-center">Game</div>
      {finished ? (
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-semibold mb-4">Game Over!</h1>
          <p>Your final score: {score}</p>
        </div>
      ) : challenges && challenges[currentChallengeIndex] ? (
        <div className="flex flex-col gap-y-4 items-center mx-auto p-6">
          <p>
            Challenge {currentChallengeIndex + 1}/{challenges.length}
          </p>
          <h2 className="text-xl font-semibold mb-2">
            {challenges[currentChallengeIndex].description}
          </h2>
          <p className="mb-4">{challenges[currentChallengeIndex].question}</p>
          <textarea
            value={userInput}
            className="input input-accent input-lg h-28 w-96"
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
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Game;
