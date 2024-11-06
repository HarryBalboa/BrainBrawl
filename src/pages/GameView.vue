<script setup>
import {onMounted, ref} from "vue";

const broadcastChannel = ref();
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

onMounted(() =>{
  connectToBroadcastChannel();
})
</script>

<template>
gameView
</template>

<style scoped>

</style>