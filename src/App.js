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


  
//test_api()

/*
import { login, getProjects, getItems, getItem,  getProjectMeta } from "@taghub/api";

async function test_api() {
  const API_USERNAME = process.env.REACT_APP_API_USERNAME;
  const API_PASSWORD = process.env.REACT_APP_API_PASSWORD;
  const API_CONSUMER_KEY = process.env.REACT_APP_API_CONSUMER_KEY;
  await login(API_USERNAME, API_PASSWORD, {
    consumerKey: API_CONSUMER_KEY,
    init: true,
  });
  const api_projects = await getProjects();
  const allItems = await getItems(api_projects[0].uuid)
  console.log(allItems)

  //const item = await getItem(allItems[0].projects[0].uuid, allItems[0].epcString);
  //console.log(item)

  const events = await getProjectMeta(api_projects[0].uuid);
  console.log(events);
  const events1 = await getProjectMeta(api_projects[1].uuid);
  console.log(events1);
  const events2 = await getProjectMeta(api_projects[2].uuid);
  console.log(events2);
}
*/


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
      serviceId: "",
      loggedIn: false,
    };
  }

  projectIsSelected() {
    if (this.state.selectedProject !== "") {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  }
  itemIsSelected() {
    if (this.state.selectedItem !== "") {
      console.log("true");
      return true;
    } else {
      console.log("false");
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
    console.log(api_projects);

    /*
    let api_projects = [
      { name: "Testproject1", uuid: "1testtest" },
      { name: "Testproject2", uuid: "2testtest" },
      { name: "Testproject3", uuid: "3testtest" },
      { name: "Testproject4", uuid: "4testtest" },
    ];*/
    this.setState({ projects: api_projects });
  }

  async retrieveItems() {
    if (this.state.selectedProject !== "") {
      const api_items = await getItems(this.state.selectedProject);
      const api_metadata = await getProjectMeta(this.state.selectedProject);
      //console.log(raw_metadata)
      //const api_metadata = processmetadata(raw_metadata)
      console.log(api_metadata);
      this.setState({ items: api_items, api_metadata: api_metadata });
    }
  }

  async retrieveItem() {
    if (this.state.selectedProject !== "" && this.state.selectedItem !== "") {
      const api_events = await getEvents(this.state.selectedProject, this.state.selectedItem);
      console.log(api_events)
      this.setState({ events: api_events });
    }
  }

  componentDidMount() {
    console.log("App mounted");
    this.retrieveProjects();
  }

  async handleItemChange(activeElementId, serviceId) {
    if (this.state.selectedItem !== "") {
      document.getElementById(this.state.selectedItem).className = "item"
    }

    await this.setState({ selectedItem: activeElementId, serviceId: serviceId });
    document.getElementById(this.state.selectedItem).className = "item selected-item";
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


function processmetadata(meta) {
let metadata = meta.map((x)=> x)
  for (let i in metadata) {
    if (metadata[i].hasOwnProperty("meta")) {
      if (!(allowed.includes(metadata[i].servicetype))){
        metadata.splice(i, 1)
        i--
      }
    }
  }

  return metadata
}

const allowed = ["String", "Text", "Integer", "Float", "Date", "Datetime", "Boolean"]