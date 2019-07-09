import React, { Component } from "react";
import "./Event.css";
import Modal from "./../components/Modal/Modal";
import Backdrop from "./../components/Backdrop/Backdrop";
import AuthContext from "../context/auth-context";

class EventsPage extends Component {
  state = {
    creating: false,
    events: []
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleEl = React.createRef();
    this.priceEl = React.createRef();
    this.dateEl = React.createRef();
    this.descriptionEl = React.createRef();
  }
  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents() {
    const eventRequestBody = {
      query: `
          query {
            events {
              _id
              title
              description
              date
              price
       
            }
          }
        `
    };
    console.log("requestBody", eventRequestBody);
    const token = this.context.token;

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(eventRequestBody),
      headers: {
        "Content-Type": "application/json"
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
        console.log("events", resData);
        const events = resData.data.events;
        this.setState({ events: events });
      })
      .catch(err => {
        console.log(err);
      });
  }

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    console.log("modalConfirmHandler");
    this.setState({ creating: false });
    const title = this.titleEl.current.value;
    const price = +this.priceEl.current.value;
    const date = this.dateEl.current.value;
    const description = this.descriptionEl.current.value;

    const event = { title, price, date, description };
    console.log("event", event);

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }

    let requestBody = {
      query: `mutation { 
       createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
        _id
        title
        price
        date
        description
        creator {
        _id
        email
        }
      }
     }`
    };

    console.log("requestBody", requestBody);

    const token = this.context.token;

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        // console.log('res.json()', res.json());
        return res.json();
      })
      .then(resData => {
        console.log("resData", resData);
        this.fetchEvents();
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false });
  };

  render() {
    const eventList = this.state.events.map(event => {
      return <li key={event._id} className="events__list-item"> {event.title}</li>
    });
    return (
      <React.Fragment>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Add Event"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
           <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleEl} />
              </div>
              <div className="form-control">
                <label htmlFor="price">Price</label>
                <input type="number" id="price" ref={this.priceEl} />
              </div>
              <div className="form-control">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" ref={this.dateEl} />
              </div>
              <div className="form-control">
                <label htmlFor="desc">Description</label>
                <textarea id="desc" rows="4" ref={this.descriptionEl} />
              </div>
           </form>
          </Modal>
        )}
        {this.context.token && (
          <div className="events-control">
            <p> Create Event Here. </p>
            <button className="btn" onClick={this.startCreateEventHandler}>
              Create Event
            </button>
          </div>
        )}
        <section className="events__list">
          {eventList}
        </section>
      </React.Fragment>
    );
  }
}

export default EventsPage;
