<template>
  <q-item clickable tag="a" @click.prevent="$emit('loadPage', link)">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideMenuItem",
  props: {
    title: String,
    caption: String,
    link: String,
    icon: String,
  },
});
</script>
