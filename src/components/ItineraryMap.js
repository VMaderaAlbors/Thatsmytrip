import React, { useContext, useState, useEffect } from 'react'
import { TripContext } from '../App'
import MapDisplay from './MapDisplay';
import DayTrip from './DayTrip';
import { useMapsLibrary } from '@vis.gl/react-google-maps';


function ItineraryMap() {
    const trip = useContext(TripContext);
    const [response, setResponse] = useState([]);
    const position = { lat: trip.coodinates.lat, lng: trip.coodinates.lng };
    const [selectedPoi, setSelectedPoi] = useState([]);
    const [dayTrip, setDayTrip] = useState([]);
    let dailyTime = 1000; //5400 is 1.5h
    const [arrayOfDays, setArrayOfDays] = useState([]);
    const [poiDetail, setPoiDetails] = useState([])
    const placesLib = useMapsLibrary("places");
    const [placesService, setPlacesService] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [selectedDay, setSelectedDay] = useState(0);
    // constructing PlacesServise library
    useEffect(() => {
        if (placesLib) {
            setPlacesService(new placesLib.PlacesService(document.createElement('div')));
        }
    }, [placesLib]);
    // filtering the selected POI from trip POI list
    useEffect(() => {
        if (trip.pointsOfIterest < 0) return;
        const filterSelectedPoi = trip.pointsOfIterest.filter(
            (POI) => POI.selected === true
        );
        setSelectedPoi(filterSelectedPoi);
    }, [trip]);


    useEffect(() => {

        if (response.status !== "OK" || dayTrip.length > 0) return;
        setRoutes(response.routes[0]);


        let optimizeWaypoints = response.geocoded_waypoints;
        // checking that place_id from POI matches the response
        async function crossCheckResponse(waypoints) {

            const promises = waypoints.map((waypoint) => {
                //    checking for not matching
                let poi = selectedPoi.find(poi => poi.placeId === waypoint.place_id);
                if (poi) {
                    return Promise.resolve(poi);
                } else {
                    const request = {
                        placeId: waypoint.place_id,
                        fields: ['place_id', 'photo', 'name', 'rating', 'geometry']
                    };
                    // fetching data from the response places that don't match
                    return new Promise((resolve, reject) => {
                        placesService.getDetails(request, (data, status) => {
                            if (status == "OK") {
                                const formattedData = {

                                    placeId: data.place_id,
                                    rating: data.rating,
                                    name: data.name,
                                    selected: true,
                                    location: { lat: data.geometry.location.lat(), lng: data.geometry.location.lng() },
                                    photo: data.photo
                                };
                                resolve(formattedData);
                            } else {
                                resolve(undefined);
                            }
                        });
                    });
                }
            });
            Promise.all(promises).then((v) => setPoiDetails(v));


        }
        crossCheckResponse(optimizeWaypoints);

    }, [response, trip]);

    useEffect(() => {
        const hasUndefined = poiDetail.some(poi => poi === undefined);
        if (poiDetail.length < selectedPoi.length || hasUndefined) return;

        if (!response || !response.routes || !response.routes[0]) return;
        let routes = response.routes[0].legs;
        // dividing the POI acording to the transit time
        function divideTrip() {


            let legsTime = 0;
            let totalTime = 0;
            let dailyPoi = [];
            let day = [];
            routes.map((leg) => {
                totalTime = totalTime + leg.duration.value;
            });
            if (totalTime / trip.days > dailyTime) {
                dailyTime = totalTime / trip.days;
            }

            const startPoint = poiDetail[0];

            day.push(startPoint);

            routes.map((leg, index) => {

                legsTime = legsTime + leg.duration.value;
                if (legsTime < dailyTime) {
                    day.push(poiDetail[index + 1]);
                } else if (legsTime > dailyTime) {
                    dailyPoi.push(day)
                    day = []
                    legsTime = 0;
                    day.push(poiDetail[index + 1]);
                }
            });
            if (day.length > 0) {
                dailyPoi.push(day)
            }
            setDayTrip(dailyPoi);

        }
        divideTrip();
    }, [poiDetail]);
    // changing selectedPoi to specific day
    function handleDayChange(index) {
        setSelectedDay(index);
        if (dayTrip[index]) {
            setSelectedPoi(dayTrip[index]);
        }
    }
    // adding day data to array of days
    useEffect(() => {
        if (!dayTrip) return;
        let addingDays = [];
        for (let i = 0; i < trip.days; i++) {
            if (dayTrip[i] !== undefined) {
                addingDays.push(dayTrip[i]);
            } else {
                addingDays.push([]);
            }
        }
        setArrayOfDays(addingDays);

    }, [dayTrip]);

    useEffect(() => {
        if (response.status !== "OK") return;
        setRoutes(response.routes[0]);
    }, [response])

    return (
        <div className="container mt-5">
            {selectedPoi.length > 0 || !arrayOfDays === trip.days ? (
                <div className="row justify-content-center ">
                    <div className="col details">
                        {arrayOfDays.map((day, index) => {
                            return <DayTrip handleDayChange={handleDayChange} index={index} day={day} legs={routes.legs} selectedDay={selectedDay} />
                        })}
                    </div>
                    <div className="col">
                        <MapDisplay position={position} setResponse={setResponse} selectedPoi={selectedPoi} response={response} />
                    </div>
                </div>
            ) : (<p>Please select Points Of interest or create a trip!!</p>)}
        </div>
    )
}

export default ItineraryMap