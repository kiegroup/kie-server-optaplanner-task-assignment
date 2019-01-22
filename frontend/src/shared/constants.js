import JXON from 'jxon';

const BASE_URI = '/kie-server/services/rest/server';

const submitProblemFactChange = (body, successMsg, containerId, solverId) => {
  fetch(`${BASE_URI}/containers/${containerId}/solvers/${solverId}/problemfactchanges`, {
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
        console.log(successMsg);
        return;
      }
      const error = new Error(`${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }, (error) => { throw new Error(error.message); })
    .catch(error => console.log(error));
};

export default {
  BASE_URI,
  MINUTE_STEP: 30,
  UNASSIGNED_ID: Number.MAX_SAFE_INTEGER,
  PRIORITIES: ['MINOR', 'MAJOR', 'CRITICAL'],
  START_DATE: {
    year: 2018,
    month: 0,
    day: 1,
  },
};

export { submitProblemFactChange };
