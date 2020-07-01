/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const nodeLibs = require('node-libs-react-native');
nodeLibs.bs58 = require.resolve("bs58");
nodeLibs.vm = require.resolve('vm-browserify');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules: nodeLibs,
  },
};
