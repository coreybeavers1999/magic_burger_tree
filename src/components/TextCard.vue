<template>
  <div
    class="text-h5 text-center text-dark text-weight-light"
    :style="`padding-bottom: ${padding || 16}px`"
  >
    <slot></slot>
  </div>
</template>

<script setup>
name: "TextCard";

const props = defineProps({
  padding: Number,
});
</script>
