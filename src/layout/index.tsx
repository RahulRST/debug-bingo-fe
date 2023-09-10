import { Link } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Layout = (props: any) => {
  return (
    <div className="flex items-center justify-center">
      <div className="p-8 rounded-lg flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <Link to="/home" className="btn btn-primary">
            Home
          </Link>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Debug Bingo
          </h2>
          <Link to="/" className="btn btn-accent">
            Logout
          </Link>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
