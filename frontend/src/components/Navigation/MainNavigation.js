import React from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import "./MainNavigation.css";

const mainNavigation = props => (
  <AuthContext.Consumer>
    {context => {
      console.log("context.token", context);
      return (
        <header className="main-navigation">
          <div className="name-navigation__logo">
            <h1> Event Booking </h1>
          </div>
          <nav className="main_navigation__items">
            <ul>
              {!context.token && (
                <li>
                  <NavLink to="/auth"> Authenticate</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/bookings">Bookings</NavLink>
              </li>
              {context.token && (
                <li>
                  <NavLink to="/events">Events</NavLink>
                </li>
              )}
            </ul>
          </nav>
        </header>
      );
    }}
  </AuthContext.Consumer>
);
export default mainNavigation;
