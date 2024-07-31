import { useEffect, useState } from "react";
import notAvailabe from '../images/not-available.png';

function TripCard(props) {
    const [url, setUrl] = useState();
    useEffect(() => {
        if (props.trip.photos === undefined) {
            console.log("undeff")
            console.log(props.trip.photos)
            setUrl(notAvailabe);
        } else {
            setUrl(props.trip.photos[0]?.getUrl());
        }
    }, [props.trip.photos])
    console.log(props.trip)
    return (
        <div className='col'>
            <div onClick={() => props.handleSelect(props.trip)} className='card mt-2 mouse-over' style={{ width: '18rem' }}>

                <img src={url} className="card-img-top" style={{ height: '12rem' }} alt={props.trip.name} />

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