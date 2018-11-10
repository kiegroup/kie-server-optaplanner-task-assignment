import React, { Component } from 'react';
import './App.css';

const baseURI = ' http://localhost:8080/kie-server/services/rest/server';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = { info: '' };
  }

  componentDidMount() {
    fetch(baseURI, {
      credentials: 'include',
      headers: {
        'X-KIE-ContentType': 'JSON'
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          var error = new Error(response.status + ': ' + response.statusText);
          error.response = response;
          throw error;  
        }
      },
        error => { throw new Error(error.message) }
      )
      .then(response => this.setState({info: JSON.stringify(response)}))
      .catch(error => console.log('Caught error: ' + error));
  }

  render() {
    return (
      <div>
        {this.state.info}
      </div>
    );
  }
}

export default App;