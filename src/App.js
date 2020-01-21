import React, { Component } from 'react';
import TasksPage from './components/TasksPage';

import { connect } from 'react-redux';
import { createTask, editTask } from './actions';

/*
  const mockTasks = [
    {
        id: 1,
        title: 'Learn Redux',
        description: 'how do you do?',
        status: 'In Progress'
    },
    {
        id: 2,
        title: 'Peace of me',
        description: 'Never!',
        status: 'In Progress'
    },
  ]
*/


class App extends Component {
  onCreateTask = ( {title, description }) => {   //destructuring props
    //dispatch method earned from store
    this.props.dispatch(createTask({ title, description})
    )

  }

  onStatusChange = (id, status) => {
    //pass in id and status object which is => params
    this.props.dispatch(editTask( id, {status} ))
  }

  render() {
    return (
      <div className="main-content">
        <TasksPage
          tasks={this.props.tasks}
          onCreateTask={this.onCreateTask}
          onStatusChange={this.onStatusChange}
        />

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps) (App);
