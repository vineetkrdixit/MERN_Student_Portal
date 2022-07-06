import React, { useEffect, useState } from "react";
import "../Login/Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const handelChange = (e) => {
    const { name, value } = e.target;
    setLoginUser({
      ...loginUser,
      [name]: value,
    });

    console.log(loginUser);
  };
  const handelClick = (e) => {
    e.preventDefault();
    if (!loginUser.email || !loginUser.password) {
      alert("Please fill all the details");
    } else {
      axios
        .post("http://localhost:5000/login", loginUser)
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          navigate("/home");
        })
        .catch(() => {
          console.log("Error");
        });
    }
  };

  return (
    <>
      <div className="container card-wrapper">
        <div className="card d-flex flex-column">
          <div>
            <h2 className="student-dashboard">Student Dashboard</h2>
            <h2 className="student-dashboard">Login</h2>
          </div>
          <div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput13" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control shadow-none input-decoration"
                id="exampleFormControlInput13"
                placeholder="Enter your Email"
                name="email"
                value={loginUser.email}
                onChange={handelChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput12" className="form-label">
                Password
              </label>
              <input
                type="email"
                className="form-control shadow-none input-decoration"
                id="exampleFormControlInput12"
                placeholder="Enter your Password"
                name="password"
                value={loginUser.password}
                onChange={handelChange}
              />
            </div>
          </div>
          <div className="btn-className">
            <button
              type="button"
              className="btn btn-success "
              onClick={handelClick}
            >
              Register
            </button>
          </div>
          <div className="last-div">
            Don't Have a Account{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              <span> Register Here</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
