<script setup>
import {ref, watch} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const emit = defineEmits(["change"])
const model = defineModel();

const input = ref();

function onInputChanged(){

  const reader = new FileReader();
  reader.onload = (ev) => {
    model.value = ev.target.result;
    emit("change", model.value)
  }
  reader.readAsDataURL(input.value.files[0]);
}

function clearInput(){
  model.value = null;
  input.value.value = "";
  emit("change", model.value)
}

</script>

<template>
  <div class="flex items-center gap-2">
    <input
        ref="input"
        type="file"
        class="w-full p-1 bg-sky-300/30 rounded focus:outline-none"
        accept="video/*"
        @change="onInputChanged"
    />
    <div v-if="model" @click="clearInput" class="cursor-pointer">
      <font-awesome-icon icon="xmark"></font-awesome-icon>
    </div>
  </div>

</template>

<style scoped>

</style>