<script setup>
	import { ref, computed } from 'vue';

	const question = defineModel('question');

	const isActive = ref(false);
	const isZooming = ref(false);
	const image = ref();
	const source = computed(() => {
		return `./${question.value.fileName}`;
	});
	function handleZooming() {
		isZooming.value = !isZooming.value;
	}

	function handleGoBack() {
		isActive.value = false;
		isZooming.value = false;
	}

	function handleRightClick() {
		question.value = null;
	}
</script>
<template>
	<div
		class="h-full w-full flex justify-center items-center bg-cyan-500/40 rounded-xl cursor-pointer"
		@click="isActive = true"
		@contextmenu.prevent="handleRightClick"
	>
		<div v-if="!isActive" class="text-center">
			<div class="text-9xl animate-pulse">?</div>
			<div class="text-4xl">{{ question.points }} Points</div>
		</div>
		<div
			v-else
			class="w-full h-full flex justify-center items-center p-4 overflow-hidden relative rounded-xl"
		>
			<img
				ref="image"
				class="aspect-ratio-auto h-full zoom rounded-xl"
				:src="source"
				alt=""
				:style="{ 'animation-play-state': isZooming ? 'running' : 'paused' }"
			/>
			<div
				class="absolute z-10 bottom-8 bg-pink-500/80 p-2 rounded-full flex gap-4"
			>
				<button
					class="p-1 rounded w-full hover:bg-cyan-400/20 rounded-full flex justify-center items-center"
					@click.stop="handleGoBack"
				>
					<font-awesome-icon
						fixed-width
						icon="arrow-left"
						class="mr-1"
					></font-awesome-icon>
				</button>
				<button
					class="p-1 rounded w-full hover:bg-cyan-400/20 rounded-full flex justify-center items-center"
					@click.stop="handleZooming"
				>
					<font-awesome-icon
						fixed-width
						:icon="isZooming ? 'pause' : 'play'"
						class="mr-1"
					></font-awesome-icon>
				</button>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.zoom {
		animation-name: zoom;
		animation-duration: 30s;
		animation-iteration-count: 1;
	}
	@keyframes zoom {
		0% {
			transform: scale(20);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
