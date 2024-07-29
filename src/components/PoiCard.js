import React, { useEffect, useState } from 'react'
import notAvailabe from '../images/not-available.png';

function PoiCard(props) {
    const [url, setUrl] = useState();
    useEffect(() => {
        if (props.place.photo === undefined) { setUrl(notAvailabe); } else { setUrl(props.place.photo[0]?.getUrl()); }
    }, [])

    return (
        <div className='col '>
            <div className={`card mt-2 ${props.place.selected ? 'selected' : ''}`} onClick={props.place.selected ? (() => props.handleSelect(props.index, "remove")) : (() => props.handleSelect(props.index, "add"))} key={props.index} style={{ width: '18rem', height: 'auto' }}>
                <div className="d-grid gap-2">
                    <button className={`btn btn-lg btn-${props.place.selected ? 'dark' : 'outline-secondary'} `} >{props.place.selected ? "Remove" : "Add"}</button>
                </div>
                <img src={url} className="card-img-top" style={{ height: '12rem' }} alt={props.place.name} />
                <h3>{props.place.name}</h3>
            </div>
        </div>
    )
}

export default PoiCard