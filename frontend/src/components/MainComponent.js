import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './HeaderComponent';
import Home from './HomeComponent';
import TaskPage from './TaskPageComponent';

import PROBLEM from '../shared/24tasks';

/*
  TODO:
  - Have bestSolution here
  - Get taskList from best solution or update it in the problem whenever a task is added/deleted
  - When the page first starts, getBestSolution if the solver is working
*/
class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      problem: PROBLEM,
      container: {
        containerId: 'org.optatask:optatask:1.0-SNAPSHOT',
        groupId: 'org.optatask',
        artifactId: 'optatask',
        version: '1.0-SNAPSHOT',
      },
      solver: {
        id: 'solver1',
        configFilePath: 'org/optatask/solver/taskAssigningSolverConfig.xml',
      },
    };
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
                container={this.state.container}
                solver={this.state.solver}
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
