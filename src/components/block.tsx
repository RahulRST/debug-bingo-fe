import { useState } from "react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Block = (props: any) => {
  const [userInput, setUserInput] = useState(props.block.question);
  const [state, setState] = useState(false);
  const [error, setError] = useState<any>(null);

  const handleSubmit = () => {
    if (userInput.trim() === props.block.solution.trim()) {
      setState(true);
      const a = document.createElement("a");
      a.href = "#";
      a.click();
    } else {
      setState(false);
      setError("Try Again!!!");
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  const handleClick = () => {
    if(state) return;
    const a = document.createElement("a");
    a.href = "#" + props.id;
    a.click();
  };

  return (
    <>
      <div className="flex flex-col items-center py-8">
        <button
          onClick={handleClick}
          className="badge badge-secondary badge-lg m-5"
        >
          {props.block.category}
        </button>
        {state ? <TiTick className="w-8 h-6" /> : <ImCross />}
      </div>
      <div className="modal" id={props.id}>
        <div className="modal-box">
          {/* <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">This modal works with anchor links</p>
          <div className="modal-action">
            <a href="#" className="btn">
              Yay!
            </a>
          </div> */}
          <div className="flex flex-col gap-y-4 items-center mx-auto p-6">
            <p>Challenge {props.id}</p>
            <h2 className="text-xl font-semibold mb-2">
              {props.block.description}
            </h2>
            <p className="mb-4">{props.block.question}</p>
            <textarea
              value={userInput}
              className="input input-accent input-lg h-28 w-96"
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your code here"
            ></textarea>
            {error ? (
              <div className="alert alert-error flex flex-row items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>) : null}
            <div className="flex flex-row gap-4 items-center justify-center">
              <a className={"btn btn-primary"} onClick={handleSubmit}>
                Submit
              </a>
              <a href="#" className="btn btn-secondary">
                Close
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Block;
