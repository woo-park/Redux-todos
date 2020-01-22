import React, { Component } from 'react';
import TasksPage from './components/TasksPage';

import { connect } from 'react-redux';
import { createTask, editTask, fetchTasks } from './actions';
import FlashMessage from './components/FlashMessage';

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

  //AJAX request
  componentDidMount() {
    this.props.dispatch(fetchTasks());
  }

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
      <div className="container">
        {this.props.error &&
          <FlashMessage message={this.props.error} />}
        <div className="main-content">
          <TasksPage
            tasks={this.props.tasks}
            onCreateTask={this.onCreateTask}
            onStatusChange={this.onStatusChange}
            isLoading={this.props.isLoading}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { tasks, isLoading, error} = state.tasks;
  return { tasks, isLoading, error };
}

export default connect(mapStateToProps) (App);
