import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './HeaderComponent';
import Home from './HomeComponent';
import TaskPage from './TaskPageComponent';

import constants from '../shared/constants';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      container: {
        containerId: 'org.optatask:optatask:1.0-SNAPSHOT',
        groupId: 'org.optatask',
        artifactId: 'optatask',
        version: '1.0-SNAPSHOT',
      },
      isContainerDeployed: false,
      solver: {
        id: 'solver1',
        configFilePath: 'org/optatask/solver/taskAssigningSolverConfig.xml',
      },
      bestSolution: {},
      score: '',
    };

    this.onContainerDeployed = this.onContainerDeployed.bind(this);
    this.onContainerDeleted = this.onContainerDeleted.bind(this);
    this.handleGetSolution = this.handleGetSolution.bind(this);
    this.updateBestSolution = this.updateBestSolution.bind(this);
  }

  componentDidMount() {
    this.updateBestSolution();
  }

  onContainerDeployed(container) {
    this.setState({ container, isContainerDeployed: true });
  }

  onContainerDeleted() {
    this.setState({ isContainerDeployed: false, bestSolution: {} });
  }

  updateBestSolution() {
    fetch(`${constants.BASE_URI}/containers/${this.state.container.containerId}/solvers/${this.state.solver.id}/bestsolution`, {
      credentials: 'include',
      headers: {
        'X-KIE-ContentType': 'json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        const error = new Error(`${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }, (error) => { throw new Error(error.message); })
      .then((response) => {
        if (Object.prototype.hasOwnProperty.call(response, 'best-solution')
          && Object.prototype.hasOwnProperty.call(response, 'score')) {
          this.setState({
            bestSolution: response['best-solution']['org.optatask.domain.TaskAssigningSolution'],
            score: response.score.value,
            isContainerDeployed: true,
          });
        }
      })
      .catch(error => console.log(error));
  }

  handleGetSolution(event) {
    event.preventDefault();
    this.updateBestSolution();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            path="/home"
            render={(props) => {
              return (
                <Home
                  {...props}
                  container={this.state.container}
                  solver={this.state.solver}
                  onContainerDeployed={this.onContainerDeployed}
                  onContainerDeleted={this.onContainerDeleted}
                  isContainerDeployed={this.state.isContainerDeployed}
                  bestSolution={this.state.bestSolution}
                  score={this.state.score}
                  updateBestSolution={this.updateBestSolution}
                />
              );
            }}
          />
          <Route
            exact
            path="/tasks"
            render={(props) => {
              return (
                <TaskPage
                  {...props}
                  tasks={this.state.bestSolution.taskList ? this.state.bestSolution.taskList : []}
                  taskTypes={this.state.bestSolution.taskTypeList
                    ? this.state.bestSolution.taskTypeList : []}
                  customers={this.state.bestSolution.customerList
                    ? this.state.bestSolution.customerList : []}
                  container={this.state.container}
                  solver={this.state.solver}
                  updateBestSolution={this.updateBestSolution}
                />
              )
            }}
          />
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}

export default Main;
