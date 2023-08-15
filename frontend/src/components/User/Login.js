import React, { Fragment, useState, useEffect } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import { useAlert } from "react-alert";
import LockOpenIcon from "@material-ui/icons/Lock";
import MailOutlinedIcon from "@material-ui/icons/MailOutlined";
import MetaData from "../Layout/MetaData";
import Loader from "../Layout/Loader/Loader";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate, alert]);

  return (
    <Fragment>
      <MetaData title="Sign in - IMDb" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="SignInContainer">
            <div className="SignIn-Left">
              <div className="SignInBox">
                <h1>Sign In</h1>
                <form className="signInForm" onSubmit={loginSubmit}>
                  <div className="signInEmail">
                    <MailOutlinedIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>

                  <div className="signInPassword">
                    <LockOpenIcon />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      name="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>

                  <input type="submit" value="Sign in" className="signInBtn" />
                </form>
                <h6>
                  If you don't have an account then
                  <Link className="Link-SignUp" to="/signup">
                    Sign up
                  </Link>
                </h6>
              </div>
            </div>
            <div className="SignIn-Right">
              <div className="SignIn-Right-Box">
                <h2>Benefits of your free IMDb account</h2>
                <h4>Personalized Recommendations</h4>
                <h5>Discover shows you'll love.</h5>
                <h4>Your Watchlist</h4>
                <h5>
                  Track everything you want to watch and receive e-mail when
                  movies open in theaters.
                </h5>
                <h4>Your Ratings</h4>
                <h5> Rate and remember everything you've seen.</h5>
                <h4>Contribute to IMDb</h4>
                <h5>
                  Add data that will be seen by millions of people and get cool
                  badges.
                </h5>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
