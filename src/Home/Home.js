import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div className="home-background">
          <p className="home-intro">
            A digital dive log for divers who love marine life.
          </p>
          <Link className="btn-login" to="/login">
            Login
          </Link>{" "}
          <Link className="btn-signup" to="/sign-up">
            Sign up
          </Link>
        </div>

        <div>
          <div className="home-screenshot">
            <div className="home-info">
              <h3>Dive Log</h3>
              Your dive log will track your dives, dive stats, and wishlist
              animals that you have spotted.
            </div>
            <img
              src={process.env.PUBLIC_URL + "/images/Log.png"}
              alt="user dive log"
            />
          </div>

          <div className="home-screenshot">
            <div className="home-order-1 home-info">
              <h3>User Profile</h3>
              Your profile will track your certifications, specialties, and
              allow you to edit your personal animal wishlist.
            </div>
            <img
              src={process.env.PUBLIC_URL + "/images/Profile.png"}
              alt="user profile"
            />
          </div>

          <div className="home-screenshot home-last">
            <div className="home-info">
              <h3>Animal Finder</h3>
              The animal finder allows you to search for animal sightings either
              by animal or location.
            </div>
            <img
              src={process.env.PUBLIC_URL + "/images/aFinder.png"}
              alt="animal finder"
              width="300px"
            />
          </div>
        </div>
        <div className="btn-container">
          <Link className="btn-signup" to="/sign-up">
            Sign up
          </Link>
        </div>
      </div>
    );
  }
}
