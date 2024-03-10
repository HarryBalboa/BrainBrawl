<script setup>
	import { ref, computed, onMounted } from 'vue';

	const question = defineModel('question');
	const text = ref('');

	const isActive = ref(false);
	const source = computed(() => {
		return `./${question.value.fileName}`;
	});

	onMounted(async () => {
		const file = await fetch(source.value);
		const reader = file.body.getReader();
		text.value = file.body.toString();
		const stream = new ReadableStream({
			start(controller) {
				// The following function handles each data chunk
				function push() {
					// "done" is a Boolean and value a "Uint8Array"
					reader.read().then(({ done, value }) => {
						// If there is no more data to read
						if (done) {
							console.log('done', done);
							controller.close();
							return;
						}
						// Get the data and send it to the browser via the controller
						controller.enqueue(value);
						// Check chunks by logging to the console
						console.log(done, value);
						push();
					});
				}

				push();
			},
		});

		const response = await new Response(stream, {
			headers: { 'Content-Type': 'text/html' },
		}).text();

		text.value = response;
	});

	function handleRightClick() {
		question.value = null;
	}
</script>
<template>
	<div
		class="h-full w-full flex justify-center items-center bg-gradient-to-br from-cyan-500/40 to-emerald-500/40 rounded-xl cursor-pointer"
		@click="isActive = !isActive"
		@contextmenu.prevent="handleRightClick"
	>
		<div v-if="!isActive" class="text-center">
			<div class="text-9xl animate-pulse">?</div>
			<div class="text-4xl">{{ question.points }} Points</div>
		</div>
		<div
			v-else
			class="w-full h-full p-4 flex items-center justify-center text-6xl"
		>
			{{ text }}
		</div>
	</div>
</template>
