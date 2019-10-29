import React from 'react';

function Marker(props) {
  return (
    <div>
      <img src={props.img_src} alt={props.title} />
    </div>
  );
}

export default Marker;
