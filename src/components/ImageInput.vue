<script setup>
import {ref, watch} from "vue";
const emit = defineEmits(["change"])
const model = defineModel();

watch(() => model.value , () => {
  console.log("watch")
  console.log(input)
  input.value.value = "";
  document.getElementById("preview").src = "";
});

function onInputChanged(ev){
 emit("change", input.value.files[0].name)
  const reader = new FileReader();
  reader.onload = (ev) => {
    document.getElementById("preview").src = ev.target.result;
  }
  reader.readAsDataURL(input.value.files[0]);
}
const input = ref();
const image = ref();
</script>

<template>
  <div class="flex gap-2">
    <img id="preview" class="h-10 w-10 rounded">
    <input
        ref="input"
        type="file"
        class="w-full p-1 bg-sky-300/30 rounded focus:outline-none"
        @change="onInputChanged"
    />
  </div>

</template>

<style scoped>

</style>