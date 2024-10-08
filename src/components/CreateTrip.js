import axios from 'axios';
import { useState, useContext, useEffect, useReducer } from 'react';
import { AccountContext, TripContext, TripDispatchContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { APIProvider } from '@vis.gl/react-google-maps';
import PlacesAutocomplete from './PlaceAutocomplete';
// temporal trip information
const tempTrip = {
    tempTripName: '',
    tempTripDays: '',
    tempTripDestination: '',
    tempTripPlace_id: '',
    tempTripCoodinates: { lat: null, lng: null }
}
// function to handle all the temporal data setting
function reduce(state, action) {

    switch (action.type) {
        case "destination": return { ...state, tempTripDestination: action.value };
        case "tripName": return { ...state, tempTripName: action.value };
        case "days": return { ...state, tempTripDays: action.value };
        case "place_id": return { ...state, tempTripPlace_id: action.value };
        case "lat": return { ...state, tempTripCoodinates: { ...state.tempTripCoodinates, lat: action.value } };
        case "lng": return { ...state, tempTripCoodinates: { ...state.tempTripCoodinates, lng: action.value } };
        case "coodinates": return { ...state, tempTripCoodinates: action.value };
        case "resetTrip": return { ...tempTrip };

        default: throw new Error("Invalid action type!");
    }
}

function CreateTrip() {
    const dispatch = useContext(TripDispatchContext);
    const trip = useContext(TripContext);
    const account = useContext(AccountContext);

    const [newTrip, tempDispatch] = useReducer(reduce, tempTrip);
    const navigate = useNavigate();

    const [selectedPlace, setSelectedPlace] = useState(null);
    const [msg, setMsg] = useState(null);
    const [msgNum, setMsgNum] = useState(null);


    const URL = 'http://localhost:3000/trips';

    // setting the selected place upon change selection
    useEffect(() => {

        if (selectedPlace) {
            tempDispatch({ type: "destination", value: selectedPlace.formatted_address });
            tempDispatch({ type: "place_id", value: selectedPlace.place_id });

            tempDispatch({ type: "lat", value: selectedPlace.lat });
            tempDispatch({ type: "lng", value: selectedPlace.lng });

        }
    }, [selectedPlace]);
    function handleTripName(e) {
        tempDispatch({ type: "tripName", value: e.target.value });


    }
    function handleDays(e) {
        if (e.target.value > 0 && e.target.value <= 30 && !e.target.value.includes('.')) {
            setMsgNum(null)
            tempDispatch({ type: "days", value: e.target.value });
        } else {
            setMsgNum("Enter a number between 1 to 30");
        }

        tempDispatch({ type: "days", value: e.target.value });

    }

    async function handleCreation(e) {
        e.preventDefault()
        const token = account.token;
        if (!newTrip.tempTripName || !newTrip.tempTripDays || !newTrip.tempTripDestination) {
            setMsg("All fields are required.");
            return;
        }
        dispatch({ type: "resetTrip" });

        // might need a revision
        if (!(account.username === null)) {
            const data = {
                destination_id: newTrip.tempTripPlace_id,
                stay: newTrip.tempTripDays,
                user_name: account.username,
                // destination: newTrip.tempTripDestination, // acctivate when changes to the backend has been done
                // trip_name: newTrip.tempTripName,
                // After this it will need to fech from API the actual location to display card (might be in the wrong component)
            }
            try {

                let response = await axios.post(URL, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                dispatch({ type: "userName", value: account.username });
                dispatch({ type: "tripId", value: response.data.id });

            } catch (error) {
                // Add error handling maybe displaying a message
                setMsg("Failed to create trip. Please try again.");
            }
            dispatch({ type: "tripName", value: newTrip.tempTripName });
            dispatch({ type: "destination", value: newTrip.tempTripDestination });
            dispatch({ type: "place_id", value: newTrip.tempTripPlace_id });
            dispatch({ type: "coodinates", value: newTrip.tempTripCoodinates });
            dispatch({ type: "days", value: newTrip.tempTripDays });

            if (!msg) {

                handleNavigate();
            }
        } else {

            dispatch({ type: "tripName", value: newTrip.tempTripName });
            dispatch({ type: "destination", value: newTrip.tempTripDestination });
            dispatch({ type: "place_id", value: newTrip.tempTripPlace_id });
            dispatch({ type: "coodinates", value: newTrip.tempTripCoodinates });
            dispatch({ type: "days", value: newTrip.tempTripDays });



            if (newTrip.tempTripName) {

                handleNavigate();
            } else {
                setMsg("Trip name is required.");
            }
        }
    }
    // function to navigate to POI
    const handleNavigate = () => navigate('/POI');
    return (
        <div className='col-5'>

            <div className='mt-5'>
                <h3>Create a new trip:</h3>
            </div>
            <p className='text-danger'>{msg}</p>
            <form>
                <div className="mb-3">
                    <label className="form-label" >Name your trip:</label>
                    <input className="form-control" type="text" id="name" value={newTrip.tempTripName} onChange={handleTripName} required />
                </div>


                <PlacesAutocomplete onPlaceSelect={setSelectedPlace} required />


                <div className="mb-3">
                    <label className="form-label" >Select how many days:</label>
                    <p className='text-danger'>{msgNum}</p>
                    <input className="form-control" type="number" id="days" step="1" value={newTrip.tempTripDays} onChange={handleDays} min="1" max="30" required />
                </div>
                <button type='submit' className="btn btn-dark mb-5" onClick={handleCreation}>Create new trip</button>
            </form>
        </div>
    )
}

export default CreateTrip;

