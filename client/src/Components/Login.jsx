import React, { useState } from "react";
import "../ComponentsCSS/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../image/emobomo_logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5002/login", values);

      if (response.data.Status === "Success") {
        const userRole = response.data.data.role;

        if (userRole === "admin") {
          navigate("/dashboard", {
            state: { name: response.data.data.name },
          });
        } else if (userRole === "HR") {
          navigate("/HRDashboard", {
            state: { name: response.data.data.name },
          });
        } else if (userRole === "SalesHead") {
          navigate("/SHDashboard", {
            state: { name: response.data.data.name },
          });
        } else if (userRole === "Employee") {
          navigate("/EmployeeDashboard", {
            state: { name: response.data.data.name },
          });
        }
      } else {
        alert(response.data.Message);
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while logging in");
    }
  };

  return (
    <>
      <div className="login">
        <div class="container" id="container">
          <div class="form-container sign-in-container">
            <form className="loginForm" onSubmit={handleSubmit}>
              <h1>Sign in</h1>

              <input
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                type="email"
                placeholder="email"
                name="email"
              />
              <input
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                type="password"
                placeholder="password"
                name="password"
              />
              <button type="submit">submit</button>
            </form>
          </div>

          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-right">
                <img id="logo" src={logo} alt="emobomo_logo" />
                <h1 id="hello">Hello, Team Emobomo!</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
