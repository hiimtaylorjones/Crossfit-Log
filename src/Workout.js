import React, { Component } from 'react';
import './Workout.css';

class Workout extends Component {

  constructor(props) {
    super(props);
    this.state = { time: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({time: event.target.value});
  }

  render() {
    return (
      <form className="workout-form">
        <div className="input-group">
          <label>
            Time to Completion:
            <input value={this.state.time} onChange={this.handleChange} />
          </label>
        </div>
      </form>
    );
  }
}

export default Workout;
