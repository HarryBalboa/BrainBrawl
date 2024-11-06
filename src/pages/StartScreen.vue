<script setup>
import SettingTile from "../components/SettingTile.vue";
import { RouterLink } from "vue-router";

</script>

<template>
<div class="h-full w-full flex justify-center items-center gap-4">
  <RouterLink to="/game">
    <SettingTile icon="gamepad" text="Game"></SettingTile>
  </RouterLink>
  <RouterLink to="/manager">
    <SettingTile icon="user-tie" text="Gamemaster"></SettingTile>
  </RouterLink>
  <RouterLink to="/creator">
    <SettingTile icon="gears" text="Creator"></SettingTile>
  </RouterLink>
</div>
</template>

<style scoped>

</style>