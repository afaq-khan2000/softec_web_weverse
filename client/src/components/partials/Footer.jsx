import React from "react";
import { Link } from "react-router-dom";
import { logo, second_logo } from "../../assets";
import { navLinks } from "../../constants";

function Footer(props) {
  return (
    <div className="row background-gray paddingX text-white w-100 paddingX py-5 mx-auto ">
      <div className="col-12 col-md-6 col-lg-4">
        <img src={logo} alt="" width={"200px"} className="img-fluid mb-3 pulse"/>
        {/* <h3 className="font-clash">Digi-Corn</h3> */}
        <p className="paraColor h5">
          A marketplace where you will find everything from Games to Gear!
        </p>
      </div>
      <div className="col-12 col-md-6 col-lg-4">
        <h3 className="font-clash">Explore</h3>
        {navLinks.map((link,key) => (
          <Link to={link.link} style={{textDecoration:"none"}} key={key}>
            <p className="paraColor h5 my-4 translateX">{link.title}</p>
          </Link>
        ))}
      </div>
      <div className="col-12 col-lg-4">
        <h1 className="font-clash">Join our weekly digest</h1>
        <div className="row mt-4">
          <div className="col-12 col-lg-8">
            <input
              type="text"
              className="form-control form-control-lg rounded-border"
              placeholder="Enter your Email here"
            />
          </div>

          <div className="col-12 col-md-4">
            <button className="btn btn-lg background-secondary rounded-pill py-2 text-white my-3 my-lg-0">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
