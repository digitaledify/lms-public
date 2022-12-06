import loginFormJpg from "../assets/login-page-hero.jpg";
import logoSrc from "../assets/logo.png";

import { useState } from "react";
import axios from "axios";
import { Link } from "@tanstack/react-location";

const baseURL = "https://lms-public.onrender.com/api/auth";

function LoginForm() {
 
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseURL + "/login", { ...user });

      console.log(response.data);
      setUser({ username: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen ">
      <div className="flex flex-col lg:flex-row-reverse">
        <div className="w-full lg:max-w-[50%]">
          <img
            src={loginFormJpg}
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
                India’s #1 Training Institute
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
                className="input input-bordered"
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
                className="input input-bordered"
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
                <Link to='/signup'>Register</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
