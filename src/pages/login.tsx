import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const handlelogin = async () =>
      await axios
        .post(import.meta.env.VITE_API_URL + "/auth/login", {
          name,
          email,
        })
        .then((response) => {
          localStorage.setItem("user", response.data.user);
          navigate("/home");
        })
        .catch((error) => {
          setError(error.response.data.message);
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
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card shadow-md shadow-accent p-20">
        <h2 className="text-2xl font-semibold mb-4 text-accent text-center">
          Debug Bingo
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
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
