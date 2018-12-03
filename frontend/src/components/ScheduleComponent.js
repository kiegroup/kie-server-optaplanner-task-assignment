import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scheduler, {
  SchedulerData, ViewTypes, DATETIME_FORMAT,
} from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import moment from 'moment';

class Schedule extends Component {
  constructor(props) {
    super(props);

    const schedulerData = new SchedulerData('2018-01-01', ViewTypes.Week, true);
    schedulerData.localeMoment.locale('en');

    const resources = [];
    const events = [];

    props.bestSolution.TaTaskAssigningSolution.employeeList.TaEmployee.forEach((employee) => {
      const resource = {
        id: employee.id,
        name: employee.fullName,
      };
      resources.push(resource);

      let currentTask = employee.nextTask;
      while (currentTask != null) {
        const start = new Date(2018, 0);
        const end = new Date(2018, 0);
        start.setMinutes(currentTask.startTime == null ? 0 : currentTask.startTime);
        end.setMinutes(currentTask.endTime == null ? 10 : currentTask.endTime);
        const event = {
          id: currentTask.id,
          start: moment(start).format(DATETIME_FORMAT),
          end: moment(end).format(DATETIME_FORMAT),
          resourceId: employee.id,
          title: `Task-${currentTask.id}`,
        };
        events.push(event);
        currentTask = currentTask.nextTask;
      }
    });

    events.sort((e1, e2) => e1.start.localeCompare(e2));
    schedulerData.setResources(resources);
    schedulerData.setEvents(events);

    this.state = {
      schedulerData,
      events,
    };
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
      <div className="container">
        <div className="row">
          <Scheduler
            schedulerData={this.state.schedulerData}
            prevClick={this.prevClick}
            nextClick={this.nextClick}
            onSelectDate={this.onSelectDate}
            onViewChange={this.onViewChange}
          />
        </div>
      </div>
    );
  }
}

Schedule.propTypes = {
  bestSolution: PropTypes.shape({
    TaTaskAssigningSolution: PropTypes.object.isRequired,
  }).isRequired,
};

export default Schedule;
