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
import alisa from "../assets/images/alice_hero.webp";
import jabberwock from "../assets/images/jabberwock_side.webp";
import littlered from "../assets/images/little_red_hero.webp";
import hunter from "../assets/images/hunter_side.webp";
import upcoming from "../assets/images/upcoming_hero.webp";
import robin from "../assets/images/robin_hero.webp";
import achiles from "../assets/images/achiles_hero.webp";
import medusa from "../assets/images/medusa_hero.webp";
import arthur from "../assets/images/arthur_hero.webp";
import sherlock from "../assets/images/sherlock_hero.webp";
import dracula from "../assets/images/dracula_hero.webp";

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
        type: "melee",
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
        type: "ranged",
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
    image: eredin,
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
    name: "Alisa",
    image: alisa,
    heroes: [
      {
        name: "Alisa",
        type: "melee",
        image: alisa,
        hp: 13,
        color: "pink",
      },
    ],
    sidekicks: [
      {
        name: "Jabberwock",
        type: "melee",
        image: jabberwock,
        hp: 8,
        color: "black",
      },
    ],
  },
  {
    id: 8,
    name: "Crvenkapica",
    image: littlered,
    heroes: [
      {
        name: "Crvenkapica",
        type: "melee",
        image: littlered,
        hp: 14,
        color: "#ad0808ff",
      },
    ],
    sidekicks: [
      {
        name: "Lovac",
        type: "ranged",
        image: hunter,
        hp: 9,
        color: "silver",
      },
    ],
  },
  {
    id: 9,
    name: "Robin Hood",
    image: robin,
    heroes: [
      {
        name: "Robin Hood",
        type: "ranged",
        image: robin,
        hp: 13,
        color: "green",
      },
    ],
    sidekicks: [],
  },
  {
    id: 10,
    name: "Ahilej",
    image: achiles,
    heroes: [
      {
        name: "Ahilej",
        type: "melee",
        image: achiles,
        hp: 18,
        color: "#faf06aff",
      },
    ],
    sidekicks: [
      {
        name: "Patroklo",
        type: "melee",
        image: upcoming,
        hp: 6,
        color: "#b08d57",
      },
    ],
  },
  {
    id: 11,
    name: "Meduza",
    image: medusa,
    heroes: [
      {
        name: "Dolazi Uskoro",
        type: "ranged",
        image: medusa,
        hp: 16,
        color: "#57b072ff",
      },
    ],
    sidekicks: [],
  },
  {
    id: 12,
    name: "Kralj Arhtur",
    image: arthur,
    heroes: [
      {
        name: "Kralj Arhtur",
        type: "melee",
        image: arthur,
        hp: 18,
        color: "#b05757ff",
      },
    ],
    sidekicks: [
      {
        name: "Merlin",
        type: "ranged",
        image: upcoming,
        hp: 7,
        color: "#b05757ff",
      },
    ],
  },
  {
    id: 13,
    name: "Sherlock Holmes",
    image: sherlock,
    heroes: [
      {
        name: "Sherlock Holmes",
        type: "melee",
        image: sherlock,
        hp: 16,
        color: "#b8a852ff",
      },
    ],
    sidekicks: [
      {
        name: "Dr. Watson",
        type: "ranged",
        image: upcoming,
        hp: 8,
        color: "grey",
      },
    ],
  },
  {
    id: 14,
    name: "Dracula",
    image: dracula,
    heroes: [
      {
        name: "Dracula",
        type: "melee",
        image: dracula,
        hp: 13,
        color: "black",
      },
    ],
    sidekicks: [],
  },
  {
    id: 15,
    name: "Dolazi Uskoro",
    image: upcoming,
    heroes: [
      {
        name: "Dolazi Uskoro",
        type: "melee",
        image: upcoming,
        hp: 100,
        color: "grey",
      },
    ],
    sidekicks: [
      {
        name: "Dolazi Uskoro",
        type: "melee",
        image: upcoming,
        hp: 100,
        color: "grey",
      },
    ],
  },
];
export default characters;
