const Event = require("../../models/event");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");
const DataLoader = require("dataloader");

const eventLoader = new DataLoader(eventIds => {
  return events(eventIds);
});

const userLoader = new DataLoader(userIds => {
  console.log("userIds", userIds);
  return User.find({ _id: { $in: userIds } });
});

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
  try {
    const event = await eventLoader.load(eventId.toString());
    // return transformEvent(event);
    return event;
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const bookingEventUser = await userLoader.load(userId.toString());
    return {
      ...bookingEventUser._doc,
      _id: bookingEventUser.id,
      createdEvents: () => eventLoader.loadMany(bookingEventUser.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

const transformEvent = event => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event.date),
    creator: user.bind(this, event.creator)
  };
};

const transformBooking = booking => {
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
