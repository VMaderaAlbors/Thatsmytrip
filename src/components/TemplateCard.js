import { useEffect, useState } from "react";
import notAvailabe from '../images/not-available.png';

function TemplateCard(props) {
    const [url, setUrl] = useState();
    useEffect(() => {
        if (props.trip.photo === undefined) { setUrl(notAvailabe); } else { setUrl(props.trip.photo[0]?.getUrl()); }
    }, [])

    return (
        <div className='col '>
            <div className='card mt-2 mouse-over ' key={props.index} style={{ width: '18rem', height: 'auto' }}>
                <img src={url} className="card-img-top" style={{ height: '12rem' }} />
                <div className=''>
                    <h3>{props.trip.formateAddress}</h3>
                </div>
            </div>
        </div>
    )
}

export default TemplateCard