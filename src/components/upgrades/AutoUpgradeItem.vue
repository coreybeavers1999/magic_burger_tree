<template>
  <q-item
    clickable
    v-ripple
    :disable="!enabled"
    @click.prevent="emit('clickUpgrade', category, upgradeItem.id, cost)"
  >
    <q-item-section>
      <q-item-label>{{ upgradeItem.label }}</q-item-label>
      <q-item-label caption>{{ upgradeItem.caption }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label>${{ helper.shorthand(cost) }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import helper from "src/common/helper";
name: "UpgradeListItem";

const emit = defineEmits(["clickUpgrade"]);

const props = defineProps({
  upgradeItem: {
    type: Object,
    required: true,
  },
  enabled: Boolean,
  category: { type: String, required: true },
  cost: { type: Number, required: true },
});
</script>

<style lang="scss" scoped></style>
