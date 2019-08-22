import React, { Component } from "react";
import AuthContext from "../context/auth-context";
import Spinner from "../components/Spinner/Spinner";

class BookingsPage extends Component {
  state = {
    isLoading: false,
    bookings: []
  };

  componentDidMount() {
    this.fetchBookings();
  }

  static contextType = AuthContext;

  fetchBookings = () => {
    this.setState({ isLoading: true });
    const bookingRequestBody = {
      query: `
          query {
            bookings {
            _id
            createdAt
            event {
              _id
              title
              date
              price
              }
            }
         }
        `
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(bookingRequestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token
      }
    })
      .then(res => {
        console.log("res.status", res.status);
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then(resData => {
        const bookings = resData.data.bookings;
        this.setState({ bookings: bookings, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <ul>
            {this.state.bookings.map(booking => (
              <li key={booking._id}>
                {booking.event.title} - {""}{" "}
                {new Date(booking.createdAt).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </React.Fragment>
    );
  }
}
export default BookingsPage;
