<script lang="ts" setup>

import TextField from "./TextField.vue";
import TextButton from "./TextButton.vue";
import utils from "../utils.ts"
import type {TPlayer} from "../utils.ts";
import {onMounted, ref} from "vue";
import ImageInput from "./ImageInput.vue";


const db = ref<IDBDatabase>();
const users = ref([]);
const currentFile =ref();
const playerChange = ref(true);
const newPlayer = ref<TPlayer>({
  name: "",
  score: 0,
})

onMounted(async() => {
  try{
    db.value = await utils.setupDB();
    await fetchUsers();
  }catch(err){
    console.error(err);
  }
})

async function createNewPlayer(){
  try{
    const player = JSON.parse(JSON.stringify(newPlayer.value));
    if(currentFile.value){
      player.profilePicture = currentFile.value;
    }
    await utils.addUser(db.value, player)
    await fetchUsers();
    resetNewPlayer();
  }catch(err){
    console.error(err);
  }
}

function resetNewPlayer(){
  newPlayer.value = {
    name: "",
    score: 0,
  }
  playerChange.value = !playerChange.value;
}

async function fetchUsers(){
  users.value = await utils.getUsers(db.value);

}

function addImageToPlayer(img){
  newPlayer.value.profilePicture = img;
}

</script>

<template>
  <div class="flex gap-2">
    <div class="w-full">
      <div class="mt-2">
        Player name
      </div>
      <div>
        <TextField v-model="newPlayer.name"></TextField>
      </div>
      <div class="mt-2">
        Score
      </div>
      <div>
        <TextField type="number" v-model="newPlayer.score"></TextField>
      </div>
      <div class="mt-2">
        Profile picture
      </div>
      <div>
        <ImageInput v-model="playerChange" @change="addImageToPlayer"></ImageInput>
      </div>
      <TextButton class="mt-4" @click="createNewPlayer"> Create Player </TextButton>
    </div>
    <div class="w-full bg-white/10 mt-2 p-2">
      <div
          v-for="user in users"
          :key="user.name"
          class="flex justify-between items-center"
      >
        <div class="flex gap-2 items-center">
          <img v-if="user.profilePicture"  :src="`./${user.profilePicture}`" class="h-4 w-4 rounded-full">
          <div>{{ user.name }}</div>
        </div>
        <div>{{ user.score }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>