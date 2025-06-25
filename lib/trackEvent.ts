import posthog from './posthog'

export function trackEvent(event: string, properties?: Record<string, any>) {
    if (typeof window !== 'undefined') {
        posthog.capture(event, properties)
    }
} 