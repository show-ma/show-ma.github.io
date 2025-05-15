---
title: 赛博房子装修计划（3）极乐迪斯科
date: 2025-05-15
description: 此游戏因为文本太神天天被二游抄，今天我也抄抄
image: 2.png
tags: 
    - blog
categories:
    - Maintain
---

>封面来自[vg百科](https://www.vgbaike.com/disco_elysium/baike787)

## 游戏对话风格着色

其实就是html标签，插入md过程稍显复杂，先凑合用着。[极乐迪24个技能汇总](https://www.vgbaike.com/disco_elysium/baike787)

效果：

<span class="disco-blue">故弄玄虚</span> <span class="disco-grey">[极难:失败]</span> - 不幸的是，您的成就当中似乎没什么值得一提的。您应该求助于谎言了。

<span class="disco-purple">内陆帝国</span> <span class="disco-grey">[简单:成功]</span> - 是时候面对源头了。不要害怕，因为宇宙的力量会支持你完成这次的超自然任务。

<span class="disco-yellow">五感发达（视觉）</span> <span class="disco-grey">[中等:成功]</span> - 一群附近的海鸥被轰鸣的电台吓了一跳，惊慌飞起。

<span class="disco-pink">天人感应</span> - 抬头望向天空，冰冷的雨水从你的头发上滴落。

在`custom.scss`添加：（为了同时适配light/dark mode对原作颜色进行了一些更改）

```scss
.disco-purple {
    color: #8266d1;
    font-weight: bold;
}

.disco-pink {
color: #c75372;
font-weight: bold;
}

.disco-grey {
    color: #a0a0a0
}

.disco-blue {
    color: #4ea7b7;
    font-weight: bold;
  }
  
.disco-yellow {
color: #c39f2d;
font-weight: bold;
}
```

使用：

```html
<span class="disco-blue">故弄玄虚</span> <span class="disco-grey">[极难:失败]</span> - 不幸的是，您的成就当中似乎没什么值得一提的。您应该求助于谎言了。

<span class="disco-purple">内陆帝国</span> <span class="disco-grey">[简单:成功]</span> - 是时候面对源头了。不要害怕，因为宇宙的力量会支持你完成这次的超自然任务。

<span class="disco-yellow">五感发达（视觉）</span> <span class="disco-grey">[中等:成功]</span> - 一群附近的海鸥被轰鸣的电台吓了一跳，惊慌飞起。

<span class="disco-pink">天人感应</span> - 抬头望向天空，冰冷的雨水从你的头发上滴落。
```

## 评论区空状态文案

众所周知，评论输入框的placeholder是很容易自己更改的。但是，空状态的文案`<dev class="wl-empty">`，很难改！

[Waline](https://waline.js.org/) 作为评论系统默认在无评论时显示：

```
来发评论吧～
```

这个文案太普通了，看了就不想让人评论。

于是我想换成被迪腌入味的文案。

我用技能描述和游戏文本训练了一个GPTs，生成了这些文案，我很满意。我不能直接分享GPTs的链接`上面是我的真名`，但可以把需要的文件和prompt打包发给你。

> 以下内容由GPT-4o生成，当然代码也是它写的，自己写的东西自己讲（什么

### ✅ 目标

* 自定义无评论时的提示语句
* 通过 Hugo 管理一组空状态文案池
* 支持 HTML 样式（例如 `<span class="disco-blue">技能名</span>`）
* 保证每次构建随机挑选一句
* 样式轻盈，不打扰内容主角

### 🧱 技术实现方案

#### 1. 使用 `data/emptyMessages.toml` 存储文案池

```toml
[[messages]]
text = "你盯着空白评论框。它像马丁内斯冬日的海——无波，无声，也无望。\n<span class=\"disco-purple\">平心定气</span><span class=\"disco-grey\">[普通：成功]</span> — 这只是互联网的一页。它不会咬你。你能活着离开它，不必留下任何话。"

[[messages]]
text = "这里曾有一次请求响应，但你来得太迟了。\n<span class=\"disco-pink\">天人感应</span><span class=\"disco-grey\">[困难：成功]</span> — 服务器梦见了人类，梦见了他们分享、评论、点赞……然后一觉醒来，只有你。"
```

#### 2. 在构建阶段随机挑选一句 Hugo 模板内注入

```gohtml
{{- $msgs := shuffle site.Data.emptyMessages.messages | default slice -}}
{{- $emptyText := (index $msgs 0).text | default "这里空无一物。" -}}
```

#### 3. 配置注入 Waline 的 `locale.empty` 字段

```gohtml
{{- $locale := index $config "locale" | default dict -}}
{{- $locale = merge $locale (dict "empty" $emptyText) -}}
{{- $config = merge $config (dict "locale" $locale) -}}
```

---

### ⚠️ Waline 的行为限制说明

虽然 Waline 提供了 `locale.empty` 字段用于配置空状态提示，但在部分版本中（尤其是非自定义语言环境，如 `"zh-CN"`），它会**优先加载内置语言包中的默认提示**，导致你配置的 `empty` 被忽略。

为了保证自定义文案能显示，我们添加了一段 **前端 fallback 脚本**，在页面加载后主动查找 `.wl-empty` 元素，并替换其内容为我们传入的那句。

---

## 省流：完整 `waline.html`和`custom.scss`

```gohtml
<!-- Waline 样式与脚本 -->
<link href="https://unpkg.com/@waline/client@v2/dist/waline.css" rel="stylesheet" />
<script src="https://unpkg.com/@waline/client@v2/dist/waline.js"></script>

<!-- 评论容器 -->
<div id="waline" class="waline-container"></div>

{{- with .Site.Params.comments.waline -}}

  {{- $replaceKeys := dict
    "serverurl" "serverURL"
    "requiredmeta" "requiredMeta"
    "wordlimit" "wordLimit"
    "pagesize" "pageSize"
    "imageuploader" "imageUploader"
    "texrenderer" "texRenderer"
  -}}

  {{- $config := dict "el" "#waline" "dark" `html[data-scheme='dark']` -}}

  {{- range $key, $val := . -}}
    {{- if ne $val nil -}}
      {{- $k := default $key (index $replaceKeys $key) -}}
      {{- $config = merge $config (dict $k $val) -}}
    {{- end -}}
  {{- end -}}

  {{- $msgs := shuffle site.Data.emptyMessages.messages | default slice -}}
  {{- $emptyText := (index $msgs 0).text | default "这里空无一物。" -}}

  {{- $locale := index $config "locale" | default dict -}}
  {{- $locale = merge $locale (dict "empty" $emptyText) -}}
  {{- $config = merge $config (dict "locale" $locale) -}}

  <script>
    const config = {{ $config | jsonify | safeJS }};
    Waline.init(config);

    // 替换 Waline 默认空状态提示
    const observer = new MutationObserver(() => {
      const empty = document.querySelector('.wl-empty');
      if (empty && empty.textContent.includes('来发评论吧')) {
        empty.innerHTML = config.locale.empty.replace(/\n/g, "<br>");
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  </script>

{{- end -}}
```

`custom.scss`

```scss
  .waline-container {
    background-color: var(--card-background);
    border-radius: var(--card-border-radius);
    box-shadow: var(--shadow-l1);
    padding: var(--card-padding);
    --waline-font-size: var(--article-font-size);
  }
  .waline-container .wl-count {
    color: var(--card-text-color-main);
  }
  .wl-empty {
  font-size: 0.8em;
  color: var(--body-text-color); 
  opacity: 0.8;
  }
```

---

想实现刷新一次换一句的效果，但 DOM 异步加载顺序不稳定，最终决定不加，凑合用！

下一步计划：

- 评论数为 1 的特殊提示（eg.“你是唯一说话的人”）
- “再给我一句”按钮切换空文案

如果未来 Waline 提供更明确的 locale 合并策略或 hook，会考虑进一步简化这部分逻辑。现在着实有点丑陋……
