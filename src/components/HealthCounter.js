import React, { useState, useEffect } from "react";

const HealthCounter = ({ character }) => {
  const [hp, setHp] = useState(character?.hp || 0);

  useEffect(() => {
    if (character) {
      setHp(character.hp);
    }
  }, [character]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>
        {character.name} - HP: {hp}
      </h2>
      <button onClick={() => setHp(hp + 1)}>Heal +1</button>
      <button onClick={() => setHp(hp - 1)} disabled={hp <= 0}>
        Damage -1
      </button>
    </div>
  );
};

export default HealthCounter;
