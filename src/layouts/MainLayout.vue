<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <div class="row full-width justify-end q-pa-sm">
          <!-- Burgers -->
          <div class="col-4">
            <div class="header-item row justify-between">
              <q-icon name="fa-solid fa-burger col-1"></q-icon>
              <div class="col-11 text-right">
                {{ helper.shorthand(globals.burgers, false) }}
              </div>
            </div>
          </div>

          <!-- Spacer -->
          <div style="width: 16px"></div>

          <!-- Cash -->
          <div class="col-4">
            <div class="header-item row justify-between">
              <q-icon name="fa-solid fa-dollar-sign col-1"></q-icon>
              <div class="col-11 text-right">
                {{ helper.shorthand(globals.money, false) }}
              </div>
            </div>
          </div>
        </div>

        <!-- <div style="text-align: right">
          <div class="text-h6">{{ globals.moneyFormatted }}</div>
          <div style="font-size: 18px">
            <q-icon style="font-size: 12px" name="fa-solid fa-burger" />
            {{ helper.shorthand(globals.burgers) }}
          </div>
        </div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Where to? </q-item-label>

        <side-menu-item
          @load-page="loadPage"
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

      <!-- Output values -->
      <div class="absolute-bottom q-pa-lg text-grey-7">
        <div>Collected BPS: {{ helper.shorthand(globals.collectedBPS) }}</div>
        <div>Sold BPS: {{ helper.shorthand(globals.soldBPS) }}</div>
        <div class="q-pt-sm row justify-between">
          <q-btn class="col-3" outline @click.prevent="reset">Reset</q-btn>
          <q-btn class="col-6" outline @click.prevent="globals.money += 1000000"
            >Quick Cash</q-btn
          >
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import SideMenuItem from "components/SideMenuItem.vue";
import { useRouter, useRoute } from "vue-router";
import { useGlobalsStore } from "src/stores/globals-store";
import helper from "src/common/helper";

const linksList = [
  {
    title: "Tree",
    caption: "Shake tree for more",
    icon: "fa-solid fa-burger",
    link: "/",
  },
  {
    title: "Shop",
    caption: "Sell yo burgers",
    icon: "fa-solid fa-store",
    link: "/shop",
  },
  {
    title: "Upgrades",
    caption: "Buy efficiency",
    icon: "fa-solid fa-circle-chevron-up",
    link: "/upgrades",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    SideMenuItem,
  },

  setup() {
    const router = useRouter();
    const sidemenuOpen = ref(false);
    const globals = useGlobalsStore();
    const smoothMoney = ref(0);
    smoothMoney.value = globals.money;

    function loadPage(link) {
      // Close side menu
      sidemenuOpen.value = false;

      // Route to page
      console.log("Routing to page: ", link);
      router.push(link);
    }

    function reset() {
      globals.resetProgress();
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen: sidemenuOpen,
      loadPage,
      globals,
      helper,
      smoothMoney,
      reset,
      toggleLeftDrawer() {
        sidemenuOpen.value = !sidemenuOpen.value;
      },
    };
  },
});
</script>
