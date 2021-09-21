<div class="container mx-auto flex justify-center items-center h-full">
	<div style="min-width: 50%">
		<div class="mx-auto block relative text-center mb-8">
			<h1 class="text-3xl text-gray-600 font-semibold mb-2">The Open Dictionary</h1>
			<div class="flex flex-row items-center justify-center">
				<span class="text-lg font-semibold text-gray-400 cursor-pointer">English</span>
				<div class="arrow" />
				<button
					on:click={() => null}
					class="text-lg font-semibold text-gray-400 cursor-pointer active:text-gray-500 duration-300"
					>English</button
				>
			</div>
		</div>
		<form>
			<div class="flex flex-row items-center overflow-hidden">
				<input
					type="text"
					class="w-full pt-3 pb-2 px-4 text-gray-600 rounded-lg focus:border-blue transition-all duration-500 bg-gray-100 outline-none border-gray-200 border"
					placeholder="Search..."
				/>
			</div>
		</form>
	</div>
</div>

<style>
	.arrow {
		width: 0;
		height: 0;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		margin: 0 0.5rem;
		border-bottom: 6px solid theme('colors.gray.400');
		transform: rotate(90deg);
	}
</style>
