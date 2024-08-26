import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  });

  const registerHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);

    await axios
      .post("http://localhost:8000/api/register", formData)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Create New Account</h1>
          <p className="py-6 max-w-lg">
            Sign-up to your best go-to web app for organizing daily to-do list
            notes. Simplify your tasks, track your progress, and stay on top of
            your goals—all in one place.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body gap-0" onSubmit={registerHandler}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                required
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              {validation.name && (
                <small className="text-danger">{validation.name[0]}</small>
              )}
            </div>
            <div className="form-control">
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
                <small className="text-error">{validation.email[0]}</small>
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
                <small className="text-error">{validation.password[0]}</small>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password Confirmation</span>
              </label>
              <input
                type="password"
                placeholder="re-enter password"
                className="input input-bordered"
                required
                id="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => {
                  setPasswordConfirmation(e.target.value);
                }}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign-up</button>
              <label className="label label-text-alt justify-center">
                Already have an account?&nbsp;
                <a onClick={handleLogin} className=" link link-hover text-primary">
                  Sign in here!
                </a>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
