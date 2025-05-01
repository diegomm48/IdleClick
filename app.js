//  Game State Variables 
var score = 0;
var rate = 0;
var clicks = 1;
var autoClickers = 0;
var autoClickerCost = 10;
var rateUpgradeCost = 25;
var prestigePoints = 0;
var prestigeThreshold = 1000;
var prestigeMultiplier = 1;
var goldenClicksUnlocked = false;
var superAutoClickerUnlocked = false;
var doubleIncomeUnlocked = false;
var goldenClicksLevel = 0;
var superAutoClickerLevel = 0;
var doubleIncomeLevel = 0;
var goldenClicksCost = 100;
var superAutoClickerCost = 200;
var doubleIncomeCost = 500;
//  Modal Elements
var openUpgradeModalBtn = document.getElementById("openUpgradeModalBtn");
var upgradeModal = document.getElementById("upgradeModal");
var closeUpgradeModal = document.getElementById("closeUpgradeModal");
//  DOM Element References 
var prestigeBtn = document.getElementById("prestigeBtn");
var prestigePointsEl = document.getElementById("prestigePoints");
var scoreEl = document.getElementById("score");
var rateEl = document.getElementById("rate");
var clickBtn = document.getElementById("clickBtn");
var buyAutoClickerBtn = document.getElementById("buyAutoClickerBtn");
var upgradeRateBtn = document.getElementById("upgradeRateBtn");
var megaClickBtn = document.getElementById("megaClickBtn");
var popupContainer = document.getElementById("popupContainer");
var autoClickerCostEl = document.getElementById("autoClickerCost");
var rateUpgradeCostEl = document.getElementById("rateUpgradeCost");
var upgradeGoldenClicksBtn = document.getElementById("upgradeGoldenClicksBtn");
var upgradeSuperAutoClickerBtn = document.getElementById("upgradeSuperAutoClickerBtn");
var upgradeDoubleIncomeBtn = document.getElementById("upgradeDoubleIncomeBtn");
var prestigeThresholdEl = document.getElementById("prestigeThreshold");
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
function showPopup(text) {
    var popup = document.createElement("div");
    popup.className = "popup";
    popup.textContent = text;
    // Random x position near center, fixed y position
    var x = window.innerWidth / 2 + (Math.random() * 100 - 50);
    var y = window.innerHeight / 2;
    popup.style.left = "".concat(x, "px");
    popup.style.top = "".concat(y, "px");
    // Add and remove popup after 1 second
    popupContainer.appendChild(popup);
    setTimeout(function () { return popup.remove(); }, 1000);
}
//  Manual click handler 
clickBtn.addEventListener("click", function () {
    var gain = Math.round(clicks * prestigeMultiplier * 10) / 10;
    score += gain;
    showPopup("+".concat(gain.toFixed(1)));
    updateUI();
});
//  Passive auto-clicking every second 
setInterval(function () {
    score += rate * prestigeMultiplier;
    updateUI();
    if (prestigePoints > 0) {
        openUpgradeModalBtn.style.display = "block";
    }
}, 1000);
//  Buy auto clicker 
buyAutoClickerBtn.addEventListener("click", function () {
    if (score >= autoClickerCost) {
        score -= autoClickerCost;
        autoClickers += 1;
        rate += 1; // Each auto clicker adds 1 point/sec
        autoClickerCost = Math.floor(autoClickerCost * 1.5); // Increase cost
        updateUI();
    }
});
//  Upgrade manual click power 
upgradeRateBtn.addEventListener("click", function () {
    if (score >= rateUpgradeCost) {
        score -= rateUpgradeCost;
        clicks += 1; // Increase points per click
        rateUpgradeCost = Math.floor(rateUpgradeCost * 2); // Double the cost
        updateUI();
    }
});
//  Prestige: reset game with a permanent multiplier boost 
prestigeBtn.addEventListener("click", function () {
    if (score >= prestigeThreshold) {
        if (confirm("Are you sure you want to prestige? Your progress will be reset.")) {
            prestigePoints += 1;
            prestigeMultiplier = 1 + (Math.log(prestigePoints + 1) / Math.log(2)); // Base-2 logarithmic scaling
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
            showPopup("Prestige +1! Multiplier x".concat(prestigeMultiplier.toFixed(1)));
            updateUI();
        }
    }
});
//  Mega click: large instant score boost 
megaClickBtn.addEventListener("click", function () {
    score += 100000000;
    showPopup("+50");
    updateUI();
});
openUpgradeModalBtn.addEventListener("click", function () {
    upgradeModal.style.display = "block";
});
closeUpgradeModal.addEventListener("click", function () {
    upgradeModal.style.display = "none";
});
window.addEventListener("click", function (e) {
    if (e.target === upgradeModal) {
        upgradeModal.style.display = "none";
    }
});
function updateUpgradeButtons() {
    upgradeGoldenClicksBtn.textContent = "Golden Clicks (+5/click) - ".concat(goldenClicksCost, " pts");
    upgradeSuperAutoClickerBtn.textContent = "Super AutoClicker (+5 rate) - ".concat(superAutoClickerCost, " pts");
    upgradeDoubleIncomeBtn.textContent = "Double Income (x2) - ".concat(doubleIncomeCost, " pts");
}
upgradeGoldenClicksBtn.addEventListener("click", function () {
    if (score >= goldenClicksCost) {
        score -= goldenClicksCost;
        clicks += 5;
        goldenClicksLevel++;
        goldenClicksCost = Math.floor(goldenClicksCost * 1.8);
        showPopup("Golden Clicks Lv".concat(goldenClicksLevel));
        updateUpgradeButtons();
        updateUI();
    }
});
upgradeSuperAutoClickerBtn.addEventListener("click", function () {
    if (score >= superAutoClickerCost) {
        score -= superAutoClickerCost;
        rate += 5;
        superAutoClickerLevel++;
        superAutoClickerCost = Math.floor(superAutoClickerCost * 1.8);
        showPopup("Super Auto Lv".concat(superAutoClickerLevel));
        updateUpgradeButtons();
        updateUI();
    }
});
upgradeDoubleIncomeBtn.addEventListener("click", function () {
    if (score >= doubleIncomeCost) {
        score -= doubleIncomeCost;
        prestigeMultiplier *= 2;
        doubleIncomeLevel++;
        doubleIncomeCost = Math.floor(doubleIncomeCost * 2.5);
        showPopup(" Income x".concat(Math.pow(2, doubleIncomeLevel)));
        updateUpgradeButtons();
        updateUI();
    }
});
//  Initial UI update
updateUI();
updateUpgradeButtons();
