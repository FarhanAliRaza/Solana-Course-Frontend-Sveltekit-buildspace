import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-static';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			define: {
				global: {}
			}
		}
	}
};

export default config;
