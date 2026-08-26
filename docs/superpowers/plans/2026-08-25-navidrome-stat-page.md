# Navidrome Stat 落地页实施计划

> **执行方式**：用户已授权免审连续执行（spec → plan → 实施）。本会话内按任务顺序执行，每个任务以 `npm run check` + `npm run build`（或对应验证命令）作为测试循环，通过后立即提交。

**Goal**: 为 Navidrome Statistic v0.8.1 构建双语（EN/zh-CN）深色音频律动风落地页，部署目标 Cloudflare Pages，零第三方请求。

**Architecture**: Astro 5 静态站，i18n 原生路由（EN `/`、zh `/zh/`），每 section 一个组件、文案全部来自类型安全字典；交互（reveal/计数/主题切换/复制/下拉）集中在一个原生 `public/motion.js`，规避 CSP 内联脚本。

**Tech Stack**: Astro 5、Tailwind CSS 4（@tailwindcss/vite）、TypeScript strict、@fontsource 自托管字体、@astrojs/sitemap。无其他运行时依赖。

## Global Constraints

- 镜像名一律 `stepaniah/navidrome-statistic`，版本 `v0.8.1`（单处常量 `SITE_VERSION`）
- 零第三方请求：字体/徽章/截图全部自托管；无分析、无 Cookie、无外域资源加载
- CSP：`script-src 'self'`（无内联脚本）；`style-src 'self' 'unsafe-inline'`（允许 style 属性，与主应用策略一致）
- 组件内禁止硬编码文案；`zh` 字典类型 `typeof en`，漏译在 `astro check` 报错
- 文案禁止营销 slop：只写可验证的事实，与主仓库 README 口径一致
- 尊重 `prefers-reduced-motion`；外链 `rel="noopener noreferrer"`
- 素材来源：主仓库 `/Users/stepaniah/Developer/passion-projects/navidrome-stat/assets/`（icon.svg + 4 张截图）

---

### Task 1: 项目脚手架

**Files**: Create `package.json`、`astro.config.mjs`、`tsconfig.json`、`.gitignore`、`src/styles/global.css`、`src/pages/index.astro`（占位）

**Key code**:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://navidrome-stat.pages.dev',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  i18n: { defaultLocale: 'en', locales: ['en', 'zh'], routing: { prefixDefaultLocale: false } },
});
```

```json
// package.json scripts: dev/build/preview/check；deps: astro ^5、@astrojs/sitemap ^3、tailwindcss ^4、@tailwindcss/vite ^4、
// @fontsource-variable/space-grotesk、@fontsource-variable/inter、@fontsource-variable/jetbrains-mono、@fontsource/noto-sans-sc（400/700）
// devDeps: @astrojs/check、typescript
```

`global.css` 设计令牌（`@theme`）：`--color-ink:#0b1220`、`--color-ink-2:#101a2e`、`--color-line:#1d2c44`、`--color-mist:#8fa3bf`、`--color-frost:#dbe6f4`、品牌三色 `#f97316/#a3e635/#22d3ee`、`--color-navy:#16324f`；字体族变量；keyframes：`eq`（均衡器）、`float`（漂浮）、`progress`（进度条）、`glow`；工具类 `.glass-card`、`.text-gradient`、`.reveal`（`.is-visible` 渐入）、`@media (prefers-reduced-motion: reduce)` 全部动画降级。

**Verify**: `npm install && npm run build` 成功；`npm run check` 0 错误。Commit: `chore: scaffold astro project`。

### Task 2: i18n 字典与工具

**Files**: Create `src/i18n/ui.ts`、`src/i18n/utils.ts`

**Interfaces**: `getT(lang)` 返回 `Translation`；`localePath(lang, path)`；`languages`（含未来语言置灰数据）；`SITE_VERSION = 'v0.8.1'`；`LINKS = { github, docker, producthunt, issues, docs }` 常量。

**内容**：完整双语字典，结构：`meta`（title/description）、`nav`（features/themes/review/start/faq/docs/deploy/github）、`hero`（badge/title/subtitle/ctaDeploy/ctaGithub + NowPlaying 卡片文案）、`proof`（4 徽章）、`bento`（8 卡 title/desc）、`themes`（title/desc/note + 10 主题名）、`review`（title/desc/4 指标标签/disclaimer/cta + 示例数字）、`how`（title/3 步/note）、`start`（title/desc/3 tab 名/copy/copied/docsLink + 三段代码字面量）、`trust`（privacy 4 项/limits 3 项）、`faq`（6 问）、`footer`（ctaTitle/ctaButton/disclaimer/links/version）、`notfound`。

文案要点（事实核对自 README）：副标题说明 getNowPlaying 轮询原理；播放判定阈值默认 30s；六语言列表以主仓库 `src/static/js/messages-*.js` 实际文件数为准（实施时核对）；局限三条与 README "Important limitations" 一致。代码块内容两语言相同（compose 用 `stepaniah/navidrome-statistic:v0.8.1`、端口 39421、`/data` 卷）。

**Verify**: `npm run check`（zh 缺键会报错）。Commit: `feat(i18n): bilingual dictionaries`。

### Task 3: Base 布局 + Nav + Footer + motion.js + 404

**Files**: Create `src/layouts/Base.astro`、`src/components/nav/Nav.astro`、`src/components/footer/Footer.astro`、`public/motion.js`、`src/pages/404.astro`；Modify `src/pages/index.astro` 使用 Base

**Base.astro** props: `{ lang, title, description }`。head：charset/viewport/title/description/canonical/hreflang(en、zh、x-default)/og+twitter(og.png)/favicon.svg/sitemap index/JSON-LD SoftwareApplication。字体在 frontmatter import（fontsource css）。`<html lang>`、`<script is:inline src="/motion.js" defer>`。

**Nav**：sticky + backdrop-blur；品牌（内联 icon.svg 路径 + 名称 + 版本徽章）；锚点链接；Docs 外链（箭头图标）；语言下拉（`data-lang-btn`/`data-lang-menu`，en/zh 为链接，de/ja/fr/es 置灰 "soon"）；GitHub 图标链接；Deploy 按钮。移动端 `data-menu-btn` 折叠面板。

**motion.js**（原生、无依赖、DOMContentLoaded 入口）：
- `initReveal()`：IntersectionObserver → `[data-reveal]` 加 `.is-visible`；reduced-motion 时直接全部可见
- `initCounters()`：`[data-count]` 进入视口时 rAF + ease-out cubic + `Intl.NumberFormat(document.documentElement.lang === 'zh' ? 'zh-CN' : 'en-US')`
- `initLangMenu()` / `initMobileMenu()`：toggle class，外点/Escape 关闭
- `initThemeTabs()`：`[data-theme-btn]` ↔ `[data-theme-img]` 显隐 + aria-selected
- `initCopy()`：`[data-copy]` 取目标 `pre code` 文本 → clipboard API（execCommand 回退）→ 标签换为 copied 1.6s 后还原

**Footer**：CTA 渐变边框卡（标题 + Deploy 按钮）+ 底行（品牌 mini、免责声明"独立开源项目，与 Navidrome 官方无关联"、链接行 GitHub/Docker Hub/Product Hunt/Issues/MIT/Changelog、`v0.8.1 · MIT`）。

**404**：根级双语 404（EN 为主 + 中文一行），返回首页按钮。

**Verify**: build 后 `dist/index.html` 含 `src="/motion.js"` 且无内联 `<script>`（JSON-LD 数据块除外）；浏览器打开无 console 错误。Commit: `feat(ui): base layout, nav, footer, motion`。

### Task 4: Hero 区块

**Files**: Create `src/components/hero/Hero.astro`（含 Equalizer 与 NowPlayingCard 子标记，同文件内）

背景：CSS 细网格（linear-gradient 双向）+ 两个渐变光晕（blur-3xl 圆形，橙/青）。均衡器：28 根柱，Astro frontmatter 确定性高度数组，`style="--h:..%;--i:n"`，`animation: eq` 交错 delay，底部对齐，reduced-motion 静止。文案区：badge 胶囊、`hero.title`（关键词 `.text-gradient`）、subtitle、双 CTA（Deploy 渐变实心 → #quickstart；GitHub 描边外链）。右侧 NowPlaying 玻璃卡：渐变封面块 + 音符 SVG、曲名/艺术家、客户端·服务器行、"Listening now" 脉冲点、进度条 `animation: progress 30s linear infinite`、时间标签；卡片 `animation: float` 轻浮动。移动端卡片移至文案下方。

**Verify**: 桌面/移动截图目检；`prefers-reduced-motion` 模拟下无动画。Commit: `feat(hero): animated hero section`。

### Task 5: Proof 条 + Bento 格子墙

**Files**: Create `src/components/bento/Proof.astro`、`src/components/bento/Bento.astro`

Proof：4 个静态胶囊（Product Hunt / MIT / Docker Hub 镜像名 / 10 主题·6 语言），内联 SVG 图标，无外域图片。Bento：3 列网格（lg），行分配 `[nowplaying span2, aggregate]` `[charts, review, coverart]` `[privacy span2, themes]` `[languages span3 细条]`。nowplaying 卡：3 行迷你播放条目 + 脉冲点；aggregate 卡：SVG 迷你图（3 客户端节点 → 中心 hub → 仪表盘）；charts 卡：真实截图 `dashboard-frappe-charts.png` 圆角框（显式宽高 + lazy）；review 卡：迷你数字芯片 + `#review` 锚链接；coverart：4 个字母渐变瓦片；themes 卡：5 色点 + `#themes`；privacy：盾牌 + 3 要点；languages：语言芯片横排。全部 `data-reveal` 交错渐入。

**Verify**: build + 目检网格在 md/lg 断点不破版。Commit: `feat(bento): proof strip and feature bento`。

### Task 6: 主题互动演示

**Files**: Create `src/components/themes/Themes.astro`

浏览器窗框 mock（三个圆点 + URL 胶囊 `localhost:39421`）内叠两张截图（Frappé/Gruvbox，`data-theme-img`，绝对定位交叉淡入，激活者 `opacity-100`）；下方左侧两个 tab 按钮（`data-theme-btn`，aria-selected）；右侧 10 个主题色板圆点（各主题底色 + 代表色描边，`title` 提示），说明文字注明"两套真实截图，其余为色板"。数据数组写在 frontmatter：名称 + 底色 + 强调色（Catppuccin 四色、Nord、Dracula、Tokyo Night、Gruvbox、Solarized Dark/Light 的公认值）。

**Verify**: 点击 tab 切换截图；键盘可聚焦。Commit: `feat(themes): interactive theme showcase`。

### Task 7: 年度回顾故事段

**Files**: Create `src/components/review/YearReview.astro`

整宽渐变段（ink → navy 色调 + 顶部光晕）。标题/副标题；4 个大数字（`data-count="3847|412|486|21"`，标签 plays/hours/artists/day streak 双语）；下方 "Top track" 模拟行（字母瓦片 + 曲名 + 迷你条形）；`review.disclaimer` 明确"示例数据"；CTA 按钮 → GitHub。数字用 `tabular-nums`。

**Verify**: 滚动触发计数一次；reduced-motion 直接显示最终值（motion.js 已处理：reduced 时立即置终值）。Commit: `feat(review): wrapped-style year review strip`。

### Task 8: 工作原理 + 快速开始

**Files**: Create `src/components/how/HowItWorks.astro`、`src/components/start/QuickStart.astro`

How：3 列步骤（渐变编号圆 + 图标：天线/计时器/数据库），移动端纵向、lg 横向带虚线连接；底部 note 条（OpenSubsonic playbackReport）。QuickStart：终端卡（红黄绿点 + 文件名标题）、3 个 tab（compose.yaml / docker run / .env，`data-theme-btn` 同款机制复用 `data-start-tab`）、3 个 `<pre><code>`（内容来自字典 `start.code.*`，HTML 转义）、每块右上复制按钮（`data-copy`）；下方链接 → GitHub README 配置表 + 一行提示（配置 STATS_API_TOKEN 后首次访问需在登录页输入）。

**Verify**: 复制按钮写入剪贴板成功（浏览器实测）；tab 切换正常。Commit: `feat(start): how-it-works and quickstart`。

### Task 9: 信任段 + FAQ

**Files**: Create `src/components/trust/Trust.astro`、`src/components/faq/Faq.astro`

Trust：双卡（"Private by default" 盾牌 4 项 check 图标 / "Honest limitations" 3 项 info 图标），文案与 README 口径一致。FAQ：原生 `<details><summary>` 手风琴 6 项，plus 图标旋转，`content-visibility` 优化。

**Verify**: 目检 + 键盘操作。Commit: `feat(trust): privacy, limitations, faq`。

### Task 10: 页面组装 + SEO

**Files**: Modify `src/pages/index.astro`、Create `src/pages/zh/index.astro`

两页结构相同：Base(lang, meta) → Nav → main：Hero/Proof/Bento/Themes/YearReview/HowItWorks/QuickStart/Trust/Faq（各 section id：features/themes/review/how/quickstart/trust/faq）→ Footer。JSON-LD 在 Base 内按 props 输出。hreflang 互指；og:locale en_US/zh_CN + alternate。

**Verify**: `npm run check && npm run build`；`dist/` 含 `index.html`、`zh/index.html`、`404.html`、`sitemap-index.xml`。Commit: `feat(pages): assemble bilingual landing pages`。

### Task 11: 静态资产

**Files**: Create `public/favicon.svg`（复制主仓库 assets/icon.svg）、`public/_headers`、`public/og.png`、`public/apple-touch-icon.png`、`public/screenshots/*.png`；Modify spec 中 motion.ts → `public/motion.js` 表述（文档与实现一致）

- 截图：从主仓库复制 4 张 PNG → `sips -Z 1600` 压宽
- `_headers`：CSP（script-src 'self'；style-src 'self' 'unsafe-inline'；img-src 'self' data:；font-src 'self'；connect-src 'self'；object-src/base-uri 'none'；frame-ancestors 'none'；form-action 'none'）+ nosniff + Referrer-Policy strict-origin-when-cross-origin + X-Frame-Options DENY + Permissions-Policy
- og.png：临时 `/tmp/og.html`（1200×630 深底 + 渐变标题 + icon），用主仓库已装 Playwright 截图：`npx playwright screenshot --viewport-size=1200,630 file:///tmp/og.html public/og.png`；apple-touch-icon 同法 180×180

**Verify**: `grep -rEo 'https?://[^"'\'' )]+' dist --include='*.html' | sort -u` 输出仅含允许锚链接域（github.com、hub.docker.com、producthunt.com、opensource.org、自站 canonical）；无任何 `<script src=http` / `url(http` 资源外链。Commit: `feat(assets): self-hosted static assets and security headers`。

### Task 12: 端到端验证 + README + 收尾

- `npm run check && npm run build` 0 错误
- `npm run preview` + 浏览器实测：EN/ZH 首页全区块、语言下拉互切、主题 tab、复制按钮、FAQ 手风琴、移动视口（375px）布局、reduced-motion
- Lighthouse（如可用）Performance ≥ 95 目检记录
- README.md（英文，面向 GitHub 公开仓库）：项目简介、本地开发（npm ci/dev/build/check）、Cloudflare Pages 部署步骤、站点结构说明、素材来源声明
- 检查并删除一切无用/废弃文件；最终提交 `docs: readme and final polish`

**Interfaces（全局）**：字典键见 Task 2；`data-reveal`、`data-count`、`data-lang-btn/menu`、`data-menu-btn/panel`、`data-theme-btn/img`、`data-start-tab`、`data-copy` 为 motion.js 与组件间的完整契约，任何组件不得引入其他 JS 入口。

**2026-08-26 修订**：主题演示由真实截图改为纯 CSS 模拟仪表盘（`src/data/themes.ts` 十套色板 + `--dm-*` 变量），契约新增 `data-theme-pill`、`data-theme-scope`、`data-review-open/close`、`data-np-fill`、`data-np-current`；年度回顾 CTA 打开站内 demo 弹窗而非外跳 GitHub；截图目录已删除。
