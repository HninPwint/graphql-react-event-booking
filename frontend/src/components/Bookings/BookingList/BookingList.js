import React  from "react";
import "./BookingList.css";



const bookingList = props => {
  const bookings = props.bookings.map(booking => {
    return (
      <li className="bookings__item" key={booking._id}>
        <div className="bookings__item-data">
          {booking.event.title} - {""}{" "}
          {new Date(booking.createdAt).toLocaleString()}
        </div>
        <div className="bookings__item-actions">
          <button className="btn" onClick={props.onDelete.bind(this,booking._id)}>Cancel</button>
        </div>
      </li>
    );
  });
  return <ul className="bookings__list">{bookings}</ul>;
};

export default bookingList;
