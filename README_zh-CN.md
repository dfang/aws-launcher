# AWS Launcher

一键从Mac的Dock栏打开aws服务。（配置一下，也可以在Alfred中直接能够搜到）

最近在全面学习aws服务，准备考解决方案架构师和DevOps认证，需要经常打开某个aws服务主页。用惯了alfred一键到达。所以......

[![npm version](https://img.shields.io/npm/v/aws-launcher.svg?style=flat)](https://www.npmjs.com/package/aws-launcher)

[![AWS Launcher](https://github.com/kwent/aws-launcher/blob/master/doc/aws-launcher.gif?raw=true)](https://github.com/kwent/aws-launcher/)

[![Grid](https://github.com/kwent/aws-launcher/blob/master/doc/grid.jpeg?raw=true)](https://github.com/kwent/aws-launcher/)

# Installation

安装

```bash
$ brew install fileicon
$ npm install aws-launcher
```

把生成好的文件夹（~/aws-launcher）拖到Mac的Dock栏(垃圾桶旁边的位置).

# 自定义

生成的快捷方式都在~/aws-launcher， 你可以删掉某些用不到的

想深度自定义，可以看源码（compile.js)

# Spotlight && Alfred

Spotlight好像不能直接搜到，但是如果你在用Alfred，可以简单配置下，就可以从alfred搜索app一样。

设置方法这里以我本机安装的Alfred 4 英文为例:

打开alfred 偏好设置， Default Results -> Advanced -> 将生成的文件夹(~/aws-launcher)里的文件拖拽到该窗口，这样
alfred 就能识别此类文件后缀了，alfred就能搜到了

# History

View the [changelog](https://github.com/kwent/aws-launcher/blob/master/CHANGELOG.md)

# Authors

- [Quentin Rousseau](https://github.com/kwent)

# License

```plain
Copyright (c) 2017 Quentin Rousseau <contact@quent.in>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
```
