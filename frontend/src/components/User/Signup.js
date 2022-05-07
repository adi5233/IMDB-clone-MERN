import React, { Fragment, useState, useEffect } from "react";
import "./Signup.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import LockOpenIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import MailOutlinedIcon from "@material-ui/icons/MailOutlined";
import Loader from "../Layout/Loader/Loader";

const Signup = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, alert, navigate]);

  return (
    <Fragment>
      <MetaData title="Sign up - IMDb" />;
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="SignUpContainer">
            <div className="SignUp-Left">
              <div className="SignUpBox">
                <h1>Sign Up</h1>
                <form className="signUpForm" onSubmit={registerSubmit}>
                  <div className="signUpName">
                    <PersonIcon />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="signUpEmail">
                    <MailOutlinedIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="signUpPassword">
                    <LockOpenIcon />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <input
                    type="submit"
                    value="Create a New Account"
                    className="signUpBtn"
                  />
                </form>
                <h6>
                  If already have an account then
                  <Link className="Link-SignIn" to="/login">
                    Sign in
                  </Link>
                </h6>
              </div>
            </div>
            <div className="SignUp-Right">
              <div className="SignUp-Right-Box">
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

export default Signup;
