<script setup>
	import { computed } from 'vue';
	const player = defineModel('player');
	const source = computed(() => {
		return `./${player.value.file}`;
	});
</script>
<template>
	<div class="h-full flex flex-col justify-center">
		<div class="h-full rounded-full flex justify-center">
			<img
				v-if="player.file"
				class="h-full rounded-full border-4 border-white aspect-square object-contain"
				:src="source"
				alt=""
			/>
			<div
				v-else
				class="flex justify-center items-center text-5xl h-full rounded-full border-4 border-white aspect-square bg-gradient-to-br from-fuchsia-500 to-pink-500"
			>
				?
			</div>
		</div>
	</div>
</template>
