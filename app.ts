//  Game State Variables 
let score = 0;
let rate = 0;
let clicks = 1;
let autoClickers = 0;
let autoClickerCost = 10;
let rateUpgradeCost = 25;
let prestigePoints = 0;
let prestigeThreshold = 1000;
let prestigeMultiplier = 1;
let goldenClicksUnlocked = false;
let superAutoClickerUnlocked = false;
let doubleIncomeUnlocked = false;
let goldenClicksLevel = 0;
let superAutoClickerLevel = 0;
let doubleIncomeLevel = 0;

let goldenClicksCost = 100;
let superAutoClickerCost = 200;
let doubleIncomeCost = 500;

//  Modal Elements
const openUpgradeModalBtn = document.getElementById("openUpgradeModalBtn")!;
const upgradeModal = document.getElementById("upgradeModal")!;
const closeUpgradeModal = document.getElementById("closeUpgradeModal")!;

//  DOM Element References 
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
const upgradeGoldenClicksBtn = document.getElementById("upgradeGoldenClicksBtn")!;
const upgradeSuperAutoClickerBtn = document.getElementById("upgradeSuperAutoClickerBtn")!;
const upgradeDoubleIncomeBtn = document.getElementById("upgradeDoubleIncomeBtn")!;
const prestigeThresholdEl = document.getElementById("prestigeThreshold")!;




//  Update UI to match current game state 
function updateUI() {
    scoreEl.textContent = score.toFixed(1).toString();
    rateEl.textContent = rate.toString();
    prestigeThresholdEl.textContent = prestigeThreshold.toString();
    autoClickerCostEl.textContent = autoClickerCost.toString();
    rateUpgradeCostEl.textContent = rateUpgradeCost.toString();
    prestigePointsEl.textContent = prestigePoints.toString();

    // Enable prestige button only when threshold met
    prestigeBtn.toggleAttribute("disabled", score < prestigeThreshold);
}

//  Show temporary floating popup text 
function showPopup(text: string) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.textContent = text;

    // Random x position near center, fixed y position
    const x = window.innerWidth / 2 + (Math.random() * 100 - 50);
    const y = window.innerHeight / 2;
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;

    // Add and remove popup after 1 second
    popupContainer.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
}

//  Manual click handler 
clickBtn.addEventListener("click", () => {
    const gain = Math.round(clicks * prestigeMultiplier * 10) / 10;
    score += gain;

    showPopup(`+${gain.toFixed(1)}`);
    updateUI();
});

//  Passive auto-clicking every second 
setInterval(() => {
    score += rate * prestigeMultiplier;
    updateUI();
    if (prestigePoints > 0) {
        openUpgradeModalBtn.style.display = "block";
    }
}, 1000);

//  Buy auto clicker 
buyAutoClickerBtn.addEventListener("click", () => {
    if (score >= autoClickerCost) {
        score -= autoClickerCost;
        autoClickers += 1;
        rate += 1; // Each auto clicker adds 1 point/sec
        autoClickerCost = Math.floor(autoClickerCost * 1.5); // Increase cost
        updateUI();
    }
});

//  Upgrade manual click power 
upgradeRateBtn.addEventListener("click", () => {
    if (score >= rateUpgradeCost) {
        score -= rateUpgradeCost;
        clicks += 1; // Increase points per click
        rateUpgradeCost = Math.floor(rateUpgradeCost * 2); // Double the cost
        updateUI();
    }
});

//  Prestige: reset game with a permanent multiplier boost 
prestigeBtn.addEventListener("click", () => {
    if (score >= prestigeThreshold) {
        if (confirm("Are you sure you want to prestige? Your progress will be reset.")) {
            prestigePoints += 1;
            prestigeMultiplier = 1 + (Math.log(prestigePoints + 1) / Math.log(2));  // Base-2 logarithmic scaling

            // Reset game stats but preserve prestige points
            score = 0;
            rate = 0;
            autoClickers = 0;
            autoClickerCost = 10;
            rateUpgradeCost = 25;
            goldenClicksCost = 100;
            superAutoClickerCost = 200;
            doubleIncomeCost = 500;
            prestigeThreshold = prestigeThreshold * 2; // Increase threshold for next prestige

            showPopup(`Prestige +1! Multiplier x${prestigeMultiplier.toFixed(1)}`);
            updateUI();

        }
    }
});

//  Mega click: large instant score boost 
megaClickBtn.addEventListener("click", () => {
    score += 100000000;
    showPopup("+50");
    updateUI();

});

openUpgradeModalBtn.addEventListener("click", () => {
    upgradeModal.style.display = "block";
});

closeUpgradeModal.addEventListener("click", () => {
    upgradeModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === upgradeModal) {
        upgradeModal.style.display = "none";
    }
});

function updateUpgradeButtons() {
    upgradeGoldenClicksBtn.textContent = `Golden Clicks (+5/click) - ${goldenClicksCost} pts`;
    upgradeSuperAutoClickerBtn.textContent = `Super AutoClicker (+5 rate) - ${superAutoClickerCost} pts`;
    upgradeDoubleIncomeBtn.textContent = `Double Income (x2) - ${doubleIncomeCost} pts`;
}

upgradeGoldenClicksBtn.addEventListener("click", () => {
    if (score >= goldenClicksCost) {
        score -= goldenClicksCost;
        clicks += 5;
        goldenClicksLevel++;
        goldenClicksCost = Math.floor(goldenClicksCost * 1.8);
        showPopup(`Golden Clicks Lv${goldenClicksLevel}`);
        updateUpgradeButtons();
        updateUI();
    }
});

upgradeSuperAutoClickerBtn.addEventListener("click", () => {
    if (score >= superAutoClickerCost) {
        score -= superAutoClickerCost;
        rate += 5;
        superAutoClickerLevel++;
        superAutoClickerCost = Math.floor(superAutoClickerCost * 1.8);
        showPopup(`Super Auto Lv${superAutoClickerLevel}`);
        updateUpgradeButtons();
        updateUI();
    }
});

upgradeDoubleIncomeBtn.addEventListener("click", () => {
    if (score >= doubleIncomeCost) {
        score -= doubleIncomeCost;
        prestigeMultiplier *= 2;
        doubleIncomeLevel++;
        doubleIncomeCost = Math.floor(doubleIncomeCost * 2.5);
        showPopup(` Income x${Math.pow(2, doubleIncomeLevel)}`);
        updateUpgradeButtons();
        updateUI();
    }
});


//  Initial UI update
updateUI();
updateUpgradeButtons();
