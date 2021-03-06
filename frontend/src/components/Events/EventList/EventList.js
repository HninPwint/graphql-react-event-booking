import React from "react";
import "./EventList.css";
import EventItem from "./EventItem/EventItem";

const eventList = props => {
  const events = props.events.map(event => {
    console.log('props.authUserId', props.authUserId);
    return (
      <EventItem
        key={event._id}
        eventId={event._id}
        title={event.title}
        userId={props.authUserId}
        price={event.price}
        date={event.date}
        creatorId={event.creator._id}
        onDetail={props.onViewDetail}
      />
    );
  });
  return <ul className="events__list">{events}</ul>;
};

export default eventList;
