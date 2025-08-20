import Lottie from "lottie-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import technical from "../../assets/login.json";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const handleLoginSubmit = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (!email || !password) {
    toast.error("Email and password are required.");
    return;
  }

  try {
    setLoading(true);
    const { data } = await axiosPublic.post("/auth/login", { email, password });

    // store jwt token
    localStorage.setItem("accessToken", data.token);

    toast.success("Login successful!");

    // redirect based on role
    if (data.role === "admin" || data.role === "hr") {
      navigate("/dashboard");
    } else if (data.role === "employee") {
      navigate("/dashboard/employee-dashboard");
    } else {
      navigate("/"); // fallback if role is unknown
    }
  } catch (err) {
    if (err.response?.status === 403) {
      toast.error("Your account has been disabled.");
    } else {
      toast.error(err.response?.data?.message || "Invalid email or password.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <div className="login-container">
        <div className="login-content">
          <div className="login-animation">
            <Lottie animationData={technical} loop={true} />
          </div>
          <div className="login-form-side">
            <div className="login-card">
              <h1 className="login-title">
                Welcome!
              </h1>
              <form onSubmit={handleLoginSubmit} className="login-form">
                <div className="form-control">
                  <label className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-control login-buttons">
                  <button type="submit" className="sign-in-button">
                    Sign in
                  </button>
                </div>
              </form>
              <div className="text-center mt-4">
                <Link
                  to="/forgot-password"
                  className="forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}