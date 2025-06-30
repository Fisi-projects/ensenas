module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
      'module:@react-native/babel-preset'
    ],
    plugins: [['react-native-worklets-core/plugin']],
  };
};