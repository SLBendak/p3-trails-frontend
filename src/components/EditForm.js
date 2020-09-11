import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const EditForm = (props) => {
    console.log(props.user)
    let [long, setLong] = useState(props.user.longitude);
    let [lat, setLat] = useState(props.user.latitude);
    let [dis, setDis] = useState(props.user.radiusTrail);
    let user = (props.user.id)
    let [redirect, setRedirect] = useState(false);

    const handleLong = (e) =>{
        setLong(e.target.value);
    }
    const handleLat = (e) =>{
        setLat(e.target.value);
    }
    const handleDis = (e) =>{
        setDis(e.target.value);
    }

    let handleSubmit = (e) => {
        e.preventDefault();

        const updateInfo = { long, lat, dis, user}
        console.log(updateInfo)

        axios.post(`${REACT_APP_SERVER_URL}/api/users/profile`, updateInfo)
        .then(response =>{
            setRedirect(true);
        })
        .catch(error => console.log(error))
    } 
    if(redirect) return <Redirect to="/profile" />


    
        return(
            <div className='edit-user'>
                <h3>Edit your account</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="Longitude">Longitude:</label>
                        <input name="Longitude" value={long} onChange={handleLong}/>
                    </div>
                    <div>
                        <label htmlFor="Latitude">Latitude:</label>
                        <input name="Latitude" value={lat} onChange={handleLat}/>
                    </div>
                    <div>
                        <label htmlFor="Distance">Distance:</label>
                        <input name="Distance" value={dis} onChange={handleDis} />
                    </div>
                        <input type="hidden" name="id" value={props.user.id} />
                    <button type="submit" className="updateBtn">Update</button>

                </form>
            </div>
        )


}

export default EditForm;