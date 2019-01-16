import React, { Component } from 'react';
import { FormGroup, TextInput, Switch } from '@patternfly/react-core';
import PropTypes from 'prop-types';

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

  count = () => {
    if (this.state.isCheckedConsume) {
      this.setState(
        prevState => ({ time: prevState.time + (constants.MINUTE_STEP * prevState.consumeRate) }),
        // TODO: if this.state.isCheckedConsume, pin all tasks with startTime < this.state.time
      );
    }

    // TODO: If this.state.isCheckedProduce, produce this.state.produceRate tasks
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
};

export default AutoProduceConsume;
