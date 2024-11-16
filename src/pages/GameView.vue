<script setup>
import {onMounted, ref} from "vue";
import utils from "../utils.ts"
import VideoPlayer from "../components/VideoPlayer.vue";
import AudioPlayer from "../components/AudioPlayer.vue";

const broadcastChannel = ref();
const questions = ref([]);
const db = ref();
function connectToBroadcastChannel(){
  broadcastChannel.value = new BroadcastChannel("BrainBrawl");
  broadcastChannel.value.onmessage =(ev) =>{
    console.log(ev)
  }
}

function sendMessage(msg){
  const msgObj = {
    sender: "manager",
    message: msg
  }

  broadcastChannel.value.postMessage(JSON.stringify(msgObj));
}

onMounted(async () =>{
  try{
    db.value = await utils.setupDB();
    connectToBroadcastChannel();
    questions.value = await utils.getQuestions(db.value);
  }catch(err){
    console.error(err);
  }

})
</script>

<template>
<div class="h-full w-full flex items-center justify-center">
<!--  <audio-player class="w-[500px] h-[300px]" v-if="questions.length > 0" v-model="questions[1]"></audio-player>-->
  <video-player class="w-[500px] h-[300px]" v-if="questions.length > 0" v-model="questions[0]"></video-player>
</div>
</template>

<style scoped>

</style>