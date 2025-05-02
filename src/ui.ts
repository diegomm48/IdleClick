import {
    score, rate, autoClickerCost, rateUpgradeCost, prestigePoints,
    prestigeThreshold, goldenClicksCost, superAutoClickerCost, doubleIncomeCost
} from "./gameLogic";

const scoreEl = document.getElementById("score")!;
const rateEl = document.getElementById("rate")!;
const autoClickerCostEl = document.getElementById("autoClickerCost")!;
const rateUpgradeCostEl = document.getElementById("rateUpgradeCost")!;
const prestigePointsEl = document.getElementById("prestigePoints")!;
const prestigeThresholdEl = document.getElementById("prestigeThreshold")!;
const popupContainer = document.getElementById("popupContainer")!;

export const upgradeGoldenClicksBtn = document.getElementById("upgradeGoldenClicksBtn")!;
export const upgradeSuperAutoClickerBtn = document.getElementById("upgradeSuperAutoClickerBtn")!;
export const upgradeDoubleIncomeBtn = document.getElementById("upgradeDoubleIncomeBtn")!;
export const prestigeBtn = document.getElementById("prestigeBtn")!;

export function updateUI(): void {
    const scoreEl = document.getElementById("score");
    const rateEl = document.getElementById("rate");
    const autoClickerCostEl = document.getElementById("autoClickerCost");
    const rateUpgradeCostEl = document.getElementById("rateUpgradeCost");
    const prestigePointsEl = document.getElementById("prestigePoints");
    const prestigeThresholdEl = document.getElementById("prestigeThreshold");
  
    if (scoreEl) scoreEl.textContent = score.toFixed(1);
    if (rateEl) rateEl.textContent = rate.toString();
    if (autoClickerCostEl) autoClickerCostEl.textContent = autoClickerCost.toString();
    if (rateUpgradeCostEl) rateUpgradeCostEl.textContent = rateUpgradeCost.toString();
    if (prestigePointsEl) prestigePointsEl.textContent = prestigePoints.toString();
    if (prestigeThresholdEl) prestigeThresholdEl.textContent = prestigeThreshold.toString();
  }

export function showPopup(text: string): void {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.textContent = text;
    popup.style.left = `${window.innerWidth / 2 + (Math.random() * 100 - 50)}px`;
    popup.style.top = `${window.innerHeight / 2}px`;
    popupContainer.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
}

export function updateUpgradeButtons(): void {
    upgradeGoldenClicksBtn.textContent = `Golden Clicks (+5/click) - ${goldenClicksCost} pts`;
    upgradeSuperAutoClickerBtn.textContent = `Super AutoClicker (+5 rate) - ${superAutoClickerCost} pts`;
    upgradeDoubleIncomeBtn.textContent = `Double Income (x2) - ${doubleIncomeCost} pts`;
}
