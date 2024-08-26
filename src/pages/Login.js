import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState([]);
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  });

  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    await axios
      .post("http://localhost:8000/api/login", formData)
      .then((response) => {
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);

        navigate("/home");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login to Urlist</h1>
          <p className="py-6 max-w-lg">
            Sign-in to your best go-to web app for organizing daily to-do list
            notes. Simplify your tasks, track your progress, and stay on top of
            your goals—all in one place.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body gap-0" onSubmit={loginHandler}>
            <div className="form-control">
              {validation.message && (
                <div role="alert" className="alert alert-warning mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{validation.message}</span>
                </div>
              )}
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {validation.email && (
                <small className="text-danger">{validation.email[0]}</small>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {validation.password && (
                <small className="text-danger">{validation.password[0]}</small>
              )}
              <label className="label">
                <a
                  onClick={handleRegister}
                  className="label-text-alt link link-hover"
                >
                  Forgot password? I dont care, just create new one
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign-in</button>
              <label className="label label-text-alt justify-center">
                Have no account yet?&nbsp;
                <a
                  onClick={handleRegister}
                  className=" link link-hover text-primary"
                >
                  Sign up here!
                </a>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
