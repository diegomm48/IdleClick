// Game state
export let score = 0;
export let rate = 0;
export let clicks = 1;
export let autoClickers = 0;
export let autoClickerCost = 10;
export let rateUpgradeCost = 25;
export let prestigePoints = 0;
export let prestigeThreshold = 1000;
export let prestigeMultiplier = 1;

export let goldenClicksLevel = 0;
export let superAutoClickerLevel = 0;
export let doubleIncomeLevel = 0;

export let goldenClicksCost = 100;
export let superAutoClickerCost = 200;
export let doubleIncomeCost = 500;

// Game actions
export function manualClick(): number {
    const gain = Math.round(clicks * prestigeMultiplier * 10) / 10;
    score += gain;
    return gain;
}

export function autoClick(): void {
    score += rate * prestigeMultiplier;
}

export function buyAutoClicker(): boolean {
    if (score >= autoClickerCost) {
        score -= autoClickerCost;
        autoClickers++;
        rate += 1;
        autoClickerCost = Math.floor(autoClickerCost * 1.5);
        return true;
    }
    return false;
}

export function upgradeClickRate(): boolean {
    if (score >= rateUpgradeCost) {
        score -= rateUpgradeCost;
        clicks += 1;
        rateUpgradeCost = Math.floor(rateUpgradeCost * 2);
        return true;
    }
    return false;
}

export function megaClick(): void {
    score += 100000000;
}

export function canPrestige(): boolean {
    return score >= prestigeThreshold;
}

export function prestige(): string | null {
    if (!canPrestige()) return null;

    prestigePoints++;
    prestigeMultiplier = 1 + (Math.log(prestigePoints + 1) / Math.log(2));
    score = 0;
    rate = 0;
    autoClickers = 0;
    autoClickerCost = 10;
    rateUpgradeCost = 25;
    goldenClicksCost = 100;
    superAutoClickerCost = 200;
    doubleIncomeCost = 500;
    prestigeThreshold *= 2;

    return `Prestige +1! Multiplier x${prestigeMultiplier.toFixed(1)}`;
}

// Upgrades
export function upgradeGoldenClicks(): string | null {
    if (score < goldenClicksCost) return null;
    score -= goldenClicksCost;
    clicks += 5;
    goldenClicksLevel++;
    goldenClicksCost = Math.floor(goldenClicksCost * 1.8);
    return `Golden Clicks Lv${goldenClicksLevel}`;
}

export function upgradeSuperAutoClicker(): string | null {
    if (score < superAutoClickerCost) return null;
    score -= superAutoClickerCost;
    rate += 5;
    superAutoClickerLevel++;
    superAutoClickerCost = Math.floor(superAutoClickerCost * 1.8);
    return `Super Auto Lv${superAutoClickerLevel}`;
}

export function upgradeDoubleIncome(): string | null {
    if (score < doubleIncomeCost) return null;
    score -= doubleIncomeCost;
    prestigeMultiplier *= 2;
    doubleIncomeLevel++;
    doubleIncomeCost = Math.floor(doubleIncomeCost * 2.5);
    return `Income x${Math.pow(2, doubleIncomeLevel)}`;
}

// Extra functions for testing purposes
export function getGameState() {
    return {
        score,
        rate,
        clicks,
        autoClickers,
        autoClickerCost,
        rateUpgradeCost,
        prestigePoints,
        prestigeThreshold,
        prestigeMultiplier,
        goldenClicksLevel,
        superAutoClickerLevel,
        doubleIncomeLevel,
        goldenClicksCost,
        superAutoClickerCost,
        doubleIncomeCost
    };
}

export function resetGameState() {
    score = 0;
    rate = 0;
    clicks = 1;
    autoClickers = 0;
    autoClickerCost = 10;
    rateUpgradeCost = 25;
    prestigePoints = 0;
    prestigeThreshold = 1000;
    prestigeMultiplier = 1;
    goldenClicksLevel = 0;
    superAutoClickerLevel = 0;
    doubleIncomeLevel = 0;
    goldenClicksCost = 100;
    superAutoClickerCost = 200;
    doubleIncomeCost = 500;
}

// For testing only
export function setGameState(overrides: Partial<ReturnType<typeof getGameState>>) {
    if (overrides.score !== undefined) score = overrides.score;
    if (overrides.rate !== undefined) rate = overrides.rate;
    if (overrides.clicks !== undefined) clicks = overrides.clicks;
    if (overrides.autoClickers !== undefined) autoClickers = overrides.autoClickers;
    if (overrides.autoClickerCost !== undefined) autoClickerCost = overrides.autoClickerCost;
    if (overrides.rateUpgradeCost !== undefined) rateUpgradeCost = overrides.rateUpgradeCost;
    if (overrides.prestigePoints !== undefined) prestigePoints = overrides.prestigePoints;
    if (overrides.prestigeThreshold !== undefined) prestigeThreshold = overrides.prestigeThreshold;
    if (overrides.prestigeMultiplier !== undefined) prestigeMultiplier = overrides.prestigeMultiplier;
    if (overrides.goldenClicksLevel !== undefined) goldenClicksLevel = overrides.goldenClicksLevel;
    if (overrides.superAutoClickerLevel !== undefined) superAutoClickerLevel = overrides.superAutoClickerLevel;
    if (overrides.doubleIncomeLevel !== undefined) doubleIncomeLevel = overrides.doubleIncomeLevel;
    if (overrides.goldenClicksCost !== undefined) goldenClicksCost = overrides.goldenClicksCost;
    if (overrides.superAutoClickerCost !== undefined) superAutoClickerCost = overrides.superAutoClickerCost;
    if (overrides.doubleIncomeCost !== undefined) doubleIncomeCost = overrides.doubleIncomeCost;
}
