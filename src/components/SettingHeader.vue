<script setup>
	import { defineModel } from 'vue';
	const mode = defineModel('mode');

	function handleBack() {
		mode.value = 'init';
	}
</script>
<template>
	<div class="flex h-[30px] flex justify-end gap-2 px-2 pt-1 text-white">
		<button
			v-if="mode !== 'init'"
			class="aspect-square w-[25px] flex justify-center items-center hover:bg-white/20 rounded-full"
			@click="handleBack"
		>
			<font-awesome-icon icon="arrow-left"></font-awesome-icon>
		</button>
	</div>
</template>
