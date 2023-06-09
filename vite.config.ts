import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			srcDir: './src',
			registerType: 'autoUpdate',
			manifest: {
				name: 'BartalFUTÁR',
				short_name: 'BartalFUTÁR',
				start_url: '/',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				],
				display: 'standalone'
			},
			devOptions: {
				enabled: true
			}
		})
	]
});
