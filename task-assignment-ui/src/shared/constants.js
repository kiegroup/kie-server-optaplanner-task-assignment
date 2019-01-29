export default {
  BASE_URI: '/kie-server/services/rest/server',
  MINUTE_STEP: 30,
  UNASSIGNED_ID: Number.MAX_SAFE_INTEGER,
  PRIORITIES: ['MINOR', 'MAJOR', 'CRITICAL'],
  START_DATE: {
    year: 2018,
    month: 0,
    day: 1,
  },
  BEST_SOLUTION_CLASS: 'org.kie.server.examples.optaplanner.taskassignment.kjar.domain.TaskAssigningSolution',
};
