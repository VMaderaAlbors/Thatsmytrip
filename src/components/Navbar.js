import { NavLink } from "react-router-dom";
function Navbar() {
    return (
        <div >
            <nav className="navbar navbar-expand-lg  justify-content-center">



                <div className=" " >
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {/* Just a button to log out need to implement the function to log out so automatically will redirect to "/" log in */}
                                <NavLink className="nav-link " to="/">Log in</NavLink>
                            </li>
                            <li className="nav-item">
                                {/* Just a button to log out need to implement the function to log out so automatically will redirect to "/" log in */}
                                <NavLink className="nav-link " to="/Destination">Factory</NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink className="nav-link " to="/Templates">Templates</NavLink>
                            </li> */}
                            <li className="nav-item">
                                <NavLink className="nav-link " to="/POI">Points Of Interest</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link " to="/Itinerary">Itinerary</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
