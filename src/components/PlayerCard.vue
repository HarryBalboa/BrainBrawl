<script setup>
	import { onMounted, onUnmounted, ref } from 'vue';
	import Avatar from './Avatar.vue';
	import TextField from './TextField.vue';
	import TextButton from './TextButton.vue';
	const player = defineModel('player');
	const question = defineModel('question');

	function handleAddPoints() {
		player.value.score += question.value.points;
		question.value.isFinished = true;
		question.value = null;
		player.value = null;
	}
	const element = ref();

	function checkClick(ev) {
		if (!element.value) return;
		if (!element.value.contains(ev.target)) {
			player.value = null;
		}
	}

	onMounted(() => {
		setTimeout(() => {
			window.addEventListener('click', checkClick);
		}, 100);
	});
	onUnmounted(() => {
		window.removeEventListener('click', checkClick);
	});
</script>
<template>
	<div
		ref="element"
		class="bg-gradient-to-br from-sky-500 to-emerald-500 p-2 rounded-xl w-[300px]"
	>
		<div class="flex justify-between mb-2">
			<div class="text-2xl">{{ player.name }}</div>
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
				<div class="flex items-center grow">
					<TextField type="number" v-model="player.score" />
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
