import React from 'react'
import MyTrips from '../components/MyTrips';
import CreateTrip from '../components/CreateTrip';

function TripCreation() {
    return (



        <div className="container  mt-5">
            <div className="row  ">
                <div>
                    <div className="row ">
                        <MyTrips />
                    </div>
                    <hr />
                    <div className=" row justify-content-center">
                        <CreateTrip />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripCreation;