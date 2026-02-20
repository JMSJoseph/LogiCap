import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Icons from 'unplugin-icons/vite'

// used to automatically create the paths from tsconfig.app.json
import tsconfigPaths from 'vite-tsconfig-paths'
// Woah thats so cool
// import { visualizer } from 'rollup-plugin-visualizer'

// App runs offline
// https://www.youtube.com/watch?v=sFsRylCQblw
import { VitePWA } from 'vite-plugin-pwa'

const pwaConfig = {
    registerType: 'autoUpdate',
    includeAssets: [
        'favicon.svg',
        'Fonts/DynamicSchematicRegular*',
        'icons/*.png',
    ],
    manifest: false,
    workbox: {
        globPatterns: ['**/*.{js,css,html,webp,svg,png,woff2}'],
        globDirectory: 'dist',
        cleanupOutdatedCaches: true,
    },
}

// const addVisualizer = () =>
//     visualizer({ emitFile: true, filename: 'stats.html' })

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        Icons({
            compiler: 'svelte',
        }),
        tsconfigPaths(),
        // addVisualizer(),
        VitePWA(pwaConfig as any),
    ],
    base: './', // Use relative paths
    optimizeDeps: {
        exclude: ['custom_digitaljs'],
        include: ['jquery', 'lodash'],
    },
    build: {
        rollupOptions: {
            output: {
                globals: {
                    jquery: 'jQuery',
                },
            },
        },
        commonjsOptions: {
            include: [/custom_digitaljs/, /node_modules/],
            transformMixedEsModules: true,
        },
    },
})
