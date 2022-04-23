const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozjpeg = require("imagemin-mozjpeg");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const globule = require("globule");
const StyleLintPlugin = require("stylelint-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const ejsList = globule.find(["**/*.ejs", "!**/_*.ejs"], { srcBase: `${__dirname}/src/ejs` });

const app = {
  mode: "production",

  entry: "./src/index.js",
  //entry: "./src/index.ts",

  devtool: "source-map",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/js/app.js"
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true, //autofixモードの有効化
          failOnError: true //エラー検出時にビルド中断
        }
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },

      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader"
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,

          {
            loader: "css-loader",
            options: {
              url: false
            }
          },

          "postcss-loader"
        ]
      },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },

  //target: "web",

  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    open: true, //起動時にブラウザを開く
    overlay: true, //エラーをオーバーレイ表示
    inline: true
  },

  plugins: [
    new CleanWebpackPlugin({ verbose: true }),

    new MiniCssExtractPlugin({
      filename: "assets/style/app.css"
    }),

    new CopyPlugin({
      patterns: [
        { from: "src/image", to: "assets/image" },
        { from: "./src/favicon.png", to: "favicon.png" },
        { from: "./src/favicon.svg", to: "favicon.svg" }
      ]
    }),

    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: "70-80"
      },
      gifsicle: {
        interlaced: false,
        optimizationLevel: 10,
        colors: 256
      },
      svgo: {},
      plugins: [
        ImageminMozjpeg({
          quality: 85,
          progressive: true
        })
      ]
    }),

    new StyleLintPlugin({
      configFile: ".stylelintrc",
      fix: true //自動修正可能なものは修正
    })
  ],

  //import文で拡張子が.tsのファイルを解決する
  resolve: {
    extensions: [".ts", ".js", ".json"]
  }
};

ejsList.forEach((ejs) => {
  const html = ejs.replace(/\.ejs/, ".html");
  app.plugins.push(
    new HtmlWebpackPlugin({
      filename: `./${html}`,
      template: `./src/ejs/${ejs}`,
      inject: false,
      minify: false //minifyしない
    })
  );
});

module.exports = app;
