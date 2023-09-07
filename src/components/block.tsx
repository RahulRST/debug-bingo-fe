import { useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Block = (props: any) => {
  const [userInput, setUserInput] = useState(props.block.question);

  return (
    <>
    <div className="flex flex-col gap-y-4 items-center mx-auto p-6">
        <div className="badge badge-accent badge-lg m-5">{props.block.category}</div>
      <a href={"#" + props.block.id} className="btn btn-primary">
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
            <a
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
              href="#"
            >
              Submit
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Block;
