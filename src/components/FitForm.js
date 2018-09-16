import React, { Component } from 'react';
import axios from 'axios';

class FitForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			workout: {},
			exerciseId: 1,
			weight: 1,
			reps: 1
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		axios.get('http://127.0.0.1:5000/workout/1').then((result) => {
			this.setState({'workout': result.data});
		})
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		var formData = new FormData();
		formData.set('exerciseId', this.state.exerciseId);
		formData.set('weight', this.state.weight);
		formData.set('reps', this.state.reps);
		axios.post('http://127.0.0.1:5000/workout/set/new', formData).then((res) => {
			console.log(res)
		}, (e) => {
			console.log(e)
		});
	}

	renderExercise(workout) {
		var exercises = workout && workout.exercises ? workout.exercises : null;
		if (exercises) {
			return exercises.map((exercise) => {
				return(
				<div>
					id: {exercise.id}
					name: {exercise.name}
					workout: {exercise.workoutId}
				</div>
				)
			});
		} else {
			return(<div>Loading...</div>)
		}
		
	}



	render() {
		var { workout, exerciseId, weight, reps } = this.state;
		return (
			<div>
				{this.renderExercise(workout)}
				<form onSubmit={this.handleSubmit}>
					<label>
						ExerciseId:
						<input type="number" name="exerciseId" value={exerciseId} onChange={this.handleChange} />
					</label>
					<label>
						Weight:
						<input type="number" name="weight" value={weight} onChange={this.handleChange} />
					</label>
					<label>
						Reps:
						<input type="number"  name="reps" value={reps} onChange={this.handleChange} />
					</label>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default FitForm;