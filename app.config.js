module.exports = {
  expo: {
    name: 'Consensual Expo App',
    slug: 'consensual-template',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    userInterfaceStyle: 'automatic',
    owner: 'cmaujean',
    runtimeVersion: {
      policy: 'sdkVersion',
    },
    updates: {
      url: 'https://u.expo.dev/your-project-id',
      enabled: true,
    },
    scheme: 'consensual',
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
      jsEngine: 'hermes',
    },
    web: {
      favicon: './assets/images/favicon.png',
    },
    plugins: ['expo-router'],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: 'b8f0d714-4276-4058-9a3c-10464fdbe2a5',
      },
    },
  },
};
