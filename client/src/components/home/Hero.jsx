import React from "react";
import { hero } from "../../assets";

function Hero(props) {
  return (
    <div className="row pt-10" style={{ minHeight: "100vh" }}>
      <div className="col-12 col-md-6 col-lg-8 text-white">
        <h1 className="font-clash text-67 d-none d-md-block">
          Discover Gaming Gears & Collect{" "}
          <span className="text-gradient"> Video Games</span>
        </h1>
        <h1 className="font-clash d-block d-md-none">
          Discover digital art & Collect{" "}
          <span className="text-gradient"> NFTs</span>
        </h1>
        <p className="h4 my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo numquam
          veniam iure quae cupiditate, ut ipsam temporibus ull
        </p>
        <button className="btn btn-lg background-secondary rounded-pill px-5 py-2 text-white my-3 d-none d-md-block">
          Get Started
        </button>
        <button className="btn btn-lg background-secondary rounded-pill px-5 py-2 text-white w-100 d-block d-md-none">
          Get Started
        </button>
        <div className="row mt-3">
          <div className="col-4">
            <h1 className="font-clash h3 text-gradient">240k+</h1>
            <p className="h4">Total Games</p>
          </div>
          <div className="col-4">
            <h1 className="font-clash h3 text-gradient">100k+</h1>
            <p className="h4">Gaming Gear</p>
          </div>
          <div className="col-4">
            <h1 className="font-clash h3 text-gradient">170k+</h1>
            <p className="h4">Categories</p>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-4">
        <img src={hero} alt="" className="img-fluid rounded-border" height={"500px"}/>
      </div>
    </div>
  );
}

export default Hero;
