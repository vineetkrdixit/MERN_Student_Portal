import React, { useState } from "react";
import "../Signup/Signup.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Signup() {
  const [userinput, setUserInput] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userinput, [name]: value });
  };

  const handelRegister = (e) => {
    e.preventDefault();

    if (!userinput.email || !userinput.password || !userinput.cpassword) {
      //   res.json({ message: "Please fill all the details" });
      alert("Please fill all the details");
    }
    if (userinput.password === userinput.cpassword) {
      axios
        .post("http://localhost:5000/register", userinput)
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          console.log("Cannot send request");
        });
    } else {
      console.log("Password not matched");
      alert("Password not matched");
    }
  };

  return (
    <>
      <div className="container card-wrapper">
        <div className="card d-flex flex-column">
          <div>
            <h2 className="student-dashboard">Student Dashboard</h2>
            <h2 className="student-dashboard">Register</h2>
          </div>
          <div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control shadow-none input-decoration"
                id="exampleFormControlInput"
                placeholder="Enter your Email"
                name="email"
                value={userinput.email}
                onChange={handelChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control shadow-none input-decoration"
                id="exampleFormControlInput1"
                placeholder="Enter your Password"
                name="password"
                value={userinput.password}
                onChange={handelChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control shadow-none input-decoration"
                id="exampleFormControlInput2"
                placeholder="ReEnter your Password"
                name="cpassword"
                value={userinput.cpassword}
                onChange={handelChange}
              />
            </div>
          </div>
          <div className="btn-className">
            <button
              type="button"
              className="btn btn-success "
              onClick={handelRegister}
            >
              Register
            </button>
          </div>

          <div className="last-div">
            Already have an account{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span> Login</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
