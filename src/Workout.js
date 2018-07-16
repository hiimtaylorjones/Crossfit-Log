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
    this.setState({ [event.target.name]: event.target.value });
  }

  callApi = async() => {
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(this.state)
    });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  submitWorkout = async() => {
    this.callApi()
      .then(res => console.log("Created!!!"))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
      <form className="workout-form">
        <div className="input-group">
          <label>Workout Title</label>
          <br />
          <input name="title" value={this.state.title} onChange={this.handleChange} />
        </div>
        <div className="input-group">
          <label>Time to Completion</label>
          <br />
          <input name="time" value={this.state.time} onChange={this.handleChange} />
        </div>
        <div className="input-group">
          <label>Workout Description</label>
          <br />
          <textarea name="description" value={this.state.description} rows="6" onChange={this.handleChange} />
        </div>
        <div className="input-group">
          <label>Additional Notes</label>
          <br />
          <textarea name="additionalNotes" value={this.state.additionalNotes} rows="6" onChange={this.handleChange} />
        </div>  
      </form>
      <button className="submit-button" onClick={this.submitWorkout}>Record Workout</button>
      </div>
    );
  }
}

export default Workout;
