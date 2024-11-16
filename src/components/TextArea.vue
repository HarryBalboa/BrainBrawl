<script setup>
const modelValue = defineModel('modelValue');

</script>
<template>
  <textarea
      v-model="modelValue"
      class="w-full p-1 bg-sky-300/30 rounded focus:outline-none"
  />
</template>