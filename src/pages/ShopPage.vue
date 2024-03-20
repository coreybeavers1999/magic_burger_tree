<template>
  <q-page class="full-height" padding>
    <!-- Stand -->
    <div class="full-height" style="text-align: center">
      <q-img
        src="../assets/images/shop.png"
        style="height: 50vh; max-width: 50vw"
        :class="shake ? 'anim-shake' : ''"
        @animationend="shake = false"
        fit="scale-down"
        @click.prevent="clickedStore"
        ><template v-slot:loading> <div></div></template
      ></q-img>
    </div>
  </q-page>
</template>

<script setup>
import { useGlobalsStore } from "src/stores/globals-store";
import { ref } from "vue";
import helper from "src/common/helper";

// Attributes
name: "ShopPage";

// Variables
const globals = useGlobalsStore();
const shake = ref(false);

// Functions
function clickedStore() {
  // Animate if burgers to sell
  shake.value = globals.burgers > 0;

  // Global trigger
  globals.clickedShop();
}
</script>
