const Event = require("../../models/event");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(event => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async eventId => {
  console.log("singleEvent", eventId);
  try {
    const event = await Event.findById(eventId);
    console.log("singleEventDetail", event);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const bookingEventUser = await User.findById(userId);
    return {
      ...bookingEventUser._doc,
      _id: bookingEventUser.id,
      createdEvents: events.bind(this, bookingEventUser.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

const transformEvent = event => {
  console.log("transformEvent", event);
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event.date),
    creator: user.bind(this, event.creator)
  };
};

const transformBooking = booking => {
  console.log("transformBooking", booking);
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking.user),
    event: singleEvent.bind(this, booking.event),
    createdAt: dateToString(booking.createdAt),
    updatedAt: dateToString(booking.updatedAt)
  };
};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
