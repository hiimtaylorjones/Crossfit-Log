import React, { Component } from 'react';
import './App.css';

import Workout from './Workout';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({response: res.express }))
      .catch(err => console.log(err));

  }

  callApi = async() => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };


  render() {
    return (
      <div>
        <div className="Navigation">
          <header className="App-header center">
            <h1 className="App-title">Crossfit Workout Log</h1>
            <ul>
              <li><a href="#">Workouts</a></li>
              <li><a href="#">Fuel</a></li>
              <li><a href="#">Progress</a></li>
            </ul>
          </header>
        </div>
        <div>
          <h2>Enter Workout</h2>
          <Workout />
        </div>
      </div>
    );
  }
}

export default App;
