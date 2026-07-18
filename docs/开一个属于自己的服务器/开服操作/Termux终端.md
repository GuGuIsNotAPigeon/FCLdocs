---
sidebar_position: 4
title: Termux终端
---

# 前言(此教程未完成)

此教程仅适用于拥有**较高性能备用机**的玩家。  
性能差/在主力机上仅有娱乐性质，实用性趋近于**0**。  
此教程不考虑通过Linux终端访问的Proot/Chroot等各类Linux容器，此类参考Linux终端开服教程。

## 1. 安装Termux

[Termux](https://github.com/termux/termux-app/releases/latest)是一款安卓终端应用，提供了类Linux环境。

## 2. 安装Java

Android使用的是Bionic libc而不是常规Linux所使用的glibc，所以并不兼容适配Linux的Java，因此我们只能选择Termux官方提供的Java。

### 2.1 Java版本挑选

不同Java版本支持的MC范围不同：

- **JDK 8**（2014）：最经典，企业还在大量用，Minecraft 1.7–1.16.5 用这个。
- **JDK 11**（2018）：长期支持版（LTS)，不常使用。
- **JDK 17**（2021）：LTS，Minecraft 1.18–1.20.4 要求。
- **JDK 21**（2023）：LTS，Minecraft 1.20.5–1.21.11 要求。
- **JDK 25**（2025）：当前最新 LTS，Minecraft 26.1+ 要求。

其中存在由Mod/ModLoader导致的差异，如：1.16.5Forge可使用Java21, 1.12.2Cleanroom可使用Java25等。

### 2.2 安装Java

当你想好该使用哪个版本的Java后，运行以下命令以安装
```sh
apt install openjdk-{version}
```

## 3. 准备服务器端文件

在Termux中创建一个文件夹(可不选，但推荐这样做以区分服务器文件与Termux文件)

下载服务器端文件请参考[文件](/docs/开一个属于自己的服务器/1.认识服务器核心.md)
然后使用MT移动至Termux内目录

