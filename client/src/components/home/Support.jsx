import React from "react";
import { img2 } from "../../assets";

function Support(props) {
  return (
    <div className="row background-gray rounded-border p-4 text-white mt-10">
      <div className="col-12 col-lg-6">
        <img src={img2} alt="" className="img-fluid" />
      </div>
      <div className="col-12 col-lg-6">
        <h1 className="font-clash text-67 d-none d-lg-block">Join our weekly digest</h1>
        <h1 className="font-clash d-block d-lg-none">Join our weekly digest</h1>
        <p className="h4 my-3">
          Get exclusive promotions & updates straight to your inbox.
        </p>
        <div className="row mt-4">
          <div className="col-12 col-lg-8">
            <input
              type="text"
              className="form-control form-control-lg rounded-border"
              placeholder="Enter your Email here"
            />
          </div>
          <div className="col-12 col-lg-4">
            <button className="btn btn-lg background-secondary rounded-pill py-2 text-white w-100 my-3 my-lg-0">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
