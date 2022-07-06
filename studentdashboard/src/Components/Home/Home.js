import React, { useState, useEffect } from "react";
import "../Home/Home.css";
import axios from "axios";

export default function Home(props) {
  const addRow = () => {};
  const addColumn = () => {};

  const [studentDetail, setStudentDetails] = useState({
    id: "",
    name: "",
    rollno: "",
    class: "",
    result: "",
  });
  const [allDetails, setAllDetails] = useState([]);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails({
      ...studentDetail,
      [name]: value,
    });
    console.log(studentDetail);
  };

  const addStudent = (e) => {
    e.preventDefault();
    if (
      !studentDetail.id ||
      !studentDetail.name ||
      !studentDetail.rollno ||
      !studentDetail.class ||
      !studentDetail.result
    ) {
      alert("Fill all the details");
    } else
      axios
        .post("http://localhost:5000/studentdetail", studentDetail)
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          alert("Unable to save");
        });
  };

  // const setData = () => {

  // };

  useEffect(() => {
    axios
      .get("http://localhost:5000/home")
      .then((res) => {
        // console.log(res);
        const alldata = res.data;
        setAllDetails(alldata);
        // console.log("alldetails", allDetails);
      })
      .catch((err) => {
        console.log("Error");
      });
  }, [allDetails]);

  return (
    <div>
      <div className="d-flex">
        <div className="card">
          <button
            type="button"
            className="btn btn-primary button-body"
            onClick={addRow}
          >
            Add Row
          </button>
          <br></br>
          <button
            type="button"
            className="btn btn-primary button-body"
            onClick={addColumn}
          >
            Add Column
          </button>
        </div>
        <div></div>
      </div>
      <div className="card">
        <div className="output-Div">
          <table>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Roll-No</th>
              <th>Class</th>
              <th>Result</th>
              <th></th>
            </tr>
            <tr>
              <td>
                <div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control shadow-none input-decoration"
                      id="exampleFormControlInput13"
                      placeholder="Enter ID"
                      name="id"
                      value={studentDetail.id}
                      onChange={handelChange}
                    />
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control shadow-none input-decoration"
                      id="exampleFormControlInput14"
                      placeholder="Enter Name"
                      name="name"
                      value={studentDetail.name}
                      onChange={handelChange}
                    />
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <div className="mb-3">
                    <input
                      type="number"
                      className="form-control shadow-none input-decoration"
                      id="exampleFormControlInput15"
                      placeholder="Enter Roll No"
                      name="rollno"
                      value={studentDetail.rollno}
                      onChange={handelChange}
                    />
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control shadow-none input-decoration"
                      id="exampleFormControlInput16"
                      placeholder="Enter Class"
                      name="class"
                      value={studentDetail.class}
                      onChange={handelChange}
                    />
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control shadow-none input-decoration"
                      id="exampleFormControlInput17"
                      placeholder="Pass/Fail"
                      name="result"
                      value={studentDetail.result}
                      onChange={handelChange}
                    />
                  </div>
                </div>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary button-body"
                  onClick={addStudent}
                >
                  Add Student
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      {/* ////////////////// */}
      <div className="card">
        <div className="output-Div">
          <table>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Roll-No</th>
              <th>Class</th>
              <th>Result</th>
            </tr>
            <tr>
              <td>items.id</td>
              <td>items.name</td>
              <td>items.rollno</td>
              <td>items.class</td>
              <td>items.result</td>
            </tr>

            {allDetails.map((items, index) => {
              return (
                <tr key={index}>
                  <td>{items.id}</td>
                  <td>{items.name}</td>
                  <td>{items.rollno}</td>
                  <td>{items.class}</td>
                  <td>{items.result}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}
