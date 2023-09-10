import { Link } from "react-router-dom";
import Logo from "../assets/logo.tsx";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Layout = (props: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg flex flex-col items-center justify-center">
        <div className="flex flex-row items-center gap-x-10 min-w-full justify-around mb-4">
          <Link to="/home" className="btn btn-primary">
            Home
          </Link>
          <Logo />
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
