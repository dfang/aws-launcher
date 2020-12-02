# AWS Launcher

从你的Mac的Dock栏一键打开aws服务主页或console页面。

简单配置一下，更可以方便地在Alfred中直接搜索并打开

最近在全面学习aws服务，准备考解决方案架构师和DevOps认证，需要经常打开某个aws服务主页。用惯了alfred一键到达。所以......

所有新增图标来自[aws](https://aws.amazon.com/architecture/icons/) 或 google images

[![npm version](https://img.shields.io/npm/v/aws-launcher.svg?style=flat)](https://www.npmjs.com/package/aws-launcher)

[![AWS Launcher](https://github.com/kwent/aws-launcher/blob/master/doc/aws-launcher.gif?raw=true)](https://github.com/kwent/aws-launcher/)

[![Grid](https://github.com/kwent/aws-launcher/blob/master/doc/grid.jpeg?raw=true)](https://github.com/kwent/aws-launcher/)

# Installation

安装

```bash
$ brew install fileicon
$ git clone https://github.com/dfang/aws-launcer.git 
$ cd aws-launcer
$ node compile.js
```

把生成好的文件夹（~/aws-launcher）拖到Mac的Dock栏(垃圾桶旁边的位置).

# 自定义

生成的快捷方式都在~/aws-launcher， 你可以删掉某些用不到的

想深度自定义，可以看源码（compile.js)

# 支持 Spotlight && Alfred

Spotlight好像不能直接搜到，也不能自定义搜索位置，除非你把生成的文件夹拖到支持的位置比如 /Aplications/aws-launcer

但是如果你在用Alfred，可以简单配置下，就可以从alfred搜索app一样。

设置方法这里以我本机安装的Alfred 4 英文为例:

打开alfred 偏好设置， Default Results -> Advanced -> 将生成的文件夹(~/aws-launcher)里的文件拖拽到该窗口，这样
alfred 就能识别此类文件后缀了，alfred就能搜到了
