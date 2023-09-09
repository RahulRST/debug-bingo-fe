import { Link } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Layout = (props: any) => {
  return (
    <div className="flex items-center justify-center">
      <div className="p-8 rounded flex flex-col shadow-md">
        <div className="flex items-center justify-between mb-4">
          <Link to="/home" className="btn btn-primary">
            Home
          </Link>
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
