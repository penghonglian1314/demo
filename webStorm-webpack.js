'use strict'
//
// 配置项位置: Preferences | Languages & Frameworks | JavaScript | Webpack
// 配置引用这个文件，让webstorm 识别webpack中的@等alias符号
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // provide the app's title in webpack's name field, so that
  // it can be accessed in index.html to inject the correct title.
  context: resolve(__dirname, './'),
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': resolve('src')
    }
  }
}
