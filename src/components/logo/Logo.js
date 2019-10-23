import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import brain from "./brain.png";

const Logo = (props) =>{
    return(
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 35, speed: 300 }} style={{ height: 200, width: 200 }} >
                <div className="Tilt-inner pa3"><img style={{paddingTop: "35px", width: "100px"}} src={brain} alt="Brain"/></div>
            </Tilt>
        </div>
    )
}

export default Logo;