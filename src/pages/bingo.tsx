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
  return loading ? (
    <Loader />
  ) : challenges ? (
    <div className="grid grid-cols-5 items-center justify-center p-4 m-4 rounded-xl border-2 border-secondary shadow-2xl shadow-accent">
      {challenges.map((challenge: any) => {
        return <Block block={challenge} />
      })}
    </div>
  ) : (
    <Loader />
  );
};

export default Bingo;
