import React, { useContext, useEffect, useState, useMemo } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { TripContext, TripDispatchContext } from "../App";
import PoiCard from "./PoiCard";

const GetPOI = () => {
    const [placesService, setPlacesService] = useState(null);
    const [places, setPlaces] = useState([]);
    const trip = useContext(TripContext);
    const dispatch = useContext(TripDispatchContext);
    const placesLib = useMapsLibrary("places");

    useEffect(() => {


        if (trip.pointsOfIterest.length > 0) return;
        if (placesLib) {
            setPlacesService(new placesLib.PlacesService(document.createElement('div')));
        }

    }, [placesLib]);

    const center = useMemo(() => ({ lat: trip.coodinates.lat, lng: trip.coodinates.lng }), []);

    useEffect(() => {


        if (!placesService) return;
        if (trip.pointsOfIterest.length > 0) return;
        const request = {
            location: center,
            radius: 500,
            // Porperty to filter the results
            types: ["tourist_attraction"],
            // includedTypes: ["point_of_interest", "museum", "art_gallery", "amusement_park", "aquarium", "historical_landmark", "tourist_attraction"],
            excludedTypes: ["lodging", "restaurant", "book_store", "establishment"],
            // Adding the term Window to bypass the default linting feature of ReactJS 
            rankBy: window.google.maps.places.RankBy.POPULARITY,
            language: "en-GB"

        };

        function callback(response) {

            if (response.length > 0) {
                var formattedData = response.map(function (place) {
                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();
                    return {
                        placeId: place.place_id,
                        rating: place.rating,
                        name: place.name,
                        selected: false,
                        location: { lat, lng },
                        photo: place.photos,
                    }
                }

                )
                setPlaces(...places, formattedData);
                dispatch({ type: "POI", value: formattedData });
            } else {
                console.log("API not accessed")
            }
        }


        // fetching data from google maps API 
        placesService.nearbySearch(request, callback);



    }, [placesService]);
    useEffect(() => {
        if (!places) return;

    }, [places])

    function handleSelect(index, action) {
        const tempArray = [...trip.pointsOfIterest];
        if (action === "add") {
            tempArray[index].selected = true;
        } else if (action === "remove") {
            tempArray[index].selected = false;
        } else {
            console.log("wrong type of action")
        }

        setPlaces(tempArray);
        dispatch({ type: "POI", value: tempArray });

    }
    return (
        <div className="container  text-center mt-5">
            <div className="mt-5 mb-5">
                <h2>Select points of interest</h2>
            </div>
            <div>
                {trip.pointsOfIterest.length > 0 ? (
                    <div className="row">
                        {trip.pointsOfIterest.map((place, index) => (

                            <PoiCard key={index} place={place} handleSelect={handleSelect} index={index} />


                        ))}
                    </div>) : (<p>First select a destination</p>)}

            </div>
        </div>
    );
};

export default GetPOI;
