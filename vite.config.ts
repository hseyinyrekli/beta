import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const envFilePath = resolve(__dirname, 'data.env')

if (existsSync(envFilePath)) {
  const envFile = readFileSync(envFilePath, 'utf-8')

  envFile.split('\n').forEach((line) => {
    const trimmedLine = line.trim()

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      return
    }

    const [key, ...valueParts] = trimmedLine.split('=')

    if (!key || valueParts.length === 0) {
      return
    }

    process.env[key.trim()] = valueParts.join('=').trim()
  })
}

const routerPluginPackage = '@tanstack/router-plugin/vite'
const routerPluginFallback = pathToFileURL(
  resolve(__dirname, '.deps/node_modules/@tanstack/router-plugin/dist/esm/vite.js'),
).href

// https://vite.dev/config/
export default defineConfig(async () => {
  const { TanStackRouterVite } = await import(routerPluginPackage).catch(() =>
    import(routerPluginFallback),
  )

  return {
  resolve: {
    alias: {
      react: resolve(__dirname, 'node_modules/react'),
      'react-dom': resolve(__dirname, 'node_modules/react-dom'),
      'react/jsx-runtime': resolve(__dirname, 'node_modules/react/jsx-runtime.js'),
      'react/jsx-dev-runtime': resolve(__dirname, 'node_modules/react/jsx-dev-runtime.js'),
      '@tanstack/react-router': resolve(
        __dirname,
        '.deps/node_modules/@tanstack/react-router/dist/esm/index.js',
      ),
    },
  },
  plugins: [
    TanStackRouterVite({
      target: 'react',
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  }
})
