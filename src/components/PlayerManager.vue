<script lang="ts" setup>

import TextField from "./TextField.vue";
import TextButton from "./TextButton.vue";
import utils from "../utils.ts"
import type {TPlayer} from "../utils.ts";
import {onMounted, ref} from "vue";
import ImageInput from "./ImageInput.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";


const db = ref();
const users = ref([]);
const currentFile =ref();
const playerChange = ref(true);
const isEditMode = ref();
const newPlayer = ref<TPlayer>({
  name: "",
  score: 0,
  profilePicture: null,
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
      console.log(currentFile.value)
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
    profilePicture: null,
  }
  playerChange.value = !playerChange.value;
}

async function fetchUsers(){
  users.value = await utils.getUsers(db.value);

}

function addImageToPlayer(img){
  newPlayer.value.profilePicture = img;
}

async function removePlayer(userId){
  await utils.removeUser(db.value, userId);
  const index = users.value.findIndex(user => user.id === userId);
  if(index > -1) users.value.splice(index, 1);
}

function editPlayer(user){
  isEditMode.value = true;
  newPlayer.value = user;
}

async function updatePlayer(){
  const player = JSON.parse(JSON.stringify(newPlayer.value));
  await utils.updateUser(db.value, player);
  resetNewPlayer();
  isEditMode.value = false;
}

async function resetScore(user){
  user.score = 0
  const player = JSON.parse(JSON.stringify(user));
  await utils.updateUser(db.value, player);
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
        <ImageInput v-model="newPlayer.profilePicture"></ImageInput>
      </div>
      <TextButton v-if="isEditMode" class="mt-4" @click="updatePlayer"> Update Player </TextButton>
      <TextButton v-else class="mt-4" @click="createNewPlayer"> Create Player </TextButton>
    </div>
    <div class="w-full bg-white/10 mt-2 p-2">
      <div class="flex justify-between items-center border-b mb-2">
        <div class="flex">
          Player
        </div>
        <div class="flex w-24">
          Score
        </div>
      </div>
      <div
          v-for="user in users"
          :key="user.name"
          class="flex justify-between items-center"
      >
        <div class="flex gap-2 items-center">
          <img v-if="user.profilePicture"  :src="user.profilePicture" class="h-4 w-4 rounded-full">
          <div>{{ user.name }}</div>
        </div>
        <div class="flex gap-2">
          <div class="px-4">
            {{ user.score }}
          </div>
          <div @click="resetScore(user)" class="cursor-pointer">
            <font-awesome-icon icon="rotate-left"></font-awesome-icon>
          </div>
          <div @click="editPlayer(user)" class="cursor-pointer">
            <font-awesome-icon icon="pen-to-square"></font-awesome-icon>
          </div>
          <div @click="removePlayer(user.id)" class="cursor-pointer">
            <font-awesome-icon icon="trash-can"></font-awesome-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>