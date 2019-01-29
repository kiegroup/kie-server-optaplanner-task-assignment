import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './HeaderComponent';
import Home from './HomeComponent';
import TaskPage from './TaskPageComponent';

import { updateBestSolution } from '../shared/kie-server-client';
import constants from '../shared/constants';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      container: {
        containerId: 'org.kie.server.examples.optaplanner:task-assignment-kjar:1.0-SNAPSHOT',
        groupId: 'org.kie.server.examples.optaplanner',
        artifactId: 'task-assignment-kjar',
        version: '1.0-SNAPSHOT',
      },
      isContainerDeployed: false,
      solver: {
        id: 'solver1',
        configFilePath: 'org/kie/server/examples/optaplanner/taskassignment/kjar/solver/taskAssigningSolverConfig.xml',
      },
      bestSolution: {},
      score: '',
    };

    this.onContainerDeployed = this.onContainerDeployed.bind(this);
    this.onContainerDeleted = this.onContainerDeleted.bind(this);
    this.handleGetSolution = this.handleGetSolution.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  onContainerDeployed(container) {
    this.setState({ container, isContainerDeployed: true });
  }

  onContainerDeleted() {
    this.setState({ isContainerDeployed: false, bestSolution: {} });
  }

  update() {
    updateBestSolution(this.state.container.containerId, this.state.solver.id)
      .then((response) => {
        if (Object.prototype.hasOwnProperty.call(response, 'best-solution')
          && Object.prototype.hasOwnProperty.call(response, 'score')) {
          this.setState({
            bestSolution: response['best-solution'][constants.BEST_SOLUTION_CLASS],
            score: response.score.value,
            isContainerDeployed: true,
          });
        }
      });
  }

  handleGetSolution(event) {
    event.preventDefault();
    this.update();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            path="/home"
            render={props => (
              <Home
                {...props}
                container={this.state.container}
                solver={this.state.solver}
                onContainerDeployed={this.onContainerDeployed}
                onContainerDeleted={this.onContainerDeleted}
                isContainerDeployed={this.state.isContainerDeployed}
                bestSolution={this.state.bestSolution}
                score={this.state.score}
                updateBestSolution={this.update}
              />
            )}
          />
          <Route
            exact
            path="/tasks"
            render={props => (
              <TaskPage
                {...props}
                tasks={this.state.bestSolution.taskList ? this.state.bestSolution.taskList : []}
                taskTypes={this.state.bestSolution.taskTypeList
                  ? this.state.bestSolution.taskTypeList : []}
                customers={this.state.bestSolution.customerList
                  ? this.state.bestSolution.customerList : []}
                container={this.state.container}
                solver={this.state.solver}
                updateBestSolution={this.update}
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
