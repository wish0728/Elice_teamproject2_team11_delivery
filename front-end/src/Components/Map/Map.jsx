import { React, useState, useEffect } from "react";
import { AREAS } from "../../constants/delivery_data";
import { SVG_MAPS } from "../../constants/map";
import "./Map.css";

export default function Map({ area, setArea }) {
  const [isActive, setActive] = useState(
    Array.from({ length: AREAS.length }, () => false)
  );

  const handleClick = (e) => {
    setArea(e.target.id);
    console.log(e.target.id);
  };

  useEffect(() => {
    let newActive = Array.from({ length: AREAS.length }, () => false);
    newActive[AREAS.indexOf(area)] = true;
    setActive(newActive);
  }, [area]);

  useEffect(() => {
    console.log(AREAS.indexOf(area));
    console.log(isActive);
  }, [isActive]);

  return (
    <svg xmlns="img/south-korea.svg" viewBox="0 0 524 631">
      {SVG_MAPS.map((data, idx) => (
        <path
          className={isActive[idx] ? "active" : null}
          id={data.id}
          name={data.id}
          d={data.value}
          onClick={handleClick}
        />
      ))}
    </svg>
  );
}
