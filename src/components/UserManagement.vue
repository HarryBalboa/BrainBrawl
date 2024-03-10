<script setup>
	import TextButton from './TextButton.vue';
	import TextField from './TextField.vue';
	const players = defineModel('players');
	const mode = defineModel('mode');

	const props = defineProps({
		configKey: String,
	});

	function removePlayer(index) {
		players.value.splice(index, 1);
	}

	function addPlayer() {
		players.value.push({ name: '', score: 0, file: null });
	}

	function saveToLocalStorage() {
		localStorage.setItem(
			`${props.configKey}Player`,
			JSON.stringify(players.value)
		);
		mode.value = 'init';
	}
</script>
<template>
	<div class="w-[60%] text-white">
		<div class="grid grid-cols-[1fr_1fr_1fr_35px] gap-2">
			<div>Name</div>
			<div>Score</div>
		</div>
		<div
			v-for="(player, i) in players"
			:key="`player-${i}`"
			class="grid grid-cols-[1fr_1fr_1fr_35px] gap-2 mt-2"
		>
			<div>
				<TextField v-model="player.name" />
			</div>
			<div>
				<TextField type="number" v-model="player.score" />
			</div>
			<div>
				<TextField type="text" v-model="player.file" />
			</div>
			<div v-if="i > 0" class="flex justify-center items-center">
				<button
					class="aspect-square w-[35px] flex justify-center items-center hover:bg-white/20 rounded-full"
					@click="removePlayer(i)"
				>
					<font-awesome-icon icon="trash"></font-awesome-icon>
				</button>
			</div>
		</div>
		<div class="grid grid-cols-[1fr_1fr_35px] gap-2 mt-4">
			<div>
				<TextButton @click="addPlayer">
					<font-awesome-icon icon="user-plus" class="mr-1"></font-awesome-icon>
					Add player
				</TextButton>
			</div>
			<div>
				<TextButton @click="mode = 'init'">
					<font-awesome-icon icon="arrow-left" class="mr-1"></font-awesome-icon>
					Back to start screen
				</TextButton>
			</div>
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
