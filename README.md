# vue-webpack-iview
> 学习《Vue.js实战》之进阶篇

### 使用 webpack
#### 前端工程化与webpack
前端工程化主要解决的问题：

* JavaScript、css 代码的合并与压缩
* CSS 预处理：Less、Sass、Stylus 的编译
* 生成雪碧图
* ES6 -> ES5
* 模块化等

webpack 的主要使用场景是`单页面富应用（SPA）`，将一些诸如：typescript、less、jpg、vue等格式的文件通过特定的`加载器（Loader）`编译后，最终统一生成 .js、.css、.png等静态资源文件。

如何文件都可称为是一个模块。webpack就是处理模块间的依赖关系，并把他们进行打包。

#### webpack 基础配置
#### 安装 webpack 与 webpack-dev-server
初始化
```bash
npm init  
# 按照提示一步步往下走
```
本地局部安装 webpack:（书中是v2，我的需要下载脚手架 -cli）
```bash
npm install webpack --save-dev
npm i -D webpack-cli

# 会多出下面一项“
"devDependencies": {
  "webpack": "^4.28.4"
}
```
安装 `webpack-dev-server`，可以启动一个服务器、热更新、接口代理等
```bash
npm install webpack-dev-server --save-dev
```
最终的 package.json 文件内容如下：
```json
{
  "name": "vue-webpack-iview",
  "version": "1.0.0",
  "description": "学习《Vue.js实战》之进阶篇",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yangtao2o/vue-webpack-iview.git"
  },
  "keywords": [
    "vue",
    "webpack",
    "iview"
  ],
  "author": "yangtao",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/yangtao2o/vue-webpack-iview/issues"
  },
  "homepage": "https://github.com/yangtao2o/vue-webpack-iview#readme",
  "devDependencies": {
    "webpack": "^4.28.4",
    "webpack-cli": "^3.2.1",
    "webpack-dev-server": "^3.1.14"
  }
}

```
##### 就是一个 js 文件而已
创建 `webpack.config.js`，并初始化：

```javascript
var config = {

}

module.exports = config;
```
接着，在 package.json 里配置启动项：

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "webpack-dev-server --open --config webpack.config.js --mode=development"
}

// --open：会在启动服务时自动打开浏览器
// --config：指向 webpack-dev-server 读取的配置文件路径
// --host --port：可配置 IP 和端口，如：--host 172.172.172.1 --port 8888
// --mode=development：需要说明是什么环境，不然会显示警告
```
webpack 的入口（Entry）和出口（Output），重中之重，新建 `main.js`，并在 `webpack.config.js` 中进行入口和输出的配置：
```javscript
var config = {
  entry: {
    main: './main'  // 入口文件为 main.js
  },
  output: {
    path: path.join(__dirname, './dist'),  // 输出目录
    publicPath: './dist',  //指定资源文件引用的目录
    filename: 'main.js'  // 指定输出文件的名称
  }
}

module.exports = config;
```
然后：`npm run dev`，浏览器会自动打开页面了。

##### 逐步完善配置文件
webpack 对于不同的模块需要不同的加载器来处理，通过安装不同的加载器，就可以对各种后缀名的文件进行处理。

如处理 .css 文件：
```bash
# css
npm install css-loader --save-dev
npm install style-loader --save-dev

# rules 属性中可以指定一系列的 loaders
# 每一个 loader 都必须包含 test 和 use 
# 处理名为 .css 的文件时，先通过 css-loader 转换，再通过 style-loader 转换，然后继续打包
module: {
  rules: [  
    {
      test: '/\.css$/',
      use: [
        'style-loader',
        'css-loader'
      ]
    }
  ]
}

```
在实际的业务中，需要使用插件 `extract-text-webpack-plugin` 把各处的css文件提取出来。，并生成一个 main.css 文件，最终在 index.html 里加载它。

```bash
npm install extract-text-webpack-plugin@next --save-dev
```

config
```javascript
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module: {
  rules: [
    {
      test: '/\.css$/',
      use: ExtractTextPlugin.extract({
        use: 'css-loader',
        fallback: 'style-loader'
      })
    }
  ]
},
plugins: [
  new ExtractTextPlugin('main.css'),
]
```
#### 单文件组件与 vue-loader

安装加载器：
```bash
npm install --save-dev vue vue-loader vue-style-loader
npm install --save-dev vue-template-compiler
npm install --save-dev vue-hot-reload-api
npm i -D babel babel-loader
npm i -D @babel/core
npm i -D @babel/preset-env
```
配置：
[Babel-loader](https://www.babeljs.cn/docs/setup/#installation)、[Vue-loader](https://vue-loader.vuejs.org/zh/guide/)

