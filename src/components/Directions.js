import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";



function Directions(props) {
    const map = useMap();
    const routesLibrary = useMapsLibrary("routes");
    const [directionService, setDirectionService] = useState();
    const [directionRenderer, setDirectionRenderer] = useState();
    // const [routes, setRoutes] = useState([]);


    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionService(new routesLibrary.DirectionsService());
        setDirectionRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map])

    useEffect(() => {
        if (!directionRenderer || !directionService) return;
        const middlePoints = props.selectedPoi.slice(1, -1);
        const wayPoints = middlePoints.map((poi) => ({ location: poi.location }));
        directionService.route({
            origin: props.selectedPoi[0].location,
            waypoints: wayPoints,
            destination: props.selectedPoi[props.selectedPoi.length - 1].location,
            optimizeWaypoints: true,
            travelMode: window.google.maps.TravelMode.WALKING,
        }).then(response => {
            // directionRenderer.setDirections(response);
            props.setResponse(response);
        });
    }, [directionRenderer, directionService, props.selectedPoi]);


    return null;
}
export default Directions;

// import React, { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, DirectionsService, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

// const TripPlanner = (props) => {
//     const map = useMap();
//     const routesLibrary = useMapsLibrary("routes");
//     const [routes, setRoutes] = useState([]);
//     const [day, setDay] = useState(0);
//     const [directionService, setDirectionService] = useState();
//     const [directionRenderer, setDirectionRenderer] = useState();
//     useEffect(() => {
//         if (!routesLibrary || !map) return;
//         setDirectionService(new routesLibrary.DirectionsService());
//         setDirectionRenderer(new routesLibrary.DirectionsRenderer({ map }));

//     }, [routesLibrary, map])
//     useEffect(() => {
//         if (!props.directionService) return;

//         const middlePoints = props.selectedPoi.slice(1, -1);
//         const wayPoints = middlePoints.map((poi) => ({ location: poi.location }));
//         props.directionService.route({
//             origin: props.selectedPoi[0].location,
//             waypoints: wayPoints,
//             destination: props.selectedPoi[props.selectedPoi.length - 1].location,
//             travelMode: window.google.maps.TravelMode.TRANSIT,
//         }).then(response => {
//             setRoutes(response.routes);
//         });

//     }, [props.directionService, props.selectedPoi]);


//     const divideIntoDays = (routes, days) => {
//         const totalLegs = routes[0]?.legs.length;
//         const legsPerDay = Math.ceil(totalLegs / days);
//         const dividedRoutes = [];

//         for (let i = 0; i < days; i++) {
//             const startLegIndex = i * legsPerDay;
//             const endLegIndex = Math.min((i + 1) * legsPerDay, totalLegs);
//             dividedRoutes.push({
//                 ...routes[0],
//                 legs: routes[0]?.legs.slice(startLegIndex, endLegIndex),
//             });
//         }
//         directionRenderer.setDirections(dividedRoutes);
//         return dividedRoutes;

//     };
//     divideIntoDays(routes, 3);


//     return (
//         <div>
//             <button onClick={() => setDay(0)}>Day 1</button>
//             <button onClick={() => setDay(1)}>Day 2</button>
//             <button onClick={() => setDay(2)}>Day 3</button>




//         </div>
//     );
// };

// export default TripPlanner;
