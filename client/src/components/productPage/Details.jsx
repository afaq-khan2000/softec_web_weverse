import React from "react";

function Details({product}) {


  return (
    <div className="row text-white pt-10 pb-10">
      <div className="col-12 col-lg-8">
        <p className="font-clash h4 paraColor">Created By</p>
        <p className="h3">{product?.owner?.name}</p>
        <p className="font-clash h4 paraColor">Description</p>
        <p className="h6">
         {product?.description}
        </p>
        <p className="font-clash h4 paraColor">Details</p>
        <p className="h6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aut
          eveniet fugit debitis esse at. Voluptate doloremque, harum deleniti
          tenetur ad optio non. Sapiente est amet impedit dolore? Modi,
          consequuntur!
        </p>
      </div>
      <div className="col-12 col-lg-4 background-gray p-4 rounded-border my-5">
        <p className="font-clash paraColor">Acution ends in:</p>
        <div className="row px-5 font-clash">
          <div className="col-4">
            <p className=" h1">59</p>
            <p className="paraColor">Hours</p>
          </div>
          <div className="col-4">
            <p className="h1">59</p> <p className="paraColor">Minutes</p>
          </div>
          <div className="col-4">
            <p className="h1">59</p> <p className="paraColor">Seconds</p>
          </div>
        </div>
        <button className="btn btn-lg background-secondary rounded-pill px-5 py-2 text-white w-100">
          Place Bid
        </button>
      </div>
    </div>
  );
}

export default Details;
