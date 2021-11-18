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
      return (
        <Event
          key={this.props.selectedItem}
          item={this.props.selectedItem}
          events={this.props.currentevents}
        />
      );
    }
  }


  render() {
    return (
      <div className="Events">
        {this.projectIsSelected() && <h1 id="eventsTitle">Events</h1>}
        {this.renderEvents()}
      </div>
    );
  }

}


function Event(props) {

 
  
  return <div> {props.item} 
  <p>{props.events}</p>
  </div>
}

export default Events;