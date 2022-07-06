import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Aboutus from "./Components/Aboutus/Aboutus";
import Contactus from "./Components/Contactus/Contactus";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        {/* <Route exact path="/" element={<Home />}></Route> */}
        <Route path="/aboutus" element={<Aboutus />}></Route>
        <Route path="/contactus" element={<Contactus />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
