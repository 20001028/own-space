const path = require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniExtractPlugin=require('mini-css-extract-plugin');

module.exports = {
  mode:'development',
  entry:{
    index:'./src/index.js',
  },
  output: {
    filename:'[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    //在每次构建前清理dist文件夹
    clean:true
  },
  //当webpack打包源码时，可能会很难追踪到error和warning在源代码中的位置
  //例如如果将三个源文件打包到一个bundle中，其中一个源文件错误，堆栈跟踪会直接指向bundle
  //使用source map可以确切的知道错误的位置
  devtool:'inline-source-map',
  //webpack-dev-server具有实时重新加载功能
  //npm install --save-dev webpack-dev-server
  devServer:{
    contentBase:'./dist',
  },
  module:{
    rules:[
      //npm install --save-dev style-loader css-loader
      //模块loader可以链式调用，链中的每个loader都会对资源进行转换
      //链会逆序执行，第一个loader将被转换后得到的结果传递给下一个loader
      //最后的loader会返回JS
      //这里会先调用css-loader处理import或require导入的内容
      //然后用style-loader创建style标签并添加样式
      //style-loader不能单独使用，它不能解析css之前的依赖关系
      // {
      //   test:/\.scss$/i,
      //   use:['style-loader','css-loader','sass-loader']
      // },
      {
        test:/\.css$/i,
        exclude:/node_modules/,
        use:[MiniExtractPlugin.loader,'css-loader']
        //use:['style-loader','css-loader']
      },
      //加载图片，使用webpack5内置的Asset Modules
      {
        test:/\.{jpg|png|gif|svg|jpeg}$/,
        type:'asset/resource'
      },
      {
        test:/\.js$/,
        loader: 'babel-loader',
        options: {
          plugins:['syntax-dynamic-import'],
          // 解析js中的jsx必须配置
          presets: ['@babel/preset-env', '@babel/preset-react']
        },
        exclude:/node_modules/,
      }  
    ]
  },
  plugins:[
    //npm install --save-dev html-webpack-plugin
    //HTMLWebpackPlugin创建了一个全新的文件，所有的bundle都会自动添加到html中
    new HtmlWebpackPlugin({
      title:'OwnSpace',
      template:'./src/index.html'
    }),
    new MiniExtractPlugin({
      filename: "styles.css"
    })
  ],
  resolve: {
    
  },
  optimization:{
    //moduleIds:'deterministic',
    runtimeChunk:'single',
    splitChunks:{
      cacheGroups:{
        vendor:{
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
        }
      }
    }
  },
  externals: {
    'axios':'axios',
    'reducx':'redux',
  },
};