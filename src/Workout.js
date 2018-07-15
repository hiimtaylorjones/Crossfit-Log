import React, { Component } from 'react';
import './Workout.css';

class Workout extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      title: '',
      time: '',
      description: '',
      additionalNotes: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({time: event.target.value});
  }

  render() {
    return (
      <form className="workout-form">
        <div className="input-group">
          <label>Workout Title</label>
          <br />
          <input value={this.state.title} onChange={this.handleChange} />
        </div>
        <div className="input-group">
          <label>Time to Completion</label>
          <br />
          <input value={this.state.time} onChange={this.handleChange} />
        </div>
        <div className="input-group">
          <label>Workout Description</label>
          <br />
          <textarea value={this.state.description} rows="5" onChange={this.handleChange} />
        </div>
        <div className="input-group">
          <label>Additional Notes</label>
          <br />
          <textarea value={this.state.additionalNotes} rows="5" onChange={this.handleChange} />
        </div>
      </form>
    );
  }
}

export default Workout;
