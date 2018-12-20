import React, { Component } from 'react';
import {
  Card, CardHeader, CardBody, Button, Modal,
  Form, FormGroup, TextInput, ActionGroup, Toolbar, ToolbarGroup, TextArea,
} from '@patternfly/react-core';
import JXON from 'jxon';
import PropTypes from 'prop-types';

import Schedule from './ScheduleComponent';

import BEST_SOLUTION from '../shared/24tasksBestSolution';

import { BASE_URI } from '../shared/macros';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeploymentModalOpen: false,
      isAddProblemModalOpen: false,
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
      problem: props.problem,
      bestSolution: BEST_SOLUTION,
    };

    this.handleDeploymentModalToggle = this.handleDeploymentModalToggle.bind(this);
    this.handleAddProblemModalToggle = this.handleAddProblemModalToggle.bind(this);
    this.handleDeploymentModalConfirm = this.handleDeploymentModalConfirm.bind(this);
    this.handleAddProblemModalConfirm = this.handleAddProblemModalConfirm.bind(this);
    this.handleGetSolution = this.handleGetSolution.bind(this);
  }

  handleDeploymentModalToggle = () => {
    this.setState(({ isDeploymentModalOpen }) => ({
      isDeploymentModalOpen: !isDeploymentModalOpen,
    }));
  }

  handleAddProblemModalToggle = () => {
    this.setState(({ isAddProblemModalOpen }) => ({
      isAddProblemModalOpen: !isAddProblemModalOpen,
    }));
  }

  handleDeploymentModalConfirm(event) {
    event.preventDefault();
    this.handleDeploymentModalToggle();
    const body = {
      script: {
        commands: [
          {
            'create-container': {
              'kie-container': {
                'container-id': this.state.container.containerId,
                'release-id': {
                  'group-id': this.state.container.groupId,
                  'artifact-id': this.state.container.artifactId,
                  version: this.state.container.version,
                },
              },
            },
          },
        ],
      },
    };

    const bodyAsXML = JXON.unbuild(body);
    fetch(`${BASE_URI}/config`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-KIE-ContentType': 'xstream',
        'Content-Type': 'application/xml',
      },
      body: (new XMLSerializer()).serializeToString(bodyAsXML, 'text/xml'),
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
      .then(response => alert(JSON.stringify(response.responses.response)))
      .then(() => this.addSolver())
      .catch(error => console.log(error));
  }

  addSolver() {
    const body = {
      'solver-instance': {
        'solver-config-file': this.state.solver.configFilePath,
      },
    };
    const bodyAsXML = JXON.unbuild(body);
    fetch(`${BASE_URI}/containers/${this.state.container.containerId}/solvers/${this.state.solver.id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'X-KIE-ContentType': 'xstream',
        'Content-Type': 'application/xml',
      },
      body: (new XMLSerializer()).serializeToString(bodyAsXML, 'text/xml'),
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
      .then(response => alert(JSON.stringify(response)))
      .catch(error => console.log(error));
  }

  handleAddProblemModalConfirm(event) {
    event.preventDefault();
    this.handleAddProblemModalToggle();

    fetch(`${BASE_URI}/containers/${this.state.container.containerId}/solvers/${this.state.solver.id}/state/solving`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-KIE-ContentType': 'xstream',
        'Content-Type': 'application/xml',
      },
      body: JXON.xmlToString(JXON.jsToXml(this.state.problem)),
    })
      .then((response) => {
        if (response.ok) {
          alert('Problem submitted successfully, solver is solving now.');
        } else {
          const error = new Error(`${response.status}: ${response.statusText}`);
          error.response = response;
          throw error;
        }
      }, (error) => { throw new Error(error.message); })
      .catch(error => console.log(error));
  }

  handleGetSolution(event) {
    event.preventDefault();
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

  render() {
    return (
      <div className="container">
        <br />
        <div className="row mb-3">
          <div className="col">
            <Card className="text-center">
              <CardHeader>Deployment</CardHeader>
              <CardBody>
                <div className="row">
                  <div className="col">
                    Deploy a task assignment container into KIE server and start a solver
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <Button onClick={this.handleDeploymentModalToggle} variant="primary">Add a container</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        <Modal
          title="Add container"
          isOpen={this.state.isDeploymentModalOpen}
          onClose={this.handleDeploymentModalToggle}
        >
          <Form>
            <FormGroup
              label="Name"
              isRequired
              fieldId="containerId"
            >
              <TextInput
                isRequired
                type="text"
                id="containerId"
                name="containerId"
                value={this.state.container.containerId}
                onChange={(containerId) => {
                  this.setState(
                    prevState => ({ container: { ...prevState.container, containerId } }),
                  );
                }}
              />
            </FormGroup>
            <FormGroup
              label="Group Name"
              isRequired
              fieldId="groupId"
              helperText="Please provide the group id"
            >
              <TextInput
                isRequired
                type="text"
                id="groupId"
                name="groupId"
                value={this.state.container.groupId}
                onChange={(groupId) => {
                  this.setState(
                    prevState => ({ container: { ...prevState.container, groupId } }),
                  );
                }}
              />
            </FormGroup>
            <FormGroup
              label="Artifact Id"
              isRequired
              fieldId="artifactId"
            >
              <TextInput
                isRequired
                type="text"
                id="artifactId"
                name="artifactId"
                value={this.state.container.artifactId}
                onChange={(artifactId) => {
                  this.setState(
                    prevState => ({ container: { ...prevState.container, artifactId } }),
                  );
                }}
              />
            </FormGroup>
            <FormGroup
              label="Version"
              isRequired
              fieldId="version"
            >
              <TextInput
                isRequired
                type="text"
                id="version"
                name="releaseId.version"
                value={this.state.container.version}
                onChange={(version) => {
                  this.setState(
                    prevState => ({ container: { ...prevState.container, version } }),
                  );
                }}
              />
            </FormGroup>
            <FormGroup
              label="Solver Id"
              isRequired
              fieldId="solverId"
            >
              <TextInput
                isRequired
                type="text"
                id="solverId"
                value={this.state.solver.id}
                onChange={(solverId) => {
                  this.setState(
                    prevState => ({ solver: { ...prevState.solver, id: solverId } }),
                  );
                }}
              />
            </FormGroup>
            <FormGroup
              label="Solver config file"
              isRequired
              fieldId="solverConfigFilePath"
            >
              <TextInput
                isRequired
                type="text"
                id="solverConfigFilePath"
                value={this.state.solver.configFilePath}
                onChange={(configFilePath) => {
                  this.setState(
                    prevState => ({ solver: { ...prevState.solver, configFilePath } }),
                  );
                }}
              />
            </FormGroup>
            <ActionGroup>
              <Toolbar>
                <ToolbarGroup>
                  <Button key="confirmDeployment" variant="primary" onClick={this.handleDeploymentModalConfirm}>Deploy</Button>
                </ToolbarGroup>
                <ToolbarGroup>
                  <Button key="cancelDeployment" variant="secondary" onClick={this.handleDeploymentModalToggle}>Cancel</Button>
                </ToolbarGroup>
              </Toolbar>
            </ActionGroup>
          </Form>
        </Modal>

        <div className="row mb-3">
          <div className="col">
            <Card className="text-center">
              <CardHeader>New problem</CardHeader>
              <CardBody>
                <div className="row">
                  <div className="col">
                    Submit a task assignment problem and start solving it
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <Button onClick={this.handleAddProblemModalToggle} variant="primary">Add a problem</Button>
                    <Button onClick={this.handleGetSolution} variant="secondary" className="ml-2"> Get solution</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Modal
              title="Add problem"
              isOpen={this.state.isAddProblemModalOpen}
              onClose={this.handleAddProblemModalToggle}
            >
              <Form>
                <FormGroup
                  label="Problem"
                  isRequired
                  fieldId="problem"
                >
                  <TextArea
                    isRequired
                    id="problem"
                    size="200"
                    value={JXON.xmlToString(JXON.jsToXml(this.state.problem))}
                    onChange={(problem) => { this.setState({ problem }); }}
                  />
                </FormGroup>
                <ActionGroup>
                  <Toolbar>
                    <ToolbarGroup>
                      <Button key="confirmAddProblem" variant="primary" onClick={this.handleAddProblemModalConfirm}>Add</Button>
                    </ToolbarGroup>
                    <ToolbarGroup>
                      <Button key="cancelAddProblem" variant="secondary" onClick={this.handleAddProblemModalToggle}>Cancel</Button>
                    </ToolbarGroup>
                  </Toolbar>
                </ActionGroup>
              </Form>
            </Modal>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Schedule bestSolution={this.state.bestSolution} />
          </div>
          <div className="col">
            Score:&nbsp;
            {this.state.bestSolution.score}
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  problem: PropTypes.shape({
    TaTaskAssigningSolution: PropTypes.object.isRequired,
  }).isRequired,
};

export default Home;
