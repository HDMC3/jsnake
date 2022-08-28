import { defineConfig, UserConfigExport } from 'vite';

export default defineConfig(({ mode }) => {
    const config: UserConfigExport = {
        root: 'src',
        publicDir: '../public',
        base: mode === 'gh-pages' ? '/jsnake/' : '/',
        server: {
            host: '0.0.0.0'
        },
        build: {
            outDir: '../dist',
            assetsDir: './'
        }
    }
    return config;
})