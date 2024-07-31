import { useState, useRef, useEffect } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";


function PlaceAutocomplete({ onPlaceSelect }) {
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const inputRef = useRef(null);
    const places = useMapsLibrary("places");


    useEffect(() => {
        if (!places || !inputRef.current) return;
        // fields Autocomplete will fetch
        const options = {
            fields: ["geometry", "name", "formatted_address", "types", "place_id"],
            // Search restriction
            types: ["locality"],
        };
        // creating an instance of Autocomplete from places library, and passing the params
        setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);
    useEffect(() => {
        if (!placeAutocomplete) return;

        placeAutocomplete.addListener("place_changed", () => {
            // Retriving the data with the build in function getPlace() from Autocomplete
            const place = placeAutocomplete.getPlace();


            // Calling the 'lat' & 'lng' functions from the response
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            // adding 'lat' & 'lng' results to the response
            onPlaceSelect({ ...place, lat, lng });
        });
    }, [onPlaceSelect, placeAutocomplete]);
    return (
        <div className="autocomplete-container mb-3">
            <label className="form-label" >Select a city:</label>
            <input className="form-control" ref={inputRef} required />
        </div>
    );
};
export default PlaceAutocomplete;