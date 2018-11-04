import React, { Component } from 'react';
import './Workout.css';

class Workout extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      title: '',
      time: '',
      description: '',
      additionalNotes: '',
      errorMessages: []
    };

    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  };

  callApi = async() => {
    const response = await fetch('/api/workouts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  submitWorkout = async() => {
    var valid = await this.validateState();
    if (valid) {
      this.callApi()
        .then(res => console.log("Created!!!"))
        .catch(err => console.log(err));
    }
  };

  renderErrors = () => {
    let errors = this.state.errorMessages;
    let markup = [];
    for(let i = 0; i < errors.length; i++) {
      markup.push(<p>{errors[i]}</p>);
    }
    return markup;
  }

  validateState = () => {
    this.setState({errorMessages: []});
    var validStates = {
      title: false,
      time: false,
      description: false
    }
    var messages = [];

    if (this.state.title !== "") {
      validStates.title = true
    } else {
      messages.push("Please enter a workout title");
    }
    if (this.state.time !== "") {
      validStates.time = true
    } else {
      messages.push("Please enter a workout time");
    }
    if (this.state.description !== "") {
      validStates.description = true
    } else {
      messages.push("Please enter a workout description");
    }
    if (messages.length > 0) {
      this.setState({errorMessages: messages});
    }
    return Object.values(validStates).includes(false) == false
  };

  render() {
    let messages = this.state.errorMessages;
    console.log(messages);
    const errors = messages.map((error, index) => 
      <li key={index}>{error}</li>
    );
    console.log(errors);

    return (
      <div>
        <form className="workout-form">
          <div className="error-messages">
            <ul className="error-messages-list">
              {errors}
            </ul>
          </div>
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
