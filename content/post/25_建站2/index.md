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

由于第一篇中的步骤实在是过于傻瓜，在第二篇做更多修改前我们需要小小地麻烦一下。

### 修改头像下面的链接

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

### 🎨 修改网站的主题颜色

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