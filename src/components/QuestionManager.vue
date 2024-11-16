<script setup>

import TextButton from "./TextButton.vue";
import ImageInput from "./ImageInput.vue";
import TextField from "./TextField.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {onMounted, ref, watch} from "vue";
import Select from "./Select.vue";
import TextArea from "./TextArea.vue";
import VideoInput from "./VideoInput.vue";
import SoundInput from "./SoundInput.vue";
import utils from "../utils.ts"

const db = ref();
const isEditMode = ref(false);
const questions = ref([]);
const newQuestion = ref({
  name: "",
  type: "text",
  text: "",
  file: "",
  description: "",
  points: 100,
  penalty: 50
})

const questionTypes = ref([
  "text",
  "video",
  "audio",
  "img",
  "zoom",
])

function resetQuestion(){
  newQuestion.value = {
    name: "",
    type: "text",
    text: "",
    file: "",
    description: "",
    points: 100,
    penalty: 50
  }
}

async function editQuestion(question){
  isEditMode.value = true;
  newQuestion.value = question;
}

async function removeQuestion(questionId){
  await utils.removeQuestion(db.value, questionId);
  const index = questions.value.findIndex(question => question.id === questionId);
  if(index > -1) questions.value.splice(index, 1);
}

async function updateQuestion(){
  const question = JSON.parse(JSON.stringify(newQuestion.value));
  await utils.updateUser(db.value, question);
  resetQuestion();
  isEditMode.value = false;
}

async function createNewQuestion(){
  try{
    const question = JSON.parse(JSON.stringify(newQuestion.value));

    await utils.addQuestion(db.value, question);
    await fetchQuestions();
    resetQuestion();
  }catch(err){
    console.error(err);
  }
}

async function fetchQuestions(){
  questions.value = await utils.getQuestions(db.value);
}

watch(() => newQuestion.value.type, () =>{
  newQuestion.value.file = "";
  newQuestion.value.text = "";
})

onMounted(async() => {
  try{
    db.value = await utils.setupDB();
    await fetchQuestions();
  }catch(err){
    console.error(err);
  }
})

</script>

<template>
  <div class="flex gap-2">
    <div class="w-full">
      <div class="mt-2">
        Question name
      </div>
      <div>
        <TextField v-model="newQuestion.name"></TextField>
      </div>
      <div class="mt-2">
        Game master notes
      </div>
      <div>
        <TextArea v-model="newQuestion.description"></TextArea>
      </div>
      <div class="mt-2">
        Points / Penalty
      </div>
      <div class="flex gap-2">
        <TextField type="number" v-model="newQuestion.points"></TextField>
        <TextField type="number" v-model="newQuestion.penalty"></TextField>
      </div>
      <div class="mt-2">
        Question type
      </div>
      <div>
        <Select v-model="newQuestion.type" :items="questionTypes"></Select>
      </div>
      <div class="mt-2">
        {{ newQuestion.type === 'text' ? 'Question text' : 'File' }}
      </div>
      <div>
        <TextArea v-if="newQuestion.type === 'text'" v-model="newQuestion.text"></TextArea>
        <ImageInput v-if="['zoom', 'img'].includes(newQuestion.type)" v-model="newQuestion.file"></ImageInput>
        <VideoInput v-if="newQuestion.type === 'video'" v-model="newQuestion.file"></VideoInput>
        <SoundInput v-if="newQuestion.type === 'audio'" v-model="newQuestion.file"></SoundInput>
      </div>

      <TextButton
          v-if="isEditMode"
          class="mt-4"
          @click="updateQuestion"
      >
        Update Question
      </TextButton>
      <TextButton
          v-else class="mt-4"
          @click="createNewQuestion"
      >
        Create Question
      </TextButton>
    </div>
    <div class="w-full bg-white/10 mt-2 p-2">
      <div class="flex justify-between items-center border-b mb-2">
        <div class="flex">
          Question
        </div>
      </div>
      <div
          v-for="question in questions"
          :key="question.name"
          class="flex justify-between items-center"
      >
        <div class="flex gap-2 items-center">
          <div>{{ question.name }}</div>
        </div>
        <div class="flex gap-2">
          <div @click="editQuestion(question)" class="cursor-pointer">
            <font-awesome-icon icon="pen-to-square"></font-awesome-icon>
          </div>
          <div @click="removeQuestion(question.id)" class="cursor-pointer">
            <font-awesome-icon icon="trash-can"></font-awesome-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>