<script context="module">
	export const ssr = false;
</script>

<script>
	import { onMount } from 'svelte';
	import GifCard from '$lib/GifCard.svelte';
	import { GIFS, walletAddress } from '$lib/store';
	import { createGifAccount, getGifList, sendGif } from '$lib/provide';
	import { checkIfWalletIsConnected, connectWallet } from '$lib/helper';

	onMount(async () => {
		window.global = window;

		import('buffer').then((Buffer) => {
			window.Buffer = Buffer.Buffer;
		});
		await checkIfWalletIsConnected();
		if ($walletAddress !== null) {
			console.log($walletAddress);
			await getGifList();
		}
	});

	let link = '';

	function submit() {
		if (link.length > 0) {
			console.log(link);
			sendGif(link);
			link = '';
		}
	}
	$: if ($walletAddress !== null) {
		console.log($walletAddress);
		getGifList();
	}
</script>

<div class="container mx-auto lg:p-4 md:p-2 p-0 text-gray-50">
	<div class="text-center mt-4">
		<p class="text-4xl">Farhan'z MetaVerse</p>
	</div>
	{#if $walletAddress === null}
		<div class="flex justify-center">
			<button
				on:click={connectWallet}
				type="button"
				class="mt-12 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
				>Connect to your Wallet</button
			>
		</div>
	{:else}
		<div class="flex justify-center mt-24 mb-10">
			<input
				bind:value={link}
				type="text"
				id="gif Link"
				placeholder="Enter Gif Link!"
				class="text-sm rounded-lg block  w-64 p-1.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 "
			/>
			<div class="mt-1 ml-2">
				<button
					on:click={submit}
					type="button"
					class="text-white bg-gradient-to-br  from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center mr-2 mb-2"
					>Submit</button
				>
			</div>
		</div>
		<div class="text-center">
			Your Public Key : {$walletAddress}
		</div>
	{/if}

	{#if $GIFS === null}
		{#if $walletAddress !== null}
			<div class="flex justify-center">
				<button
					on:click={async () => {
						await createGifAccount();
					}}
					type="button"
					class="mt-12 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
					>Create One Time Account</button
				>
			</div>
		{/if}
	{:else}
		<div class="flex flex-wrap mt-10 ">
			{#each $GIFS as g}
				<div class="p-4">
					<GifCard url={g.gifLink} />
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	:global(body) {
		background-color: #111827;
	}
</style>
