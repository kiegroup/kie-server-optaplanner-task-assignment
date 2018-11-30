import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scheduler, { SchedulerData, ViewTypes } from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import Moment from 'moment';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// import withDragDropContext from './withDnDContext';

class Schedule extends Component {
  constructor(props) {
    super(props);

    console.log(props);
    const schedulerData = new SchedulerData(new Moment(0).format(), ViewTypes.Day);
    schedulerData.localeMoment.locale('en');

    const date = new Date(0);
    console.log(date);
    console.log(date.toString());

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
        const start = new Date(0);
        const end = new Date(0);
        start.setMinutes(currentTask.startTime == null ? 0 : currentTask.startTime);
        end.setMinutes(currentTask.endTime == null ? 10 : currentTask.endTime);
        const event = {
          id: 0, // nextTask.id,
          start: start.toString(),
          end: end.toString(),
          resourceId: employee.id,
          title: `Task-${currentTask.id}`,
          bgColor: '#f759ab',
        };
        events.push(event);
        currentTask = currentTask.nextTask;
      }
    });

    console.log(resources);
    console.log(events);

    events.sort((e1, e2) => e1.start.localeCompare(e2));
    schedulerData.setResources(resources);
    schedulerData.setEvents(events);

    this.state = {
      schedulerData,
      resources,
      events,
    };
    console.log(this.state);
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

export default DragDropContext(HTML5Backend)(Schedule);
