import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import TaskkaApiClient from '../lib/taskka-api-client';
import errorHandler from '../lib/error-handler';

import {setTasks} from '../actions/task.actions';

import TaskList from '../components/tasks/task-list';
import AddTask from '../components/tasks/add-task';

import './tasks.page.scss';

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  currentProject: state.projects.find((p) => p.id === state.ui.currentProjectId),
});

class TasksPage extends Component {
  componentDidMount() {
    TaskkaApiClient
      .getTasks()
      .then((tasks) => this.props.dispatch(setTasks(tasks)))
      .catch(errorHandler);
  }

  render() {
    if (!this.props.currentProject) {
      return (<div>Loading...</div>);
    }

    return (
      <div>
        <h1>New</h1>
        <div className={'task-list'}>
          <AddTask state={'new'} />
          <TaskList state={'new'}/>
        </div>

        <h1>Complete</h1>
        <div className={'task-list'}>
          <AddTask state={'complete'} />
        </div>
        {
          Object
            .entries(this.groupTasksByUpdate(this.completeTasks()))
            .map(([day, tasks]) => (
              <div key={day}>
                <h2>{day}</h2>
                <div className={'task-list'}>
                  <TaskList tasks={tasks}/>
                </div>
              </div>
            ))
        }
      </div>
    );
  }

  completeTasks() {
    return this.props.tasks.filter((task) => task.state === "complete");
  }

  groupTasksByUpdate(tasks) {
    let groups = {};

    tasks
      .map((task) => ({ updatedAt: moment(task.updated_at), task }))
      .sort((left, right) => moment.utc(left.updatedAt).diff(moment.utc(right.updatedAt)))
      .reverse()
      .forEach(({updatedAt, task}) => {
        let dateString = moment(task.updated_at).format('MMMM Do YYYY');
        if (!groups[dateString]) {
          groups[dateString] = [];
        }
        groups[dateString].push(task);
      });

    return groups;
  }
}

export default connect(
  mapStateToProps,
)(TasksPage);
