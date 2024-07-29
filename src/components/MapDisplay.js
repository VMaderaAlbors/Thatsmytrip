import { Map } from "@vis.gl/react-google-maps";
import Directions from "./Directions";
import RenderDirections from "./RenderDirections";

function MapDisplay(props) {
    const mapId = "19950b93cf93193f";

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <Map mapId={mapId} defaultZoom={11} defaultCenter={props.position} fullscreenControl={false} disableDefaultUI={true}>
                <Directions selectedPoi={props.selectedPoi} setResponse={props.setResponse} />
                {props.response.status === "OK" ? (
                    <RenderDirections response={props.response} />
                ) : (
                    <p>Loading...</p>
                )}
            </Map>
        </div>
    );
};
export default MapDisplay