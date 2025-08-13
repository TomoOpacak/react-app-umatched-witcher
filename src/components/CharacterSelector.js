import React from "react";
import UnmatchedLogo from "./UnmatcheLogo";

function CharacterSelector({ characters, selectedId, onSelect }) {
  return (
    <div className="character-selector-container">
      <UnmatchedLogo />
      <p>
        <svg className="character-selector-title" viewBox="0 0 400 50">
          <text x="50%" y="50%">
            Brojčanici zdravlja
          </text>
        </svg>
      </p>
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
            <svg className="character-name" viewBox="0 0 100 40">
              <text x="50" y="20">
                {character.name}
              </text>
            </svg>
          </div>
        ))}
      </div>
      <p>
        <svg className="pick-hero" viewBox="0 0 500 100">
          <text x="50%" y="50%">
            Odaberi heroja i započni igru!
          </text>
        </svg>
      </p>
    </div>
  );
}

export default CharacterSelector;
