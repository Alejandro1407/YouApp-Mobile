module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@/': './',
          '@src': './src',
          '@app': './src/app',
          '@assets': './src/assets',
          '@styles': './src/styles',
          '@utils': './src/app/utils',
          '@enums': './src/app/enums',
          '@screens': './src/app/screens',
          '@models': './src/app/models',
          '@modules': './src/app/modules',
          '@environment': './src/app/environment',
        },
      },
    ],
    'jest-hoist',
  ],
};
