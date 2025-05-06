import "./css/style.css";
import HeartHP from "./components/HeartHP";
import ConfirmationModal from "./components/ConfirmationModal";
import React, { useState, useEffect } from "react";
import CharacterSelector from "./components/CharacterSelector";
import geralt from "./assets/images/geralt_hero.webp";
import jaskier from "./assets/images/jaskier_side.webp";
import ciri from "./assets/images/ciri_hero.webp";
import ihuarraquax from "./assets/images/ihuarraquax_side.webp";
import leshen from "./assets/images/leshen_hero.webp";
import djikstra from "./assets/images/djikstra_side.webp";
import philipa from "./assets/images/philipa_hero.webp";
import triss_yen from "./assets/images/triss_yen_hero.webp";
import yen from "./assets/images/yen.webp";
import triss from "./assets/images/triss.webp";
import eredin from "./assets/images/eredin_hero.webp";
import TypeIcon from "./components/TypeIcon";
import AnimatedButton from "./components/AnimatedButton";

import Footer from "./components/Footer";

const characters = [
  {
    id: 1,
    name: "Geralt",
    type: "melee",
    image: geralt,
    hp: 16,
    color: "grey",
    sidekicks: [
      {
        name: "Jaskier",
        type: "ranged",
        image: jaskier,
        hp: 5,
        color: "purple",
      },
    ],
  },
  {
    id: 2,
    name: "Ciri",
    type: "melee",
    image: ciri,
    hp: 15,
    color: "turquoise",
    sidekicks: [
      {
        name: "Ihuarraquax",
        type: "ranged",
        image: ihuarraquax,
        hp: 7,
        color: "lightblue",
      },
    ],
  },
  {
    id: 3,
    name: "Leshen",
    type: "melee",
    image: leshen,
    hp: 13,
    color: "darkgreen",
    sidekicks: [],
  },
  {
    id: 4,
    name: "Yennefer & Triss",
    type: "ranged",
    image: triss_yen,
    hp: 14,
    color: "crimson",
    sidekicks: [
      {
        name: "Triss",
        type: "ranged",
        image: triss,
        hp: 6,
        color: "pink",
      },
    ],
  },
  {
    id: 5,
    name: "Philippa",
    type: "ranged",
    image: philipa,
    hp: 12,
    color: "orange",
    sidekicks: [
      {
        name: "Dijkstra",
        type: "melee",
        image: djikstra,
        hp: 6,
        color: "beige",
      },
    ],
  },
  {
    id: 6,
    name: "Eredin",
    type: "melee",
    image: eredin,
    hp: 14,
    color: "darkred",
    sidekicks: [],
  },
];

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
  const [mainHP, setMainHP] = useState(0);
  const [sidekickHPs, setSidekickHPs] = useState([]);
  const [mainAnimation, setMainAnimation] = useState({
    animate: false,
    type: null,
  });
  const [sidekickAnimations, setSidekickAnimations] = useState([]);
  const [isYenMain, setIsYenMain] = useState(true);

  useEffect(() => {
    if (selectedId === null || !selectedCharacter) return;

    localStorage.setItem("selectedId", selectedId);

    if (selectedCharacter.name === "Yennefer & Triss") {
      const saved = localStorage.getItem("yenMain") === "false" ? false : true;
      setIsYenMain(saved);
    }

    const storedMainHP = localStorage.getItem(`mainHP-${selectedId}`);
    const main = storedMainHP
      ? parseInt(storedMainHP, 10)
      : selectedCharacter.hp;
    setMainHP(main);

    const newSidekickHPs = selectedCharacter.sidekicks.map((s, i) => {
      const stored = localStorage.getItem(`sidekickHP-${selectedId}-${i}`);
      return stored ? parseInt(stored, 10) : s.hp;
    });

    setSidekickHPs(newSidekickHPs);
    setSidekickAnimations(
      newSidekickHPs.map(() => ({ animate: false, type: null }))
    );
  }, [selectedId]);

  const updateMainHP = (newHP) => {
    const prevHP = mainHP;
    const clamped = Math.max(0, newHP);
    setMainHP(clamped);
    localStorage.setItem(`mainHP-${selectedId}`, clamped);

    const isHealing = clamped > prevHP;
    setMainAnimation({ animate: true, type: isHealing ? "healed" : "damaged" });

    setTimeout(() => {
      setMainAnimation({ animate: false, type: null });
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

    setMainHP(selectedCharacter.hp);
    localStorage.setItem(`mainHP-${selectedId}`, selectedCharacter.hp);

    const newSidekickHPs = selectedCharacter.sidekicks.map((s, i) => {
      localStorage.setItem(`sidekickHP-${selectedId}-${i}`, s.hp);
      return s.hp;
    });

    setSidekickHPs(newSidekickHPs);
    setSidekickAnimations(
      newSidekickHPs.map(() => ({ animate: false, type: null }))
    );
  };
  const handleSwapYenTriss = () => {
    setIsYenMain((prev) => {
      localStorage.setItem("yenMain", !prev);
      return !prev;
    });
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

      {selectedCharacter && (
        <AnimatedButton
          className="rpg-button"
          onClick={() => {
            setSelectedId(null);
            localStorage.setItem("selectedId", "null");
          }}
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
              Ponovi odabir
            </text>
          </svg>
        </AnimatedButton>
      )}

      {selectedCharacter ? (
        <>
          <div className="character-container">
            <div style={{ textAlign: "center", position: "relative" }}>
              <div className="small-character-container">
                <div style={{ position: "relative", display: "inline-block" }}>
                  {mainHP === 0 && <RedXOverlay />}
                  <img
                    className="main-character-image"
                    src={
                      selectedCharacter.id === 4
                        ? isYenMain
                          ? yen
                          : triss
                        : selectedCharacter.image
                    }
                    alt={
                      selectedCharacter.id === 4
                        ? isYenMain
                          ? "Yennefer"
                          : "Triss"
                        : selectedCharacter.name
                    }
                    style={{
                      display: "block",
                      border: `4px solid ${selectedCharacter.color}`,
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
                      {selectedCharacter.id === 4
                        ? isYenMain
                          ? "Yennefer"
                          : "Triss"
                        : selectedCharacter.name}
                    </text>
                  </svg>
                </p>
              </div>

              <div>
                <TypeIcon type={selectedCharacter.type} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <AnimatedButton
                  className="hp-button"
                  onClick={() => updateMainHP(mainHP - 1)}
                  disabled={mainHP <= 0}
                >
                  <svg className="" width="24" height="24" viewBox="0 0 24 24">
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
                  hp={mainHP}
                  animate={mainAnimation.animate}
                  damageOrHeal={mainAnimation.type}
                />
                <AnimatedButton
                  className="hp-button"
                  onClick={() => updateMainHP(mainHP + 1)}
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
            {selectedCharacter.id === 4 && (
              <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <AnimatedButton
                  className="swap-button"
                  onClick={handleSwapYenTriss}
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
                      src={
                        selectedCharacter.id === 4
                          ? isYenMain
                            ? triss
                            : yen
                          : sidekick.image
                      }
                      alt={
                        selectedCharacter.id === 4
                          ? isYenMain
                            ? "Triss"
                            : "Yennefer"
                          : sidekick.name
                      }
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
                        {selectedCharacter.id === 4
                          ? isYenMain
                            ? "Triss"
                            : "Yennefer"
                          : sidekick.name}
                      </text>
                    </svg>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <TypeIcon type={sidekick.type} />
                </div>
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
