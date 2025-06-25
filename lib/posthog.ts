import posthog from 'posthog-js'

// Variável global para evitar múltiplas inicializações
let posthogInitialized = false

if (typeof window !== 'undefined' && !posthogInitialized) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    autocapture: true,
  })
  posthogInitialized = true
}

export default posthog