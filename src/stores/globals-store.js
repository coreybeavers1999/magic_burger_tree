import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import helper from "src/common/helper";
import upgrades from "src/assets/data/upgrades.json";

export const useGlobalsStore = defineStore("globals", {
  state: () => ({
    burgers: useStorage("burgers", 0),
    goldenBurgers: useStorage("goldenBurgers", 0),
    money: useStorage("money", 0.0),
    time: useStorage("time", new Date()),

    sinceLastTimeBurgers: 0,
    sinceLastTimeSold: 0,
    sinceLastTimeMoney: 0,
    sinceLastTimeSeconds: 0,

    treeBurgersPerClick: useStorage("treeBurgersPerClick", 1),
    goldenBurgerChance: useStorage("goldenBurgerChance", 0),

    shopBurgersPerClick: useStorage("shopBurgersPerClick", 1),
    shopBurgerPrice: useStorage("shopBurgerPrice", 2.0),

    upgrades: useStorage("upgrades", upgrades),
  }),
  getters: {
    moneyFormatted(state) {
      return `$${helper.shorthand(this.money, false)}`;
    },
    collectedBPS(state) {
      let bps = 0;
      this.upgrades.treeAuto.forEach((i) => {
        bps += i.bps * this.upgrades.treeAuto[i.id].level;
      });
      bps *= this.treeBurgersPerClick;
      return bps;
    },
    soldBPS(state) {
      let bps = 0;
      this.upgrades.shopAuto.forEach((i) => {
        bps += i.bps * this.upgrades.shopAuto[i.id].level;
      });
      // Add skill multiplier
      bps *= this.shopBurgersPerClick;
      return bps;
    },
  },
  actions: {
    clickedTree(state) {
      // Give however many burgers you get per click
      const amount = this.treeBurgersPerClick;
      this.burgers += amount;
    },
    clickedShop(state) {
      // Sell remaining if not enough
      const amount = Math.min(this.burgers, this.shopBurgersPerClick);
      this.money += amount * this.shopBurgerPrice;
      this.burgers -= amount;
    },
    update(state) {
      // If last time updated less than a second, don't update
      const currentTime = new Date();
      const timeSince = (currentTime - this.time) / 1000;
      if (timeSince < 0.99) return;

      // Update time
      this.time = currentTime;

      // Collect burgers
      this.burgers += this.collectedBPS;

      // Sell Burgers
      const amountSold = Math.min(this.soldBPS, this.burgers);
      this.money += amountSold * this.shopBurgerPrice;
      this.burgers -= amountSold;
      console.log(
        `"Updating Collected: ${this.collectedBPS} Sold: ${this.soldBPS}`
      );
    },
    resetProgress(state) {
      console.log("Resetting progress");
      this.burgers = 0;
      this.goldenBurgers = 0;
      this.money = 0.0;
      this.time = new Date();

      this.sinceLastTimeBurgers = 0;
      this.sinceLastTimeSold = 0;
      this.sinceLastTimeMoney = 0;
      this.sinceLastTimeSeconds = 0;

      this.treeBurgersPerClick = 1;
      this.goldenBurgerChance = 0;

      this.shopBurgersPerClick = 1;
      this.shopBurgerPrice = 2.0;

      this.upgrades = upgrades;
    },
  },
});
