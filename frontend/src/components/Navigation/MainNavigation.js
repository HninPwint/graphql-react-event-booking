import React from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";

const mainNavigation = props => (
  <header className="main-navigation">
    <div className="name-navigation__logo">
      <h1> Event Booking </h1>
    </div>
    <nav className="main_navigation__items">
      <ul>
        <li>
          <NavLink to="/auth"> Authenticate</NavLink>
        </li>
        <li>
          <NavLink to="/bookings">Bookings</NavLink>
        </li>
        <li>
          <NavLink to="/events">Events</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);
export default mainNavigation;
