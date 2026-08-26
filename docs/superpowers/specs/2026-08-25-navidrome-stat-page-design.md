# Navidrome Stat 落地页设计文档

日期：2026-08-25
状态：已确认（用户授权免审持续推进）

## 背景与目标

为开源项目 [Navidrome Statistic](https://github.com/StepaniaH/navidrome-stat)（当前推广版本 v0.8.1）建设官方落地页网站。本项目是独立仓库，与主工具仓库分离。

目标：

1. 向自托管社区展示产品特性与气质，引导访客完成 Docker 部署（转化入口：GitHub / Docker Hub / Product Hunt）
2. 视觉上"炫酷"：深色音频律动风，与仪表盘产品一脉相承但更聚焦
3. 工程上 i18n 优先：英文 + 简体中文，结构化支持未来增加语言
4. 为后续站内 Docs tab 预留扩展点

## 已确认决策

| 决策点 | 结论 |
| --- | --- |
| 网站定位 | 炫酷营销落地页；后续增加 Docs tab |
| Docker 镜像名 | `stepaniah/navidrome-statistic`（用户消息中的 `navidrome-stat` 为笔误，404） |
| 部署 | Cloudflare Pages（Git 集成，静态输出） |
| 语言 | EN（默认，`/`）+ 简体中文（`/zh/`），下拉切换，i18n-first 工程 |
| 技术栈 | Astro 5 + Tailwind CSS 4 + TypeScript，零框架运行时 |
| 视觉风格 | 深色音频律动风（品牌渐变 + 均衡器动效） |
| 截图素材 | 复用主仓库 4 张真实截图 + 代码模拟卡片（年度回顾段不用真截图） |
| 页面方案 | 方案 A 沉浸式单页滚动 + 方案 B Wrapped 数字动画精华 |

## 页面结构（自上而下）

1. **导航栏**：品牌 icon + "Navidrome Stat" + v0.8.1 徽章；锚点 Features / Themes / Review / Quick start / FAQ；Docs 项外链 GitHub `docs/`（站内文档就绪后替换为内部路由）；语言下拉（English / 简体中文，未来语言置灰）；GitHub 链接 + Deploy 主 CTA。移动端折叠菜单。
2. **Hero**：大标题 + 副标题 + 双 CTA（Deploy with Docker / View on GitHub）；背景律动均衡器柱 + 品牌渐变光晕 + 细网格；漂浮模拟 "Now Playing" 卡片（进度条动画）。EN 主标题 "Every play, counted."；中文主标题 "每一次播放，都算数。"
3. **社会证明条**：Product Hunt、MIT、Docker Pulls、10 主题 · 6 语言 · 任意 Subsonic 客户端。徽章全部静态自托管，不引用第三方域名。
4. **Bento 特性格子墙**：8 张不对称卡片——Now Playing 实时（动效模拟）、多客户端/多服务器聚合（迷你架构图）、深度图表（真实截图裁剪）、年度回顾（锚点跳转）、封面代理缓存、10 主题（色点交互）、6 语言、隐私自主权（导出/删除/token）。
5. **主题互动演示**：Catppuccin Frappé 与 Gruvbox 两张真实截图切换；10 个主题色板圆点（取各主题代表色），其余 8 主题仅色卡呈现，不伪造截图。
6. **年度回顾故事段**（Wrapped 精华）：整宽渐变段，滚动触发大数字滚动动画（plays / listening time / artists / streak），明确标注 "Sample data / 示例数据"，结尾 CTA 指向 GitHub。
7. **工作原理**：三步图——轮询 `getNowPlaying` → 阈值判定与会话追踪 → SQLite + 仪表盘；注明 OpenSubsonic `playbackReport` 增强与暂停宽限逻辑。
8. **快速开始**：终端风格卡片，Tab：docker compose（与 README 一致，镜像 `stepaniah/navidrome-statistic`，端口 39421）/ docker run / .env；一键复制按钮；链接到 GitHub 完整配置表。
9. **隐私与诚实局限**：左栏隐私（数据本地 SQLite、按用户导出/导入/删除、可选 token 认证、零遥测）；右栏已知局限（单实例、SQLite 明文、无内置 TLS 需反代）。措辞与主仓库 README 保持一致。
10. **FAQ + 页脚**：手风琴 5–6 问（客户端兼容、多服务器、播放计数规则、Jellyfin/Airsonic 兼容、数据存放、资源占用）；页脚大 CTA + 免责声明"独立开源项目，与 Navidrome 官方无关联" + GitHub / Docker Hub / Product Hunt / MIT / Issues 链接。

## 视觉系统

- **色彩**：深空海军底 `#0B1220` 级；品牌渐变取自 icon：`#F97316`（橙）→ `#A3E635`（青柠）→ `#22D3EE`（青蓝）；描边深海军 `#16324F`；卡片半透明玻璃拟态 + 1px 渐变描边。
- **字体**（全部经 @fontsource 自托管，构建期内联打包，无字体 CDN）：Space Grotesk（英文展示标题）、Inter（正文）、JetBrains Mono（代码）、Noto Sans SC（中文，unicode-range 分片按需加载）。
- **动效**：纯 CSS keyframes + IntersectionObserver；滚动渐入、数字滚动、均衡器律动、进度条动画；统一由原生 `public/motion.js` 管理（CSP 禁内联脚本）；尊重 `prefers-reduced-motion`。
- **气质**：与仪表盘的圆角卡片、柔和描边、粉彩点缀一致，但底色更暗、更聚焦。

## 技术架构

```
navidrome-stat-page/
├── astro.config.mjs            # i18n 路由 + sitemap
├── public/
│   ├── _headers                # CSP 等安全响应头（Cloudflare Pages）
│   ├── favicon.svg             # 复用品牌 icon
│   ├── og.png                  # 社交分享图（实施期生成）
│   └── screenshots/            # 自主仓库复制的 4 张截图
├── src/
│   ├── i18n/
│   │   ├── ui.ts               # en 为 schema 源，zh: typeof en
│   │   └── utils.ts            # getT(locale)
│   ├── layouts/Base.astro      # head/SEO/hreflang/Nav/Footer
│   ├── components/             # 每 section 一组件，按区块分子目录
│   │   ├── nav/  hero/  bento/  themes/  review/  how/  start/  trust/  faq/  footer/
│              # IntersectionObserver 统一入口
│   ├── styles/global.css       # 设计令牌（CSS 变量）+ Tailwind 4
│   └── pages/
│       ├── index.astro         # EN
│       ├── zh/index.astro      # 中文
│       └── 404.astro
└── package.json
```

组件边界：每个 section 组件只接收 `t`（翻译对象）与 locale props，不直接读取字典；组件可独立理解与替换。依赖仅 `astro`、`tailwindcss`、`@tailwindcss/vite`、`@astrojs/sitemap`、`@fontsource/*`、`@astrojs/check` + `typescript`（校验用）。

## i18n 工程

- Astro 原生 `i18n`：`defaultLocale: 'en'`，`prefixDefaultLocale: false` → EN `/`，中文 `/zh/`。新增语言 = 新增字典 + 路由前缀，零重构。
- 类型安全：`zh` 字典类型标注 `typeof en`，漏译键在 `astro check` 构建期报错。
- 切换器：下拉项以各自文字显示（English / 简体中文），跳转对等路径；`<html lang>`、canonical、`hreflang`、`og:locale` 按 locale 输出。
- 组件内禁止硬编码文案；数字/日期用 `Intl` 按 locale 格式化。
- 字典结构预留 DE/JA/FR/ES（与主项目本地化路线一致），切换器中置灰显示。

## 隐私与安全（硬性要求）

- **零第三方请求**：字体自托管（@fontsource）、徽章静态自托管 SVG、截图自托管；页面运行时不向任何第三方域名发起请求。
- **无分析脚本**：默认不接入任何统计；如未来需要，仅考虑 Cloudflare Web Analytics（隐私友好），需另行决策。
- **安全响应头**：`public/_headers` 配置 CSP（仅 self，无内联脚本白名单需求——Astro 默认外链脚本；如实施中出现内联脚本需求，改用 `is:inline` 最小化并评估 CSP）、`X-Content-Type-Options: nosniff`、`Referrer-Policy: strict-origin-when-cross-origin`、`X-Frame-Options: DENY`。
- 外链一律 `rel="noopener noreferrer"`。
- 不收集任何访客数据；不使用 Cookie。

## SEO 基线

每页 title/description 按语言独立；canonical + hreflang（en/zh/x-default）；OG/Twitter 卡片（自托管 og.png）；`@astrojs/sitemap`；JSON-LD `SoftwareApplication`（name、applicationCategory、operatingSystem、offers、license、author）。

## 验证策略

- 最低门槛：`npm run check`（astro check：类型 + 字典完整性）与 `npm run build` 通过。
- 浏览器实测：桌面 + 移动视口下双语页面渲染、语言切换、锚点导航、复制按钮、动效降级（reduced-motion）。
- 性能目标：纯静态 + 字体 swap + 截图懒加载 + 显式宽高防 CLS，Lighthouse Performance ≥ 95。
- 隐私验证：构建产物中无任何第三方 URL 引用（grep 检查 `https://` 外链仅限允许的页脚跳转链接，非资源加载）。

## 部署

- GitHub 新建 `navidrome-stat-page` 仓库并推送；Cloudflare Pages Git 集成：构建命令 `npm run build`，输出 `dist/`。
- 默认 `*.pages.dev` 域名；自定义域名后续可选。
- 版本徽章 v0.8.1 为静态内容，主仓库发新版时随文案一并更新（单处常量）。

## 未来扩展（本期不实施）

- Docs tab：Astro Content Collections + `/docs`、`/zh/docs` 路由；导航项当前外链 GitHub docs 目录，届时替换。
- 更多语言（DE/JA/FR/ES）。

## 非目标

- 无 CMS、无后端、无服务端渲染、无分析、无 A/B 测试。
- 不建站内文档内容（仅预留结构与导航）。
- 不做仪表盘功能复刻或在线 Demo（模拟卡片仅作展示）。
- 不引入 React/Vue 等运行时框架与重型动画库。
