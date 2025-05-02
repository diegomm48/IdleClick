import {
    manualClick, buyAutoClicker, upgradeClickRate, megaClick, prestige,
    autoClick, upgradeGoldenClicks, upgradeSuperAutoClicker, upgradeDoubleIncome, prestigePoints
} from "./gameLogic";
import {
    updateUI, showPopup, updateUpgradeButtons,
    upgradeGoldenClicksBtn, upgradeSuperAutoClickerBtn, upgradeDoubleIncomeBtn, prestigeBtn
} from "./ui";

// Modal logic
const openUpgradeModalBtn = document.getElementById("openUpgradeModalBtn")!;
const upgradeModal = document.getElementById("upgradeModal")!;
const closeUpgradeModal = document.getElementById("closeUpgradeModal")!;

// DOM buttons
document.getElementById("clickBtn")!.addEventListener("click", () => {
    const gain = manualClick();
    showPopup(`+${gain.toFixed(1)}`);
    updateUI();
});

document.getElementById("buyAutoClickerBtn")!.addEventListener("click", () => {
    if (buyAutoClicker()) updateUI();
});

document.getElementById("upgradeRateBtn")!.addEventListener("click", () => {
    if (upgradeClickRate()) updateUI();
});

document.getElementById("megaClickBtn")!.addEventListener("click", () => {
    megaClick();
    showPopup("+50");
    updateUI();
});

prestigeBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to prestige? Your progress will be reset.")) {
        const result = prestige();
        if (result) showPopup(result);
        updateUI();
        updateUpgradeButtons();
    }
});

upgradeGoldenClicksBtn.addEventListener("click", () => {
    const result = upgradeGoldenClicks();
    if (result) {
        showPopup(result);
        updateUI();
        updateUpgradeButtons();
    }
});

upgradeSuperAutoClickerBtn.addEventListener("click", () => {
    const result = upgradeSuperAutoClicker();
    if (result) {
        showPopup(result);
        updateUI();
        updateUpgradeButtons();
    }
});

upgradeDoubleIncomeBtn.addEventListener("click", () => {
    const result = upgradeDoubleIncome();
    if (result) {
        showPopup(result);
        updateUI();
        updateUpgradeButtons();
    }
});

// Modal open/close
openUpgradeModalBtn.addEventListener("click", () => {
    upgradeModal.style.display = "block";
});
closeUpgradeModal.addEventListener("click", () => {
    upgradeModal.style.display = "none";
});
window.addEventListener("click", (e) => {
    if (e.target === upgradeModal) upgradeModal.style.display = "none";
});

// Auto click every second
setInterval(() => {
    autoClick();
    updateUI();
    if (document.getElementById("openUpgradeModalBtn") && prestigePoints > 0) {
        openUpgradeModalBtn.style.display = "block";
    }
}, 1000);

// Initial draw
updateUI();
updateUpgradeButtons();
