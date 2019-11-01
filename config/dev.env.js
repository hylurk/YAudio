const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    YAudio: path.resolve(__dirname, '..', 'src/index.ts')
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    publicPath: '/'
  },
  resolve: {
    // 自动解析一下拓展，当我们要引入src/index.ts的时候，只需要写src/index即可
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.scss']
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.tsx?$/i,
        use: [{
          loader: 'ts-loader',
        }],
        exclude: /node_modules/,
      },
      // {
      //   test: /\.js$/,
      //   enforce: 'pre',
      //   loader: 'eslint-loader',
      //   include: path.resolve(__dirname, '../src/')
      // },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.join(__dirname, 'postcss.config.js')
              }
            }
          },
          'sass-loader'
        ]
      },
      // {
      //   test: /\.(png|jpg)$/,
      //   loader: 'url-loader',
      //   options: {
      //     'limit': 40000
      //   }
      // },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.art$/,
        loader: 'art-template-loader'
      }
    ]
  },
  // 指定编译后是否生成source-map，这里判断如果是生产打包环境则不生产source-map
  devtool: 'cheap-module-source-map',
  // 这里使用webpack-dev-server，进行本地开发调试
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'demo'),
    stats: 'errors-only',
    clientLogLevel: 'none',
    compress: true,
    open: true,
    quiet: false,
    host: '0.0.0.0',
    port: 8088
  },
  // 这里用到两个插件，所以首先我们要记着安装
  // npm install html-webpack-plugin clean-webpack-plugin -D
  plugins: [
    // 这里在编译之前先删除dist文件夹
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./dist']
    }),
    // 这里我们指定编译需要用模板，模板文件是./src/template/index.html，所以接下来我们要创建一个index.html文件
    new HtmlWebpackPlugin({
      template: './demo/index.html'
    })
  ]
}