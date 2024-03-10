<script setup>
	import { ref, computed } from 'vue';
	const mode = defineModel('mode');
	const players = defineModel('players');
	const gameConfig = defineModel('gameConfig');
	import BasicImage from './BasicImage.vue';
	import ZoomImage from './ZoomImage.vue';
	import AudioPlayer from './AudioPlayer.vue';
	import VideoPlayer from './VideoPlayer.vue';
	import Avatar from './Avatar.vue';
	import PlayerCard from './PlayerCard.vue';
	import BasicQuestion from './BasicQuestion.vue';
	const props = defineProps({
		configKey: String,
	});

	const componentMapping = {
		img: BasicImage,
		zoom: ZoomImage,
		audio: AudioPlayer,
		video: VideoPlayer,
		text: BasicQuestion,
	};

	const currentQuestion = ref();
	const selectedPlayer = ref(null);
	const leaderboard = computed(() => {
		const copy = JSON.parse(JSON.stringify(players.value));
		return copy.sort((a, b) => (a.score > b.score ? 1 : -1));
	});

	function selectPlayer(name) {
		selectedPlayer.value = players.value.find((pl) => pl.name === name);
	}

	function handleAddPoints() {
		selectedPlayer.value.score += currentQuestion.value.points;
		currentQuestion.value.isFinished = true;
		currentQuestion.value = null;
		selectedPlayer.value = null;
	}
</script>
<template>
	<div class="h-full w-[80%] text-white">
		<div class="h-[85%]">
			<template v-if="!currentQuestion">
				<div class="flex gap-4">
					<div
						v-for="category in gameConfig.categories"
						class="grow shrink basis-0 text-center text-4xl"
					>
						<div class="bg-emerald-500/80 px-3 py-5 rounded mt-4 mb-8">
							{{ category.name }}
						</div>
						<div
							v-for="question in category.questions"
							class="p-3 rounded mt-4"
							:class="
								question.isFinished
									? 'bg-cyan-500/10'
									: 'bg-cyan-500/80 hover:bg-cyan-400/80 cursor-pointer'
							"
							@contextmenu.prevent="question.isFinished = !question.isFinished"
							@click="currentQuestion = question"
						>
							{{ question.points }}
						</div>
					</div>
				</div>
			</template>
			<template v-else>
				<div class="h-[95%]">
					<component
						:is="componentMapping[currentQuestion.type]"
						v-model:question="currentQuestion"
					></component>
				</div>
			</template>
		</div>
		<div class="h-[15%] flex justify-center items-center w-full gap-2 text-2xl">
			<div
				v-for="(player, i) in leaderboard"
				class="min-w-[150px] h-full flex flex-col justify-center items-center hover:bg-cyan-500/20 rounded cursor-pointer"
				@click="selectPlayer(player.name)"
			>
				<div class="h-[40%]">
					<Avatar v-model:player="leaderboard[i]"></Avatar>
				</div>
				<div>
					{{ player.name }}
					<font-awesome-icon
						v-if="i === leaderboard.length - 1"
						icon="crown"
						class="mr-1 animate-bounce"
					/>
				</div>
				<div>{{ player.score }}</div>
			</div>
		</div>
		<div
			v-if="selectedPlayer"
			class="absolute w-screen h-screen top-0 left-0 z-10 bg-black/80 flex justify-center items-center"
		>
			<PlayerCard
				v-model:player="selectedPlayer"
				v-model:question="currentQuestion"
			></PlayerCard>
		</div>
	</div>
</template>
<style scoped>
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
