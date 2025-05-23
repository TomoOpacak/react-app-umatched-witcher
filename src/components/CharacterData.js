import geralt from "../assets/images/geralt_hero.webp";
import jaskier from "../assets/images/jaskier_side.webp";
import ciri from "../assets/images/ciri_hero.webp";
import ihuarraquax from "../assets/images/ihuarraquax_side.webp";
import leshen from "../assets/images/leshen_hero.webp";
import djikstra from "../assets/images/djikstra_side.webp";
import philipa from "../assets/images/philipa_hero.webp";
import triss_yen from "../assets/images/triss_yen_hero.webp";
import yen from "../assets/images/yen.webp";
import triss from "../assets/images/triss.webp";
import eredin from "../assets/images/eredin_hero.webp";
import ladies from "../assets/images/ladies.webp";
import detlaff from "../assets/images/detlaff.webp";
import iorweth from "../assets/images/iorweth.webp";
import brewess from "../assets/images/brewess.webp";
import whispess from "../assets/images/whispess.webp";
import weawess from "../assets/images/weawess.webp";
import upcoming from "../assets/images/upcoming_hero.webp";

const characters = [
  {
    id: 1,
    name: "Geralt",
    image: geralt,
    heroes: [
      { name: "Geralt", type: "melee", image: geralt, hp: 16, color: "silver" },
    ],
    sidekicks: [
      {
        name: "Jaskier",
        type: "ranged",
        image: jaskier,
        hp: 5,
        color: "#800080",
      },
    ],
  },
  {
    id: 2,
    name: "Ciri",
    image: ciri,
    heroes: [
      { name: "Ciri", type: "melee", image: ciri, hp: 15, color: "#50a097" },
    ],
    sidekicks: [
      {
        name: "Ihuarraquax",
        type: "ranged",
        image: ihuarraquax,
        hp: 7,
        color: "#a2dfdf",
      },
    ],
  },
  {
    id: 3,
    name: "Leshen",
    image: leshen,
    heroes: [
      {
        name: "Leshen",
        type: "melee",
        image: leshen,
        hp: 13,
        color: "#45663b",
      },
    ],
    sidekicks: [],
  },
  {
    id: 4,
    name: "Yennefer & Triss",
    image: triss_yen,
    color: "#dc811a",
    heroes: [
      {
        name: "Yennefer",
        type: "ranged",
        image: yen,
        hp: 12,
        color: "#dc811a",
      },
    ],
    sidekicks: [
      {
        name: "Triss",
        type: "ranged",
        image: triss,
        hp: 6,
        color: "#dc811a",
      },
    ],
  },
  {
    id: 5,
    name: "Philippa",
    image: philipa,
    heroes: [
      {
        name: "Philippa",
        type: "ranged",
        image: philipa,
        hp: 12,
        color: "#b83f53",
      },
    ],
    sidekicks: [
      {
        name: "Dijkstra",
        type: "melee",
        image: djikstra,
        hp: 6,
        color: "#4040aa",
      },
    ],
  },
  {
    id: 6,
    name: "Eredin",
    type: "melee",
    image: eredin,
    hp: 14,
    color: "#454351",
    heroes: [
      {
        name: "Eredin",
        type: "melee",
        image: eredin,
        hp: 14,
        color: "#454351",
      },
    ],
    sidekicks: [],
  },
  {
    id: 7,
    name: "Dame Šume",
    image: ladies,
    heroes: [
      {
        name: "Whispess",
        type: "melee",
        image: whispess,
        hp: 6,
        color: "darkred",
      },
      {
        name: "Brewess",
        type: "melee",
        image: brewess,
        hp: 6,
        color: "darkred",
      },

      {
        name: "Weawess",
        type: "melee",
        image: weawess,
        hp: 6,
        color: "darkred",
      },
    ],
    sidekicks: [],
  },
  {
    id: 8,
    name: "Dettlaff",
    image: detlaff,
    heroes: [
      {
        name: "Detlaff",
        type: "melee",
        image: detlaff,
        hp: 13,
        color: "red",
      },
    ],
    sidekicks: [],
  },
  {
    id: 9,
    name: "Iorweth",
    image: iorweth,
    heroes: [
      {
        name: "Iorweth",
        type: "ranged",
        image: iorweth,
        hp: 13,
        color: "lightgreen",
      },
    ],
    sidekicks: [],
  },
];
export default characters;
