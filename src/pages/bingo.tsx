/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import Block from "../components/block";

const Bingo = () => {
  const [loading, setLoading] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [finished, setFinished] = useState(false);
  //   const [score, setScore] = useState(0);
  const [challenges, setChallenges] = useState<any>();

  useEffect(() => {
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

  useEffect(() => {
    setTimeout(() => setTimeElapsed(timeElapsed + 1), 1000);
  }, [timeElapsed]);


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
    for (let i = 1; i <= count; i++) {
      const btn = document.getElementById(`btn${i}`);
      if (btn) {
        btn.classList.remove("btn-glass");
        btn.classList.add("btn-success");
      }
    }
    if(count >= 5) {
      setFinished(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-x-2">
          <div className="text-3xl font-semibold mb-4 text-center">
            Bingo Game
          </div>
          <div className="flex flex-row items-center justify-center gap-x-2 my-4">
            <button id="btn1" className="btn btn-circle btn-glass btn-lg">
              B
            </button>
            <button id="btn2" className="btn btn-circle btn-glass btn-lg">
              I
            </button>
            <button id="btn3" className="btn btn-circle btn-glass btn-lg">
              N
            </button>
            <button id="btn4" className="btn btn-circle btn-glass btn-lg">
              G
            </button>
            <button id="btn5" className="btn btn-circle btn-glass btn-lg">
              O
            </button>
          </div>
          <div className="flex flex-row items-center my-4 justify-center gap-x-2">
          <div className="text-3xl font-semibold mb-4 text-center">
            Time Elapsed
          </div>
          <div className="text-3xl font-semibold mb-4 text-center">
            {timeElapsed}s
          </div>
        </div>
          <button
            onClick={updateState}
            className="btn btn-secondary btn-lg m-5 self-center"
          >
            Update State
          </button>
        </div>
      {loading ? (
        <Loader />
      ) : challenges ? ( finished ? ( <div className="text-3xl font-semibold text-secondary"> Bingo </div> ) : (
        <div className="grid grid-cols-5 items-center justify-center p-4 m-4 rounded-xl border-2 border-secondary shadow-2xl shadow-accent">
          {challenges.map((challenge: any, index: number) => {
            return <Block block={challenge} id={index + 1} />;
          })}
        </div> )
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Bingo;
