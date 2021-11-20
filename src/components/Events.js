import React from "react";

class Events extends React.Component {
  projectIsSelected() {
    if (this.props.selectedProject !== "") {
      console.log(this.props.metadata)
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  }

  renderEvents() {
    if (this.props.currentevents.length < 1) {
      return <p>No events found for the selected Item.</p>
    } else {

      return this.props.currentevents.map((event) => {
        return (
          <Event
            key={event.id}
            event={event}
          />
        );
      });
    }
  }


  render() {
    return (
      <div className="events">
        {this.projectIsSelected() && <h1 id="events-title">Events</h1>}
        <div className="event-wrapper">{this.renderEvents()}</div>
      </div>
    );
  }

}


function Event(props) {
 console.log(props.event)
  
  
  return (
    <div className="event">
      <div className="event-header">
        <b>{props.event.service.name}</b>
      </div>
      <div className="event-content">
        <p>Value: {JSON.stringify(props.event.value)}</p>
        <p>User: {props.event.user}</p>
        <p>Timestamp: {props.event.userTimestamp}</p>
      </div>
    </div>
  );
}

export default Events;