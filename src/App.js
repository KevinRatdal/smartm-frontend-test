import "./App.css";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      currProject: "",
    };
  }

  retrieveProjects() {
    let testingprojects = [
      "Testproject1",
      "Testproject2",
      "Testproject3",
      "Testproject4"
    ];
    this.setState({ projects: testingprojects });
  }

  componentDidMount() {
    this.retrieveProjects();
  }

  handleChange(event) {
    this.setState({ currProject: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <ProjectList
          projects={this.state.projects}
          currProject={this.state.currProject}
          onChange = {this.handleChange.bind(this)}
        />
      </div>
    );
  }
}

class ProjectList extends React.Component {
  
  render() {
    return (
      <select
        name="project"
        id="projectSelect"
        value={this.props.currProject}
        onChange={this.props.onChange}
      >
        <option value="" disabled hidden>
          Select Project
        </option>
        {this.props.projects.map((option, index) => {
          return (
            <option value={index} key={index}>
              {option}
            </option>
          );
        })}
      </select>
    );
  }
}

export default App;
