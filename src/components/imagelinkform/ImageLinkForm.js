import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({onInputChange, onSubmit}) =>{
    return(
        <div>
            <p className="f3">{"This Magic Brain will detect faces in your pictures. Give it a try."}</p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input className="w-70 pa3 center f5" type="text" placeholder="Insert the picture" onChange = {onInputChange}></input>
                    <button className="w-30 grow f4 link pv2 dib white bg-light-purple" type="submit" onClick = {onSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;