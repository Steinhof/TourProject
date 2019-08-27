module.exports = {
    apps: [
        {
            name: 'SERVER',
            cwd: './build',
            // Dont forget to install pm2 install typescript if you in production mode
            script: 'server.js',
            // error_file: './err.log',
            // out_file: './out.log',
            // log_file: './combined.log',
            time: true,
            // Options reference: http://pm2.keymetrics.io/docs/usage/application-declaration/
            args: '', // string containing all arguments passed via CLI to script
            watch: false, // if production
            ignore_watch: ['client', 'node-modules'],
            instances: '1',
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

    deploy: {
        production: {
            user: 'node',
            host: '212.83.163.1',
            ref: 'origin/master',
            repo: 'git@github.com:repo.git',
            path: '/var/www/production',
            'post-deploy':
                'npm install && pm2 reload ecosystem.config.js --env production',
        },
    },
};

