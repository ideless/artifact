import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// alias @
import { resolve } from 'path'

export default defineConfig({
    base: '',
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        }
    },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "./src/style/global.scss" as *;`,
            }
        }
    },
})
