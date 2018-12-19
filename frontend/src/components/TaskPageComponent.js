import React, { Component } from 'react';
import {
  DataList, DataListItem, DataListCell, Button,
} from '@patternfly/react-core';
import PropTypes from 'prop-types';

class TaskPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
    };
  }


  render() {
    const taskList = this.state.tasks.map(task => (
      <DataListItem key={task.id} aria-labelledby={`Task ${task.id}`}>
        <DataListCell>{task.id}</DataListCell>
        <DataListCell />
        <DataListCell />
        <DataListCell>
          <Button onClick={() => this.props.removeTask(task.id)} variant="danger">Delete</Button>
        </DataListCell>
      </DataListItem>
    ));

    return (
      <div className="container">
        <DataList aria-label="Checkbox and action data list example">
          <DataListItem id="header" aria-labelledby="Task page header">
            <DataListCell>Task Id</DataListCell>
            <DataListCell>Task type</DataListCell>
            <DataListCell>Customer </DataListCell>
            <DataListCell>
              <Button onClick={this.props.addTask} variant="primary">Add task</Button>
            </DataListCell>
          </DataListItem>
          {taskList}
        </DataList>
      </div>
    );
  }
}

TaskPage.propTypes = {
  tasks: PropTypes.instanceOf(Array).isRequired,
  removeTask: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
};

export default TaskPage;
