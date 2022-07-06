import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Aboutus() {
  const navigate = useNavigate();
  axios
    .get("http://localhost:5000/aboutus")
    .then((res) => {
      console.log("res", res);
    })
    .catch((err) => {
      // Handle error
      console.log(err);
      navigate("/login");
    });
  return (
    <div>
      <h1>HI</h1>
    </div>
  );
}
