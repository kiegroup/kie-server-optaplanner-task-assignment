import JXON from 'jxon';
import constants from './constants';

export const deployContainer = body => (
  fetch(`${constants.BASE_URI}/config`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-KIE-ContentType': 'json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      const error = new Error(`${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }, (error) => { throw new Error(error.message); })
    .catch(error => console.log(error))
);

export const deleteContainer = containerId => (
  fetch(`${constants.BASE_URI}/containers/${containerId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'X-KIE-ContentType': 'json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      const error = new Error(`${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }, (error) => { throw new Error(error.message); })
    .catch(error => console.log(error))
);

export const addSolver = (body, containerId, solverId) => (
  fetch(`${constants.BASE_URI}/containers/${containerId}/solvers/${solverId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'X-KIE-ContentType': 'json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      const error = new Error(`${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }, (error) => { throw new Error(error.message); })
    .catch(error => console.log(error))
);

export const addProblem = (body, containerId, solverId) => (
  fetch(`${constants.BASE_URI}/containers/${containerId}/solvers/${solverId}/state/solving`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-KIE-ContentType': 'xstream',
      'Content-Type': 'application/xml',
    },
    body,
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      const error = new Error(`${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }, (error) => { throw new Error(error.message); })
    .catch(error => console.log(error))
);

export const updateBestSolution = (containerId, solverId) => (
  fetch(`${constants.BASE_URI}/containers/${containerId}/solvers/${solverId}/bestsolution`, {
    credentials: 'include',
    headers: {
      'X-KIE-ContentType': 'json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      const error = new Error(`${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }, (error) => { throw new Error(error.message); })
    .catch(error => console.log(error))
);

export const submitProblemFactChange = (body, successMsg, containerId, solverId) => (
  fetch(`${constants.BASE_URI}/containers/${containerId}/solvers/${solverId}/problemfactchanges`, {
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
        return response.text();
      }
      const error = new Error(`${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }, (error) => { throw new Error(error.message); })
    .catch(error => console.log(error))
);

export const isEveryProplemFactChangeProcessed = (containerId, solverId) => (
  fetch(`${constants.BASE_URI}/containers/${containerId}/solvers/${solverId}/problemfactchanges/processed`, {
    credentials: 'include',
    headers: {
      'X-KIE-ContentType': 'json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      const error = new Error(`${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }, (error) => { throw new Error(error.message); })
    .catch(error => console.log(error))
);
