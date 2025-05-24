---
title: 赛博房子装修计划（4）自定义emoji
date: 2025-05-24
description: 嘿嘿 我要把网页塞满猫
image: nobeko.png
tags: 
    - blog
categories:
    - Maintain
series: 
    - 主题美化
series_order: 4
---

{{< seriesbox >}}

受[如何在Hugo博客中使用Twemoji](https://gregueria.icu/posts/2025-05-23-twemoji/)的启发，给博客加了自定义的emoji`毕竟默认emoji的风格我觉得挺好 没有改成twemoji的必要`，用法和其它emoji一样，十分满意:nobeko_music:

:nobeko_stressed: :nobeko_sleep: :nobeko_orz: :nobeko_ok: :nobeko_lick: :nobeko_kelian: :nobeko_hearts::nobeko_gift::nobeko_genki::nobeko_devil:

## 准备工作

1. 下载并放置表情
   将所有自定义emoji文件放到项目根目录：

```
static/emoji/
├── nobeko_cry.png
├── nobeko_devil.png
└── ……
```
2. 启用 Goldmark unsafe mode:nobeko_question: 

在 `config.toml` 中开启 raw HTML 渲染：

```toml
[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true
```

## 核心改动

{{< notice notice-note>}}
本人没有获取新版本stack的需求所以直接在原来的文件上改了，有对应需求的记得新建一个content.html
{{< /notice >}}

在 **`layouts/partials/article/components/content.html`** 中，把原来只处理 `<table>` 的这段：

```html
<section class="article-content">
  {{ $wrappedTable := printf "<div class=\"table-wrapper\">${1}</div>" }}
  {{ .Content
     | replaceRE "(<table>(?:.|\n)+?</table>)" $wrappedTable
     | safeHTML }}
</section>
```

替换成同时处理 `\:name\:` 和表格的一条龙服务:nobeko_lightbulb:：

```html
<section class="article-content">
  {{/* 1) 匹配 \:emoji_name\: */}}
  {{ $emojiPattern := `:([A-Za-z0-9_-]+):` }}
  {{/* 2) 包裹表格 */}}
  {{ $tableWrapper := printf "<div class=\"table-wrapper\">${1}</div>" }}

  {{ .Content
     | replaceRE $emojiPattern `<img class="emoji" src="/emoji/$1.png" alt=":$1:" loading="lazy">`
     | replaceRE "(<table>(?:.|\n)+?</table>)" $tableWrapper
     | safeHTML
  }}
</section>
```

## 效果展示

在 Markdown 中写（记得去掉`\`）：

```markdown
今天心情：\:nobeko_cry\: 
```

渲染后得到:nobeko_thumbup:：

```html
<p>今天心情：
  <img class="emoji" src="/emoji/nobeko_cry.png" alt=":nobeko_cry:" loading="lazy">
</p>
```

配合已有的 SCSS：

```scss
img.emoji {
  height:        1.8em;
  width:         1.8em;
  margin:        0 .15em;
  vertical-align: -0.2em;
}
```

表情就会与文字完美对齐:nobeko_wink:


至此，只要把新表情放到 `static/emoji/`，在文章里 `:表情名:` 就大功告成啦！:nobeko_whenshishiseesjiaojiao:


## 彩蛋：如何下载毛象实例的表情包

如果你还没准备好 `static/emoji/` 目录，可以用下面脚本从Mastodon实例批量拉取所有自定义 emoji：

### Mastodon站点（以活吧为例）

#### 命令行版本：

**步骤 1：获取所有 emoji 列表**

```bash
#!/usr/bin/env bash
# 将下面 URL 换成你的实例域名和 API 路径
INSTANCE="mastodon.example.com" # 比如活吧是 alive.bar/api/v1/custom_emojis
API="https://${INSTANCE}/api/v1/custom_emojis"
OUT="all_emojis.json"

# 拉取全部
curl -s "${API}?limit=80" -o "${OUT}"
echo "已保存完整列表到 ${OUT}"
```

**步骤 2：根据分类或名称批量下载**

1. **按分类下载**（例如只下载 category="小豆泥"）：

   ```bash
   mkdir -p static/emoji
   jq -r '.[] 
       | select(.category=="小豆泥") 
       | .url' all_emojis.json \
     | while read -r url; do
         name=$(basename "${url%%\?*}")
         echo "下载分类 小豆泥 的表情：${name}"
         curl -sL "$url" -o "static/emoji/${name}"
       done
   ```

2. **按名称列表下载**（例如只下载某一个emoji）：

   ```bash
   mkdir -p static/emoji
   names=(emojiname) # 更改名字
   for name in "${names[@]}"; do
     url=$(jq -r --arg n "$name" '.[] 
         | select(.shortcode==$n) 
         | .url' all_emojis.json)
     if [ -n "$url" ]; then
       echo "下载表情：${name}"
       curl -sL "$url" -o "static/emoji/${name}${url##*.}"
     else
       echo "⚠️ 未找到表情：${name}"
     fi
   done
   ```

#### python版本

```python
import os
import json
import requests

resp = requests.get('https://alive.bar/api/v1/custom_emojis')
resp.raise_for_status()
data = resp.json()

DEST_DIR = 'static/emoji'
os.makedirs(DEST_DIR, exist_ok=True)

for item in data:
    if item.get('category') == '小豆泥':
        shortcode = item['shortcode']
        url      = item['url'] 
        ext      = os.path.splitext(url)[1] 
        out_path = os.path.join(DEST_DIR, f"{shortcode}{ext}")

        try:
            r = requests.get(url, stream=True)
            r.raise_for_status()
            with open(out_path, 'wb') as f:
                for chunk in r.iter_content(1024):
                    f.write(chunk)
            print(f"✔ Downloaded {shortcode}{ext}")
        except Exception as e:
            print(f"✖ Failed {shortcode}: {e}")
```

### Misskey站点（以星屑为例）

含有表情信息的链接是`https://stelpolva.moe/api/emojis`，点进去右键另存为`emojis.json`，之所以不直接写在代码里是因为正好通过api接口看一下具体的分类名叫什么，而且如果只有一两个emoji需要下载的话，直接复制链接在浏览器打开另存为算了，写代码干什么:nobeko_hmm:

```python
import json
import os
import requests

# 加载 JSON 文件
with open("emojis.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# 从中提取 emoji 列表
emoji_list = data.get("emojis", [])

# 筛选 category 为 "catmeme"
target_emojis = [e for e in emoji_list if e.get("category") == "catmeme"]

# 准备保存路径
SAVE_DIR = "emojis"
os.makedirs(SAVE_DIR, exist_ok=True)

# 下载表情包
for emoji in target_emojis:
    name = emoji["name"]
    url = emoji["url"]
    ext = os.path.splitext(url)[-1] or ".png"
    filename = f"{name}{ext}"

    try:
        print(f"Downloading {name}...")
        response = requests.get(url)
        response.raise_for_status()
        with open(os.path.join(SAVE_DIR, filename), "wb") as f:
            f.write(response.content)
    except Exception as e:
        print(f"❌ Failed to download {name}: {e}")

print(f"\n✅ 共下载 {len(target_emojis)} 个表情包，保存在 '{SAVE_DIR}/'")

```

运行完毕后，`static/emoji/` 目录下即含所需的emoji，可直接在文章中使用两个引号！

{{<swatches "#FF218C" "#FFD800" "#21B1FF">}}

:pan_sparkles:作为pan，今天是pan day，为了庆祝特意从双站偷了emoji！鼓掌:pan_heart::pan_sexual::pan_sparkles:

{{< seriesbox >}}

{{< post-nav >}}
