<template>
  <q-tabs
    v-model="selectedTab"
    class="text-grey"
    active-color="primary"
    indicator-color="primary"
    align="justify"
    narrow-indicator
  >
    <q-tab name="tree" label="Tree"></q-tab>
    <q-tab name="shop" label="Shop"></q-tab>
  </q-tabs>

  <q-tab-panels v-model="selectedTab" animated>
    <!-- Tree Upgrades -->
    <q-tab-panel name="tree">
      <!-- Current Upgrades -->
      <text-card>Currently Own</text-card>
      <q-list
        bordered
        style="
          border-radius: 10px;
          width: 70vw;
          margin: auto;
          margin-bottom: 32px;
        "
      >
        <q-item v-for="upgrade in globals.upgrades.treeAuto" :key="upgrade.id">
          <q-item-section>
            <q-item-label>{{ upgrade.label }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{
              globals.upgrades.treeAuto[upgrade.id].level
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <!-- Purchase Auto Upgrade -->
      <text-card>Auto-Collectors</text-card>

      <q-list bordered separator style="border-radius: 10px">
        <auto-upgrade-item
          v-for="upgrade in globals.upgrades.treeAuto"
          :key="upgrade.id"
          :upgrade-item="upgrade"
          :enabled="globals.money >= treeUpgradeCost(upgrade.id)"
          :cost="treeUpgradeCost(upgrade.id)"
          category="treeAuto"
          @click-upgrade="clickedAutoUpgrade"
        />
      </q-list>

      <!-- Purchase Tree Upgrade -->
      <text-card class="q-pt-lg">Upgrades</text-card>
      <q-list bordered separator style="border-radius: 10px">
        <upgrade-list-item
          v-for="upgrade in globals.upgrades.tree.filter((i) => {
            return !i.purchased;
          })"
          :key="upgrade.id"
          :upgrade-item="upgrade"
          :enabled="globals.money >= upgrade.price"
          :cost="upgrade.price"
          category="tree"
          @click-upgrade="clickedUpgrade"
        />
      </q-list>
    </q-tab-panel>

    <!-- Shop Upgrades -->
    <q-tab-panel name="shop">
      <!-- Current Upgrades -->
      <text-card>Currently Own</text-card>
      <q-list
        bordered
        style="
          border-radius: 10px;
          width: 70vw;
          margin: auto;
          margin-bottom: 32px;
        "
      >
        <q-item v-for="upgrade in globals.upgrades.shopAuto" :key="upgrade.id">
          <q-item-section>
            <q-item-label>{{ upgrade.label }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{
              globals.upgrades.shopAuto[upgrade.id].level
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <!-- Purchase Upgrade -->
      <text-card>Auto-Sellers</text-card>

      <q-list bordered separator style="border-radius: 10px">
        <auto-upgrade-item
          v-for="upgrade in globals.upgrades.shopAuto"
          :key="upgrade.id"
          :upgrade-item="upgrade"
          :enabled="globals.money >= shopUpgradeCost(upgrade.id)"
          :cost="shopUpgradeCost(upgrade.id)"
          category="shopAuto"
          @click-upgrade="clickedAutoUpgrade"
        />
      </q-list>

      <!-- Purchase Shop Upgrade -->
      <text-card class="q-pt-lg">Upgrades</text-card>
      <q-list bordered separator style="border-radius: 10px">
        <upgrade-list-item
          v-for="upgrade in globals.upgrades.shop.filter((i) => {
            return !i.purchased;
          })"
          :key="upgrade.id"
          :upgrade-item="upgrade"
          :enabled="globals.money >= upgrade.price"
          :cost="upgrade.price"
          category="shop"
          @click-upgrade="clickedUpgrade"
        />
      </q-list>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import { ref, toRaw } from "vue";
import AutoUpgradeItem from "src/components/upgrades/AutoUpgradeItem.vue";
import UpgradeListItem from "src/components/upgrades/UpgradeListItem.vue";
import { useGlobalsStore } from "src/stores/globals-store";
import TextCard from "src/components/TextCard.vue";
import helper from "src/common/helper";

name: "UpgradesPage";

const globals = useGlobalsStore();
const selectedTab = ref("tree");

function clickedAutoUpgrade(category, id, cost) {
  // Return if not enough money
  if (globals.money < cost) {
    console.log("Not enough money");
    return;
  }

  // Add upgrade and take money
  globals.money -= cost;
  globals.upgrades[category][id].level++;
}

function clickedUpgrade(category, id, variable, amount) {
  console.log(`Check: ${category}, ${id}, ${variable}, ${amount}`);
  // Check if player has enough money
  if (globals.money < globals.upgrades[category][id].price) {
    console.log("Not enough money");
    return;
  }

  // Mark upgrade as purchased
  globals.upgrades[category][id].purchased = true;

  // Add upgrade and take money
  globals.money -= globals.upgrades[category][id].price;
  globals[variable] += amount;
}

function treeUpgradeCost(id) {
  return helper.upgradeCost(
    globals.upgrades.treeAuto[id].price,
    globals.upgrades.treeAuto[id].level
  );
}

function shopUpgradeCost(id) {
  return helper.upgradeCost(
    globals.upgrades.shopAuto[id].price,
    globals.upgrades.shopAuto[id].level
  );
}
</script>
