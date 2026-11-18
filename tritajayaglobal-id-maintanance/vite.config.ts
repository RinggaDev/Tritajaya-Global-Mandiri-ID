import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

// Serves Vercel serverless /api/survey locally during `npm run dev`
function localApiPlugin(): Plugin {
  return {
    name: 'local-api-survey',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '')
      Object.assign(process.env, env)

      server.middlewares.use('/api/survey', async (req, res) => {
        const chunks: Buffer[] = []
        for await (const chunk of req) {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
        }
        const rawBody = Buffer.concat(chunks).toString('utf8')

        const mockReq = Object.assign(req, {
          body: rawBody,
        })

        const mockRes = Object.assign(res, {
          status(code: number) {
            res.statusCode = code
            return mockRes
          },
          json(payload: unknown) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(payload))
            return mockRes
          },
        })

        try {
          const mod = await server.ssrLoadModule('/api/survey.ts')
          await mod.default(mockReq, mockRes)
        } catch (err) {
          console.error('Local /api/survey middleware error:', err)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'We could not send your request.' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), localApiPlugin()],
})
