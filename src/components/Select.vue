<script setup>
	import { ref, watch } from 'vue';
	defineProps({
		items: Object,
	});

	const modelValue = defineModel('modelValue');
	const isActive = ref(false);
	const element = ref();
	function checkClick(ev) {
		if (!element.value) return;
		if (!element.value.contains(ev.target)) {
			isActive.value = false;
		}
	}

	watch(isActive, (val) => {
		if (val) window.addEventListener('click', checkClick);
		else window.removeEventListener('click', checkClick);
	});

	function handleSelect(value) {
		modelValue.value = value;
		isActive.value = false;
	}
</script>
<template>
	<div class="relative" ref="element">
		<div
			@click="isActive = true"
			class="w-full p-1 bg-cyan-500/30 rounded flex justify-between items-center cursor-pointer"
		>
			{{ modelValue }} <font-awesome-icon icon="chevron-down" />
		</div>
		<div v-if="isActive" class="absolute bg-cyan-500 rounded w-full top-9 z-10">
			<div
				v-for="item in items"
				:key="item"
				@click="handleSelect(item)"
				class="p-1 hover:bg-cyan-400 cursor-pointer"
			>
				{{ item }}
			</div>
		</div>
	</div>
</template>
