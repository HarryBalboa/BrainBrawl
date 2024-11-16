<script setup>
import {ref} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import TextField from "../components/TextField.vue";
import PlayerManager from "../components/PlayerManager.vue";
import QuestionManager from "../components/QuestionManager.vue";

const tabs = [{text: "Player", icon: "users"}, {text: "Questions", icon: "clipboard-question"}, {text: "Games", icon: "gamepad"}]
const currentTab = ref("Player");
</script>

<template>
<div class="h-full">
  <div class="flex border-b border-white">
    <div
        v-for="tab in tabs"
        :key="tab.text"
        class="w-full justify-center flex items-center gap-2 rounded-t-lg cursor-pointer"
        :class="currentTab === tab.text ? 'bg-white/20' : ''"
        @click="currentTab = tab.text"
    >
      <font-awesome-icon :icon="tab.icon"></font-awesome-icon>
      {{ tab.text }}
    </div>
  </div>
  <div>
    <template v-if="currentTab === 'Player'">
      <PlayerManager></PlayerManager>
    </template>
    <template v-if="currentTab === 'Questions'">
      <question-manager></question-manager>
    </template>
  </div>
</div>
</template>

<style scoped>

</style>