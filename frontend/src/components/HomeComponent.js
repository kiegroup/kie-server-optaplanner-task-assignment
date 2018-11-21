import React, { Component } from 'react';
import {
    Card, CardHeader, CardBody, Button, Modal,
    Form, FormGroup, TextInput, ActionGroup, Toolbar, ToolbarGroup, TextArea
} from '@patternfly/react-core';

import { JXON } from '../shared/jxon';

const baseURI = ' http://localhost:8080/kie-server/services/rest/server';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info: '',
            isAddContainerModalOpen: false,
            isAddSolverModalOpen: false,
            isAddProblemModalOpen: false,
            container: {
                containerId: 'org.optatask:optatask:1.0-SNAPSHOT',
                groupId: 'org.optatask',
                artifactId: 'optatask',
                version: '1.0-SNAPSHOT'
            },
            solver: {
                id: 'solver1',
                configFilePath: 'org/optatask/solver/taskAssigningSolverConfig.xml'
            },
            problem: ''
        };

        this.handleAddContainerModalToggle = this.handleAddContainerModalToggle.bind(this);
        this.handleAddSolverModalToggle = this.handleAddSolverModalToggle.bind(this);
        this.handleAddProblemModalToggle = this.handleAddProblemModalToggle.bind(this);
        this.handleAddContainerModalConfirmDeployment = this.handleAddContainerModalConfirmDeployment.bind(this);
        this.handleConfirmAddSolver = this.handleConfirmAddSolver.bind(this);
        this.handleConfirmAddProblem = this.handleConfirmAddProblem.bind(this);
    }

    handleAddContainerModalToggle = () => {
        this.setState(({ isAddContainerModalOpen }) => ({
            isAddContainerModalOpen: !isAddContainerModalOpen
        }));
    }

    handleAddSolverModalToggle = () => {
        this.setState(({ isAddSolverModalOpen }) => ({
            isAddSolverModalOpen: !isAddSolverModalOpen
        }));
    }

    handleAddProblemModalToggle = () => {
        this.setState(({ isAddProblemModalOpen }) => ({
            isAddProblemModalOpen: !isAddProblemModalOpen
        }));
    }

    handleAddContainerModalConfirmDeployment(event) {
        event.preventDefault();
        this.handleAddContainerModalToggle();
        const body = {
            "script": {
                "commands": [
                    {
                        "create-container": {
                            "kie-container": {
                                "container-id": this.state.container.containerId,
                                "release-id": {
                                    "group-id": this.state.container.groupId,
                                    "artifact-id": this.state.container.artifactId,
                                    "version": this.state.container.version
                                }
                            }
                        }
                    }
                ]
            }
        };

        var bodyAsXML = JXON.unbuild(body);
        fetch(baseURI + '/config', {
            method: "POST",
            credentials: 'include',
            headers: {
                'X-KIE-ContentType': 'xstream',
                'Content-Type': 'application/xml'
            },
            body: (new XMLSerializer()).serializeToString(bodyAsXML, "text/xml")
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    var error = new Error(response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => { throw new Error(error.message) }
            )
            .then(response => {
                return (new DOMParser()).parseFromString(response, "text/xml");
            })
            .then(response => {
                return JXON.build(response)
            })
            .then(response => alert(JSON.stringify(response.responses.response)))
            .catch(error => console.log('Caught error: ' + error));
    }

    handleConfirmAddSolver(event) {
        event.preventDefault();
        this.handleAddSolverModalToggle();

        const body = {
            "solver-instance": {
                "solver-config-file": this.state.solver.configFilePath
            }
        };
        var bodyAsXML = JXON.unbuild(body);
        fetch(baseURI + '/containers/' + this.state.container.containerId + '/solvers/' + this.state.solver.id, {
            method: "PUT",
            credentials: 'include',
            headers: {
                'X-KIE-ContentType': 'xstream',
                'Content-Type': 'application/xml'
            },
            body: (new XMLSerializer()).serializeToString(bodyAsXML, "text/xml")
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    var error = new Error(response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => { throw new Error(error.message) }
            )
            .then(response => {
                return (new DOMParser()).parseFromString(response, "text/xml");
            })
            .then(response => {
                return JXON.build(response)
            })
            .then(response => alert(JSON.stringify(response)))
            .catch(error => console.log('Caught error: ' + error));

    }

    handleConfirmAddProblem(event) {
        event.preventDefault();
        this.handleAddProblemModalToggle();

        fetch(baseURI + '/containers/' + this.state.container.containerId + '/solvers/' + this.state.solver.id + '/state/solving', {
            method: "POST",
            credentials: 'include',
            headers: {
                'X-KIE-ContentType': 'xstream',
                'Content-Type': 'application/xml'
            },
            body: this.state.problem
        })
            .then((response) => {
                if (response.ok) {
                    alert('Problem submitted successfully, solver is solving now.');
                } else {
                    var error = new Error(response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => { throw new Error(error.message) }
            )
            .catch(error => console.log('Caught error: ' + error));

    }

    componentDidMount() {
        fetch(baseURI, {
            credentials: 'include',
            headers: {
                'X-KIE-ContentType': 'JSON'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    var error = new Error(response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => { throw new Error(error.message) }
            )
            .then(response => this.setState({ info: JSON.stringify(response) }))
            .catch(error => console.log('Caught error: ' + error));
    }

    render() {
        return (
            <div className="container">
                <br />
                <Card className="text-center">
                    <CardHeader>Deployment</CardHeader>
                    <CardBody>
                        <div className="row">
                            <div className="col">
                                Deploy a task assignment container into KIE server
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                <Button onClick={this.handleAddContainerModalToggle} variant="primary">Add a container</Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Modal
                    title="Add container"
                    isOpen={this.state.isAddContainerModalOpen}
                    onClose={this.handleAddContainerModalToggle}
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
                                onChange={(containerId) => { this.setState({ container: { ...this.state.container, containerId: containerId } }); }}
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
                                onChange={(groupId) => { this.setState({ container: { ...this.state.container, groupId: groupId } }); }}
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
                                onChange={(artifactId) => { this.setState({ container: { ...this.state.container, artifactId: artifactId } }); }}
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
                                onChange={(version) => { this.setState({ container: { ...this.state.container, version: version } }); }}
                            />
                        </FormGroup>
                        <ActionGroup>
                            <Toolbar>
                                <ToolbarGroup>
                                    <Button key="confirmDeployment" variant="primary" onClick={this.handleAddContainerModalConfirmDeployment}>Deploy</Button>
                                </ToolbarGroup>
                                <ToolbarGroup>
                                    <Button key="cancelDeployment" variant="secondary" onClick={this.handleAddContainerModalToggle}>Cancel</Button>
                                </ToolbarGroup>
                            </Toolbar>
                        </ActionGroup>
                    </Form>
                </Modal>
                <br />

                <Card className="text-center">
                    <CardHeader>Solver</CardHeader>
                    <CardBody>
                        <div className="row">
                            <div className="col">
                                Add a new solver to the container
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                <Button onClick={this.handleAddSolverModalToggle} variant="primary">Add a solver</Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Modal
                    title="Add solver"
                    isOpen={this.state.isAddSolverModalOpen}
                    onClose={this.handleAddSolverModalToggle}
                >
                    <Form>
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
                                onChange={(solverId) => { this.setState({ solver: { ...this.state.solver, id: solverId } }) }}
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
                                onChange={(configFilePath) => { this.setState({ solver: { ...this.state.solver, configFilePath: configFilePath } }) }}
                            />
                        </FormGroup>
                        <ActionGroup>
                            <Toolbar>
                                <ToolbarGroup>
                                    <Button key="confirmAddSolver" variant="primary" onClick={this.handleConfirmAddSolver}>Add</Button>
                                </ToolbarGroup>
                                <ToolbarGroup>
                                    <Button key="cancelAddSolver" variant="secondary" onClick={this.handleAddContainerModalToggle}>Cancel</Button>
                                </ToolbarGroup>
                            </Toolbar>
                        </ActionGroup>
                    </Form>
                </Modal>
                <br />

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
                                value={this.state.problem}
                                onChange={(problem) => { this.setState({ problem }) }}
                            />
                        </FormGroup>
                        <ActionGroup>
                            <Toolbar>
                                <ToolbarGroup>
                                    <Button key="confirmAddProblem" variant="primary" onClick={this.handleConfirmAddProblem}>Add</Button>
                                </ToolbarGroup>
                                <ToolbarGroup>
                                    <Button key="cancelAddProblem" variant="secondary" onClick={this.handleAddProblemModalToggle}>Cancel</Button>
                                </ToolbarGroup>
                            </Toolbar>
                        </ActionGroup>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Home;