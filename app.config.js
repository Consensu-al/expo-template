module.exports = {
  expo: {
    name: 'Consensual Expo App',
    slug: 'consensual-expo-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    userInterfaceStyle: 'automatic',
    owner: 'consensual',
    runtimeVersion: {
      policy: 'sdkVersion',
    },
    updates: {
      url: 'https://u.expo.dev/your-project-id',
      enabled: true,
    },
    scheme: 'consensu.al',
    splash: {
      image: './assets/images/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'al.consensu.expotemplate',
      permissions: [],
    },
    web: {
      favicon: './assets/images/favicon.png',
    },
    plugins: ['expo-router', 'expo-dev-client'],
    experiments: {
      tsconfigPaths: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: 'your-project-id',
      },
    },
  },
};
