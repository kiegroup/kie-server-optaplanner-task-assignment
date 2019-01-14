import React, { Component } from 'react';
import {
  DataList, DataListItem, DataListCell, Button, Modal,
  Form, FormGroup, TextInput, ActionGroup, Toolbar, ToolbarGroup,
  Select, SelectOption, Checkbox,
} from '@patternfly/react-core';
import PropTypes from 'prop-types';
import JXON from 'jxon';

import constants from '../shared/constants';

class TaskPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
      isAddTaskModalOpen: false,
      newTask: {
        readyTime: 0,
        priority: 'MINOR',
        pinned: false,
        taskTypeId: 0,
        customerId: 0,
      },
    };

    this.handleAddTaskModalToggle = this.handleAddTaskModalToggle.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  handleAddTaskModalToggle() {
    this.setState(({ isAddTaskModalOpen }) => ({
      isAddTaskModalOpen: !isAddTaskModalOpen,
    }));
  }

  handleAddTask(event) {
    event.preventDefault();
    this.handleAddTaskModalToggle();

    const body = {
      'problem-fact-change': {
        $class: 'TaAddTaskProblemFactChange',
        task: {
          readyTime: this.state.newTask.readyTime,
          priority: this.state.newTask.priority,
          pinned: this.state.newTask.pinned,
        },
        taskTypeId: this.state.newTask.taskTypeId,
        customerId: this.state.newTask.customerId,
      },
    };

    this.submitProblemFactChange(body, `Task ${JSON.stringify(this.state.newTask)} added successfully`);
  }

  removeTask(taskId) {
    const body = {
      'problem-fact-change': {
        $class: 'TaDeleteTaskProblemFactChange',
        taskId,
      },
    };

    this.submitProblemFactChange(body, `Task with id ${taskId} was removed successfully`);
  }

  submitProblemFactChange(body, successMsg) {
    fetch(`${constants.BASE_URI}/containers/${this.props.container.containerId}/solvers/${this.props.solver.id}/problemfactchanges`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-KIE-ContentType': 'xstream',
        'Content-Type': 'application/xml',
      },
      body: JXON.xmlToString(JXON.jsToXml(body)),
    })
      .then((response) => {
        if (response.ok) {
          alert(successMsg);
          this.props.updateBestSolution();
          return;
        }
        const error = new Error(`${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }, (error) => { throw new Error(error.message); })
      .catch(error => console.log(error));
  }

  render() {
    const taskList = this.state.tasks.map((task) => {
      const { id } = task;
      const taskType = this.props.taskTypes.filter(type => type.id === task.taskType)[0].label;
      const customer = this.props.customers.filter(c => c.id === task.customer)[0].label;
      return (
        <DataListItem key={task.id} aria-labelledby={`Task ${task.id}`}>
          <DataListCell>{id}</DataListCell>
          <DataListCell>{taskType}</DataListCell>
          <DataListCell>{customer}</DataListCell>
          <DataListCell>
            <Button variant="danger" onClick={() => this.removeTask(id)}>Remove</Button>
          </DataListCell>
        </DataListItem>
      );
    });

    const taskTypeOptions = this.props.taskTypes.map(taskType => (
      <SelectOption
        key={taskType.id.toString()}
        value={taskType.id}
        label={taskType.title}
      />
    ));
    const customerOptions = this.props.customers.map(customer => (
      <SelectOption
        key={customer.id.toString()}
        value={customer.id}
        label={customer.name}
      />
    ));

    return (
      <div className="container">
        <DataList aria-label="Checkbox and action data list example">
          <DataListItem id="header" aria-labelledby="Task page header">
            <DataListCell>Task Id</DataListCell>
            <DataListCell>Task type</DataListCell>
            <DataListCell>Customer </DataListCell>
            <DataListCell>
              <Button onClick={this.handleAddTaskModalToggle} variant="primary">Add task</Button>
            </DataListCell>
          </DataListItem>
          {taskList}
        </DataList>

        <Modal
          title="Add Task"
          isOpen={this.state.isAddTaskModalOpen}
          onClose={this.handleAddTaskModalToggle}
        >
          <Form>
            <FormGroup
              label="Ready Time"
              isRequired
              fieldId="readyTime"
            >
              <TextInput
                isRequired
                type="number"
                id="readyTime"
                name="readyTime"
                value={this.state.newTask.readyTime}
                onChange={(readyTime) => {
                  this.setState(
                    prevState => ({ newTask: { ...prevState.newTask, readyTime } }),
                  );
                }}
              />
            </FormGroup>
            <FormGroup
              label="Task Type"
              isRequired
              fieldId="taskTypeId"
            >
              <Select
                id="taskTypeId"
                name="taskTypeId"
                value={this.state.newTask.taskTypeId}
                onChange={(taskTypeId) => {
                  this.setState(
                    prevState => ({ newTask: { ...prevState.newTask, taskTypeId } }),
                  );
                }}
              >
                {taskTypeOptions}
              </Select>
            </FormGroup>
            <FormGroup
              label="Customer"
              isRequired
              fieldId="customerId"
            >
              <Select
                id="customerId"
                name="customerId"
                value={this.state.newTask.customerId}
                onChange={(customerId) => {
                  this.setState(
                    prevState => ({ newTask: { ...prevState.newTask, customerId } }),
                  );
                }}
              >
                {customerOptions}
              </Select>
            </FormGroup>
            <FormGroup
              label="Priority"
              isRequired
              fieldId="priority"
            >
              <Select
                id="priority"
                name="Priority"
                value={this.state.newTask.priority}
                onChange={(priority) => {
                  this.setState(
                    prevState => ({ newTask: { ...prevState.newTask, priority } }),
                  );
                }}
              >
                <SelectOption key="0" value="MINOR" label="Minor priority" />
                <SelectOption key="1" value="MAJOR" label="Major priority" />
                <SelectOption key="2" value="CRITICAL" label="Critical priority" />
              </Select>
            </FormGroup>
            <FormGroup
              label="Pinned"
              isRequired
              fieldId="pinned"
            >
              <Checkbox
                label="Pinned"
                id="pinned"
                name="pinned"
                aria-label="pinned"
                onChange={(pinned) => {
                  this.setState(
                    prevState => ({ newTask: { ...prevState.newTask, pinned } }),
                  );
                }}
              />
            </FormGroup>
            <ActionGroup>
              <Toolbar>
                <ToolbarGroup>
                  <Button key="confirmAddTask" variant="primary" onClick={this.handleAddTask}>Add</Button>
                </ToolbarGroup>
                <ToolbarGroup>
                  <Button key="cancelAddTask" variant="secondary" onClick={this.handleAddTaskModalToggle}>Cancel</Button>
                </ToolbarGroup>
              </Toolbar>
            </ActionGroup>
          </Form>
        </Modal>
      </div>
    );
  }
}

TaskPage.propTypes = {
  tasks: PropTypes.instanceOf(Array).isRequired,
  taskTypes: PropTypes.instanceOf(Array).isRequired,
  customers: PropTypes.instanceOf(Array).isRequired,
  container: PropTypes.instanceOf(Object).isRequired,
  solver: PropTypes.instanceOf(Object).isRequired,
  updateBestSolution: PropTypes.func.isRequired,
};

export default TaskPage;
