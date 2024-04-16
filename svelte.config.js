import adapter from '@sveltejs/adapter-auto';
import staticAdapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

function getAdapter() {
    switch (process.env.VITE_ADAPTER) {
        case 'capacitor':
            return staticAdapter({
                strict: false,
                pages: 'build/static',
                assets: 'build/static',
                fallback: 'index.html'
            });

        default:
            return adapter();
    }

}

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: vitePreprocess({
        style: 'scss',
        script: true
    }),

    kit: {
        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported or you settled on a specific environment, switch out the adapter.
        // See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: getAdapter()
    }
};

export default config;
