import { useEffect, useState } from "react";
import walkingDots from '../images/walking with dots.png';

function DayTrip(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [legInfo, setLegInfo] = useState(props.legs);

    useEffect(() => {
        setLegInfo(props.legs)
    }, [props.legs])
    useEffect(() => {
        if (props.selectedDay === props.index) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }, [props.selectedDay])

    // function toggle() {
    //     setIsOpen((!isOpen));
    // }

    function doubleFunction(index) {
        props.handleDayChange(index);
        // toggle();
    }

    return (
        <div className=" mouse-over p-4" onClick={() => doubleFunction(props.index)}>
            <div >
                <h3 >Day: {props.index + 1}</h3>
            </div>
            <hr />
            {isOpen ? (<div className="row col" >
                {props.day.map((poi, poiIndex) => (
                    <div key={poiIndex}>
                        {poi ? (
                            <div className=" mt-4">
                                <h5>{poi.name}</h5>
                            </div>
                        ) : (
                            <p>nothing</p>
                        )}
                        {poiIndex < legInfo.length && legInfo[poiIndex] ? (
                            <div className="row g-0 text-end"> <div className="col-sm-6 col-md-8"><img src={walkingDots} /> </div><div className="col-6 col-md-4"> <p> {Math.ceil(legInfo[poiIndex].duration.value / 60)} min</p></div></div>
                        ) : null}
                    </div>
                ))}
            </div>) : (<p></p>)}
        </div>
    )
}

export default DayTrip;