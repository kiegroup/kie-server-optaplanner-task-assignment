import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './HeaderComponent';

const baseURI = ' http://localhost:8080/kie-server/services/rest/server';

class Main extends Component {

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
            .then(response => this.setState({ info: JSON.stringify(response, null, 4) }))
            .catch(error => console.log('Caught error: ' + error));
    }

    render() {
        const Home = () => {
            return (
                <div>
                    {this.state.info}
                </div>
            );
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={Home} />
                    <Redirect to="/home" />
                </Switch>
            </div >
        );
    }
}

export default Main;