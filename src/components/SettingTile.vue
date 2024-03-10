<script setup>
	defineProps({
		icon: String,
		text: String,
	});
</script>
<template>
	<div
		class="flex justify-center aspect-square rounded-lg bg-cyan-500/60 text-white h-[200px] hover:bg-cyan-400 transition-all hover:scale-105 cursor-pointer"
	>
		<div class="flex flex-col justify-center">
			<div class="text-6xl text-center">
				<font-awesome-icon :icon="icon"></font-awesome-icon>
			</div>
			<div class="text-3xl">{{ text }}</div>
		</div>
	</div>
</template>
