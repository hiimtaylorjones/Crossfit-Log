import React, { Component } from 'react';
import logo from './logo.svg';
import './Workout.scss';

class Workout extends Component {
  state = {
    time: '',
    weight: '',
    date: '',
    classTime: '',
    scale: 'RX'
  };

  callApi = async() => {
    const response = await fetch('/api/workouts');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };


  render() {
    return (
      <form className="workout-form">
        <div className="input-group">
          <label>Time to Completion</label>
          <input value={this.state.time}></input>
        </div>

        <div className="input-group">
          <label>Completed Weight</label>
          <input value={this.state.weight}></input>
        </div>

        <div className="input-group">
          <label>Date of Workout</label>
          <input value={this.state.date}></input>
        </div>

        <div className="input-group">
          <label>Class Time</label>
          <input value={this.state.classTime}></input>
        </div>

        <div className="input-group">
          <label>Workout Scale</label>
          <input value={this.state.scale}></input>
        </div>
      </form>
    );
  }
}

export default Workout;
