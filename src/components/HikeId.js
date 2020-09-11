import React, { useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


const HikeId = (props) => {
	
    console.log(props.user)
	let [addFaves, setAddFaves] = useState('Add to your favorites')

	let history = useHistory();

    const goBackHandle = () => {
        history.push('/hike/');
    }

	const changeText = (text) => setAddFaves(text);
	console.log(changeText)

	const handleSubmit = (event) => {
		event.preventDefault();
		
		
		const value1 = event.target[0].value
		const value2 = event.target[1].value
		
		axios.post(`${REACT_APP_SERVER_URL}/trails/createtrail`, {
			name: value1,

			id: value2,

            user: props.user
			
        })
        .then((response) => {
			
            console.log(response)
        })
        .catch(err => console.log(err))
	}
	
		return (
			<div className="hikesList">
				
				<h1>{props.hike.name}</h1>
				<h3>{props.hike.location}</h3>
				<img className="chart" src="https://i.imgur.com/yO7cOial.png" alt="difficulty chart"/>
				<h4>Difficulty: {props.hike.difficulty}</h4>
				<h4>Length: {props.hike.length} Miles</h4>
				<h4>Ascent: {props.hike.ascent}ft</h4>
				<h4>Descent: {props.hike.descent}ft</h4>
				<p>{props.hike.summary}</p>
				<h3>Rating: {props.hike.stars}</h3>
				<img src={props.hike.imgSmallMed} alt="trail picture"/>
				<div className="button">
					<form onSubmit={handleSubmit}>
					
						<input hidden name="name" value={props.hike.name} />
						
						<input hidden name="id" value={props.hike.id} />

						<button className="deleteBtn button" id="addBtn" type="submit" onClick={() => setAddFaves("Added")}>
							{addFaves}
						</button>
					</form>
					<button className="deleteBtn button" onClick={goBackHandle}>Go Back to Trails</button>
				</div>
			</div>
		);

}

export default HikeId;