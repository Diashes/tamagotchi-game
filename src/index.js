import { Game } from "./game";
import { TICK_RATE, ICONS } from "./constants";

const main = new Main();
main.initButtons();
requestAnimationFrame(main.nextAnimationFrame);

function Main() {
    this.game = new Game();
    this.nextTimeToTick = Date.now();
    this.selectedIcon = 0;

    this.nextAnimationFrame = async () => {
        const now = Date.now();
        if (this.nextTimeToTick <= now) {
            this.game.tick();
            this.nextTimeToTick = now + TICK_RATE;
        }
        requestAnimationFrame(this.nextAnimationFrame);
    };

    this.toggleHighlighted = (icon, show) => {
        const className = `.${Object.values(ICONS)[icon]}-icon`;
        const iconEl = document.querySelector(className);
        iconEl.classList.toggle("highlighted", show);
    };

    this.initButtons = () => {
        document
            .querySelector(".buttons")
            .addEventListener("click", this.buttonClick);
    };

    this.buttonClick = (event) => {
        if (event.target.classList.contains("left-btn")) {
            this.toggleHighlighted(this.selectedIcon, false);
            this.selectedIcon =
                (2 + this.selectedIcon) % Object.keys(ICONS).length;
            this.toggleHighlighted(this.selectedIcon, true);
        } else if (event.target.classList.contains("right-btn")) {
            this.toggleHighlighted(this.selectedIcon, false);
            this.selectedIcon =
                (1 + this.selectedIcon) % Object.keys(ICONS).length;
            this.toggleHighlighted(this.selectedIcon, true);
        } else {
            this.game.handleUserAction(Object.values(ICONS)[this.selectedIcon]);
        }
    };
}
