module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Enable reanimated's babel plugin
      'react-native-reanimated/plugin',
      // Support for path aliases
      [
        'module-resolver',
        {
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './',
            '@app': './app',
            '@components': './components',
            '@constants': './constants',
            '@db': './db',
            '@hooks': './hooks',
            '@schemas': './schemas',
            '@stores': './stores',
          },
        },
      ],
    ],
  };
};