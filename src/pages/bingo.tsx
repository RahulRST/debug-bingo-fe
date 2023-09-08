/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import Block from "../components/block";

const Bingo = () => {
  const [loading, setLoading] = useState(true);
  //   const [startTime, setStartTime] = useState(0);
  //   const [score, setScore] = useState(0);
  const [block1, setBlock1] = useState<any>();
  const [block2, setBlock2] = useState<any>();
  const [block3, setBlock3] = useState<any>();
  const [block4, setBlock4] = useState<any>();
  const [block5, setBlock5] = useState<any>();
  const [block6, setBlock6] = useState<any>();
  const [block7, setBlock7] = useState<any>();
  const [block8, setBlock8] = useState<any>();
  const [block9, setBlock9] = useState<any>();
  const [block10, setBlock10] = useState<any>();
  const [block11, setBlock11] = useState<any>();
  const [block12, setBlock12] = useState<any>();
  const [block13, setBlock13] = useState<any>();
  const [block14, setBlock14] = useState<any>();
  const [block15, setBlock15] = useState<any>();
  const [block16, setBlock16] = useState<any>();

  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);
  const [state4, setState4] = useState(false);
  const [state5, setState5] = useState(false);
  const [state6, setState6] = useState(false);
  const [state7, setState7] = useState(false);
  const [state8, setState8] = useState(false);
  const [state9, setState9] = useState(false);
  const [state10, setState10] = useState(false);
  const [state11, setState11] = useState(false);
  const [state12, setState12] = useState(false);
  const [state13, setState13] = useState(false);
  const [state14, setState14] = useState(false);
  const [state15, setState15] = useState(false);
  const [state16, setState16] = useState(false);

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
          setBlock1(res.data.block1);
          setBlock2(res.data.block2);
          setBlock3(res.data.block3);
          setBlock4(res.data.block4);
          setBlock5(res.data.block5);
          setBlock6(res.data.block6);
          setBlock7(res.data.block7);
          setBlock8(res.data.block8);
          setBlock9(res.data.block9);
          setBlock10(res.data.block10);
          setBlock11(res.data.block11);
          setBlock12(res.data.block12);
          setBlock13(res.data.block13);
          setBlock14(res.data.block14);
          setBlock15(res.data.block15);
          setBlock16(res.data.block16);
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
  ) : block1 && block2 && block3 && block4 ? (
    <div className="grid grid-cols-4 items-center justify-center border-2 border-primary">
      <Block block={block1} state={state1} setState={setState1} />
      <Block block={block2} state={state2} setState={setState2} />
      <Block block={block3} state={state3} setState={setState3} />
      <Block block={block4} state={state4} setState={setState4} />
      <Block block={block5} state={state5} setState={setState5} />
      <Block block={block6} state={state6} setState={setState6} />
      <Block block={block7} state={state7} setState={setState7} />
      <Block block={block8} state={state8} setState={setState8} />
      <Block block={block9} state={state9} setState={setState9} />
      <Block block={block10} state={state10} setState={setState10} />
      <Block block={block11} state={state11} setState={setState11} />
      <Block block={block12} state={state12} setState={setState12} />
      <Block block={block13} state={state13} setState={setState13} />
      <Block block={block14} state={state14} setState={setState14} />
      <Block block={block15} state={state15} setState={setState15} />
      <Block block={block16} state={state16} setState={setState16} />
    </div>
  ) : (
    <Loader />
  );
};

export default Bingo;
