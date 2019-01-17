import JXON from 'jxon';

const submitProblemFactChange = (body, successMsg, containerId, solverId) => {
  fetch(`/kie-server/services/rest/server/containers/${containerId}/solvers/${solverId}/problemfactchanges`, {
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
  BASE_URI: '/kie-server/services/rest/server',
  MINUTE_STEP: 30,
};

export { submitProblemFactChange };
