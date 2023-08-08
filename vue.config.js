// const CompressionPlugin = require("compression-webpack-plugin"); // gzip压缩,优化http请求,提高加载速度
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 代码分析工具
const path = require("path");
const packageJson = require("./package.json");

const resolve = (dir) => {
  return path.join(__dirname, dir);
};

const env = process.env;
const buildConf = require("./build.config");
const gitEnv = process.env.VUE_APP_ENVIRONMENT_MODE || "develop";
const baseConfing = buildConf;
const VARIABLESSASS = `@import "@/style/variables.scss";`;

module.exports = {
  publicPath: "./",
  outputDir: "dist", // 构建时的输出目录
  assetsDir: "static",
  filenameHashing: true, // false 来关闭文件名哈希
  lintOnSave: false, // 关闭eslint
  // 打包时不生成.map文件
  productionSourceMap: false,
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        data: VARIABLESSASS,
      },
    },
  },
  devServer: {
    disableHostCheck: true,
    // open: true,
    // host: "0.0.0.0",
    // port: 8808,
    // // 由于本项目数据通过easy-mock和mockjs模拟，不存在跨域问题，无需配置代理;
    // proxy: {
    //   "/v2": {
    //     target: target,
    //     changeOrigin: true,
    //   },
    // },
  },
  // webpack相关配置
  chainWebpack: (config) => {
    config.entry.app = ["./src/main.js"];
    config.resolve.alias.set("@", resolve("src")).set("cps", resolve("src/components"));
    // 关闭npm run build之后，This can impact web performance 警告
    config.performance.set("hints", false);
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
    // 移除 preload 插件
    config.plugins.delete("preload");
    // 压缩代码
    config.optimization.minimize(true);
    // 分割代码
    config.optimization.splitChunks({
      chunks: "all",
    });
    // 对图片进行压缩处理
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        disable: true, // webpack@2.x and newer
        quality: "65-80",
        speed: 4,
      })
      .end();
    config.when(env.NODE_ENV, (con) => {
      config.plugin("html").tap((args) => {
        if (baseConfing.title) {
          args[0].version = packageJson.version;
          args[0].title = baseConfing.title;
          args[0].icoUrl = baseConfing.icoUrl;
          args[0].www = baseConfing.www;
        }
        // console.log( process.env.VUE_APP_ENVIRONMENT_MODE,'---------')
        if (baseConfing) {
          args[0].api = baseConfing[gitEnv];
        }
        // console.log(args,'-----------')
        return args;
      });
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /single\..*\.js$/,
          },
        ])
        .end();
      if (env.NODE_ENV === "production") {
        con.optimization.minimizer("terser").tap((args) => {
          // 注释console.*
          args[0].terserOptions.compress.drop_console = true;
          // remove debugger
          args[0].terserOptions.compress.drop_debugger = true;
          // 移除 console.log
          args[0].terserOptions.compress.pure_funcs = ["console.log"];
          // 去掉注释 如果需要看chunk-vendors公共部分插件，可以注释掉就可以看到注释了
          args[0].terserOptions.output = { comments: false };
          return args;
        });
        config.optimization.splitChunks({
          automaticNameDelimiter: "-",
          chunks: "all",
          cacheGroups: {
            chunk: {
              name: "ot-chunk",
              test: /[\\/]node_modules[\\/]/,
              minSize: 131072,
              maxSize: 524288,
              chunks: "async",
              minChunks: 2,
              priority: 10,
            },
            vue: {
              name: "vue",
              test: /[\\/]node_modules[\\/](vue(.*)|core-js)[\\/]/,
              chunks: "initial",
              priority: 20,
            },
            elementUI: {
              name: "element-ui",
              test: /[\\/]node_modules[\\/]element-ui(.*)[\\/]/,
              priority: 30,
            },
          },
        });
      }
    });
    config.resolve.alias.set("@", resolve("src")).set("style", resolve("src/assets/style"));
    config.output.filename("js/[name].[hash].js").chunkFilename("js/[name].[hash].js").end();
  },
  configureWebpack: (config) => {},
  // 第三方插件配置
  pluginOptions: {},
};
