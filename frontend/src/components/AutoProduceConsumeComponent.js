import React, { Component } from 'react';
import {
  FormGroup, TextInput, Switch, Button,
} from '@patternfly/react-core';
import PropTypes from 'prop-types';

import constants from '../shared/constants';
import { submitProblemFactChange, isEveryProplemFactChangeProcessed } from '../shared/kie-server-client';

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

  pinPastTasks = (consumedTime) => {
    const body = {
      'problem-fact-change': {
        $class: 'TaPinTaskProblemFactChange',
        consumedTime,
      },
    };
    const successMsg = `Pinned tasks that start before ${consumedTime} successfully.`;

    submitProblemFactChange(
      body, successMsg, this.props.container.containerId, this.props.solver.id,
    );
  };

  randomInt = n => Math.floor(Math.random() * n);

  pickRandomItem = arr => arr[this.randomInt(arr.length)];

  addRandomTask = () => {
    const readyTime = this.state.time;
    const priority = this.pickRandomItem(constants.PRIORITIES);
    const taskTypeId = this.pickRandomItem(this.props.taskTypes).id;
    const customerId = this.pickRandomItem(this.props.customers).id;
    const body = {
      'problem-fact-change': {
        $class: 'TaAddTaskProblemFactChange',
        task: {
          readyTime,
          priority,
          pinned: false,
        },
        taskTypeId,
        customerId,
      },
    };
    const successMsg = `Added task ${JSON.stringify(body['problem-fact-change'])}`;
    submitProblemFactChange(
      body, successMsg, this.props.container.containerId, this.props.solver.id,
    );
  }

  count = () => {
    isEveryProplemFactChangeProcessed(this.props.container.containerId, this.props.solver.id)
      .then((isProcessed) => {
        if (!isProcessed) {
          console.log('Waiting until every problemFactChange is processed');
          return;
        }
        if (this.state.isCheckedConsume) {
          this.setState(
            prevState => (
              { time: prevState.time + (constants.MINUTE_STEP * prevState.consumeRate) }
            ),
            () => {
              this.pinPastTasks(this.state.time);
            },
          );
        }

        if (this.state.isCheckedProduce) {
          for (let i = 0; i < this.state.produceRate; i += 1) {
            this.addRandomTask();
          }
        }

        if (this.state.isCheckedConsume || this.state.isCheckedProduce) {
          // Wait until problmFactChanges are processed
          setTimeout(this.props.updateBestSolution, 500);
        }
      });
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
                    isDisabled={this.props.tasks.length < 1}
                  />
                </div>
              </div>
            </FormGroup>
          </div>

          <div className="col-2 text-center">
            Time
            <br />
            {(new Date(constants.START_DATE.year,
              constants.START_DATE.month,
              constants.START_DATE.day,
              0, this.state.time)).toLocaleTimeString()}
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
                    isDisabled={this.props.taskTypes.length < 1 || this.props.customers.length < 1}
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
  taskTypes: PropTypes.instanceOf(Array).isRequired,
  customers: PropTypes.instanceOf(Array).isRequired,
  updateBestSolution: PropTypes.func.isRequired,
  container: PropTypes.instanceOf(Object).isRequired,
  solver: PropTypes.instanceOf(Object).isRequired,
};

export default AutoProduceConsume;
