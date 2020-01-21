import React, { Component } from 'react';
import TaskList from './TaskList';

const TASK_STATUSES = ['Unstarted', 'In Progress', 'Completed'];

class TasksPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showNewCardForm: false,
      title: '',
      description: '',
    }
  }

  renderTaskLists(){
      const { tasks } = this.props;
      return TASK_STATUSES.map(status => {
        const statusTask = tasks.filter(task => task.status == status);

        return <TaskList
                  key={status}
                  status={status}
                  tasks={statusTask}
                  onStatusChange={this.props.onStatusChange}
                  />
      })
  }

  onTitleChange = (e) => {
    this.setState({title: e.target.value});
  }

  onDescriptionChange = (e) => {
    this.setState({description: e.target.value});
  }

  resetForm() {
    this.setState({
      showNewCardForm: false,
      title: '',
      description: '',
    })
  }

  onCreateTask = (e) => {
      e.preventDefault();
      this.props.onCreateTask({  //onCreateTask passed in from App.js
        title: this.state.title,
        description: this.state.description,
      });
      this.resetForm();
  }

  toggleForm = () => {
    this.setState({ showNewCardForm: !this.state.showNewCardForm })
  }

  render() {
    return (


      <div className='task-list'>
        <div className='task-list-header'>
          <button
                  className="button button-default"
                  onClick={this.toggleForm}
          >
            + New Task
          </button>
        </div>
        {this.state.showNewCardForm && (
          <form
            className="task-list-form"
            onSubmit={this.onCreateTask}
          >
            <input
              className="full-width-input"
              onChange={this.onTitleChange}
              value={this.state.title}
              type="text"
              placeholder="description"
            />
            <button
              className="button"
              type="submit"
            >
              Save
            </button>
          </form>
        )}
        <div className="task-lists">
          {this.renderTaskLists()}
        </div>
      </div>

    )
  }


}

export default TasksPage;
