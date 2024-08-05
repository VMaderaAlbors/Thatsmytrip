import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Navbar from "./components/Navbar";
import React, { createContext, useEffect, useReducer, useState } from 'react'
import TripCreation from "./views/TripCreation";
import Templates from "./views/Templates";
import PointsOfInterest from "./views/PointsOfInterest";
import { APIProvider } from "@vis.gl/react-google-maps";
import Itinerary from "./views/Itinerary";

const tripStructure = {
  place_id: null,
  tripName: null,
  formateAddress: null,
  accomodation: '',
  userName: '',
  tripId: null,
  days: 1,
  pointsOfIterest: [],
  published: false,
  coodinates: {},
  photos: [],
}
const userAcount = {
  token: '',
  exp: '',
  username: null
}

// const tripList = [];

function reduce(state, action) {

  switch (action.type) {


    case "place_id": return { ...state, place_id: action.value };
    case "tripName": return { ...state, tripName: action.value };
    case "destination": return { ...state, formateAddress: action.value };
    case "accomodation": return { ...state, accomodation: action.value };
    case "userName": return { ...state, userName: action.value };
    case "tripId": return { ...state, tripId: action.value };
    case "days": return { ...state, days: action.value };
    case "POI": return { ...state, pointsOfIterest: action.value };
    case "published": return { ...state, published: action.value };
    case "coodinates": return { ...state, coodinates: action.value };
    case "photos": return { ...state, photos: action.value };
    case "resetTrip": return { ...tripStructure };


    case "token": return { ...state, token: action.value };
    case "exp": return { ...state, exp: action.value };
    case "username": return { ...state, username: action.value };


    default: throw new Error("Invalid action type!");
  }

}

const TripDispatchContext = createContext();
const TripContext = createContext();
const AccountDispatchContext = createContext();
const AccountContext = createContext();
const UserTrips = createContext();


function App() {

  const [trip, dispatch] = useReducer(reduce, tripStructure);
  const [account, dispatchAcount] = useReducer(reduce, userAcount);

  // try implemeting this so API_key is not in the code
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  // });
  const API_KEY = '';



  return (
    <div >
      <Router>
        <TripContext.Provider value={trip}>
          <TripDispatchContext.Provider value={dispatch}>
            <Navbar />

            <AccountDispatchContext.Provider value={dispatchAcount}>
              <AccountContext.Provider value={account}>
                <APIProvider apiKey={API_KEY}  >
                  <Routes>


                    <Route path="/" element={<Login />}></Route>
                    <Route path="/Destination" element={<TripCreation />}></Route>
                    {/* <Route path="/Templates" element={<Templates />}></Route> */}
                    <Route path="/POI" element={<PointsOfInterest />}></Route>
                    <Route path="/Itinerary" element={<Itinerary />}></Route>

                    <Route></Route>

                  </Routes>
                </APIProvider>
              </AccountContext.Provider>
            </AccountDispatchContext.Provider>

          </TripDispatchContext.Provider>
        </TripContext.Provider>
      </Router>

    </div>
  );
}

export default App;
export { TripDispatchContext, TripContext, AccountDispatchContext, AccountContext };
