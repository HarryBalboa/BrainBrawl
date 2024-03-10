<script setup>
	import { onMounted, ref, watch } from 'vue';
	import SettingHeader from './components/SettingHeader.vue';
	import SettingTile from './components/SettingTile.vue';
	import UserManagement from './components/UserManagement.vue';
	import GameManagement from './components/GameManagement.vue';
	import Game from './components/Game.vue';
	import TextButton from './components/TextButton.vue';

	const configKey = 'BrainBrawlConfig';
	const gameConfig = ref({});
	const players = ref([]);
	const mode = ref('init');

	function loadGameConfig() {
		const cf = localStorage.getItem(configKey + 'Game');
		if (!cf)
			return {
				name: 'BrainBrawl',
				categories: [
					{
						name: 'Category',
						questions: [
							{ points: 100, type: 'img', fileName: '', isFinished: false },
						],
					},
				],
			};
		return JSON.parse(cf);
	}

	function loadPlayers() {
		const pl = localStorage.getItem(configKey + 'Player');
		if (!pl) return [{ name: '', score: 0 }];
		return JSON.parse(pl);
	}

	watch(
		gameConfig,
		(val) => {
			saveGameConfigToLocalStorage(val);
		},
		{ deep: true }
	);
	watch(
		players,
		(val) => {
			savePlayerToLocalStorage(val);
		},
		{ deep: true }
	);

	function saveGameConfigToLocalStorage(val) {
		localStorage.setItem(`${configKey}Game`, JSON.stringify(val));
	}

	function savePlayerToLocalStorage(val) {
		localStorage.setItem(`${configKey}Player`, JSON.stringify(val));
	}

	onMounted(() => {
		gameConfig.value = loadGameConfig();
		players.value = loadPlayers();
	});
</script>

<template>
	<div
		class="w-screen h-screen bg-[url('./background.svg')] bg-cover select-none font-brand bg-sky-900"
		@contextmenu.prevent
	>
		<setting-header v-model:mode="mode"></setting-header>
		<div class="flex justify-center text-6xl text-white h-[60px]">
			{{ gameConfig?.name || 'title' }}
		</div>
		<div class="h-[calc(100%-90px)] w-full flex justify-center p-3">
			<template v-if="mode === 'init'">
				<div class="flex gap-10 mt-40">
					<setting-tile
						icon="gamepad"
						text="Game settings"
						@click="mode = 'gameSettings'"
					></setting-tile>
					<setting-tile
						icon="users"
						text="Player settings"
						@click="mode = 'userSettings'"
					></setting-tile>
					<setting-tile
						icon="circle-play"
						text="Start game"
						@click="mode = 'game'"
					></setting-tile>
				</div>
			</template>
			<template v-if="mode === 'userSettings'">
				<user-management
					class="mt-20"
					:configKey="configKey"
					v-model:mode="mode"
					v-model:players="players"
				></user-management>
			</template>
			<template v-if="mode === 'gameSettings'">
				<game-management
					:configKey="configKey"
					v-model:mode="mode"
					v-model:gameConfig="gameConfig"
				></game-management>
			</template>
			<template v-if="mode === 'game'">
				<game
					:configKey="configKey"
					v-model:mode="mode"
					v-model:gameConfig="gameConfig"
					v-model:players="players"
				></game>
			</template>
		</div>
	</div>
</template>

<style scoped></style>
