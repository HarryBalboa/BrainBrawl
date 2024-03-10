<script setup>
	const modelValue = defineModel('modelValue');
	defineProps({
		type: String,
	});
</script>
<template>
	<input
		v-model="modelValue"
		:type="type || 'text'"
		class="w-full p-1 bg-sky-300/30 rounded focus:outline-none"
	/>
</template>
