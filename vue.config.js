const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_TIPS__: JSON.stringify(false),
      }),
    ],
  },
  devServer: {
    proxy: {
      "/adminapi": {
        target: "http://localhost:3000",
        changeOrigin: true,
      }
    }
  },
});
