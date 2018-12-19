import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './HeaderComponent';
import Home from './HomeComponent';
import TaskPage from './TaskPageComponent';

import PROBLEM from '../shared/24tasks';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      problem: PROBLEM,
    };

    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  addTask = (task) => {
    console.log('Add task');
  }

  removeTask = (taskId) => {
    console.log('Removing task with id: ', taskId);
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={() => <Home problem={this.state.problem} />} />
          <Route
            exact
            path="/tasks"
            component={() => (
              <TaskPage
                tasks={this.state.problem.TaTaskAssigningSolution.taskList.TaTask}
                addTask={this.addTask}
                removeTask={this.removeTask}
              />
            )}
          />
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}

export default Main;
