---
title: 装修博客中
date: 2025-04-12
description: 东抄抄西抄抄
tags: 
    - blog
categories:
    - Maintain
---

[stack主题的图标](https://tabler.io/icons)

## Apr 12 聊天气泡

参考：[Yelle - hugo stack 主题美化](https://yelleis.top/p/hugo-theme-stack-beautification/)

效果：

{{< chat position="left" name="John Doe" timestamp="2025-04-12 14:30">}}
这是左边的消息内容。
{{< /chat >}}

{{< chat position="right" name="Alice" timestamp="2025-04-12 14:45" >}} 
这是右边的消息内容，测试长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长度。
{{< /chat >}}

新建`layouts/shortcodes/chat.html`

```html
  {{ if eq (.Get "position") "left" }}
<div class="chat --other">
    <div class="chat__inner">
        <div class="chat__meta">{{ .Get "name" }}&nbsp;&nbsp;&nbsp;{{ .Get "timestamp" }}</div>
        <div class="chat__text">
            {{ .Inner }}
        </div>
    </div>
</div>
{{ else if eq (.Get "position") "right" }}
<div class="chat --self">
    <div class="chat__inner">
        <div class="chat__meta" style="text-align: right;">{{ .Get "timestamp" }}&nbsp;&nbsp;&nbsp;{{ .Get "name" }}</div>
        <div class="chat__text">
            {{ .Inner }}
        </div>
    </div>
</div>
{{ end }}

<style>
    .chat {
        margin: 10px;
        padding: 10px;
        position: relative;
        /* 添加相对定位，以便定位尖角箭头 */
        transition: transform 0.2s;
        /* 添加过渡效果，使放大平滑 */
        max-width: 80%;
        min-width: 15%;
    }
    
    .chat:hover {
        transform: scale(1.05);
    }
    
    .chat.--self {
        text-align: left;
        background-color: #ecf5ff;
        color: #000000;
        border-radius: 15px;
        width: fit-content;
        margin-left: auto;
    }
    /* 尖角箭头 */
    
    .chat.--self::before {
        content: "";
        position: absolute;
        right: -18px;
        /* 调整箭头位置 */
        bottom: 5px;
        transform: translateY(-50%);
        border-width: 15px 0 0 20px;
        border-style: solid;
        border-color: transparent transparent transparent #ecf5ff;
        /* 箭头颜色与对话框背景颜色一致 */
    }
    /* 左边对话框样式 */
    
    .chat.--other {
        text-align: left;
        background-color: #ffecec;
        color: #333;
        border-radius: 15px;
        position: relative;
        width: fit-content;
    }
    /* 左边对话框的尖角箭头 */
    
    .chat.--other::before {
        content: "";
        position: absolute;
        left: -18px;
        bottom: 5px;
        transform: translateY(-50%);
        border-width: 15px 20px 0 0;
        border-style: solid;
        border-color: transparent #ffecec transparent transparent;
    }
    /* 消息元数据样式（名称和时间戳） */
    
    .chat__meta {
        font-weight: bold;
        font-size: 0.67em;
        color: #707070;
        margin-bottom: 5px;
    }
    /* 消息文本样式 */
    
    .chat__text {
        font-size: 0.9em;
        margin-left: 10px;
        word-break: break-all;
    }
    
    [data-scheme="dark"] {
        .chat.--self {
            color: #fefefe;
            background-color: #253958;
        }
        .chat.--self::before {
            border-color: transparent transparent transparent #253958;
        }
        .chat.--other {
            color: #fefefe;
            background-color: #1a1a1a;
        }
        .chat.--other::before {
            border-color: transparent #1a1a1a transparent transparent;
        }
        .chat__meta {
            color: #b1b1b1;
        }
    }
</style>

```

## 固定代码块高度

参考：[Hugo Stack 魔改美化](https://www.xalaok.top/post/stack-modify/#固定块的高度)

## remove苹果相册自带的EXIF方向信息

从MacBook的相册拖拽到vscode的时候发现渲染之后图片方向会变。询问gpt以后发现是mac自带了方向信息来保证显示正确，但hugo并不识别这个信息。遂使用命令行把方向校正一下。在mac的相册里转一下再转回来也可以。

```
cd content/page/gallery
mogrify -auto-orient *.jpeg
```

## notice

参考 [Naive Koala_一些Hugo短代码](https://www.xalaok.top/post/hugo-shortcodes/)

使用例

```
{\{< notice notice-warning >}}
你好。
{\{< /notice >}}

{\{< notice notice-info >}}
你好。
{\{< /notice >}}

{\{< notice notice-note >}}
你好。
{\{< /notice >}}

{\{< notice notice-tip >}}
你好。
{\{< /notice >}}
```

{{< notice notice-warning >}}
你好。
{{< /notice >}}

{{< notice notice-info >}}
你好。
{{< /notice >}}

{{< notice notice-note >}}
你好。
{{< /notice >}}

{{< notice notice-tip >}}
你好。
{{< /notice >}}

## neodb

[参考](https://www.xalaok.top/post/hugo-shortcodes/#配置-4)

使用

```
{\{< neodb "NeoDB 网址/豆瓣网址" >}\}
```
示例

{{< neodb "https://neodb.social/game/3abGCov9P5QHlNNqHZIlM3" >}}

## 归档页面双栏

[参考](https://www.xalaok.top/post/stack-modify/#双栏)

在 `/assets/scss/custom.scss` 中加入以下代码

```css
// 归档页面两栏
@media (min-width: 1024px) {
  .article-list--compact {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: none;
    box-shadow: none;
    gap: 1rem;

    article {
      background: var(--card-background);
      border: none;
      box-shadow: var(--shadow-l2);
      margin-bottom: 8px;
      border-radius: 16px;
    }
  }
}
```

## 美化滚动条

[参考](https://xrg.fj.cn/p/hugo-stack主题更新小记/#滚动条美化)

在`custom.scss`中添加

```css
//美化滚动条
html{
    ::-webkit-scrollbar {
        width: 20px;
      }
      
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }
      
      ::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
      }
}
```

## 相关文章添加日期

[参考](https://xrg.fj.cn/p/hugo-stack主题更新小记/#相关文章组件美化)

`layouts/partials/article-list/tile.html`中修改line 33 article details：

```html
        <div class="article-details">
            <h2 class="article-title">
                {{- .context.Title -}}
            </h2>
            <!-- 自行增加的文章发布日期 -->
            <h2 class="article-time">
                <time datetime='{{ .Date.Format "2006-01-02T15:04:05Z07:00" }}'>
                    {{- .context.Date.Format (or .Site.Params.dateFormat.published "Jan 02, 2006") -}}
                </time>
            </h2>
        </div>
```