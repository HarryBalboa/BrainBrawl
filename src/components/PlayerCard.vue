<script setup>
	import { onMounted, onUnmounted, ref } from "vue";
	import Avatar from "./Avatar.vue";
	import TextField from "./TextField.vue";
	import TextButton from "./TextButton.vue";
	const player = defineModel("player");
	const question = defineModel("question");

	function handleAddPoints() {
		player.value.score += question.value.points;
		question.value.isFinished = true;
		question.value = null;
		player.value = null;
	}

	function addPoints(points) {
		player.value.score += points;
		if (question.value) {
			question.value.isFinished = true;
			question.value = null;
			player.value = null;
		}
	}

	function removePoints(points) {
		player.value.score -= points;
	}

	const element = ref();
	const pointInput = ref();

	const possiblePoints = ref(0);

	function checkClick(ev) {
		if (!element.value) return;
		if (!element.value.contains(ev.target)) {
			player.value = null;
		}
	}

	onMounted(() => {
		if (question.value) {
			console.log(question.value);
			possiblePoints.value = question.value.points;
		}
		setTimeout(() => {
			if(pointInput.value){
				pointInput.value.$el.focus();
			}
			window.addEventListener("click", checkClick);
		}, 100);
	});
	onUnmounted(() => {
		window.removeEventListener("click", checkClick);
	});
</script>
<template>
	<div
		ref="element"
		class="bg-gradient-to-br from-sky-500 to-emerald-500 p-2 rounded-xl w-[300px]"
	>
		<div class="flex justify-between mb-2">
			<div class="text-2xl">{{ player.name }} ({{ player.score }})</div>
			<button
				class="aspect-square w-[25px] text-sm flex justify-center items-center hover:bg-white/20 rounded-full"
				@click="player = null"
			>
				<font-awesome-icon icon="xmark"></font-awesome-icon>
			</button>
		</div>
		<div class="flex gap-4">
			<div class="flex justify-center items-center">
				<Avatar class="h-[80px] w-[80px]" v-model:player="player"></Avatar>
			</div>
			<div class="text-xl flex flex-col gap-2 items-center grow">
				<div class="flex gap-2 items-center grow">
					<button
						class="aspect-square w-[40px] bg-pink-500 text-sm flex justify-center items-center hover:bg-pink-400 rounded-full"
						@click="removePoints(possiblePoints)"
					>
						<font-awesome-icon icon="minus"></font-awesome-icon>
					</button>
					<TextField
						ref="pointInput"
						class="text-center"
						type="number"
						v-model="possiblePoints"
					/>
					<button
						class="aspect-square w-[40px] bg-pink-500 text-sm flex justify-center items-center hover:bg-pink-400 rounded-full"
						@click="addPoints(possiblePoints)"
					>
						<font-awesome-icon icon="plus"></font-awesome-icon>
					</button>
				</div>
				<div class="w-full" v-if="question">
					<TextButton @click="handleAddPoints">
						Add {{ question.points }} points
					</TextButton>
				</div>
			</div>
		</div>
	</div>
</template>
