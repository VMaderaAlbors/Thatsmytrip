import { useMapsLibrary } from '@vis.gl/react-google-maps'
import React, { useContext, useEffect, useState } from 'react'

import { APIProvider } from '@vis.gl/react-google-maps';
import GetPOI from '../components/GetPOI';
function PointsOfInterest() {
    
    return (
        <div>



            <GetPOI />
            {/*onPlaceSelect={setSelectedPlace}*/}
        </div>
    )
}

export default PointsOfInterest;
