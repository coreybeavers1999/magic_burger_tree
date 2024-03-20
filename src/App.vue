<template>
  <router-view />
</template>

<script setup>
import { defineComponent, onMounted } from "vue";
import upgrades from "src/assets/data/upgrades.json";
import { useGlobalsStore } from "./stores/globals-store";
import helper from "./common/helper";
import { useQuasar } from "quasar";

name: "App";

const globals = useGlobalsStore();

// Since Last Time Modal
const $q = useQuasar();

onMounted(() => {
  checkStorage().then((val) => {
    // Request storage permissions if not granted
    if (!val) {
      requestStorage().then(() => {});
    }
  });

  sinceLastTime();
  sinceLastTimePopup();
  init();
});

// Initialization and Update
function init() {
  setInterval(update, 1000);
}

function sinceLastTime() {
  const now = new Date();
  const timeSince = Math.floor((now - globals.time) / 1000);
  console.log("Time since last time", timeSince);

  // Calculate sold and purchased
  const burgers = globals.collectedBPS * timeSince;
  globals.burgers += burgers;

  const sold = Math.min(globals.soldBPS * timeSince, globals.burgers);
  const moneyEarned = sold * globals.shopBurgerPrice;
  globals.burgers -= sold;
  globals.money += moneyEarned;
  console.log("Burgers:", burgers);
  console.log("Sold:", sold);

  // Show since last time
  globals.time = now;
  globals.sinceLastTimeSeconds = timeSince;
  globals.sinceLastTimeBurgers = burgers;
  globals.sinceLastTimeSold = sold;
  globals.sinceLastTimeMoney = moneyEarned;
}

function sinceLastTimePopup() {
  const html = `
  <div class="text-center">Collected <b>${
    globals.sinceLastTimeBurgers
  }</b> burgers</div>
  <div class="text-center">Sold <b>${
    globals.sinceLastTimeSold
  }</b> burgers</div>
  <div class="text-center text-h2 q-pt-lg">$${helper.shorthand(
    globals.sinceLastTimeMoney,
    false
  )}</div>`;

  $q.dialog({
    title: `<div class="text-center">While you were gone:</div>`,
    message: html,
    html: true,
  }).onOk(() => {});
}

function update() {
  globals.update();
}

// Requesting Storage
async function checkStorage() {
  // Check if site's storage has been marked as persistent
  if (navigator.storage && navigator.storage.persist) {
    return await navigator.storage.persisted();
  }
}

async function requestStorage() {
  // Request persistent storage for site
  if (navigator.storage && navigator.storage.persist) {
    const isPersisted = await navigator.storage.persist();
    console.log(`Persisted storage granted: ${isPersisted}`);
  }
}
</script>
