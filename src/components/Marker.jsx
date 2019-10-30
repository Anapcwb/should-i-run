import React from "react";
import "../styles/Marker.css";

function Marker(props) {
  return (
    <div>
      <img className="marker" src={props.img_src} alt={props.title} />
    </div>
  );
}

export default Marker;
