export const ICONS = ["fish", "poop", "weather"];
export const TICK_RATE = 3000;
export const SCENES = ["day", "rain"];
export const RAIN_CHANCE = 0.2;
export const DAY_LENGTH = 20;
export const NIGHT_LENGTH = 3;
export const getNextHungerTime = (clock) =>
    Math.floor(Math.random() * 3) + 5 + clock;
export const getNextDieTime = (clock) =>
    Math.floor(Math.random() * 2) + 3 + clock;
export const getNextPoopTime = (clock) =>
    Math.floor(Math.random() * 3) + 4 + clock;
export const STATES = {
    HUNGRY: "hungry",
    FEEDING: "feeding",
    IDLING: "idling",
    HATCHING: "hatching",
    SLEEP: "sleep",
    INIT: "init",
    CELEBRATING: "celebrating",
    DEAD: "dead",
    POOPING: "pooping",
};
