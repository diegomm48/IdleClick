let score = 0;
let rate = 0;
let clicks = 1;
let autoClickers = 0;
let autoClickerCost = 10;
let rateUpgradeCost = 25;
let prestigePoints = 0;
let prestigeThreshold = 1000;
let prestigeMultiplier = 1;

const prestigeBtn = document.getElementById("prestigeBtn")!;
const prestigePointsEl = document.getElementById("prestigePoints")!;


const scoreEl = document.getElementById("score")!;
const rateEl = document.getElementById("rate")!;
const clickBtn = document.getElementById("clickBtn")!;
const buyAutoClickerBtn = document.getElementById("buyAutoClickerBtn")!;
const upgradeRateBtn = document.getElementById("upgradeRateBtn")!;
const megaClickBtn = document.getElementById("megaClickBtn")!;
const popupContainer = document.getElementById("popupContainer")!;
const autoClickerCostEl = document.getElementById("autoClickerCost")!;
const rateUpgradeCostEl = document.getElementById("rateUpgradeCost")!;

function updateUI() {
    scoreEl.textContent = score.toFixed(1).toString();
    rateEl.textContent = rate.toString();
    autoClickerCostEl.textContent = autoClickerCost.toString();
    rateUpgradeCostEl.textContent = rateUpgradeCost.toString();
    prestigePointsEl.textContent = prestigePoints.toString();
    prestigeBtn.toggleAttribute("disabled", score < prestigeThreshold);
}


function showPopup(text: string) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.textContent = text;

    const x = window.innerWidth / 2 + (Math.random() * 100 - 50);
    const y = window.innerHeight / 2;
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;

    popupContainer.appendChild(popup);

    setTimeout(() => popup.remove(), 1000);
}
clickBtn.addEventListener("click", () => {
    const gain = clicks * prestigeMultiplier;
    score += gain;
    showPopup(`+${gain}`);
    updateUI();
});
setInterval(() => {
    score += rate * prestigeMultiplier;

    updateUI();
}, 1000);


buyAutoClickerBtn.addEventListener("click", () => {
    if (score >= autoClickerCost) {
        score -= autoClickerCost;
        autoClickers += 1;
        rate += 1;
        autoClickerCost = Math.floor(autoClickerCost * 1.5);
        updateUI();
    }
});

upgradeRateBtn.addEventListener("click", () => {
    if (score >= rateUpgradeCost) {
        score -= rateUpgradeCost;
        clicks += 1;
        rateUpgradeCost = Math.floor(rateUpgradeCost * 2);
        updateUI();
    }
});
prestigeBtn.addEventListener("click", () => {
    if (score >= prestigeThreshold) {
        prestigePoints += 1;
        prestigeMultiplier = 1 + prestigePoints * 0.2;

        score = 0;
        rate = 0;
        autoClickers = 0;
        autoClickerCost = 10;
        rateUpgradeCost = 25;

        showPopup(`💎 Prestige +1! Multiplier x${prestigeMultiplier.toFixed(1)}`);
        updateUI();
    }
});

megaClickBtn.addEventListener("click", () => {
    score += 50;
    showPopup("+50 🔥");
    updateUI();
});


updateUI();
