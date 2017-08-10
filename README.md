## 本地运行

```
 # 切换到项目目录
 cd your-project-name

 # 安装依赖
 npm i

 # 生成 dll 文件, 用于缩短开发时的 rebuild 时间
 npm run dll

 # 启动脚本
 npm run dev
```

浏览器访问 `localhost:${port}${publicPath}`, 默认是 `localhost:3000/`.

## 其它脚本

* `npm run ilint`: eslint 检查, 会根据 .eslintrc 的配置去检查 `src` 目录下的 `.vue` 和 `.js` 文件. 项目中加入了 `pre-push hooks`, 每次 `push` 之前都会自动运行该脚本. 可以参考 [doc](http://eslint.org/docs/rules/) 自定义配置.
* `npm run fix`: eslint 自动修复
* `npm run build`: 生产环境 build

## 目录结构

项目目录结构如下:

```
|——vue-startup
  |——build                  // 构建脚本
  |——config                 // 构建环境配置文件
  |——src                    // 项目源码
    |——assets               // 资源
    |——components           // 业务通用组件
    |——general              // 纯业务组件
    |——lib                  // 公共库
    |——network              // 网络请求
    |——page                 // 项目入口
    |--mobx                 // mobx model 入口(state === mobx)
    |——vuex                 // vuex store 入口(state === vuex)
    |——index.html           // 挂载的静态文件
  |——.eslintrc              // eslint 配置
  |——.babelrc               // babel 配置
  |——.npmrc                 // npm 配置
  |——package.json           // 项目依赖
  |——postcss.config.js      // postcss 配置
  |——webpack.dll.config.js  // dll 配置文件
```

## 其它

* **window.PREFIX**: api请求前缀, 在 config/index.js#prefix 中配置
* 脚手架默认加入了两个别名: `@src` 和 `@components`. 前者指向 `src` 目录, 后者指向 `src/components` 目录, 便于引入资源:

```
# src/general/test/test1/test2/index.vue

# Good
import hello from '@src/lib/hello'; # 引入库
import Hello from '@components/Hello/index.vue'; # 引入组件

# Bad
import hello from '../../../../lib/hello'; # 引入库
import Hello from '../../../../components/Hello/index.vue'; # 引入组件
```

可以在 `build/webpack.base.config.js` 中更改或添加其它别名.

* 脚手架默认加入了预处理器 `less`, 建议 less 文件中的类嵌套不超过三层
* 对 `store` 的更改, 建议严格遵照单项数据流
* 脚手架默认开启全局的严格模式, 不需要在组件或 js 文件中进行 `use strict` 声明, 否则 eslint 会报错
* 启动脚本时, Webpack 会将静态资源(`src/assets`)目录移动到 `dist` 目录, 方便在组件中引入:

```
# src/general/test/test1/test2/index.vue

# Good
<img src = "/assets/logo.png">  # 如果修改了 `publicPath` (默认是 `/`), 前面加上 `publicPath`, `/${publicPath}/assets/logo.png`

# Bad
<img src = "../../../../assets/logo.png">  # 如果引用层级不深(不超过两层), 可以采用相对路径, 对于小图片有利于 base64 优化
```

* 脚手架默认配置了 dll/happypack 构建优化和组件按需加载优化
