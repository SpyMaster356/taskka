import React, {Component} from 'react';
import {connect} from 'react-redux';

import {updateTask} from '../../actions/task.actions';

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

class Task extends Component {
  constructor() {
    super();

    this.initState = {
      submitting: false,
      checked: null,
    };

    this.state = this.initState;

    this.onTaskStateChange = this.onTaskStateChange.bind(this);
  }

  render() {
    let {task} = this.props;
    let checked = null;

    if (this.state.checked === null) {
      checked = task.state === 'complete';
    }
    else {
      checked = this.state.checked;
    }

    return (
      <li key={task.id}>
        <label>
          <input type={'checkbox'} checked={checked} onChange={this.onTaskStateChange} disabled={this.state.submitting} />{task.name}
        </label>
      </li>
    );
  }

  onTaskStateChange(e) {
    let newState = e.target.checked ? 'complete' : 'new';

    let taskId = this.props.task.id;

    this.setState({
      submitting: true,
      checked: newState === 'complete'
    });

    this.props
      .dispatch(updateTask({
        id: taskId,
        state: newState
      }))
      .then(() => this.setState({
        submitting: false,
        checked: null
      }));
  }
}

export default connect(
  mapStateToProps,
)(Task);
