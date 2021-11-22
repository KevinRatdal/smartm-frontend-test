import "./App.css";
import React from "react";
import Items from "./components/Items";
import Events from "./components/Events";
import {
  login,
  getProjects,
  getItems,
  getEvents,
  getProjectMeta,
} from "@taghub/api";
const API_USERNAME = process.env.REACT_APP_API_USERNAME;
const API_PASSWORD = process.env.REACT_APP_API_PASSWORD;
const API_CONSUMER_KEY = process.env.REACT_APP_API_CONSUMER_KEY;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      items: [],
      events: [],
      api_metadata: [],
      selectedProject: "",
      selectedItem: "",
      loggedIn: false,
    };
  }

  projectIsSelected() {
    if (this.state.selectedProject !== "") {
      return true;
    } else {
      return false;
    }
  }
  itemIsSelected() {
    if (this.state.selectedItem !== "") {
      return true;
    } else {
      return false;
    }
  }

  async retrieveProjects() {
    if (this.state.loggedIn !== true) {
      await login(API_USERNAME, API_PASSWORD, {
        consumerKey: API_CONSUMER_KEY,
        init: true,
      });
      this.setState({ loggedIn: true });
    }
    const api_projects = await getProjects();

    this.setState({ projects: api_projects });
  }

  async retrieveItems() {
    if (this.state.selectedProject !== "") {
      const api_items = await getItems(this.state.selectedProject);
      const api_metadata = await getProjectMeta(this.state.selectedProject);
      this.setState({ items: api_items, api_metadata: api_metadata });
    }
  }

  async retrieveItem() {
    this.setState({ events: "" });
    if (this.state.selectedProject !== "" && this.state.selectedItem !== "") {
      const api_events = await getEvents(
        this.state.selectedProject,
        this.state.selectedItem
      );
      this.setState({ events: api_events });
    }
  }

  componentDidMount() {
    this.retrieveProjects();
  }

  async handleItemChange(activeElementId) {
    if (this.state.selectedItem !== "") {
      document.getElementById(this.state.selectedItem).className = "item";
      if (this.state.selectedItem === activeElementId) {
        activeElementId = "";
      }
    }

    await this.setState({
      selectedItem: activeElementId,
    });
    if (this.state.selectedItem !== "") {
      document.getElementById(this.state.selectedItem).className =
        "item selected-item";
    }
    this.retrieveItem();
  }

  async handleProjectChange(event) {
    await this.setState({
      selectedProject: event.target.value,
      selectedItem: "",
    });
    this.retrieveItems();
  }

  renderItems() {
    return (
      <Items
        selectedProject={this.state.selectedProject}
        currentitems={this.state.items}
        metadata={this.state.api_metadata}
        retrieveItems={this.retrieveItems.bind(this)}
        changeItem={this.handleItemChange.bind(this)}
      />
    );
  }

  renderEvents() {
    return (
      <Events
        selectedItem={this.state.selectedItem}
        currentevents={this.state.events}
        metadata={this.state.api_metadata}
        retrieveItems={this.retrieveItems.bind(this)}
        changeItem={this.handleItemChange.bind(this)}
      />
    );
  }

  render() {
    return (
      <div className="app">
        <div className="header">
          <ProjectList
            projects={this.state.projects}
            selectedProject={this.state.selectedProject}
            onChange={this.handleProjectChange.bind(this)}
          />
        </div>
        <div className="content-wrapper">
          {this.projectIsSelected() && this.renderItems()}

          {this.itemIsSelected() && this.renderEvents()}
        </div>
      </div>
    );
  }
}

class ProjectList extends React.Component {
  render() {
    return (
      <select
        name="project"
        id="project-select"
        value={this.props.selectedProject}
        onChange={this.props.onChange}
      >
        <option value="" disabled hidden>
          Select Project
        </option>
        {this.props.projects.map((option, index) => {
          return (
            <option value={option.uuid} key={index}>
              {option.name}
            </option>
          );
        })}
      </select>
    );
  }
}

export default App;
