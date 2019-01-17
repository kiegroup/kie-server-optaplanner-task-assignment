import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scheduler, {
  SchedulerData, ViewTypes, DATETIME_FORMAT,
} from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import moment from 'moment';

import constants from '../shared/constants';

// idToColor from "Joe Freeman" answer: https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
const idToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += (`00${value.toString(16)}`).substr(-2);
  }
  return color;
};

const extractScheduler = (bestSolution) => {
  const schedulerData = new SchedulerData('2018-01-01', ViewTypes.Day);
  schedulerData.localeMoment.locale('en');
  schedulerData.config.schedulerWidth = 750;
  schedulerData.config.dayCellWidth = 100;
  schedulerData.behaviors.isNonWorkingTimeFunc = () => false;
  schedulerData.setMinuteStep(constants.MINUTE_STEP);

  const resources = [];
  const events = [];

  if (Object.prototype.hasOwnProperty.call(bestSolution, 'employeeList')) {
    bestSolution.employeeList.forEach((employee) => {
      const resource = {
        id: employee.id,
        name: employee.fullName,
      };
      resources.push(resource);
    });
    resources.push({
      id: constants.UNASSIGNED_ID,
      name: 'Unassigned',
    });

    bestSolution.taskList.forEach((task) => {
      const start = new Date(2018, 0);
      const end = new Date(2018, 0);
      start.setMinutes(task.startTime == null || task.employee == null ? 0 : task.startTime);
      end.setMinutes(task.endTime == null || task.employee == null
        ? constants.MINUTE_STEP : task.endTime);

      const event = {
        id: task.id,
        start: moment(start).format(DATETIME_FORMAT),
        end: moment(end).format(DATETIME_FORMAT),
        resourceId: task.employee == null ? constants.UNASSIGNED_ID : task.employee,
        title: task.label,
        bgColor: task.pinned ? '#bfbfbf' : idToColor((task.taskType << 10).toString()),
      };
      events.push(event);
    });
  }

  events.sort((e1, e2) => e1.start.localeCompare(e2));
  schedulerData.setResources(resources);
  schedulerData.setEvents(events);

  return { schedulerData, events };
};

class Schedule extends Component {
  constructor(props) {
    super(props);

    const { schedulerData, events } = extractScheduler(props.bestSolution);

    this.state = {
      schedulerData,
      events,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { schedulerData, events } = extractScheduler(nextProps.bestSolution);
    this.setState({ schedulerData, events });
  }

  prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(this.state.events);
    this.setState({ schedulerData });
  }

  nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(this.state.events);
    this.setState({ schedulerData });
  }

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    schedulerData.setEvents(this.state.events);
    this.setState({ schedulerData });
  }

  onSelectDate = (schedulerData, newDate) => {
    schedulerData.setDate(newDate);
    schedulerData.setEvents(this.state.events);
    this.setState({ schedulerData });
  }

  render() {
    return (
      <Scheduler
        schedulerData={this.state.schedulerData}
        prevClick={this.prevClick}
        nextClick={this.nextClick}
        onSelectDate={this.onSelectDate}
        onViewChange={this.onViewChange}
      />
    );
  }
}

Schedule.propTypes = {
  bestSolution: PropTypes.instanceOf(Object).isRequired,
};

export default Schedule;
