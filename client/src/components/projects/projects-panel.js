import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addProject, getProjects} from '../../actions/project.actions';

import Project from './project';

import './projects-panel.scss';

const mapStateToProps = (state) => ({
  projects: state.projects,
});

class ProjectsPanel extends Component {
  constructor() {
    super();

    this.state = this.getInitialState();

    this.onNewProjectNameChange = this.onNewProjectNameChange.bind(this);
    this.onAddProjectSubmit = this.onAddProjectSubmit.bind(this);
  }

   getInitialState() {
    return {
      newProject: {
        name: '',
      }
    }
  }

  render () {
    return (
      <div className={"projects-panel"}>
        {this.props.projects.map((project) => (
          <Project project={project} key={project.id}/>
        ))}
        <div className={'project'}>
          <form onSubmit={this.onAddProjectSubmit}>
            <input value={this.state.newProject.name} placeholder={"+ add project"} onChange={this.onNewProjectNameChange}/>
          </form>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.dispatch(getProjects());
  }

  onNewProjectNameChange(e) {
    let newName = e.target.value;

    this.setState({
      newProject: {
        ...this.state.newProject,
        name: newName,
      }
    });
  }

  onAddProjectSubmit(e) {
    e.preventDefault();

    this.props.dispatch(addProject(this.state.newProject))
      .then(() => this.setState(this.getInitialState()))
  }
}

export default connect(
  mapStateToProps
)(ProjectsPanel);
