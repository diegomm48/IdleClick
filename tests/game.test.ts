/**
 * @jest-environment jsdom
 * 
 * Note: Used ChatGPT and Google to figure out how to test TypeScript code
 */

import {
  manualClick,
  buyAutoClicker,
  upgradeClickRate,
  prestige,
  megaClick,
  upgradeGoldenClicks,
  upgradeSuperAutoClicker,
  upgradeDoubleIncome,
  resetGameState,
  getGameState,
  setGameState
} from "../src/gameLogic";

import { updateUI } from "../src/ui";

describe("Game Logic", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="score">0</div>
      <div id="rate">0</div>
      <div id="autoClickerCost">0</div>
      <div id="rateUpgradeCost">0</div>
      <div id="prestigePoints">0</div>
      <div id="prestigeThreshold">0</div>
      <div id="popupContainer"></div>
    `;

    resetGameState();
    updateUI();
  });

  test("initial game state is correct", () => {
    const state = getGameState();
    expect(state.score).toBe(0);
    expect(state.clicks).toBe(1);
    expect(state.rate).toBe(0);
    expect(state.autoClickerCost).toBe(10);
    expect(state.prestigeMultiplier).toBe(1);
  });

  test("clicking increases score by clicks * prestigeMultiplier", () => {
    const state = getGameState();
    setGameState({ ...state, clicks: 2, prestigeMultiplier: 1.5 });

    manualClick();

    const updated = getGameState();
    const expectedGain = 2 * 1.5;
    expect(updated.score).toBeCloseTo(expectedGain, 1);
  });

  test("buying an autoClicker increases rate and cost", () => {
    const state = getGameState();
    setGameState({ ...state, score: 100 });

    buyAutoClicker();

    const updated = getGameState();
    expect(updated.score).toBe(90);
    expect(updated.autoClickers).toBe(1);
    expect(updated.rate).toBe(1);
    expect(updated.autoClickerCost).toBe(15);
  });

  test("upgrading rate increases clicks and doubles the cost", () => {
    const state = getGameState();
    setGameState({ ...state, score: 50 });

    upgradeClickRate();

    const updated = getGameState();
    expect(updated.score).toBe(25);
    expect(updated.clicks).toBe(2);
    expect(updated.rateUpgradeCost).toBe(50);
  });

  test("prestiging resets game state and increases prestige points and multiplier", () => {
    const state = getGameState();
    setGameState({ ...state, score: 1000, prestigeThreshold: 1000 });

    jest.spyOn(window, "confirm").mockReturnValue(true);

    prestige();

    const updated = getGameState();
    expect(updated.prestigePoints).toBe(1);
    expect(updated.score).toBe(0);
    expect(updated.prestigeMultiplier).toBeCloseTo(2);
  });

  test("mega click gives 100,000,000 points", () => {
    megaClick();
    const updated = getGameState();
    expect(updated.score).toBe(100000000);
  });

  test("golden clicks upgrade increases clicks by 5 and cost scales", () => {
    const state = getGameState();
    setGameState({ ...state, score: 200 });

    upgradeGoldenClicks();

    const updated = getGameState();
    expect(updated.score).toBe(100);
    expect(updated.clicks).toBe(6);
    expect(updated.goldenClicksCost).toBe(Math.floor(100 * 1.8));
  });

  test("super auto clicker increases rate by 5 and scales cost", () => {
    const state = getGameState();
    setGameState({ ...state, score: 500 });

    upgradeSuperAutoClicker();

    const updated = getGameState();
    expect(updated.score).toBe(300);
    expect(updated.rate).toBe(5);
    expect(updated.superAutoClickerCost).toBe(Math.floor(200 * 1.8));
  });

  test("double income doubles the prestige multiplier and cost increases", () => {
    const state = getGameState();
    setGameState({ ...state, score: 1000, prestigeMultiplier: 2 });

    upgradeDoubleIncome();

    const updated = getGameState();
    expect(updated.score).toBe(500);
    expect(updated.prestigeMultiplier).toBe(4);
    expect(updated.doubleIncomeLevel).toBe(1);
    expect(updated.doubleIncomeCost).toBe(Math.floor(500 * 2.5));
  });

  test("UI updates correctly", () => {
    const state = getGameState();
    setGameState({
      ...state,
      score: 123.456,
      rate: 9,
      prestigeThreshold: 1000,
      autoClickerCost: 50,
      prestigePoints: 3
    });

    updateUI();

    expect(document.getElementById("score")!.textContent).toBe("123.5");
    expect(document.getElementById("rate")!.textContent).toBe("9");
    expect(document.getElementById("prestigePoints")!.textContent).toBe("3");
  });
});
