import { modFox, modScene, togglePoopBag } from "./ui";
import {
    RAIN_CHANCE,
    SCENES,
    NIGHT_LENGTH,
    DAY_LENGTH,
    getNextHungerTime,
    getNextDieTime,
    STATES,
    getNextPoopTime,
    ICONS,
} from "./constants";

export function Game() {
    this.currentState = STATES.INIT;
    this.clock = 1;
    this.wakeTime = -1;
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = -1;
    this.poopTime = -1;

    this.tick = () => {
        this.clock++;
        if (this.clock === this.wakeTime) {
            this.wake();
        } else if (this.clock === this.sleepTime) {
            this.sleep();
        } else if (this.clock === this.hungryTime) {
            this.getHungry();
        } else if (this.clock === this.dieTime) {
            this.die();
        } else if (this.clock === this.timeToStartCelebrating) {
            this.startCelebrating();
        } else if (this.clock === this.timeToEndCelebrating) {
            this.endCelebrating();
        } else if (this.clock === this.poopTime) {
            this.poop();
        }
    };

    this.wake = () => {
        (this.currentState = STATES.IDLING), (this.wakeTime = -1);
        this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
        modScene(SCENES[this.scene]);
        this.determineFoxState();
        this.hungryTime = getNextHungerTime(this.clock);
        this.sleepTime = this.clock + DAY_LENGTH;
    };

    this.poop = () => {
        this.currentState = STATES.POOPING;
        this.poopTime = -1;
        this.dieTime = getNextDieTime(this.clock);
        modFox(STATES.POOPING);
    };

    this.startCelebrating = () => {
        this.currentState = STATES.CELEBRATING;
        modFox(STATES.CELEBRATING);
        this.timeToStartCelebrating = -1;
        this.timeToEndCelebrating = this.clock + 2;
    };

    this.endCelebrating = () => {
        this.timeToEndCelebrating = -1;
        this.currentState = STATES.IDLING;
        this.determineFoxState();
        togglePoopBag(false);
    };

    this.determineFoxState = () => {
        if (this.currentState === STATES.IDLING) {
            if (SCENES[this.scene] === STATES.RAIN) {
                modFox(STATES.RAIN);
            } else {
                modFox(STATES.IDLING);
            }
        }
    };

    this.startGame = () => {
        this.currentState = STATES.HATCHING;
        this.wakeTime = this.clock + 2;
        modFox(STATES.EGG);
        modScene(STATES.DAY);
    };

    this.changeWeather = () => {
        this.scene = (1 + this.scene) % SCENES.length;
        modScene(SCENES[this.scene]);
        this.determineFoxState();
    };

    this.cleanUpPoop = () => {
        if (this.currentState === STATES.POOPING) {
            this.dieTime = -1;
            togglePoopBag(true);
            this.startCelebrating();
            this.hungryTime = getNextHungerTime(this.clock);
        }
    };

    this.feed = () => {
        if (this.currentState === STATES.HUNGRY) {
            this.currentState = STATES.FEEDING;
            this.dieTime = -1;
            this.poopTime = getNextPoopTime(this.clock);
            modFox(STATES.EATING);
            this.timeToStartCelebrating = this.clock + 2;
        }
    };

    this.getHungry = () => {
        this.currentState = STATES.HUNGRY;
        this.dieTime = getNextDieTime(this.clock);
        this.hungryTime = -1;
        modFox(STATES.HUNGRY);
    };

    this.die = () => {
        this.currentState = STATES.DEAD;
        modScene(STATES.DEAD);
        modFox(STATES.DEAD);
        this.clearTimes();
    };

    this.handleUserAction = (icon) => {
        const blockingStates = [
            STATES.SLEEP,
            STATES.FEEDING,
            STATES.CELEBRATING,
            STATES.HATCHING,
        ];
        if (blockingStates.includes(this.currentState)) {
            return;
        }
        if (this.currentState === STATES.INIT) {
            this.startGame();
            return;
        }
        if (this.currentState === STATES.DEAD) {
            this.startGame();
            return;
        }
        if (icon === ICONS.WEATHER) {
            this.changeWeather();
            return;
        }
        if (icon === ICONS.POOP) {
            this.cleanUpPoop();
            return;
        }
        if (icon === ICONS.FISH) {
            this.feed();
            return;
        }
    };

    this.sleep = () => {
        this.currentState = STATES.SLEEP;
        modFox(STATES.SLEEP);
        modScene(STATES.NIGHT);
        this.clearTimes();
        this.wakeTime = this.clock + NIGHT_LENGTH;
    };

    this.clearTimes = () => {
        this.wakeTime = -1;
        this.sleepTime = -1;
        this.hungryTime = -1;
        this.dieTime = -1;
        this.poopTime = -1;
        this.timeToStartCelebrating = -1;
        this.timeToEndCelebrating = -1;
    };
}
