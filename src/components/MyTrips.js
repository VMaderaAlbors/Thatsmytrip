import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AccountContext, TripContext, TripDispatchContext } from '../App';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import TripCard from './TripCard';


function MyTrips() {
    const [tripList, setTripList] = useState([]);
    const [detailedTripList, setDetailedTripList] = useState([]);
    const [msg, setMsg] = useState('');
    const account = useContext(AccountContext);
    const tripDispatch = useContext(TripDispatchContext);
    const trip = useContext(TripContext);
    const URL = `http://localhost:3000/trips?user_name=${account.username}`;

    const placesLib = useMapsLibrary("places");
    const [placesService, setPlacesService] = useState(null);

    useEffect(() => {

        if (placesLib) {
            setPlacesService(new placesLib.PlacesService(document.createElement('div')));
        }

    }, [placesLib]);

    useEffect(() => {


        if (!placesService || tripList.length === 0) return;
        let tempArray = [];
        tripList.map((trip) => {
            const request = {
                placeId: trip.destination_id,
                fields: ["geometry", "name", "formatted_address", "types", "place_id", "photos"],
            }
            placesService.getDetails(request, (data, status) => {
                if (status === "OK") {
                    const formattedData = {
                        tripId: trip.id,
                        placeId: data.place_id,
                        destination: data.formatted_address,
                        name: data.name,
                        userName: trip.user_name,
                        days: trip.stay,
                        location: { lat: data.geometry.location.lat(), lng: data.geometry.location.lng() },
                        photos: data.photos,
                        published: trip.published

                    };
                    tempArray.push(formattedData);
                    if (tempArray.length === tripList.length) {
                        setDetailedTripList(tempArray);
                    }

                } else {
                    console.log("API not accessed");
                }
            });
        });


    }, [placesService, tripList]);

    useEffect(() => {
    }, [detailedTripList])
    useEffect(() => {
        if (!(account.username === null)) {
            getTrips();
        }
    }, [trip.tripId]);
    // checking the backend for user trips
    async function getTrips() {

        const token = account.token;

        try {
            // need add filter results matching the username from DB
            let response = await axios.get(URL, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setTripList(response.data)
        } catch (error) {
            // Add error handling maybe displaying a message

        }
    }
    useEffect(() => {

    }, [tripList])
    function handleSelect(trip) {
        tripDispatch({ type: "resetTrip" })
        // tripDispatch({ type: "tripName", value: trip.tripName });
        tripDispatch({ type: "tripId", value: trip.id });
        tripDispatch({ type: "place_id", value: trip.placeId });
        tripDispatch({ type: "destination", value: trip.destination });
        // tripDispatch({ type: "accomodation", value: trip.acomodation_id });
        tripDispatch({ type: "userName", value: account.username });
        tripDispatch({ type: "days", value: trip.days });
        tripDispatch({ type: "published", value: trip.stay });
        tripDispatch({ type: "coodinates", value: trip.location });
        tripDispatch({ type: "photos", value: trip.photos });
        // tripDispatch({ type: "POI", value: trip.POI }); // This state needs to come from POI DB
        alert(`Trip to ${trip.destination} selected`)


    }


    return (
        <div className=''>
            {account.username ?
                <div>
                    <div className='text-center mb-5' >
                        <h2>My Trips</h2>
                    </div>
                    <div className='row'>
                        {/* Each trip needs to be able to click---implement click function to set current trip to selected trip */}
                        {detailedTripList.map((trip, index) => (
                            <TripCard key={index} trip={trip} handleSelect={handleSelect} />

                        ))}
                    </div>
                </div> : <div className=" text-center mt-5 mb-5"><h2>Log In to see your trips</h2></div>}

        </div>
    )
}

export default MyTrips;