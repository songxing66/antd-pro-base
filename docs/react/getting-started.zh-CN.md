---
order: 1
title: 快速上手
---

JOY-PRO 基于阿里的开源组件 ant.design 基础上的二次封装，主要是满足特殊业务场景下的需求。

> 在开始之前，推荐先研究阿里开源的基于 react 框架[ant.design](https://ant.design)，一个非常齐全的优秀组件框架。

---

本节介绍如何在项目中接入 JOY-PRO;

### 安装

#### 永久替换 npm 源为 joy 私有库（joy 私有库没有想要安装的包时会向上查找淘宝源）

```bash
 npm config set registry http://10.1.3.183:4873/
 npm install --save @joy/joy-pro
```

#### 安装包时切换源

```bash
npm install --save @joy/joy-pro --registry http://10.1.3.183:4873/
```

### 使用组件

组件的使用请查看具体组件文档
