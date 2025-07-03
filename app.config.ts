import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  name: config.name ?? "ensenas",
  slug: config.slug ?? "ensenas",
  version: config.version ?? "1.0.0",
  orientation: config.orientation ?? "portrait",
  icon: config.icon ?? "./assets/images/icon.png",
  scheme: config.scheme ?? "myapp",
  userInterfaceStyle: config.userInterfaceStyle ?? "automatic",
  newArchEnabled: config.newArchEnabled ?? true,
  ios: config.ios ?? { supportsTablet: true },
  android: {
    ...config.android,
    googleServicesFile:
      process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
  },
  web: config.web ?? {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: config.plugins ?? [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
  ],
  experiments: config.experiments ?? {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "62cfe78c-67f1-4397-af0b-a2bea4a7c425",
    },
    webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
    apiBaseUrl: process.env.API_BASE_URL || "",
  },
  owner: config.owner ?? "ensenas",
});
