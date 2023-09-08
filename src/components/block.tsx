import { useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Block = (props: any) => {
  const [userInput, setUserInput] = useState(props.block.question);

  const handleSubmit = () => {
    props.setState(true);
    const a = document.createElement("a");
    a.href = "#";
    a.click();
  };

  return (
    <>
    <div className="flex flex-col gap-y-4 items-center mx-auto p-6">
        <div className="badge badge-accent badge-lg m-5">{props.block.category}</div>
      <a href={"#" + props.block.id} className={props.state?"btn btn-primary btn-disabled":"btn btn-primary"}>
        Access
      </a>
      </div>
      <div className="modal" id={props.block.id}>
        <div className="modal-box">
          {/* <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">This modal works with anchor links</p>
          <div className="modal-action">
            <a href="#" className="btn">
              Yay!
            </a>
          </div> */}
          <div className="flex flex-col gap-y-4 items-center mx-auto p-6">
            <p>Challenge {props.block.id}</p>
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
            <div className="flex flex-row gap-4 items-center justify-center">
            <a
              className={"btn btn-primary"}
              onClick={handleSubmit}
            >
              Submit
            </a>
            <a 
              href="#"
              className="btn btn-secondary"
            >
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
