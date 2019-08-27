module.exports = api => {
    api.cache(true);
    const presets = [
        '@babel/preset-typescript',
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
                loose: true,
                targets: {
                    browsers: ['> 0.25%, not dead'],
                },
            },
        ],
    ];
    const plugins = [];

    return {
        presets,
        plugins,
    };
};
