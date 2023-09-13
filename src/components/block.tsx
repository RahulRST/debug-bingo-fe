import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Block: (props: any) => JSX.Element = (props) => {
  const [userInput, setUserInput] = useState<any>();
  const [state, setState] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    sessionStorage.setItem(props.id, state.toString());
  }, [props.id, state]);

  useEffect(() => {
    setUserInput(props.block.question);
  }, [props.block.question]);

  const handleSubmit: () => void = () => {
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

  const handleClick: () => void = () => {
    if (state) return;
    const a = document.createElement("a");
    a.href = "#" + props.id;
    a.click();
  };

  return (
    <>
      <div className="flex flex-col items-center py-8">
        <button
          onClick={handleClick}
          className="badge badge-secondary badge-lg m-5 hover:scale-110 transform transition-all duration-300 ease-in-out"
        >
          {props.block.category}
        </button>
        {state ? <TiTick className="w-8 h-8" /> : <ImCross className="my-2" />}
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
            <div className="flex flex-row gap-x-4 items-center justify-center">
              <p>Challenge {props.id}</p>
              <div className="badge badge-lg p-4 hover:scale-110 transform transition-all duration-300 ease-in-out">
                {props.block.language}
              </div>
            </div>
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
            ) : null}
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
