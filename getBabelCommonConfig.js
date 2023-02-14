module.exports = function (modules) {
  const plugins = [
    [
      '@babel/plugin-transform-typescript',
      {
        isTSX: true,
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules: modules === false,
      }
    ],
    '@babel/plugin-transform-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-classes',
  ]
  return {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          modules,
          targets: {
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'],
          },
        },
      ],
    ],
    plugins,
  }
}