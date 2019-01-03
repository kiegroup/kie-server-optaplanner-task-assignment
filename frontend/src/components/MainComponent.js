import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import JXON from 'jxon';

import Header from './HeaderComponent';
import Home from './HomeComponent';
import TaskPage from './TaskPageComponent';

import PROBLEM from '../shared/24tasks';
import BEST_SOLUTION from '../shared/24tasksBestSolution';
import { BASE_URI } from '../shared/macros';

/*
  TODO:
  - Manage best solution here, and forwards it into HomeComponent and TaskPage
  - Get taskList from best solution and keep problem in HomeComponent
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
      bestSolution: BEST_SOLUTION,
    };

    this.onContainerChagne = this.onContainerChagne.bind(this);
    this.handleGetSolution = this.handleGetSolution.bind(this);
    this.updateBestSolution = this.updateBestSolution.bind(this);
  }

  onContainerChagne(container) {
    this.setState({ container });
  }

  updateBestSolution() {
    fetch(`${BASE_URI}/containers/${this.state.container.containerId}/solvers/${this.state.solver.id}/bestsolution`, {
      credentials: 'include',
      headers: {
        'X-KIE-ContentType': 'xstream',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        const error = new Error(`${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }, (error) => { throw new Error(error.message); })
      .then(response => (new DOMParser()).parseFromString(response, 'text/xml'))
      .then(response => JXON.build(response))
      .then((response) => {
        if (Object.prototype.hasOwnProperty.call(response['solver-instance'], 'best-solution')) {
          this.setState({ bestSolution: response['solver-instance']['best-solution'] });
        } else {
          alert('Solver is not solving');
        }
      })
      .catch(error => console.log(error));
  }

  handleGetSolution(event) {
    event.preventDefault();
    this.updateBestSolution();
  }

  render() {
    const tasks = [];
    this.state.bestSolution.employeeList.TaEmployee.forEach((employee) => {
      let currentTask = employee.nextTask;
      while (currentTask != null) {
        tasks.push(currentTask);
        currentTask = currentTask.nextTask;
      }
    });
    tasks.sort((t1, t2) => parseInt(t1.id, 10) > parseInt(t2.id, 10));

    return (
      <div>
        <Header />
        <Switch>
          <Route
            path="/home"
            component={() => (
              <Home
                problem={this.state.problem}
                container={this.state.container}
                onContainerChagne={this.onContainerChagne}
                bestSolution={this.state.bestSolution}
                handleGetSolution={this.handleGetSolution}
              />
            )}
          />
          <Route
            exact
            path="/tasks"
            component={() => (
              <TaskPage
                tasks={tasks}
                container={this.state.container}
                solver={this.state.solver}
                updateBestSolution={this.updateBestSolution}
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
