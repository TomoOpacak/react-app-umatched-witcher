import "./css/style.css";
import HeartHP from "./components/HeartHP";
import ConfirmationModal from "./components/ConfirmationModal";
import React, { useState, useEffect } from "react";
import CharacterSelector from "./components/CharacterSelector";
import TypeIcon from "./components/TypeIcon";
import AnimatedButton from "./components/AnimatedButton";
import Footer from "./components/Footer";
import characters from "./components/CharacterData";

const RedXOverlay = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 100 100"
    className="red-x-overlay" // attach the animation class
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 2,
      pointerEvents: "none",
    }}
  >
    <line x1="0" y1="0" x2="100" y2="100" stroke="red" strokeWidth="10" />
    <line x1="100" y1="0" x2="0" y2="100" stroke="red" strokeWidth="10" />
  </svg>
);

const App = () => {
  const [selectedId, setSelectedId] = useState(() => {
    const savedId = localStorage.getItem("selectedId");
    return savedId && savedId !== "null" ? parseInt(savedId, 10) : null;
  });
  const [showModal, setShowModal] = useState(false);
  const selectedCharacter = characters.find((c) => c.id === selectedId);
  const [heroHPs, setHeroHPs] = useState([]);
  const [heroAnimations, setHeroAnimations] = useState([]);
  const [sidekickHPs, setSidekickHPs] = useState([]);
  const [sidekickAnimations, setSidekickAnimations] = useState([]);

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
    }, 300);
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
    }, 300);
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
  const swapYenTriss = () => {
    if (selectedCharacter.id !== 4) return;

    // Swap the characters
    const newHero = selectedCharacter.sidekicks[0];
    const newSidekick = selectedCharacter.heroes[0];

    selectedCharacter.heroes = [{ ...newHero, hp: 12 }];
    selectedCharacter.sidekicks = [{ ...newSidekick, hp: 6 }];

    // Set new HPs explicitly
    setHeroHPs([12]);
    setSidekickHPs([6]);

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
          <AnimatedButton
            className="back-button"
            onClick={() => {
              setSelectedId(null);
              localStorage.setItem("selectedId", "null");
            }}
            style={{ marginTop: "20px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: "translateY(-1px)" }}
            >
              <polyline points="9 18 3 12 9 6" />
              <path d="M3 12h12a6 6 0 0 1 0 12" />
            </svg>
          </AnimatedButton>

          <div className="character-container">
            {selectedCharacter.heroes.map((hero, index) => (
              <div
                key={index}
                style={{ textAlign: "center", position: "relative" }}
              >
                <div className="small-character-container">
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    {heroHPs[index] === 0 && <RedXOverlay />}
                    <img
                      className="main-character-image"
                      src={hero.image}
                      alt={hero.name}
                      style={{
                        display: "block",
                        border: `4px solid ${hero.color}`,
                      }}
                    />
                  </div>
                  <p>
                    <svg width="160" height="40" viewBox="0 0 160 40">
                      <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="20"
                        fontWeight="bold"
                        fill="white"
                        stroke="black"
                        strokeWidth="3"
                        paintOrder="stroke"
                      >
                        {hero.name}
                      </text>
                    </svg>
                  </p>
                </div>
                <TypeIcon type={hero.type} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <AnimatedButton
                    className="hp-button"
                    onClick={() => updateHeroHP(index, heroHPs[index] - 1)}
                    disabled={heroHPs[index] <= 0}
                  >
                    <svg
                      className=""
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <text
                        x="12"
                        y="15"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="32"
                        fontWeight="bold"
                        fill="white"
                        stroke="black"
                        strokeWidth="3.0"
                        paintOrder="stroke"
                      >
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
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <text
                        x="12"
                        y="15"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="32"
                        fontWeight="bold"
                        fill="white"
                        stroke="black"
                        strokeWidth="3.0"
                        paintOrder="stroke"
                      >
                        +
                      </text>
                    </svg>
                  </AnimatedButton>
                </div>
              </div>
            ))}
            {selectedCharacter.id === 4 && (
              <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <AnimatedButton
                  className="swap-button"
                  onClick={swapYenTriss}
                  title="Zamijeni Triss i Yennefer"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 7h11M4 7l4-4M4 7l4 4M20 17H9m11 0l-4 4m4-4l-4-4" />
                  </svg>
                </AnimatedButton>
              </div>
            )}
            {selectedCharacter.sidekicks.map((sidekick, index) => (
              <div
                key={index}
                style={{ textAlign: "center", position: "relative" }}
              >
                <div className="small-character-container">
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    {sidekickHPs[index] === 0 && <RedXOverlay />}
                    <img
                      className="sidekick-image"
                      src={sidekick.image}
                      alt={sidekick.name}
                      style={{
                        display: "block",
                        border: `4px solid ${sidekick.color}`,
                      }}
                    />
                  </div>
                  <p>
                    <svg width="160" height="40" viewBox="0 0 160 40">
                      <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="20"
                        fontWeight="bold"
                        fill="white"
                        stroke="black"
                        strokeWidth="3"
                        paintOrder="stroke"
                      >
                        {sidekick.name}
                      </text>
                    </svg>
                  </p>
                </div>
                <TypeIcon type={sidekick.type} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <AnimatedButton
                    className="hp-button"
                    onClick={() =>
                      updateSidekickHP(index, sidekickHPs[index] - 1)
                    }
                    disabled={sidekickHPs[index] <= 0}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <text
                        x="12"
                        y="15"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="32"
                        fontWeight="bold"
                        fill="white"
                        stroke="black"
                        strokeWidth="3.0"
                        paintOrder="stroke"
                      >
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
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <text
                        x="12"
                        y="15"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="32"
                        fontWeight="bold"
                        fill="white"
                        stroke="black"
                        strokeWidth="3.0"
                        paintOrder="stroke"
                      >
                        +
                      </text>
                    </svg>
                  </AnimatedButton>
                </div>
              </div>
            ))}
          </div>

          <AnimatedButton
            className="rpg-button"
            onClick={() => setShowModal(true)}
            style={{ marginTop: "20px" }}
          >
            <svg width="160" height="40" viewBox="0 0 160 40">
              <text
                x="50%"
                y="55%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="20"
                fontWeight="bold"
                fill="white"
                stroke="black"
                strokeWidth="3"
                paintOrder="stroke"
              >
                Završi igru
              </text>
            </svg>
          </AnimatedButton>
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
      ) : (
        <p>
          <svg className="pick-hero" viewBox="0 0 160 40">
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="32"
              fontWeight="bold"
              fill="gold"
              stroke="black"
              strokeWidth="3"
              paintOrder="stroke"
            >
              Odaberi heroja i započni igru!
            </text>
          </svg>
        </p>
      )}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
