# Fleeting Flow

—— Web 短视频项目（前端）

Fleeting Flow 对应的[后端仓库](https://github.com/qing-wq/FleetingFlow)

![项目截图——首页](https://s2.loli.net/2023/11/07/XnW4V1elDYtJyL2.png)

![项目截图——推荐](https://s2.loli.net/2023/11/07/6TX3PxSQfYWC5ul.png)

![项目截图——评论](https://s2.loli.net/2023/11/07/CPGi5DgFftJARBb.png)

---

## 项目启动

项目依靠 Vite 开发，在根目录的`.env`文件中设置了项目的 Api 前缀，可以在开发时通过修改 `.env.development` 文件中的后端服务器地址在代理模式下开发，也可以在编译时修改 Api 前缀后打包项目实现生产环境的部署

> 此处使用`pnpm`对项目进行管理，也可以根据需求替换为`npm`、`yarn`的相同功能命令

### 开发

将项目克隆到本地后，先安装依赖

```shell
# 安装项目依赖
pnpm install
```

安装完毕后，按照实际需求修改`.env.development`文件的后端服务器地址即可通过代理运行

```shell
# 以开发模式运行项目
pnpm run dev
```

此时，控制台出现项目运行的地址即可

### 部署

将项目克隆到本地后，先安装依赖

```shell
# 安装项目依赖
pnpm install
```

安装完毕后，按照实际需求修改`.env`文件的 api 前缀（根据实际需求）后可运行打包命令

```shell
# 打包后的项目在 /dist/ 目录中
pnpm run build
```

再将打包后的文件部署到服务器上即可

## 简介

项目使用 React、TypeScript，以及 Sass 作为主页技术栈，基于 Vite 开发，实现了 Web 端短视频应用的大部分功能，并在部分地方提升用户体验

### 项目特点

-   完全类型严格  
    项目中对类型的规范较为严格，广泛使用泛型等 TS 工具帮助类型推断，并禁止使用 any 等模糊类型，tsc 代码检查无报错，使得数据从 Api 获取到展现在页面上，都被规范为正确的类型。对开发、维护与部署都有着很大的帮助

-   依赖较少  
    项目仅引入了一些基础开发依赖，以及必须的工具依赖，比如解析 HLS 格式的 Hls.js，负责展示 message 的 react-toastify，并未引入功能全面的组件库。提升了项目的流畅性，并使得 UI 等组件更加定制化，契合项目

-   结构清晰  
    项目对视频的获取与展示有一套完整的数据传输流畅，并且对不同类型的接口与不同类型的展示组件提供了一层中间数据处理 Hook，提高了组件的复用率，并使得代码结构更清晰。项目的文件结构也按照响应的逻辑进行了组织，对大型组件采用模块化或提取 Hook 的方法降低组件复杂的，使得项目结构清晰。

-   UI 美观  
    项目开发前进行了 UI 设计，统一了 UI 风格，对用户的交互进行了优化，提升用户观感以及使用感受。

-   性能较高  
    项目在 React 方面广泛使用数据、函数缓存 Hook，减少组件刷新的频率。同时，对于视频组件等更新频率较高的部分使用 `transform` 进行布局的变换，防止浏览器频繁回流对性能产生影响

-   定制视频组件  
    视频组件是短视频应用的核心功能之一，因此本项目的视频播放组件自主开发，对 video 对象进行合理的监听，并使用 `requestAnimationFrame` Api 实现了对进度条的流畅更新（全程只操作 `transform` 属性），实现了较高的性能与；流畅的播放体验。同时，播放器还支持基于 Hls 协议的清晰度切换，提升了用户的观看体验

-   流畅切换过程  
    项目对视频的切换事件进行了重写，实现了键盘切换、鼠标滚轮切换、以及点击切换多种流畅切换方式

### 主要结构

```
./src/
├── apis
├── assets
│   └── icons
├── auth
├── components
│   ├── BaseDropdown
│   ├── BaseSwitch
│   ├── GlobalAvatar
│   ├── SVGIcon
│   ├── TheHeader
│   ├── TheLoginBox
│   │   └── components
│   ├── TheNavbar
│   ├── TheSearchBox
│   ├── TheUserInfoBar
│   │   └── components
│   ├── VideoContainer
│   │   ├── VideoInfo
│   │   └── VideoPlayer
│   ├── VideoList
│   └── VideoTile
├── hooks
├── layouts
├── pages
│   ├── Category
│   ├── Home
│   ├── Recommend
│   ├── Search
│   ├── Setting
│   │   └── components
│   ├── Upload
│   ├── User
│   └── Video
├── router
├── stores
├── styles
├── types
└── utils
```

-   apis  
     Api 的封装与存储

-   assets  
    存放项目的静态文件

-   auth  
    项目的权限管理

-   components  
    共用组件或全局组件

-   hooks  
    公用 hook

-   layout  
    公用布局

-   pages  
    页面组件，供路由直接调用

-   router  
    路由

-   stores  
    全局状态管理

-   styles  
    公用样式

-   types  
    数据类型

-   utils  
    工具方法
