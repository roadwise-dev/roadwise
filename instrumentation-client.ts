import posthog from "posthog-js";

// Validate PostHog environment variables
const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (!posthogKey) {
  console.warn("NEXT_PUBLIC_POSTHOG_KEY is not set. Analytics will be disabled.");
} else {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    defaults: "2025-05-24",
  });
}
