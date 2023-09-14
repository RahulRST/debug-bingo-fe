/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import Block from "../components/block";

interface allStateType {
  B: boolean,
  I: boolean,
  N: boolean,
  G: boolean,
  O: boolean
}

interface allTimeType {
  B: number,
  I: number,
  N: number,
  G: number,
  O: number
}

const Bingo: () => JSX.Element = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [finalTime, setFinalTime] = useState<number>(0);
  const [challenges, setChallenges] = useState<any>();

  const [allState, setAllState] = useState<allStateType>({
    B: false,
    I: false,
    N: false,
    G: false,
    O: false
  });
  const [allTime, setAllTime] = useState<allTimeType>({
    B: Number.MAX_SAFE_INTEGER,
    I: Number.MAX_SAFE_INTEGER,
    N: Number.MAX_SAFE_INTEGER,
    G: Number.MAX_SAFE_INTEGER,
    O: Number.MAX_SAFE_INTEGER
  });

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

  useEffect(() => {
    const query: () => Promise<void> = async () => {
      await axios
        .get(import.meta.env.VITE_API_URL + "/bingo", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res: any) => {
          setChallenges(res.data.challenges);
        })
        .catch((error) => {
          console.error("Error fetching challenges:", error);
        });
    };
    query();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeElapsed(0);
    }
    setTimeout(() => setTimeElapsed(timeElapsed + 1), 10);
    updateButton(getPatternCount());
    updateStateTime();
  }, [timeElapsed]);

  const getState: () => Array<any> = () => {
    const array = [];
    for (let i = 1; i <= 25; i++) {
      array.push(sessionStorage.getItem(i.toString()));
    }
    return array;
  };

  const getPatternCount: () => number = () => {
    const array = getState();
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
    return count;
  };

  const updateStateTime = () => {
    if(getPatternCount() == 1 && !allState.B) {
      setAllState({...allState, B: true});
      setAllTime({...allTime, B: timeElapsed / 100});
    }
    if(getPatternCount() == 2 && !allState.I) {
      setAllState({...allState, I: true});
      setAllTime({...allTime, I: timeElapsed / 100});
    }
    if(getPatternCount() == 3 && !allState.N) {
      setAllState({...allState, N: true});
      setAllTime({...allTime, N: timeElapsed / 100});
    }
    if(getPatternCount() == 4 && !allState.G) {
      setAllState({...allState, G: true});
      setAllTime({...allTime, G: timeElapsed / 100});
    }
    if(getPatternCount() == 5 && !allState.O) {
      setAllState({...allState, O: true});
      setAllTime({...allTime, O: timeElapsed / 100});
    }
  }

  const updateButton = (count: number) => {
    for (let i = 1; i <= count; i++) {
      const btn: HTMLElement | null = document.getElementById(`btn${i}`);
      if (btn) {
        btn.classList.remove("btn-glass");
        btn.classList.add("btn-success");
      }
    }
  };

  const handleScore: (count: number) => Promise<void> = async (count) => {
    const duration = timeElapsed / 100;
    setFinalTime(duration);
    console.log(allState, allTime)
    await axios
      .post(
        import.meta.env.VITE_API_URL + "/bingo/score",
        {
          bduration: count > 0 ? allTime.B : null,
          iduration: count > 1 ? allTime.I : null,
          nduration: count > 2 ? allTime.N : null,
          gduration: count > 3 ? allTime.G : null,
          oduration: count > 4 ? duration : null,
          state: count,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res: any) => {
        console.log(res.data.message);
        sessionStorage.clear();
      })
      .catch((error) => {
        console.error("Error adding score to leaderboard:", error);
        setError(error.message);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  // const updateState: () => void = () => {
  //   const count = getPatternCount();
  //   updateButton(count);
  //   if (count >= 5 && !finished) {
  //     setFinished(true);
  //     setUploading(true);
  //     handleScore(count);
  //   }
  // };

  const submitState = () => {
    updateButton(getPatternCount());
    setFinished(true);
    setUploading(true);
    handleScore(getPatternCount());
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-x-2">
        <div className="flex flex-row items-center justify-center gap-x-2 my-4">
          <button
            id="btn1"
            className="btn btn-circle btn-glass btn-lg hover:scale-125 transform transition-all duration-300 ease-in-out"
          >
            B
          </button>
          <button
            id="btn2"
            className="btn btn-circle btn-glass btn-lg hover:scale-125 transform transition-all duration-300 ease-in-out"
          >
            I
          </button>
          <button
            id="btn3"
            className="btn btn-circle btn-glass btn-lg hover:scale-125 transform transition-all duration-300 ease-in-out"
          >
            N
          </button>
          <button
            id="btn4"
            className="btn btn-circle btn-glass btn-lg hover:scale-125 transform transition-all duration-300 ease-in-out"
          >
            G
          </button>
          <button
            id="btn5"
            className="btn btn-circle btn-glass btn-lg hover:scale-125 transform transition-all duration-300 ease-in-out"
          >
            O
          </button>
        </div>
        {finished ? (
          finalTime ? (
            <div className="text-3xl font-semibold m-4 text-center">
              {" "}
              Time Elapsed : {finalTime}{" "} s
            </div>
          ) : (
            <></>
          )
        ) : (
          <div className="text-3xl font-semibold m-4 text-center">
            {" "}
            Time Elapsed : {timeElapsed / 100}{" "} s
          </div>
        )}
      </div>
      {loading ? (
        <Loader />
      ) : challenges ? (
        finished ? (
          uploading ? (
            <Loader />
          ) : error ? (
            <div className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          ) : (
            <div className="alert">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Score Added Successfully</span>
            </div>
          )
        ) : (
          <>
            <div className="grid grid-cols-5 items-center justify-center p-4 m-4 rounded-xl border-2 border-secondary shadow-2xl shadow-accent">
              {challenges.map((challenge: any, index: number) => {
                return <Block key={index} block={challenge} id={index + 1} />;
              })}
            </div>
            <div className="flex flex-col items-center justify-center gap-x-2 my-4">
              <button
                className="btn btn-primary btn-lg hover:scale-125 transform transition-all duration-300 ease-in-out"
                onClick={submitState}
              >
                Submit
              </button>
            </div>
          </>
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Bingo;
