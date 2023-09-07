/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";

const Bingo = () => {
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState(0);
  const [score, setScore] = useState(0);
  const [block1, setBlock1] = useState<any>();
  const [block2, setBlock2] = useState<any>();
  const [block3, setBlock3] = useState<any>();
  const [block4, setBlock4] = useState<any>();
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);
  const [state4, setState4] = useState(false);

  useEffect(() => {
    setStartTime(Date.now());
    const query = async () => {
      await axios
        .get(import.meta.env.VITE_API_URL + "/bingo", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res: any) => {
          setBlock1(res.data.block1);
          setBlock2(res.data.block2);
          setBlock3(res.data.block3);
          setBlock4(res.data.block4);
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
  ) : (block1 && block2 && block3 && block4) ? (
    <div className="grid grid-cols-2 border-2 border-primary">
      <div className="flex flex-col space-y-4">{block1.description}</div>
      <div className="flex flex-col space-y-4">{block2.description}</div>
      <div className="flex flex-col space-y-4">{block3.description}</div>
      <div className="flex flex-col space-y-4">{block4.description}</div>
    </div>
    ) : (<Loader />
  );
};

export default Bingo;
