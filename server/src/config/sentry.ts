import * as Sentry from '@sentry/node';

Sentry.init({
    dsn: process.env.SENTRY_DNS,
    tracesSampleRate: 1.0,
    release: `bethehero_server@${process.env.npm_package_version}`
});

export default Sentry;