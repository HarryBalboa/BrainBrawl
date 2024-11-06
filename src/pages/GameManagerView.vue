<script setup>
import TextButton from "../components/TextButton.vue";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
const router = useRouter();

const broadcastChannel = ref();

function openNewWindow(){
  const routeData = router.resolve({name: "game"});
  console.log(router.getRoutes())
  window.open(routeData.href, "_blank");
}

function connectToBroadcastChannel(){
  broadcastChannel.value = new BroadcastChannel("BrainBrawl");
  broadcastChannel.value.onmessage = (ev) =>{
    console.log(ev)
  };
}

function sendMessage(msg){
  const msgObj = {
    sender: "manager",
    message: msg
  }

  broadcastChannel.value.postMessage(JSON.stringify(msgObj));
}

onMounted(() =>{
  connectToBroadcastChannel();
})

</script>

<template>
<div>
  <router-link to="/game">link</router-link>
  <text-button @click="openNewWindow">Test</text-button>
  <text-button @click="sendMessage('someShit')">Send shit</text-button>
</div>
</template>

<style scoped>

</style>