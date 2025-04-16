---
title: 草履虫看了也能建自己的个人网站（2）
date: 2025-04-02
description: 写博客的应该很难再找一个像我一样懒的
tags: 
    - blog
categories:
    - Maintain
---

## 更多设置

由于第一篇中的步骤实在是过于傻瓜，在第二篇做更多修改前我们需要小小地介绍一下原理。让我们再次请出`gpt-4o`：

### 💡 什么是 Stack 的主题覆盖（override）？

Stack 是一个现成的 Hugo 网站主题，它决定了你网站的颜色、排版、按钮样式、文章卡片长什么样等等。

当你使用 Stack 主题时，其实你的网站是“照着它的模板来渲染”的。

但有些时候你会觉得：

> “我想把按钮改成圆的，我想让文章卡片颜色再浅一点，我想让文章页上面不要显示作者名……”

这些功能，Stack 主题已经有默认设置，但我们**可以自己做出修改**。这就叫做：

> ✅ **覆盖默认主题文件（override）**


### 🧠 原理其实很简单：

**Hugo 会优先使用你自己写的文件，如果没有，才会用主题自带的。**

比如：

| 我自己写的文件 | 主题里自带的文件 | 最终会用哪一个？ |
|----------------|------------------|------------------|
| `layouts/_default/single.html` | `themes/stack/layouts/_default/single.html` | ✅ 用你写的 |
| `assets/scss/_variables.scss` | `themes/stack/assets/scss/_variables.scss` | ✅ 用你写的 |

你只要在项目里新建相同名字的文件并放到对应位置，就可以“盖掉”主题原来的设置。


## ✏️ 举个具体例子：

比如 Stack 默认的 tag 是蓝绿色，如果你想改成粉红色，只需要在你的项目中新建这个文件：

```
assets/scss/_variables.scss
```

写上你自己的颜色设置：

```scss
$defaultTagBackgrounds: #ffc0cb, #ffb6c1, #f9c2d1, #fcd3e1, #ffe4e9;
$defaultTagColors: #000, #000, #000, #000, #000;
```

保存之后，重新部署网站，你就会看到 tag 的颜色变啦！

### ✅ 总结一下原理：

> **Hugo 的优先级是：你自己的项目文件 > 主题自带的文件**  
> 所以你想修改主题样式，不用动原始主题代码，只要在项目中建同名文件就可以覆盖！

这种做法的好处是：

- 你的网站升级主题时不会丢自定义设置；
- 不需要会编程，只要复制粘贴文件、改一点点文字或颜色就行；
- 所有自定义都集中在你自己的仓库，**容易管理，容易回退**。

## 修改头像下面的链接

`config/_default/menu.toml`掌管头像下面那几个icon。你可以直接删掉，或者换上你喜欢的网站。

网站图标默认仓库里并没有，去[这个网站](https://tabler.io/icons)找你喜欢的。

下载好一个svg文件，放入`assets/icons`文件夹（没有就新建一个）（右键有新建文件选项）（你可以直接拖拽进来）（我下载的是`device-gamepad.svg`）

```toml
[[social]]
identifier = "github" //网站名
name = "GitHub" //还是网站名
url = "https://github.com/CaiJimmy/hugo-theme-stack" //你要改的链接

[social.params]
icon = "brand-github" //你刚刚下载的icon的名字
```

所以经过一番修改，有我的steam主页链接的图标就诞生了！

这是我的代码：

```toml
[[social]]
identifier = "Steam"
name = "Steam"
url = "https://steamcommunity.com/profiles/76561199051896101/"

[social.params]
icon = "steam" //我把svg图片重命名为steam了
```

## 🎨 修改网站的标签颜色

接下来我们来改一下网站配色，让你的网站更有个性。

找到左边的 `assets` 文件夹，展开它，点进去后依次打开 `scss > _variables.scss`

前两行：

```scss
$defaultTagBackgrounds: #57b4ba, #b9614f, #015551, #b14b8d, #5e5cbd;
$defaultTagColors: #fff, #fff, #fff, #fff, #fff; //白色，黑色是#000
```

这几行定义了你的网站标签颜色。如果你想要换颜色，可以把颜色代码改成你喜欢的。例如你想用粉色系：

```scss
$defaultTagBackgrounds: #e091c7, #d87ca0, #ffb6c1, #f19cb5, #fcd3e1;
```

你也可以搜索“hex color picker”来找你喜欢的颜色代码。

{{< notice notice-note >}}
每个颜色代码前面都有 `#`，这是16进制的hex颜色值。如果你想换风格，只需要替换这些颜色就行了。
{{< /notice >}}
