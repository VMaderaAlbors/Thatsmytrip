import React from 'react'
import MyTrips from '../components/MyTrips';
import CreateTrip from '../components/CreateTrip';

function TripCreation() {
    return (



        <div className="container  mt-5">
            <div className="row justify-content-center ">
                <div className='col-md-6'>
                    <div className="row ">
                        <MyTrips />
                    </div>
                    <hr />
                    <div className=" row">
                        <CreateTrip />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripCreation;