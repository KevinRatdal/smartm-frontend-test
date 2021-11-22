import React from "react";

class Events extends React.Component {
  projectIsSelected() {
    if (this.props.selectedProject !== "") {
      return true;
    } else {
      return false;
    }
  }

  renderEvents() {
    if (this.props.currentevents.length < 1) {
      return <p>Loading events for the selected Item.</p>;
    } else {
      return this.props.currentevents.map((event) => {
        return <Event key={event.id} event={event} />;
      });
    }
  }

  render() {
    return (
      <div className="events">
        {this.projectIsSelected() && <h1 id="events-title">Events</h1>}
        <div className="scroll-events">
          <div className="event-wrapper">{this.renderEvents()}</div>
        </div>
      </div>
    );
  }
}

function Event(props) {
  function renderValue(value) {
    if (typeof value == "object") {
      if (value === null) {
        return <p>Event has no value</p>;
      } else {
        return (
          <div>
            {Object.entries(value).map(([key, val]) => {
              return (
                <p key={key}>
                  {key}: {val.toString()}
                </p>
              );
            })}
          </div>
        );
      }
    } else {
      return <p>Value: {value.toString()}</p>;
    }
  }

  return (
    <div className="event">
      <div className="event-header">
        <b>{props.event.service.name}</b>
      </div>
      <div className="event-content">
        {renderValue(props.event.value)}
        <p>User: {props.event.user}</p>
        <p>Timestamp: {props.event.userTimestamp}</p>
      </div>
    </div>
  );
}

export default Events;
