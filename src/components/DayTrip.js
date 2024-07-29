import { useState } from "react";

function DayTrip(props) {
    const [isOpen, setIsOpen] = useState(false);

    function toggle() {
        setIsOpen((!isOpen));
    }

    function doubleFunction(index) {
        props.handleDayChange(index);
        toggle();
    }

    return (
        <div className=" mouse-over p-4" onClick={() => doubleFunction(props.index)}>
            <div >
                <h3 >Day: {props.index + 1}</h3>
            </div>
            <hr />
            {isOpen ? (<div >
                {props.day.map((poi, poiIndex) => (
                    <div key={poiIndex}>
                        {poi ? (
                            <div className="mt-4">
                                <h5>{poi.name}</h5>
                            </div>
                        ) : (
                            <p>nothing</p>
                        )}
                        {poiIndex < props.legs.length && props.legs[poiIndex] ? (
                            <div className="text-end">   <p> {Math.ceil(props.legs[poiIndex].duration.value / 60)} min</p></div>
                        ) : null}
                    </div>
                ))}
            </div>) : (<p></p>)}
        </div>
    )
}

export default DayTrip;