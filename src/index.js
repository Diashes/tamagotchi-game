import { Game } from "./game";
import { TICK_RATE } from "./constants";
import initButtons from "./buttons";

async function init() {
    const game = new Game();
    initButtons(game.handleUserAction);
    console.log("Starting game");
    let nextTimeToTick = Date.now();
    function nextAnimationFrame() {
        const now = Date.now();
        if (nextTimeToTick <= now) {
            game.tick();
            nextTimeToTick = now + TICK_RATE;
        }
        requestAnimationFrame(nextAnimationFrame);
    }
    requestAnimationFrame(nextAnimationFrame);
}

init();
