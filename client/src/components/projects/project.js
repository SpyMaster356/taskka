import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setCurrentProject} from '../../actions/project.actions';

import './project.scss';

const mapStateToProps = (state, ownProps) => ({
  isCurrentProject: state.ui.currentProjectId === ownProps.project.id,
});

class Project extends Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  render() {
    let className = 'project';

    if (this.props.isCurrentProject) {
      className += ' current';
    }

    return (
      <div className={className} onClick={this.onClick}>
        {this.props.project.name}
      </div>
    );
  }

  onClick() {
    if (this.props.isCurrentProject) { return; }
    this.props.dispatch(setCurrentProject(this.props.project.id))
  }
}

export default connect(
  mapStateToProps,
)(Project);
