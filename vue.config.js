const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  pages: {
    popup: {
      template: "public/browser-extension.html",
      entry: "./src/popup/main.js",
      title: "Popup"
    }
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: "src/background.js"
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve("src/crawl.js"), to: path.resolve("dist/js") }
        ]
      })
    ]
  }
};
