/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import Block from "../components/block";

const Bingo = () => {
  const [loading, setLoading] = useState(true);
  //   const [startTime, setStartTime] = useState(0);
  //   const [score, setScore] = useState(0);
  const [challenges, setChallenges] = useState<any>();

  useEffect(() => {
    // setStartTime(Date.now());
    const query = async () => {
      await axios
        .get(import.meta.env.VITE_API_URL + "/bingo", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res: any) => {
          setChallenges(res.data.challenges);
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Error fetching challenges:", error);
        });
    };
    query();
    setLoading(false);
  }, []);

  const updateState = () => {
    const array = [];
    for (let i = 1; i <= 25; i++) {
      array.push(sessionStorage.getItem(i.toString()));
    }
    const bingoPatterns = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];
    let count = 0;
    for (let i = 0; i < bingoPatterns.length; i++) {
      let flag = true;
      for (let j = 0; j < bingoPatterns[i].length; j++) {
        if (array[bingoPatterns[i][j]] !== "true") {
          flag = false;
          break;
        }
      }
      if (flag) {
        count++;
      }
    }
    if(count >= 5){
      alert("Bingo");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-3xl font-semibold mb-4 text-center">Bingo Game</div>
      <div className="flex flex-row items-center justify-center gap-x-2 my-4">
        <button className="btn btn-circle btn-glass btn-lg">
          B
        </button>
        <button className="btn btn-circle btn-glass btn-lg">
          I
        </button>
        <button className="btn btn-circle btn-glass btn-lg">
          N
        </button>
        <button className="btn btn-circle btn-glass btn-lg">
          G
        </button>
        <button className="btn btn-circle btn-glass btn-lg">
          O
        </button>
      </div>
      <button
          onClick={updateState}
          className="btn btn-secondary btn-lg m-5 self-center"
        >
          Update State
        </button>
      {loading ? (
        <Loader />
      ) : challenges ? (
        <div className="grid grid-cols-5 items-center justify-center p-4 m-4 rounded-xl border-2 border-secondary shadow-2xl shadow-accent">
          {challenges.map((challenge: any, index: number) => {
            return <Block block={challenge} id={index + 1} />;
          })}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Bingo;
