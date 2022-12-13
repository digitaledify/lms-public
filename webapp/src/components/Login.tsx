import loginJpg from "../assets/login-page-hero.jpg";
import logoSrc from "../assets/logo.png";
import { toast } from "react-toastify";

import { useState } from "react";
import { Link, Navigate } from "@tanstack/react-location";
import axiosInstance from "../lib/http-client";
import useAuth from "../hooks/useAuth";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const auth = useAuth();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", { ...user });
      auth.login(response.data.token, response.data.user);
    toast("Successfully logged In!", { type: "success" });

      console.log(response.data);
      setUser({ username: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  if (auth.token) return <Navigate to="/" />;

  return (
    <div className="min-h-screen ">
      <div className="flex flex-col lg:flex-row-reverse">
        <div className="w-full lg:max-w-[50%]">
          <img
            src={loginJpg}
            alt="Person working"
            className="w-full lg:min-h-[100vh]"
          />
        </div>
        <div className=" w-full p-4">
          <img src={logoSrc} alt="website logo" />
          <div className="card-body m-auto mt-28 max-w-lg">
            <p className="text-2xl">
              Welcome to <br />
              <span className="text-3xl font-bold">
                India&apos;s #1 Training Institute
              </span>
            </p>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                name="username"
                type="text"
                placeholder="username"
                className="input input-bordered rounded-none"
                value={user.username}
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered rounded-none"
                value={user.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
            <p className="mt-6 text-center">
              Don&apos;t have an account?{" "}
              <span className=" font-semibold underline">
                <Link to="/signup">Register</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
