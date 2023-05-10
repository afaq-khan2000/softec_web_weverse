import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, logo } from "../assets";
import { login as signIn } from "../api/AuthAPI";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    // send axio request on submit
    e.preventDefault();
    setLoading(true);
    console.log({
      email,
      password,
    })
    await signIn({
      email,
      password,
    });
  }

  return (
    <div className="paddingX background-dark pb-10 w-100 mx-auto">
      <section className="" style={{ minHeight: "100vh" }}>
        <form
          onSubmit={onSubmit}
        >
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div
                  className="card background-gray text-white"
                  // style={{ borderRadius: "1rem", borderColor: "#0c2c07" }}
                >
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                      <img
                        width={"100%"}
                        height={"100%"}
                        src={login}
                        alt="login form"
                        className=""
                        style={{
                          // borderRadius: "1rem 0 0 1rem",
                          objectFit: "cover",
                          height: "100%",
                        }}
                      />
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 font-dark-green">
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <img src={logo} width={"150px"} />
                        </div>

                        <h3
                          className="fw-normal mb-3 pb-3 font-clash"
                          style={{ letterSpacing: "1px" }}
                        >
                          <span className="text-gradient">Sign</span> into your
                          account
                        </h3>

                        <div className="form-outline mb-4">
                          <input
                            required
                            type="email"
                            id="email"
                            className="form-control form-control-lg background-gray rounded-border paraColor formInput"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                          <label className="form-label" htmlFor="email">
                            Email address
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            required
                            type="password"
                            id="password"
                            className="form-control form-control-lg background-gray rounded-border paraColor formInput"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            style={{ border: "none" }}
                            className="btn btn-lg background-secondary rounded-pill px-5 py-2 text-white"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                        <a href="/password/forget">Forget Password?</a>
                        <p className="mb-5 pb-lg-2 font-dark-green mt-2">
                          Don't have an account?{" "}
                          <Link to="/sign-up" style={{ color: "#393f81" }}>
                            Register here
                          </Link>
                        </p>

                        <a href="#!" className="small font-dark-green">
                          Terms of use.
                        </a>
                        <a href="#!" className="small font-dark-green">
                          Privacy policy
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
