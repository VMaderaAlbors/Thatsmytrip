import { useContext, useEffect, useState } from "react";
import { AccountContext, TripContext } from "../App";
import axios from "axios";
import TemplateCard from "../components/TemplateCard";




function Templates() {
    const trip = useContext(TripContext);
    const account = useContext(AccountContext);
    const [templateList, setTemplateList] = useState([]);
    const [msg, setMsg] = useState('');
    const URL = `http://localhost:3000/trips?destination_id=${trip.place_id}`; //Implement published query when there are published trips with ${published=true} (needs to be add to backend too)
    useEffect(() => {
        if (!(account.username === null)) {
            getTrips();
        }
    }, []);
    async function getTrips() {

        const token = account.token;

        try {
            // need add filter results matching the username from DB
            let response = await axios.get(URL, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }

            });

            setTemplateList(response.data)
        } catch (error) {
            // Add error handling maybe displaying a message



            if (error) { } else
                if (error.response.status === 401) {
                    setMsg("Please log in to use this feature!");
                    console.log(error.message + ': ' + error.response.statusText);
                } else {
                    setMsg("Our sever is down, sorry for the inconvenience!");
                }
        }
    }

    return (

        <div className="container text-center ">
            <h2>{msg}</h2>
            <div className="row justify-content-center ">
                {trip.place_id ? <div className="col-md-6">

                    <div className="mt-5 mb-5">
                        <h2>Select a template that you like</h2>
                    </div>
                    <div className="row  justify-content-center ">
                        {/* Each trip needs to be able to click---implement click function to set current trip to selected trip */}
                        {templateList.map((template, index) => (
                            <TemplateCard template={template} trip={trip} index={index} />
                        ))}
                    </div>
                </div> : <div className="mt-5 mb-5"><h2>Log In to access templates</h2></div>}

            </div>
        </div>
    )
}

export default Templates;