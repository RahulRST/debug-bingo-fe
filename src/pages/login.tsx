/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login: () => JSX.Element = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit: (e: FormEvent) => void = (e) => {
    try{
    e.preventDefault();
    setLoading(true);

    if (!name || !email) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const handlelogin: () => Promise<void> = async () =>
      await axios
        .post(import.meta.env.VITE_API_URL + "/auth/login", {
          name,
          email,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          navigate("/home");
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
        
    handlelogin();

    setTimeout(() => {
      setName("");
      setEmail("");
      setError("");
    }, 5000);
  } catch (error: any) {
    console.error("Error logging in:", error);
    setError(error.message);
    setLoading(false);
    setTimeout(() => {
      setError("");
    }
    , 5000);
  }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card shadow-md shadow-accent p-20">
        <h2 className="text-2xl font-semibold mb-4 text-primary text-center">
          Debug Bingo
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block badge badge-accent badge-lg text-sm font-bold mb-4"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block badge badge-accent badge-lg text-sm font-bold mb-4"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          {error && <p className="alert alert-error my-5">{error}</p>}
          <button
            type="submit"
            className={loading ? "btn btn-accent loading" : "btn btn-accent"}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
