import { ICONS } from "./constants";

function toggleHighlighted(icon, show) {
    console.log("icon", icon, `.${ICONS[icon]}-icon`);
    const iconEl = document.querySelector(`.${ICONS[icon]}-icon`);
    console.log(iconEl);
    iconEl.classList.toggle("highlighted", show);
}

export default function initButtons(handleUserAction) {
    let selectedIcon = 0;
    function buttonClick(event) {
        if (event.target.classList.contains("left-btn")) {
            toggleHighlighted(selectedIcon, false);
            selectedIcon = (2 + selectedIcon) % ICONS.length;
            toggleHighlighted(selectedIcon, true);
        } else if (event.target.classList.contains("right-btn")) {
            toggleHighlighted(selectedIcon, false);
            selectedIcon = (1 + selectedIcon) % ICONS.length;
            toggleHighlighted(selectedIcon, true);
        } else {
            handleUserAction(ICONS[selectedIcon]);
        }
    }
    document.querySelector(".buttons").addEventListener("click", buttonClick);
}
