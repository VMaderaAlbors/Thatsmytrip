import { useEffect, useState } from 'react'
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";


function RenderDirections(prop) {
    const map = useMap();
    const routesLibrary = useMapsLibrary("routes");
    const [directionRenderer, setDirectionRenderer] = useState();

    useEffect(() => {
        if (!routesLibrary || !map) return;

        setDirectionRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map])

    useEffect(() => {
        if (!directionRenderer) return;
        directionRenderer.setDirections(prop.response);
    }, [directionRenderer, prop.response])

    return null;
}

export default RenderDirections;