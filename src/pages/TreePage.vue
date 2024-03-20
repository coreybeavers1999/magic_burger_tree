<template>
  <q-page padding>
    <div class="full-height">
      <!-- Burger Tree -->
      <div class="full-height q-pa-lg" style="text-align: center">
        <q-img
          src="../assets/images/burger_tree.png"
          style="height: 50vh; max-width: 50vw"
          :class="animateTree ? 'anim-shake' : ''"
          @animationend="animateTree = false"
          fit="scale-down"
          @click.prevent="clickedTree"
        >
          <template v-slot:loading> <div></div></template>
        </q-img>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useGlobalsStore } from "src/stores/globals-store";
import { ref } from "vue";
import helper from "src/common/helper";

// Attributes
name: "TreePage";

// Variables
const globals = useGlobalsStore();
const animateTree = ref(false);

// Functions
function clickedTree() {
  // Update state
  globals.clickedTree();

  // Animate
  animateTree.value = true;
}
</script>
