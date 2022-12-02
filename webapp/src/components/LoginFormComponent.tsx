import loginFormJpg from "../assets/login-page-hero.jpg";
import logoSrc from "../assets/logo.png";

type LoginFormComponentProps = {
  register?: boolean
}

function LoginFormComponent({register}:LoginFormComponentProps) {
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
                type="text"
                placeholder="username"
                className="input input-bordered"
              />
            </div>
            {register && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                />
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="password"
                className="input input-bordered"
              />
            </div>
            {register ? (
              <div className="form-control mt-6">
                <button className="btn btn-primary ">Register</button>
              </div>
            ) : (
              <div className="form-control mt-6">
                <button className="btn btn-primary ">Login</button>
              </div>
            )}
            {!register && (
              <p className="mt-6 text-center">
                Don&apos;t have an account?{" "}
                <span className=" font-semibold underline">
                  <a href="#">Register</a>
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginFormComponent;
