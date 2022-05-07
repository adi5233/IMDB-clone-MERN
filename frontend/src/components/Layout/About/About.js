import React from "react";
import "./About.css";
import { Typography, Avatar } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MetaData from "../MetaData";
const About = () => {
  return (
    <div className="aboutSection">
      <MetaData title="About - IMDb" />
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About</Typography>
        <div>
          <div>
            <Avatar
              style={{ width: "15vmax", height: "15vmax", margin: "2vmax 0" }}
              src="/Aditya.jpg"
              alt="Founder"
            />
            <Typography>Aditya Senapati</Typography>
            <span>
              {" "}
              Hi!, I am a Full Stack Developer, having a proficient knowledge of
              technologies like MongoDB, Expess.js, React.js, Node.js and
              React-redux.
            </span>
            <div className="links">
              <a
                href="https://www.linkedin.com/in/aditya-senapati-8a3350139/"
                target="blank"
              >
                <LinkedInIcon className="linkedinSvgIcon" />
              </a>

              <a href="https://github.com/adi5233" target="blank">
                <GitHubIcon className="githubSvgIcon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
