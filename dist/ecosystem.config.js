module.exports = {
    apps: [
        {
            name: 'SERVER',
            // Dont forget to install pm2 install typescript
            script: 'server.js',
            error_file: './logs/error.log',
            log_file: './logs/combined.log',
            time: true,
            // Options reference: http://pm2.keymetrics.io/docs/usage/application-declaration/
            args: '', // string containing all arguments passed via CLI to script
            watch: false, // if production
            instances: 'max',
            exec_mode: 'cluster',
            autorestart: true,
            // restart_delay: 1000,
            // exp_backoff_restart_delay: 100,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};
