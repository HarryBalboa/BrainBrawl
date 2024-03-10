<script setup lang="js">
	import { ref } from "vue";
	import Select from "./Select.vue";
	import TextField from "./TextField.vue";
	import TextButton from "./TextButton.vue";
	const gameConfig = defineModel('gameConfig');
	const mode = defineModel('mode');
	const props = defineProps({
		configKey: String,
	});

	const questionTypes = ref([
			"text",
			"video",
			"audio",
			"img",
			"zoom",
		])

		function addCategory() {
			gameConfig.value.categories.push({
				name: '',
				questions: [{ points: 100, type: 'img', fileName: '' , isFinished: false}],
			});
		}

		function addQuestion(categoryIndex) {
			gameConfig.value.categories[categoryIndex].questions.push({
				points:
					(gameConfig.value.categories[categoryIndex].questions.length + 1) * 100,
				type: 'img',
				fileName: '',
			});
		}

		function removeCategory(index) {
			gameConfig.value.categories.splice(index, 1);
		}

		function removeQuestion(categoryIndex, questionIndex) {
			gameConfig.value.categories[categoryIndex].questions.splice(
				questionIndex,
				1
			);
		}
</script>

<template>
	<div class="text-white">
		<div class="flex gap-4">
			<div v-for="(category, i) in gameConfig.categories" class="max-w-[50%]">
				<div class="flex gap-2">
					<input
						class="w-full p-1 bg-cyan-500/30 rounded"
						type="text"
						v-model="category.name"
					/>
					<button
						v-if="i > 0"
						class="aspect-square w-[40px] flex justify-center items-center hover:bg-white/20 rounded-full"
						@click="removeCategory(i)"
					>
						<font-awesome-icon icon="trash"></font-awesome-icon>
					</button>
				</div>
				<div class="flex mt-1 gap-2">
					<div class="grow shrink basis-0">Points</div>
					<div class="grow shrink basis-0">Type</div>
					<div class="grow shrink basis-0">File name</div>
				</div>
				<div
					v-for="(question, j) in category.questions"
					class="mt-1 flex gap-2"
				>
					<div class="grow shrink basis-0">
						<TextField v-model="question.points" type="number"></TextField>
					</div>
					<div class="grow shrink basis-0">
						<Select v-model="question.type" :items="questionTypes"></Select>
					</div>
					<div class="grow shrink basis-0">
						<TextField v-model="question.fileName"></TextField>
					</div>
					<div>
						<button
							class="aspect-square w-[40px] flex justify-center items-center hover:bg-white/20 rounded-full"
							@click="removeQuestion(i, j)"
						>
							<font-awesome-icon icon="trash"></font-awesome-icon>
						</button>
					</div>
				</div>
				<div v-if="category.questions.length < 5">
					<TextButton @click="addQuestion(i)">
						<font-awesome-icon icon="plus" class="mr-1"></font-awesome-icon>
						Add question
					</TextButton>
				</div>
			</div>
		</div>
		<div class="flex gap-2 mt-8 justify-end">
			<div class="w-[200px] flex gap-2">
				<TextButton
					v-if="gameConfig.categories.length < 5"
					@click="addCategory"
				>
					<font-awesome-icon icon="plus" class="mr-1"></font-awesome-icon>
					Add category
				</TextButton>
				<TextButton @click="mode = 'init'">
					<font-awesome-icon icon="arrow-left" class="mr-1"></font-awesome-icon>
					Back to start screen
				</TextButton>
			</div>
		</div>
	</div>
</template>
<style>
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
