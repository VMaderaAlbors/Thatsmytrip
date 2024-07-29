import { useEffect, useState } from "react";
import notAvailabe from '../images/not-available.png';

function TripCard(props) {
    const [url, setUrl] = useState();
    useEffect(() => {
        if (props.trip.photo === undefined) { setUrl(notAvailabe); } else { setUrl(props.trip.photo[0]?.getUrl()); }
    }, [])

    return (
        <div className='col'>
            <div onClick={() => props.handleSelect(props.trip)} className='card mt-2 mouse-over' style={{ width: '18rem' }}>

                <img src={url} className="card-img-top" style={{ height: '12rem' }} />

                <div className='card-body'>
                    <ul>
                        <li>{props.trip.destination}</li>
                        {props.trip.days > 1 ? (<li>{props.trip.days} days</li>) : (<li>{props.trip.days} day</li>)}


                        <li>{props.trip.published}</li>
                        <li>{ }</li>
                        <li>{ }</li>

                    </ul>
                </div>
            </div>
        </div>

    )
}

export default TripCard