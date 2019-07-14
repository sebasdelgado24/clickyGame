import React from "react";
import "./style.css";

function CarCard(props) {
  return (
    <div className="card">
      <div className="img-container">
        <img alt={props.name} src={props.image} onClick={() => props.clickedcar(props.id)} className="clicked"/>
      </div>
    </div>
  );
}

export default CarCard;
