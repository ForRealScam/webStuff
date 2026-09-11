import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: './',
    server: {
        host: true,
        allowedHosts: ['amacow.lt', 'www.amacow.lt']
    },
    preview: {
        host: true,
        port: 4173,
        allowedHosts: ['amacow.lt', 'www.amacow.lt']
    }
})
