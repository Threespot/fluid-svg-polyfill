const path = require("path");
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');


const defaultConfig = {

  mode: "development",

  entry: {
    "fluid-svg-polyfill": "./index",
  }, // string | object | array

  output: {
    // options related to how webpack emits results

    path: path.resolve(__dirname, "dist"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)

    filename: "[name].umd.js", // string
    // the filename template for entry chunks

    // publicPath: "/assets/", // string
    // the url to the output directory resolved relative to the HTML page

    library: "[name]Link", // string,
    // the name of the exported library

    libraryTarget: "umd" // universal module definition
    // the type of the exported library
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          failOnError: true,
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env"]
          }
        }
      }
    ]
  }
}

const mainConfig = {};

const minConfig = {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist/compressed"), // string
  },
  plugins: [
    new UglifyJsPlugin()
  ]
};

module.exports = [
  merge(defaultConfig, mainConfig, {
    output: {
      filename: "[name].amd.js", // string
      libraryTarget: "amd" // universal module definition
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: '[name].amd.js.map',
      })
    ]
  }),
  merge(defaultConfig, minConfig, {
    output: {
      filename: "[name].amd.min.js", // string
      libraryTarget: "amd" // universal module definition
    }
  }),
  merge(defaultConfig, mainConfig, {
    output: {
      filename: "[name].umd.js", // string
      libraryTarget: "umd" // universal module definition
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: '[name].umd.js.map',
      })
    ]
  }),
  merge(defaultConfig, minConfig, {
    output: {
      filename: "[name].umd.min.js", // string
      libraryTarget: "umd" // universal module definition
    }
  }),
  merge(defaultConfig, mainConfig, {
    output: {
      filename: "[name].m.js", // string
      libraryTarget: "commonjs2" // universal module definition
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: '[name].commonjs2.js.map',
      })
    ]
  }),
  merge(defaultConfig, minConfig, {
    output: {
      filename: "[name].m.min.js", // string
      libraryTarget: "commonjs2" // universal module definition
    }
  })
];
