import React, { useState } from "react";
import "./flipCard.css";

const Card = ({name,desc}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`card ${isFlipped ? "is-flipped" : ""}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <h2><center>{name}</center></h2>
        </div>
        <div className="card-back">
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
