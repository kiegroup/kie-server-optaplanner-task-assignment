import React, { Component } from 'react';
import {
  FormGroup, TextInput, Switch, Button,
} from '@patternfly/react-core';
import PropTypes from 'prop-types';
import JXON from 'jxon';

import constants from '../shared/constants';

class AutoProduceConsume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckedConsume: false,
      isCheckedProduce: false,
      consumeRate: 1,
      produceRate: 1,
      time: 0,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(this.count, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleConsumeSwitchChange = isCheckedConsume => this.setState({ isCheckedConsume });

  handleConsumeRateChange = consumeRate => this.setState({ consumeRate });

  handleProduceSwitchChange = isCheckedProduce => this.setState({ isCheckedProduce });

  handleProduceRateChange = produceRate => this.setState({ produceRate });

  pinTask = (taskId) => {
    const body = {
      'problem-fact-change': {
        $class: 'TaPinTaskProblemFactChange',
        taskId,
      },
    };

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
          console.log(`Pinned task ${taskId} successfully.`);
          this.props.updateBestSolution();
          return;
        }
        const error = new Error(`${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }, (error) => { throw new Error(error.message); })
      .catch(error => console.log(error));
  };

  count = () => {
    if (this.state.isCheckedConsume) {
      this.setState(
        prevState => ({ time: prevState.time + (constants.MINUTE_STEP * prevState.consumeRate) }),
        () => {
          this.props.tasks.forEach((task) => {
            if (task.startTime < this.state.time && !task.pinned) {
              this.pinTask(task.id);
            }
          });
        },
      );
    }

    // TODO: If this.state.isCheckedProduce, produce this.state.produceRate tasks
  }

  handleResetTimer = (event) => {
    event.preventDefault();
    this.setState({ time: 0 });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-5">
            <FormGroup
              label="Consume Rate"
              fieldId="consumeRate"
            >
              <div className="row">
                <div className="col-7">
                  <TextInput
                    type="number"
                    id="consumeRate"
                    name="consumeRate"
                    value={this.state.consumeRate}
                    onChange={this.handleConsumeRateChange}
                  />
                </div>
                <div className="col-5">
                  <Switch
                    id="consume"
                    label={this.state.isCheckedConsume ? 'On' : 'Off'}
                    isChecked={this.state.isCheckedConsume}
                    onChange={this.handleConsumeSwitchChange}
                  />
                </div>
              </div>
            </FormGroup>
          </div>

          <div className="col-2 text-center">
            Time
            <br />
            {this.state.time}
            <br />
            <Button onClick={this.handleResetTimer}>Reset</Button>
          </div>

          <div className="col-5 ml-auto">
            <FormGroup
              label="Produce Rate"
              fieldId="produceRate"
            >
              <div className="row">
                <div className="col-7">
                  <TextInput
                    type="number"
                    id="produceRate"
                    name="produceRate"
                    value={this.state.produceRate}
                    onChange={this.handleProduceRateChange}
                  />
                </div>
                <div className="col-5">
                  <Switch
                    id="produce"
                    label={this.state.isCheckedProduce ? 'On' : 'Off'}
                    isChecked={this.state.isCheckedProduce}
                    onChange={this.handleProduceSwitchChange}
                  />
                </div>
              </div>
            </FormGroup>
          </div>
        </div>
      </div>
    );
  }
}

AutoProduceConsume.propTypes = {
  tasks: PropTypes.instanceOf(Array).isRequired,
  updateBestSolution: PropTypes.func.isRequired,
  container: PropTypes.instanceOf(Object).isRequired,
  solver: PropTypes.instanceOf(Object).isRequired,
};

export default AutoProduceConsume;
