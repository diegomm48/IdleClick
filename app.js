var score = 0;
var rate = 0;
var clicks = 1;
var autoClickers = 0;
var autoClickerCost = 10;
var rateUpgradeCost = 25;
var prestigePoints = 0;
var prestigeThreshold = 1000;
var prestigeMultiplier = 1;
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
function updateUI() {
    scoreEl.textContent = score.toFixed(1).toString();
    rateEl.textContent = rate.toString();
    autoClickerCostEl.textContent = autoClickerCost.toString();
    rateUpgradeCostEl.textContent = rateUpgradeCost.toString();
    prestigePointsEl.textContent = prestigePoints.toString();
    prestigeBtn.toggleAttribute("disabled", score < prestigeThreshold);
}
function showPopup(text) {
    var popup = document.createElement("div");
    popup.className = "popup";
    popup.textContent = text;
    var x = window.innerWidth / 2 + (Math.random() * 100 - 50);
    var y = window.innerHeight / 2;
    popup.style.left = "".concat(x, "px");
    popup.style.top = "".concat(y, "px");
    popupContainer.appendChild(popup);
    setTimeout(function () { return popup.remove(); }, 1000);
}
clickBtn.addEventListener("click", function () {
    var gain = clicks * prestigeMultiplier;
    score += gain;
    showPopup("+".concat(gain));
    updateUI();
});
setInterval(function () {
    score += rate * prestigeMultiplier;
    updateUI();
}, 1000);
buyAutoClickerBtn.addEventListener("click", function () {
    if (score >= autoClickerCost) {
        score -= autoClickerCost;
        autoClickers += 1;
        rate += 1;
        autoClickerCost = Math.floor(autoClickerCost * 1.5);
        updateUI();
    }
});
upgradeRateBtn.addEventListener("click", function () {
    if (score >= rateUpgradeCost) {
        score -= rateUpgradeCost;
        clicks += 1;
        rateUpgradeCost = Math.floor(rateUpgradeCost * 2);
        updateUI();
    }
});
prestigeBtn.addEventListener("click", function () {
    if (score >= prestigeThreshold) {
        prestigePoints += 1;
        prestigeMultiplier = 1 + prestigePoints * 0.2;
        console.log(prestigeMultiplier);
        score = 0;
        rate = 0;
        autoClickers = 0;
        autoClickerCost = 10;
        rateUpgradeCost = 25;
        showPopup("\uD83D\uDC8E Prestige +1! Multiplier x".concat(prestigeMultiplier.toFixed(1)));
        updateUI();
    }
});
megaClickBtn.addEventListener("click", function () {
    score += 50;
    showPopup("+50 🔥");
    updateUI();
});
updateUI();
