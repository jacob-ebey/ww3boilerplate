const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    all: __dirname + "/assets/js/index.js"
  },
  resolve: {
    modules: [path.resolve(__dirname + "/assets/js"), "node_modules"]
  },
  output: {
    path: __dirname + "/public/assets",
    filename: "[name].js",
    publicPath: "/assets"
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /.*\.sass$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
          { loader: "import-glob-loader" }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: "assets/images", to: "images" },
      { from: "assets/icons", to: "../" }
    ]),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  devServer: {
    port: 3000,
    inline: true,
    stats: "minimal"
  }
};
