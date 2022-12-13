import { useState } from "react";
import loginJpg from "../assets/login-page-hero.jpg";
import logoSrc from "../assets/logo.png";
import { Link } from "@tanstack/react-location";
import axiosInstance from "../lib/http-client";
import useAuth from "../hooks/useAuth"; 
import { toast } from "react-toastify";

function SignUp() {
  const auth = useAuth();
  const [user, setUser] = useState({ username: "", name: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/register", { ...user });
      auth.login(response.data.token, response.data.user);
      toast('Successfully Registered!',{type:'success'})
      console.log(response.data);
      setUser({ username: "", name: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

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
                className="input input-bordered rounded-none"
                value={user.username}
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="name"
                className="input input-bordered rounded-none"
                value={user.name}
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
              <button onClick={handleRegister} className="btn btn-primary ">
                Register
              </button>
            </div>

            <p className="mt-6 text-center">
              Already have an account ?{" "}
              <span className=" font-semibold underline">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
