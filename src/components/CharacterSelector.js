import React from "react";
import "../css/style.css";

function CharacterSelector({ characters, selectedId, onSelect }) {
  return (
    <div className="character-selector">
      {characters.map((character) => (
        <div
          key={character.id}
          className={`character ${
            character.id === selectedId ? "selected" : ""
          }`}
          onClick={() => onSelect(character.id)}
        >
          <img
            src={character.image}
            alt={character.name}
            className="character-image"
          />
          <svg
            className="character-name"
            width="150%"
            height="40"
            viewBox="0 0 100 40"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
          >
            <text
              x="50"
              y="20"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="30px"
              fontWeight="bold"
              fill="silver"
              stroke="black"
              strokeWidth="3"
              paintOrder="stroke"
            >
              {character.name}
            </text>
          </svg>
        </div>
      ))}
    </div>
  );
}

export default CharacterSelector;
