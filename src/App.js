import "./css/style.css";
import HeartHP from "./components/HeartHP";
import ConfirmationModal from "./components/ConfirmationModal";
import React, { useState, useEffect } from "react";
import CharacterSelector from "./components/CharacterSelector";
import TypeIcon from "./components/TypeIcon";
import AnimatedButton from "./components/AnimatedButton";
import Footer from "./components/Footer";
import characters from "./components/CharacterData";
import DeadCharacterOverlay from "./components/DeadCharacterOverlay";
import { useWakeLock } from "./components/ScreenAwake";

const App = () => {
  useWakeLock();
  const [selectedId, setSelectedId] = useState(() => {
    const savedId = localStorage.getItem("selectedId");
    return savedId && savedId !== "null" ? parseInt(savedId, 10) : null;
  });

  const selectedCharacter = characters.find((c) => c.id === selectedId);
  const [heroHPs, setHeroHPs] = useState([]);
  const [heroAnimations, setHeroAnimations] = useState([]);
  const [sidekickHPs, setSidekickHPs] = useState([]);
  const [sidekickAnimations, setSidekickAnimations] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (selectedId === null || !selectedCharacter) return;

    localStorage.setItem("selectedId", selectedId);

    const newHeroHPs = selectedCharacter.heroes.map((h, i) => {
      const stored = localStorage.getItem(`heroHP-${selectedId}-${i}`);
      return stored ? parseInt(stored, 10) : h.hp;
    });
    setHeroHPs(newHeroHPs);
    setHeroAnimations(newHeroHPs.map(() => ({ animate: false, type: null })));

    const newSidekickHPs = selectedCharacter.sidekicks.map((s, i) => {
      const stored = localStorage.getItem(`sidekickHP-${selectedId}-${i}`);
      return stored ? parseInt(stored, 10) : s.hp;
    });
    setSidekickHPs(newSidekickHPs);
    setSidekickAnimations(
      newSidekickHPs.map(() => ({ animate: false, type: null }))
    );
  }, [selectedId]);

  const updateHeroHP = (index, newHP) => {
    const prevHP = heroHPs[index];
    const clamped = Math.max(0, newHP);
    const updated = [...heroHPs];
    updated[index] = clamped;
    setHeroHPs(updated);
    localStorage.setItem(`heroHP-${selectedId}-${index}`, clamped);

    const isHealing = clamped > prevHP;
    const newAnimations = [...heroAnimations];
    newAnimations[index] = {
      animate: true,
      type: isHealing ? "healed" : "damaged",
    };
    setHeroAnimations(newAnimations);

    setTimeout(() => {
      newAnimations[index] = { animate: false, type: null };
      setHeroAnimations([...newAnimations]);
    }, 250);
  };

  const updateSidekickHP = (index, newHP) => {
    const prevHP = sidekickHPs[index];
    const clamped = Math.max(0, newHP);
    const updated = [...sidekickHPs];
    updated[index] = clamped;
    setSidekickHPs(updated);
    localStorage.setItem(`sidekickHP-${selectedId}-${index}`, clamped);

    const isHealing = clamped > prevHP;
    const newAnimations = [...sidekickAnimations];
    newAnimations[index] = {
      animate: true,
      type: isHealing ? "healed" : "damaged",
    };
    setSidekickAnimations(newAnimations);

    setTimeout(() => {
      newAnimations[index] = { animate: false, type: null };
      setSidekickAnimations([...newAnimations]);
    }, 250);
  };

  const resetGame = () => {
    if (!selectedCharacter) return;

    const newHeroHPs = selectedCharacter.heroes.map((h, i) => {
      localStorage.setItem(`heroHP-${selectedId}-${i}`, h.hp);
      return h.hp;
    });
    setHeroHPs(newHeroHPs);
    setHeroAnimations(newHeroHPs.map(() => ({ animate: false, type: null })));

    const newSidekickHPs = selectedCharacter.sidekicks.map((s, i) => {
      localStorage.setItem(`sidekickHP-${selectedId}-${i}`, s.hp);
      return s.hp;
    });
    setSidekickHPs(newSidekickHPs);
    setSidekickAnimations(
      newSidekickHPs.map(() => ({ animate: false, type: null }))
    );
  };

  // Function to swap Yennefer and Triss for character with id 4
  const swapYenTriss = () => {
    if (selectedCharacter.id !== 4) return;

    // Swap the characters
    const newHero = selectedCharacter.sidekicks[0];
    const newSidekick = selectedCharacter.heroes[0];

    selectedCharacter.heroes = [{ ...newHero, hp: 12 }];
    selectedCharacter.sidekicks = [{ ...newSidekick, hp: 6 }];

    // Reset animations
    setHeroAnimations([{ animate: false, type: null }]);
    setSidekickAnimations([{ animate: false, type: null }]);

    // Update localStorage with the fixed values
    localStorage.setItem(`heroHP-${selectedId}-0`, 12);
    localStorage.setItem(`sidekickHP-${selectedId}-0`, 6);
  };

  return (
    <div className="main-container">
      <div
        className={`character-selector-wrapper ${
          selectedId !== null ? "slide-out" : "slide-in"
        }`}
      >
        <CharacterSelector
          characters={characters}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      {selectedCharacter ? (
        <>
          <div className="character-header">
            <button
              className="back-button"
              onClick={() => {
                setSelectedId(null);
                localStorage.setItem("selectedId", "null");
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="icon-style">
                <polyline points="9 18 3 12 9 6" />
                <path d="M3 12h12a6 6 0 0 1 0 12" />
              </svg>
            </button>

            <div className="character-container">
              {selectedCharacter.heroes.map((hero, index) => (
                <div key={index}>
                  <div className="small-character-container">
                    <div className="x-position">
                      {heroHPs[index] === 0 && <DeadCharacterOverlay />}
                      <img
                        className="main-character-image"
                        src={hero.image}
                        alt={hero.name}
                        style={{
                          border: `4px solid ${hero.color}`,
                        }}
                      />
                    </div>
                    <p>
                      <svg width="160" height="40" viewBox="0 0 160 40">
                        <text x="50%" y="50%" className="name-text">
                          {hero.name}
                        </text>
                      </svg>
                    </p>
                  </div>
                  <TypeIcon type={hero.type} />
                  <div className="health-dial">
                    <AnimatedButton
                      className="hp-button"
                      onClick={() => updateHeroHP(index, heroHPs[index] - 1)}
                      disabled={heroHPs[index] <= 0}
                    >
                      <svg viewBox="0 0 24 24">
                        <text x="12" y="15">
                          −
                        </text>
                      </svg>
                    </AnimatedButton>
                    <HeartHP
                      hp={heroHPs[index]}
                      animate={heroAnimations[index]?.animate}
                      damageOrHeal={heroAnimations[index]?.type}
                      color={hero.color}
                    />
                    <AnimatedButton
                      className="hp-button"
                      onClick={() => updateHeroHP(index, heroHPs[index] + 1)}
                      disabled={heroHPs[index] === hero.hp}
                    >
                      <svg viewBox="0 0 24 24">
                        <text x="12" y="15">
                          +
                        </text>
                      </svg>
                    </AnimatedButton>
                  </div>
                </div>
              ))}
              {selectedCharacter.id === 4 && (
                <div>
                  <button
                    className="swap-button"
                    onClick={swapYenTriss}
                    title="Zamijeni Triss i Yennefer"
                  >
                    <svg className="icon-style">
                      <path d="M4 7h11M4 7l4-4M4 7l4 4M20 17H9m11 0l-4 4m4-4l-4-4" />
                    </svg>
                  </button>
                </div>
              )}
              {selectedCharacter.sidekicks.map((sidekick, index) => (
                <div key={index}>
                  <div className="small-character-container">
                    <div className="x-position">
                      {sidekickHPs[index] === 0 && <DeadCharacterOverlay />}
                      <img
                        className="sidekick-image"
                        src={sidekick.image}
                        alt={sidekick.name}
                        style={{
                          border: `4px solid ${sidekick.color}`,
                        }}
                      />
                    </div>
                    <p>
                      <svg width="160" height="40" viewBox="0 0 160 40">
                        <text x="50%" y="50%" className="name-text">
                          {sidekick.name}
                        </text>
                      </svg>
                    </p>
                  </div>
                  <TypeIcon type={sidekick.type} />
                  <div className="health-dial">
                    <AnimatedButton
                      className="hp-button"
                      onClick={() =>
                        updateSidekickHP(index, sidekickHPs[index] - 1)
                      }
                      disabled={sidekickHPs[index] <= 0}
                    >
                      <svg viewBox="0 0 24 24">
                        <text x="12" y="15">
                          −
                        </text>
                      </svg>
                    </AnimatedButton>
                    <HeartHP
                      hp={sidekickHPs[index]}
                      animate={sidekickAnimations[index]?.animate}
                      damageOrHeal={sidekickAnimations[index]?.type}
                      color={sidekick.color}
                    />
                    <AnimatedButton
                      className="hp-button"
                      onClick={() =>
                        updateSidekickHP(index, sidekickHPs[index] + 1)
                      }
                      disabled={sidekickHPs[index] === sidekick.hp}
                    >
                      <svg viewBox="0 0 24 24">
                        <text x="12" y="15">
                          +
                        </text>
                      </svg>
                    </AnimatedButton>
                  </div>
                </div>
              ))}
            </div>

            <button className="rpg-button" onClick={() => setShowModal(true)}>
              Završi igru
            </button>
          </div>
          {showModal && (
            <ConfirmationModal
              onConfirm={() => {
                resetGame();
                setShowModal(false);
              }}
              onCancel={() => setShowModal(false)}
            />
          )}
        </>
      ) : null}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
