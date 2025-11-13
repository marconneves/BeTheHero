import * as Sentry from "@sentry/nextjs";

export function register() {
  Sentry.init({
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/
  });
}
