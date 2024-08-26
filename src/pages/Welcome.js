import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome to Urlist</h1>
          <p className="py-6">
            URList is your best go-to web app for organizing daily to-do list
            notes. Simplify your tasks, track your progress, and stay on top of
            your goals—all in one place.
          </p>
          <button onClick={handleGetStarted} className="btn btn-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
