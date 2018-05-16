import React, { Component } from 'react';
import './Workout.css';

class Workout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: '',
      weight: '',
      date: '',
      classTime: '',
      scale: 'RX'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <form className="workout-form">
        <div className="input-group">
          <label>
            Weight
            <input value={this.state.weight} onChange={this.handleChange} />
          </label>
        </div>
      </form>
    );
  }
}

export default Workout;
