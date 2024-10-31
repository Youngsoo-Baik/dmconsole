/* eslint-disable no-undef */
module.exports = {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: ["@babel/plugin-syntax-dynamic-import"],
    env: {
      test: {
        plugins: [
          '@babel/plugin-transform-modules-commonjs',
          '@babel/plugin-transform-runtime',
        ]
      }
    },
  };