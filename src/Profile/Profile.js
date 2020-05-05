import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import dummyStore from "../dummyStore";

export default class Profile extends React.Component {
  render() {
    const user = dummyStore.users[0];
    return (
      <div className="Profile">
        <section>
          <h2>My Profile</h2>
          <p>My email: {user.email}</p>
        </section>
        <section>
          <h2>Certifications</h2>
          <Link to="/add-cert">Add cert</Link>
          <ul className="certifications">
            {user.certs.map((cert) => (
              <li key={cert.certNum}>
                <ul>
                  <li>Agency: {cert.agency}</li>
                  <li>{cert.certLevel}</li>
                  <li>Date: {cert.certDate}</li>
                  <li>Diver number: {cert.certNum}</li>
                </ul>
              </li>
            ))}
          </ul>
          <h3>Diver Specialties</h3>
          <Link to="/add-specialty">Add specialties</Link>
          <ul>
            {user.specialties.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
          {/* if we get fancy, only render this next section if the diver has a pro cert */}
          <h3>Instructor Specialties</h3>
          <Link to="/add-specialty">Add specialties</Link>
          <ul>
            {user.instructorSpecialties.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Animal Wishlist</h2>
          <p>
            Here are some of the big deal creatures. Which ones would you like
            to see? Which ones have you already seen?
          </p>
          <p>
            You can customize which animals appear on your wishlist in your log.
            Here is where you select which animals appear there. Maybe animals
            not on your personal list are faded, shaded, dark. Animals on your
            list are normal colors. Animals on your list that you have seen have
            a sweet check mark (or something more fun).{" "}
          </p>

          <ul>
            <li>Whale Shark</li>
            <li>Mola Mola</li>
            <li>Thresher Shark</li>
            <li>Hammerhead Shark</li>
            <li>Great White Shark</li>
            <li>Tiger Shark</li>
            <li>Manatee</li>
            <li>Manta Ray</li>
            <li>Seahorse</li>
            {/* other animals */}
            <li>Dragon Moray</li>
            <li>Ribbon Eel</li>
            <li>Mandarin Fish</li>
            <li>Frog Fish</li>
            <li>Mimic Octopus</li>
            <li>Pygmy Seahorse</li>
            <li>Leafy Seadragon</li>
            <li>Blue-Ringed Octopus</li>
            <li>Flamboyant Cuttlefish</li>
            <li>Harlequin Shrimp</li>
            <li>Orangutan Crab</li>
            <li>Ornate Ghost Pipefish</li>
            <li>Leaf Scorpionfish</li>
          </ul>
        </section>
      </div>
    );
  }
}
