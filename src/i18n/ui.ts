export type Language = 'en' | 'zh' | 'zh-TW' | 'ja' | 'fr' | 'es';

export const LANGUAGES: Record<Language, string> = {
  en: 'English',
  zh: '简体中文',
  'zh-TW': '繁體中文',
  ja: '日本語',
  fr: 'Français',
  es: 'Español',
};

export const FUTURE_LANGUAGES: string[] = [];

export const SITE_VERSION = 'v0.8.1';

export const LINKS = {
  github: 'https://github.com/StepaniaH/navidrome-stat',
  docker: 'https://hub.docker.com/r/stepaniah/navidrome-statistic',
  producthunt: 'https://www.producthunt.com/products/navidrome-stat',
  issues: 'https://github.com/StepaniaH/navidrome-stat/issues',
  docs: 'https://github.com/StepaniaH/navidrome-stat/tree/main/docs',
  config: 'https://github.com/StepaniaH/navidrome-stat#configuration',
  changelog: 'https://github.com/StepaniaH/navidrome-stat/blob/main/CHANGELOG.md',
  license: 'https://github.com/StepaniaH/navidrome-stat/blob/main/LICENSE',
} as const;

const en = {
  meta: {
    title: 'Navidrome Stat — self-hosted listening stats for Navidrome',
    ogImageAlt: 'Navidrome Stat — self-hosted listening stats dashboard preview',
    description:
      'One dashboard for every play across your Subsonic clients, devices, and Navidrome servers. Listening time, trends, rankings, and a year in review. Self-hosted, open source, MIT.',
  },
  nav: {
    features: 'Features',
    themes: 'Themes',
    review: 'Year in review',
    start: 'Quick start',
    faq: 'FAQ',
    docs: 'Docs',
    deploy: 'Deploy',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    language: 'Language',
    soon: 'soon',
    skip: 'Skip to content',
  },
  hero: {
    badge: 'Self-hosted · Open source · MIT',
    titleA: 'Every play, ',
    titleB: 'counted.',
    subtitle:
      'Navidrome Stat polls the getNowPlaying API of your Navidrome servers and turns it into one self-hosted dashboard — listening time, trends, rankings, and a year in review. Your data never leaves your machine.',
    ctaDeploy: 'Deploy with Docker',
    ctaGithub: 'View on GitHub',
    np: {
      live: 'Listening now',
      track: 'Blue in Green',
      artist: 'Miles Davis — Kind of Blue',
      client: 'Feishin · home-nas',
      total: '5:37',
    },
  },
  proof: {
    ph: 'Featured on Product Hunt',
    mit: 'MIT licensed',
    docker: 'Docker Hub — stepaniah/navidrome-statistic',
    stack: '10 themes · 5 languages · any Subsonic client',
  },
  bento: {
    title: 'Everything your listening history knows',
    subtitle:
      'Navidrome clients don’t share stats with each other. Navidrome Stat watches the server instead — one history, every client.',
    np: {
      title: 'Now playing, live',
      desc: 'Watch listening activity as it happens, across every client and server.',
      caption: '3 clients · 2 servers · updating live',
    },
    aggregate: {
      title: 'Every client, one history',
      desc: 'DSub, Symfonium, Feishin, web players — plays from any Subsonic client land in the same history. Multiple Navidrome servers, too.',
    },
    charts: {
      title: 'Charts that go deep',
      desc: 'Hourly and daily trends, a weekday-by-hour heatmap, client usage, transcoding rates, and artist, album, and track rankings.',
    },
    review: {
      title: 'A year in review',
      desc: 'Totals, listening streaks, and your top artists, albums, and tracks — your own Wrapped, on your own data.',
    },
    cover: {
      title: 'Cover art, proxied and cached',
      desc: 'Album art flows through an authenticated, size-capped cache — your library stays private.',
      caption: '1,024 covers cached · 128 MB',
    },
    privacy: {
      title: 'Your data, your rules',
      desc: 'Everything lives in one SQLite file you own. Per-user export, import, and deletion. Optional token auth. No telemetry.',
      points: ['JSON export & import', 'Per-user deletion', 'Optional token auth'],
    },
    themesCard: {
      title: 'Ten themes',
      desc: 'Catppuccin, Nord, Dracula, Tokyo Night, Gruvbox, Solarized — instant switch.',
    },
    langs: {
      title: 'Five languages',
      desc: 'English, 简体中文, 繁體中文, 日本語, Deutsch — more on the roadmap.',
    },
  },
  themes: {
    title: 'Pick a theme, any theme',
    subtitle: 'Ten built-in themes recolor every tab instantly. Click one and watch the dashboard reskin:',
    urlLabel: 'localhost:39421',
    mockLabel: 'Interactive preview of the Navidrome Stat dashboard in the selected theme',
    mock: {
      title: 'Playback Statistics',
      range: 'Last 30 days',
      servers: 'All servers',
      live: 'Listening in real time',
      nowPlaying: 'Now Playing',
      clientTag: 'Feishin · home-nas',
      plays: 'Total plays',
      listeningTime: 'Listening time',
      uniqueTracks: 'Unique tracks',
      clients: 'Clients · by play count',
      transcoding: 'Transcoding',
      directPlay: 'Direct Play',
      transcoded: 'Transcoded',
    },
  },
  review: {
    title: 'Your year in music',
    subtitle: 'One page, your whole year: totals, streaks, and the songs that got you through it.',
    plays: 'plays',
    hours: 'hours listened',
    artists: 'artists',
    streak: 'day streak',
    topTrack: 'Top tracks',
    disclaimer: 'Sample data — the real numbers come from your own library.',
    cta: 'See a sample year review',
    modal: {
      tag: '2025 · Sample library',
      close: 'Close preview',
      deploy: 'Deploy to get yours',
      how: 'How it works',
    },
  },
  how: {
    title: 'How it works',
    subtitle: 'No client plugins, no accounts, no cloud. One small container next to your music server.',
    step1: {
      title: 'Polls getNowPlaying',
      desc: 'Every 10 seconds (configurable), the collector asks each Navidrome server what’s playing — via the Subsonic API you already run.',
    },
    step2: {
      title: 'Tracks real sessions',
      desc: 'Pauses and gaps are excluded. A track counts as played once active listening crosses your threshold — 30 seconds by default.',
    },
    step3: {
      title: 'Stores and serves',
      desc: 'Qualified plays land in SQLite on your disk and render in a self-contained dashboard at port 39421.',
    },
    note: 'When a server advertises the OpenSubsonic playbackReport extension, it is used automatically for sharper position and duration tracking.',
  },
  start: {
    title: 'Up in one compose file',
    subtitle: 'Copy, paste, and open port 39421. Pin a version tag for reproducible updates.',
    tabCompose: 'compose.yaml',
    tabRun: 'docker run',
    tabEnv: '.env',
    copy: 'Copy',
    copied: 'Copied',
    composeName: 'compose.yaml',
    runName: 'terminal',
    envName: '.env',
    docsLink: 'Full configuration reference',
    loginHint:
      'With STATS_API_TOKEN set, enter it once on the login screen — the browser keeps an HttpOnly session cookie, never the token.',
  },
  trust: {
    privacyTitle: 'Private by default',
    privacyItems: [
      {
        title: 'Data stays local',
        desc: 'Listening history lives in one SQLite file inside your own volume.',
      },
      {
        title: 'Export or delete anytime',
        desc: 'Per-user JSON export, import, and deletion are built into the settings page.',
      },
      {
        title: 'Optional auth',
        desc: 'Set STATS_API_TOKEN and the dashboard and APIs require login — sessions use an HttpOnly cookie.',
      },
      {
        title: 'No telemetry',
        desc: 'The container talks to exactly one outside party: your Navidrome servers.',
      },
    ],
    limitsTitle: 'Honest limitations',
    limitItems: [
      {
        title: 'One instance per set of sources',
        desc: 'Multiple instances polling the same servers would double-count plays.',
      },
      {
        title: 'Plaintext SQLite',
        desc: 'The database and credentials saved via settings are stored unencrypted — protect the volume like any secret.',
      },
      {
        title: 'No built-in TLS',
        desc: 'For remote access, put it behind your HTTPS reverse proxy.',
      },
    ],
  },
  faq: {
    title: 'Questions, answered',
    items: [
      {
        q: 'Which music clients does it support?',
        a: 'Any Subsonic-compatible client — DSub, Symfonium, Feishin, play:Sub, substreamer, the Navidrome web UI, and more. Statistics come from the server’s getNowPlaying endpoint, so nothing needs to be installed client-side.',
      },
      {
        q: 'Can I track multiple Navidrome servers?',
        a: 'Yes. Add each server under Settings → Connections; plays are tagged per source and the dashboard can filter by server.',
      },
      {
        q: 'How exactly is a play counted?',
        a: 'Accumulated active listening time must cross PLAY_THRESHOLD_SEC (30 seconds by default). Paused and missing intervals are excluded, checkpoints update the same record, and sessions that end below the threshold are kept as attempts — not plays.',
      },
      {
        q: 'Does it work with Jellyfin or Airsonic?',
        a: 'It works with any server that speaks the Subsonic API, but it is developed and tested against Navidrome. OpenSubsonic extensions are used when a server offers them.',
      },
      {
        q: 'How is this different from Last.fm or Maloja?',
        a: 'Last.fm records scrobbles in someone else’s cloud; Maloja is self-hosted but still depends on clients submitting scrobbles. Navidrome Stat needs no client support at all — it watches the server’s own now-playing feed, so every Subsonic client is covered by default, and the data stays on your disk.',
      },
      {
        q: 'Where does my data live?',
        a: 'In a single SQLite file on your own disk, inside the container’s /data volume. You can export it as JSON, import it elsewhere, or delete a user’s history — all from the settings page.',
      },
      {
        q: 'How heavy is it?',
        a: 'One small container, one SQLite file, a 10-second poll loop. A Raspberry Pi handles it comfortably.',
      },
    ],
  },
  footer: {
    ctaTitle: 'Ready to meet your year in music?',
    ctaButton: 'Deploy Navidrome Stat',
    links: {
      github: 'GitHub',
      docker: 'Docker Hub',
      ph: 'Product Hunt',
      issues: 'Issues',
      changelog: 'Changelog',
      license: 'MIT License',
    },
    version: `${SITE_VERSION} · MIT`,
  },
  notfound: {
    title: 'This page skipped a beat.',
    desc: 'The page you are looking for does not exist.',
    home: 'Back to the front page',
  },
};

export type Translation = typeof en;

const zh: Translation = {
  meta: {
    title: 'Navidrome Stat — 自托管的 Navidrome 收听统计',
    ogImageAlt: 'Navidrome Stat——自托管收听统计仪表盘预览',
    description:
      '无论用什么 Subsonic 客户端、什么设备、几台 Navidrome 服务器，所有播放都汇聚到同一块自托管仪表盘：收听时长、趋势、榜单与年度回顾。开源，MIT。',
  },
  nav: {
    features: '特性',
    themes: '主题',
    review: '年度回顾',
    start: '快速开始',
    faq: '常见问题',
    docs: '文档',
    deploy: '部署',
    menuOpen: '打开菜单',
    menuClose: '关闭菜单',
    language: '语言',
    soon: '即将支持',
    skip: '跳转到正文',
  },
  hero: {
    badge: '自托管 · 开源 · MIT',
    titleA: '每一次播放，',
    titleB: '都算数。',
    subtitle:
      'Navidrome Stat 轮询 Navidrome 服务器的 getNowPlaying 接口，把所有 Subsonic 客户端的播放汇聚成一块自托管仪表盘——收听时长、趋势、榜单和年度回顾。数据从不离开你的机器。',
    ctaDeploy: '用 Docker 部署',
    ctaGithub: '在 GitHub 查看',
    np: {
      live: '正在收听',
      track: 'Blue in Green',
      artist: 'Miles Davis — Kind of Blue',
      client: 'Feishin · home-nas',
      total: '5:37',
    },
  },
  proof: {
    ph: 'Product Hunt 首发',
    mit: 'MIT 许可证',
    docker: 'Docker Hub — stepaniah/navidrome-statistic',
    stack: '10 套主题 · 5 种语言 · 任意 Subsonic 客户端',
  },
  bento: {
    title: '你的收听历史，值得被完整呈现',
    subtitle: 'Navidrome 的各个客户端彼此不共享统计。Navidrome Stat 改为在服务器端观测——所有客户端，同一条历史。',
    np: {
      title: '实时正在播放',
      desc: '跨客户端、跨服务器，实时看到正在进行的收听。',
      caption: '3 个客户端 · 2 台服务器 · 实时更新',
    },
    aggregate: {
      title: '所有客户端，同一条历史',
      desc: 'DSub、Symfonium、Feishin、网页播放器——任何 Subsonic 客户端的播放都汇入同一条历史，多台 Navidrome 服务器也不例外。',
    },
    charts: {
      title: '足够深的图表',
      desc: '按小时与按天的趋势、星期×小时热力图、客户端占比、转码率，以及艺术家、专辑、曲目榜单。',
    },
    review: {
      title: '年度回顾',
      desc: '年度总量、连续收听天数，以及你的年度艺术家、专辑与曲目——属于你自己的 Wrapped，基于你自己的数据。',
    },
    cover: {
      title: '封面代理与缓存',
      desc: '专辑封面经过带鉴权的、容量受限的缓存——你的音乐库保持私密。',
      caption: '已缓存 1,024 张封面 · 128 MB',
    },
    privacy: {
      title: '数据由你做主',
      desc: '一切都在一个属于你的 SQLite 文件里。按用户导出、导入与删除，可选 token 认证，零遥测。',
      points: ['JSON 导出与导入', '按用户删除', '可选 token 认证'],
    },
    themesCard: {
      title: '十套主题',
      desc: 'Catppuccin、Nord、Dracula、Tokyo Night、Gruvbox、Solarized——即时切换。',
    },
    langs: {
      title: '五种语言',
      desc: '简体中文、繁體中文、English、日本語、Deutsch——更多语言已在路线图上。',
    },
  },
  themes: {
    title: '主题随你挑',
    subtitle: '十套内置主题，整个仪表盘即时换色。点一个试试：',
    urlLabel: 'localhost:39421',
    mockLabel: '所选主题下 Navidrome Stat 仪表盘的交互式预览',
    mock: {
      title: '播放统计',
      range: '最近 30 天',
      servers: '全部服务器',
      live: '实时监听中',
      nowPlaying: '正在播放',
      clientTag: 'Feishin · home-nas',
      plays: '总播放次数',
      listeningTime: '累计收听',
      uniqueTracks: '曲目数',
      clients: '客户端分布',
      transcoding: '转码比例',
      directPlay: '直出',
      transcoded: '转码',
    },
  },
  review: {
    title: '你的年度音乐报告',
    subtitle: '一页看尽一整年：总量、连续天数，和陪你走过这一年的歌。',
    plays: '次播放',
    hours: '小时收听',
    artists: '位艺术家',
    streak: '天连续收听',
    topTrack: '年度曲目',
    disclaimer: '示例数据——真实数字来自你自己的曲库。',
    cta: '看一份年度回顾示例',
    modal: {
      tag: '2025 · 示例曲库',
      close: '关闭预览',
      deploy: '部署后生成你自己的',
      how: '工作原理',
    },
  },
  how: {
    title: '工作原理',
    subtitle: '无需客户端插件、无需注册、不上云。一个轻量容器，守在你的音乐服务器旁边。',
    step1: {
      title: '轮询 getNowPlaying',
      desc: '每 10 秒（可配置）通过 Subsonic API 向每台 Navidrome 服务器询问正在播放的内容——接口本来就在。',
    },
    step2: {
      title: '追踪真实会话',
      desc: '暂停与中断不计入。累计有效收听超过阈值（默认 30 秒）才算一次播放。',
    },
    step3: {
      title: '存储并呈现',
      desc: '有效播放写入你磁盘上的 SQLite，在 39421 端口的自包含仪表盘中呈现。',
    },
    note: '当服务器支持 OpenSubsonic playbackReport 扩展时会自动采用，让进度与时长统计更精确。',
  },
  start: {
    title: '一个 compose 文件即可启动',
    subtitle: '复制、粘贴，打开 39421 端口。建议锁定版本号，保证更新可复现。',
    tabCompose: 'compose.yaml',
    tabRun: 'docker run',
    tabEnv: '.env',
    copy: '复制',
    copied: '已复制',
    composeName: 'compose.yaml',
    runName: '终端',
    envName: '.env',
    docsLink: '完整配置参考',
    loginHint: '配置 STATS_API_TOKEN 后，首次访问在登录页输入一次即可——浏览器只保存 HttpOnly 会话 Cookie，而非 token 本身。',
  },
  trust: {
    privacyTitle: '默认私密',
    privacyItems: [
      {
        title: '数据留在本地',
        desc: '收听历史只存在于你自己数据卷里的一个 SQLite 文件。',
      },
      {
        title: '随时导出或删除',
        desc: '设置页内置按用户的 JSON 导出、导入与删除。',
      },
      {
        title: '可选认证',
        desc: '配置 STATS_API_TOKEN 后仪表盘与 API 均需登录——会话使用 HttpOnly Cookie。',
      },
      {
        title: '零遥测',
        desc: '容器唯一的外呼对象就是你的 Navidrome 服务器。',
      },
    ],
    limitsTitle: '诚实的局限',
    limitItems: [
      {
        title: '一组数据源只跑一个实例',
        desc: '多个实例轮询同一批服务器会导致播放被重复计数。',
      },
      {
        title: 'SQLite 明文存储',
        desc: '数据库与设置页保存的凭据均为明文——请像对待机密一样保护数据卷。',
      },
      {
        title: '不内置 TLS',
        desc: '远程访问请置于你的 HTTPS 反向代理之后。',
      },
    ],
  },
  faq: {
    title: '常见问题',
    items: [
      {
        q: '支持哪些播放客户端？',
        a: '任何兼容 Subsonic 的客户端——DSub、Symfonium、Feishin、play:Sub、substreamer、Navidrome 网页端等。统计数据来自服务器端的 getNowPlaying 接口，客户端无需安装任何东西。',
      },
      {
        q: '可以追踪多台 Navidrome 服务器吗？',
        a: '可以。在 设置 → 连接 中逐一添加；播放按来源标记，仪表盘可按服务器筛选。',
      },
      {
        q: '一次播放是如何判定的？',
        a: '累计有效收听时长需超过 PLAY_THRESHOLD_SEC（默认 30 秒）。暂停与失联时段不计入；检查点更新同一条记录；未达阈值就结束的会话会单独保存为播放尝试，不计为播放。',
      },
      {
        q: '支持 Jellyfin 或 Airsonic 吗？',
        a: '任何讲 Subsonic API 的服务器都可以，但项目只针对 Navidrome 开发与测试。服务器支持的 OpenSubsonic 扩展会被自动采用。',
      },
      {
        q: '和 Last.fm 或 Maloja 有什么不同？',
        a: 'Last.fm 把 scrobble 存在别人的云端；Maloja 虽然自托管，但仍依赖客户端主动提交收听记录。Navidrome Stat 完全不需要客户端配合——它直接观测服务器自己的 now-playing 数据流，任何 Subsonic 客户端默认被覆盖，数据也只留在你的磁盘上。',
      },
      {
        q: '我的数据存在哪里？',
        a: '在你自己磁盘上容器 /data 卷中的一个 SQLite 文件里。你可以在设置页将其导出为 JSON、导入到别处，或删除某个用户的收听历史。',
      },
      {
        q: '它占用资源多吗？',
        a: '一个轻量容器、一个 SQLite 文件、10 秒一次的轮询——树莓派也能轻松跑。',
      },
    ],
  },
  footer: {
    ctaTitle: '准备好和这一年的音乐见面了吗？',
    ctaButton: '部署 Navidrome Stat',
    links: {
      github: 'GitHub',
      docker: 'Docker Hub',
      ph: 'Product Hunt',
      issues: 'Issues',
      changelog: '更新日志',
      license: 'MIT 许可证',
    },
    version: `${SITE_VERSION} · MIT`,
  },
  notfound: {
    title: '这个页面跳拍了。',
    desc: '你要找的页面不存在。',
    home: '回到首页',
  },
};

const zhTW: Translation = {
  meta: {
    title: 'Navidrome Stat — 自託管的 Navidrome 收聽統計',
    ogImageAlt: 'Navidrome Stat——自託管收聽統計儀表板預覽',
    description:
      '無論用什麼 Subsonic 用戶端、什麼裝置、幾台 Navidrome 伺服器，所有播放都匯聚到同一塊自託管儀表板：收聽時數、趨勢、排行榜與年度回顧。開源，MIT。',
  },
  nav: {
    features: '特性',
    themes: '主題',
    review: '年度回顧',
    start: '快速開始',
    faq: '常見問題',
    docs: '文件',
    deploy: '部署',
    menuOpen: '開啟選單',
    menuClose: '關閉選單',
    language: '語言',
    soon: '即將支援',
    skip: '跳至主要內容',
  },
  hero: {
    badge: '自託管 · 開源 · MIT',
    titleA: '每一次播放，',
    titleB: '都算數。',
    subtitle:
      'Navidrome Stat 輪詢 Navidrome 伺服器的 getNowPlaying 介面，把所有 Subsonic 用戶端的播放匯聚成一塊自託管儀表板——收聽時數、趨勢、排行榜和年度回顧。資料從不離開你的機器。',
    ctaDeploy: '用 Docker 部署',
    ctaGithub: '在 GitHub 查看',
    np: {
      live: '正在收聽',
      track: 'Blue in Green',
      artist: 'Miles Davis — Kind of Blue',
      client: 'Feishin · home-nas',
      total: '5:37',
    },
  },
  proof: {
    ph: 'Product Hunt 首發',
    mit: 'MIT 授權',
    docker: 'Docker Hub — stepaniah/navidrome-statistic',
    stack: '10 組主題 · 5 種語言 · 任意 Subsonic 用戶端',
  },
  bento: {
    title: '你的收聽歷史，值得被完整呈現',
    subtitle: 'Navidrome 的各個用戶端彼此不共享統計。Navidrome Stat 改為在伺服器端觀測——所有用戶端，同一條歷史。',
    np: {
      title: '即時正在播放',
      desc: '跨用戶端、跨伺服器，即時看到正在進行的收聽。',
      caption: '3 個用戶端 · 2 台伺服器 · 即時更新',
    },
    aggregate: {
      title: '所有用戶端，同一條歷史',
      desc: 'DSub、Symfonium、Feishin、網頁播放器——任何 Subsonic 用戶端的播放都匯入同一條歷史，多台 Navidrome 伺服器也不例外。',
    },
    charts: {
      title: '足夠深的圖表',
      desc: '按小時與按天的趨勢、星期×小時熱力圖、用戶端佔比、轉碼率，以及藝術家、專輯、曲目排行榜。',
    },
    review: {
      title: '年度回顧',
      desc: '年度總量、連續收聽天數，以及你的年度藝術家、專輯與曲目——屬於你自己的 Wrapped，基於你自己的資料。',
    },
    cover: {
      title: '封面代理與快取',
      desc: '專輯封面經過帶驗證的、容量受限的快取——你的音樂庫保持私密。',
      caption: '已快取 1,024 張封面 · 128 MB',
    },
    privacy: {
      title: '資料由你做主',
      desc: '一切都在一個屬於你的 SQLite 檔案裡。按使用者匯出、匯入與刪除，可選 token 驗證，零遙測。',
      points: ['JSON 匯出與匯入', '按使用者刪除', '可選 token 驗證'],
    },
    themesCard: {
      title: '十組主題',
      desc: 'Catppuccin、Nord、Dracula、Tokyo Night、Gruvbox、Solarized——即時切換。',
    },
    langs: {
      title: '五種語言',
      desc: '简体中文、繁體中文、English、日本語、Deutsch——更多語言已在路線圖上。',
    },
  },
  themes: {
    title: '主題隨你挑',
    subtitle: '十組內建主題，整個儀表板即時換色。點一個試試：',
    urlLabel: 'localhost:39421',
    mockLabel: '所選主題下 Navidrome Stat 儀表板的互動式預覽',
    mock: {
      title: '播放統計',
      range: '最近 30 天',
      servers: '全部伺服器',
      live: '即時監聽中',
      nowPlaying: '正在播放',
      clientTag: 'Feishin · home-nas',
      plays: '總播放次數',
      listeningTime: '累計收聽',
      uniqueTracks: '曲目數',
      clients: '用戶端分佈',
      transcoding: '轉碼比例',
      directPlay: '直出',
      transcoded: '轉碼',
    },
  },
  review: {
    title: '你的年度音樂報告',
    subtitle: '一頁看盡一整年：總量、連續天數，和陪你走過這一年的歌。',
    plays: '次播放',
    hours: '小時收聽',
    artists: '位藝術家',
    streak: '天連續收聽',
    topTrack: '年度曲目',
    disclaimer: '範例資料——真實數字來自你自己的音樂庫。',
    cta: '看一份年度回顧範例',
    modal: {
      tag: '2025 · 範例音樂庫',
      close: '關閉預覽',
      deploy: '部署後生成你自己的',
      how: '工作原理',
    },
  },
  how: {
    title: '工作原理',
    subtitle: '無需用戶端外掛、無需註冊、不上雲。一個輕量容器，守在你的音樂伺服器旁邊。',
    step1: {
      title: '輪詢 getNowPlaying',
      desc: '每 10 秒（可設定）透過 Subsonic API 向每台 Navidrome 伺服器詢問正在播放的內容——介面本來就在。',
    },
    step2: {
      title: '追蹤真實工作階段',
      desc: '暫停與中斷不計入。累計有效收聽超過門檻（預設 30 秒）才算一次播放。',
    },
    step3: {
      title: '儲存並呈現',
      desc: '有效播放寫入你磁碟上的 SQLite，在 39421 連接埠的自包含儀表板中呈現。',
    },
    note: '當伺服器支援 OpenSubsonic playbackReport 擴充時會自動採用，讓進度與時長統計更精確。',
  },
  start: {
    title: '一個 compose 檔即可啟動',
    subtitle: '複製、貼上，開啟 39421 連接埠。建議鎖定版本號，確保更新可重現。',
    tabCompose: 'compose.yaml',
    tabRun: 'docker run',
    tabEnv: '.env',
    copy: '複製',
    copied: '已複製',
    composeName: 'compose.yaml',
    runName: '終端機',
    envName: '.env',
    docsLink: '完整設定參考',
    loginHint: '設定 STATS_API_TOKEN 後，首次存取在登入頁輸入一次即可——瀏覽器只保存 HttpOnly 會話 Cookie，而非 token 本身。',
  },
  trust: {
    privacyTitle: '預設私密',
    privacyItems: [
      {
        title: '資料留在本機',
        desc: '收聽歷史只存在於你自己資料卷裡的一個 SQLite 檔案。',
      },
      {
        title: '隨時匯出或刪除',
        desc: '設定頁內建按使用者的 JSON 匯出、匯入與刪除。',
      },
      {
        title: '可選驗證',
        desc: '設定 STATS_API_TOKEN 後儀表板與 API 均需登入——工作階段使用 HttpOnly Cookie。',
      },
      {
        title: '零遙測',
        desc: '容器唯一的外呼對象就是你的 Navidrome 伺服器。',
      },
    ],
    limitsTitle: '誠實的局限',
    limitItems: [
      {
        title: '一組資料源只跑一個執行個體',
        desc: '多個實例輪詢同一批伺服器會導致播放被重複計數。',
      },
      {
        title: 'SQLite 明文儲存',
        desc: '資料庫與設定頁保存的憑證均為明文——請像對待機密一樣保護資料卷。',
      },
      {
        title: '不內建 TLS',
        desc: '遠端存取請置於你的 HTTPS 反向代理之後。',
      },
    ],
  },
  faq: {
    title: '常見問題',
    items: [
      {
        q: '支援哪些播放用戶端？',
        a: '任何相容 Subsonic 的用戶端——DSub、Symfonium、Feishin、play:Sub、substreamer、Navidrome 網頁端等。統計資料來自伺服器端的 getNowPlaying 介面，用戶端無需安裝任何東西。',
      },
      {
        q: '可以追蹤多台 Navidrome 伺服器嗎？',
        a: '可以。在 設定 → 連線 中逐一新增；播放按來源標記，儀表板可按伺服器篩選。',
      },
      {
        q: '一次播放是如何判定的？',
        a: '累計有效收聽時長需超過 PLAY_THRESHOLD_SEC（預設 30 秒）。暫停與失聯時段不計入；檢查點更新同一條記錄；未達門檻就結束的工作階段會單獨保存為播放嘗試，不計為播放。',
      },
      {
        q: '支援 Jellyfin 或 Airsonic 嗎？',
        a: '任何講 Subsonic API 的伺服器都可以，但專案只針對 Navidrome 開發與測試。伺服器支援的 OpenSubsonic 擴充會被自動採用。',
      },
      {
        q: '和 Last.fm 或 Maloja 有什麼不同？',
        a: 'Last.fm 把 scrobble 存在別人的雲端；Maloja 雖然自託管，但仍依賴用戶端主動提交收聽記錄。Navidrome Stat 完全不需要用戶端配合——它直接觀測伺服器自己的 now-playing 資料流，任何 Subsonic 用戶端預設被涵蓋，資料也只留在你的磁碟上。',
      },
      {
        q: '我的資料存在哪裡？',
        a: '在你自己磁碟上容器 /data 卷中的一個 SQLite 檔案裡。你可以在設定頁將其匯出為 JSON、匯入到別處，或刪除某個使用者的收聽歷史。',
      },
      {
        q: '它佔用資源多嗎？',
        a: '一個輕量容器、一個 SQLite 檔案、10 秒一次的輪詢——樹莓派也能輕鬆跑。',
      },
    ],
  },
  footer: {
    ctaTitle: '準備好和這一年的音樂見面了嗎？',
    ctaButton: '部署 Navidrome Stat',
    links: {
      github: 'GitHub',
      docker: 'Docker Hub',
      ph: 'Product Hunt',
      issues: 'Issues',
      changelog: '更新日誌',
      license: 'MIT 授權',
    },
    version: `${SITE_VERSION} · MIT`,
  },
  notfound: {
    title: '這個頁面漏了一拍。',
    desc: '你要找的頁面不存在。',
    home: '回到首頁',
  },
};

const ja: Translation = {
  meta: {
    title: 'Navidrome Stat — Navidrome 向けセルフホストのリスニング統計',
    ogImageAlt: 'Navidrome Stat——セルフホストのリスニング統計ダッシュボードのプレビュー',
    description:
      'Subsonic クライアント、デバイス、Navidrome サーバーがいくつあっても、すべての再生を 1 つのセルフホスト ダッシュボードに集約。リスニング時間、トレンド、ランキング、年間まとめ。オープンソース、MIT。',
  },
  nav: {
    features: '機能',
    themes: 'テーマ',
    review: '年間まとめ',
    start: 'クイックスタート',
    faq: 'よくある質問',
    docs: 'ドキュメント',
    deploy: 'デプロイ',
    menuOpen: 'メニューを開く',
    menuClose: 'メニューを閉じる',
    language: '言語',
    soon: '近日対応',
    skip: '本文へスキップ',
  },
  hero: {
    badge: 'セルフホスト · オープンソース · MIT',
    titleA: 'すべての再生を、',
    titleB: '逃さず記録。',
    subtitle:
      'Navidrome Stat は Navidrome サーバーの getNowPlaying API をポーリングし、すべての Subsonic クライアントの再生を 1 つのセルフホスト ダッシュボードにまとめます。リスニング時間、トレンド、ランキング、年間まとめ。データがマシンの外に出ることはありません。',
    ctaDeploy: 'Docker でデプロイ',
    ctaGithub: 'GitHub で見る',
    np: {
      live: '再生中',
      track: 'Blue in Green',
      artist: 'Miles Davis — Kind of Blue',
      client: 'Feishin · home-nas',
      total: '5:37',
    },
  },
  proof: {
    ph: 'Product Hunt 掲載',
    mit: 'MIT ライセンス',
    docker: 'Docker Hub — stepaniah/navidrome-statistic',
    stack: '10 テーマ · 5 言語 · 任意の Subsonic クライアント',
  },
  bento: {
    title: 'リスニング履歴のすべてを、見える形に',
    subtitle: 'Navidrome のクライアント間で統計は共有されません。Navidrome Stat はサーバー側で観測します——すべてのクライアント、1 つの履歴。',
    np: {
      title: 'リアルタイム再生状況',
      desc: 'クライアントもサーバーも問わず、進行中のリスニングをリアルタイムで確認。',
      caption: '3 クライアント · 2 サーバー · ライブ更新',
    },
    aggregate: {
      title: 'どのクライアントでも、1 つの履歴',
      desc: 'DSub、Symfonium、Feishin、Web プレーヤー——Subsonic 対応クライアントからの再生はすべて同じ履歴に記録されます。複数の Navidrome サーバーも同様。',
    },
    charts: {
      title: '深くまで掘り下げるチャート',
      desc: '時間別・日別トレンド、曜日×時間帯ヒートマップ、クライアント別内訳、トランスコード率、アーティスト・アルバム・曲のランキング。',
    },
    review: {
      title: '年間まとめ',
      desc: '年間合計、連続リスニング日数、あなたのベストアーティスト・アルバム・曲——自分のデータによる、自分だけの Wrapped。',
    },
    cover: {
      title: 'カバーアートのプロキシとキャッシュ',
      desc: 'アルバムアートは認証付き・容量制限付きのキャッシュを経由します——ライブラリは非公開のまま。',
      caption: '1,024 枚のカバーをキャッシュ · 128 MB',
    },
    privacy: {
      title: 'データはあなたのもの',
      desc: 'すべてはあなたが所有する 1 つの SQLite ファイルに。ユーザーごとのエクスポート、インポート、削除。任意のトークン認証。テレメトリーなし。',
      points: ['JSON エクスポート/インポート', 'ユーザー単位の削除', '任意のトークン認証'],
    },
    themesCard: {
      title: '10 のテーマ',
      desc: 'Catppuccin、Nord、Dracula、Tokyo Night、Gruvbox、Solarized——ワンクリックで切替。',
    },
    langs: {
      title: '5 つの言語',
      desc: '简体中文、繁體中文、English、日本語、Deutsch——さらに追加予定。',
    },
  },
  themes: {
    title: 'テーマは好きなものを',
    subtitle: '10 の内蔵テーマでダッシュボード全体が即座に切り替わります。クリックして試してみてください：',
    urlLabel: 'localhost:39421',
    mockLabel: '選択したテーマでの Navidrome Stat ダッシュボードのインタラクティブなプレビュー',
    mock: {
      title: '再生統計',
      range: '過去 30 日',
      servers: 'すべてのサーバー',
      live: 'リアルタイム再生を表示中',
      nowPlaying: '再生中',
      clientTag: 'Feishin · home-nas',
      plays: '総再生数',
      listeningTime: '累計再生時間',
      uniqueTracks: '曲数',
      clients: 'クライアント分布',
      transcoding: 'トランスコード比率',
      directPlay: 'ダイレクト再生',
      transcoded: 'トランスコード',
    },
  },
  review: {
    title: 'あなたの1年の音楽',
    subtitle: '1 ページに 1 年分：合計、連続日数、そして一年を伴った曲たち。',
    plays: '回の再生',
    hours: '時間リスニング',
    artists: '人のアーティスト',
    streak: '日連続リスニング',
    topTrack: '年間トップ曲',
    disclaimer: 'サンプルデータ——実際の数字はあなた自身のライブラリから。',
    cta: '年間まとめのサンプルを見る',
    modal: {
      tag: '2025 · サンプルライブラリ',
      close: 'プレビューを閉じる',
      deploy: 'デプロイして自分のまとめを作る',
      how: '仕組み',
    },
  },
  how: {
    title: '仕組み',
    subtitle: 'クライアントのプラグインもアカウント登録もクラウドも不要。小さなコンテナが 1 つ、音楽サーバーのそばで動くだけ。',
    step1: {
      title: 'getNowPlaying をポーリング',
      desc: '10 秒ごと（設定可能）に Subsonic API 経由で各 Navidrome サーバーの再生状況を確認——インターフェースはすでにあります。',
    },
    step2: {
      title: '実際のセッションを追跡',
      desc: '一時停止や途切れはカウントされません。有効なリスニング時間がしきい値（既定 30 秒）を超えて初めて 1 回の再生として記録されます。',
    },
    step3: {
      title: '保存して表示',
      desc: '条件を満たした再生はディスク上の SQLite に書き込まれ、ポート 39421 の自己完結ダッシュボードで表示されます。',
    },
    note: 'サーバーが OpenSubsonic の playbackReport 拡張に対応している場合は自動的に使用され、位置と長さの追跡がより正確になります。',
  },
  start: {
    title: 'compose ファイル 1 つで起動',
    subtitle: 'コピーして貼り付け、ポート 39421 を開くだけ。更新の再現性のためバージョンタグの固定を推奨。',
    tabCompose: 'compose.yaml',
    tabRun: 'docker run',
    tabEnv: '.env',
    copy: 'コピー',
    copied: 'コピーしました',
    composeName: 'compose.yaml',
    runName: 'ターミナル',
    envName: '.env',
    docsLink: '設定の完全なリファレンス',
    loginHint: 'STATS_API_TOKEN を設定した場合、初回アクセス時にログイン画面で 1 度入力するだけ——ブラウザが保持するのは token ではなく HttpOnly セッション Cookie です。',
  },
  trust: {
    privacyTitle: 'デフォルトでプライベート',
    privacyItems: [
      {
        title: 'データはローカルに',
        desc: 'リスニング履歴は自分のボリューム内の 1 つの SQLite ファイルにのみ存在します。',
      },
      {
        title: 'いつでもエクスポート/削除',
        desc: '設定ページにユーザー単位の JSON エクスポート、インポート、削除を内蔵。',
      },
      {
        title: '任意の認証',
        desc: 'STATS_API_TOKEN を設定するとダッシュボードと API にログインが必要になります——セッションは HttpOnly Cookie を使用。',
      },
      {
        title: 'テレメトリーなし',
        desc: 'コンテナが外部と通信する相手は、あなたの Navidrome サーバーだけです。',
      },
    ],
    limitsTitle: '正直な制限',
    limitItems: [
      {
        title: 'データソース一組につき 1 インスタンス',
        desc: '同じサーバー群を複数インスタンスでポーリングすると、再生が重複カウントされます。',
      },
      {
        title: 'SQLite は平文',
        desc: 'データベースと設定ページに保存された認証情報は暗号化されていません——機密情報と同様にボリュームを保護してください。',
      },
      {
        title: 'TLS は内蔵なし',
        desc: 'リモートからアクセスする場合は、HTTPS リバースプロキシの背後に置いてください。',
      },
    ],
  },
  faq: {
    title: 'よくある質問',
    items: [
      {
        q: 'どの音楽クライアントに対応していますか？',
        a: 'Subsonic 互換のクライアントなら何でも——DSub、Symfonium、Feishin、play:Sub、substreamer、Navidrome の Web UI など。統計はサーバーの getNowPlaying エンドポイントから取得するため、クライアント側には何もインストール不要です。',
      },
      {
        q: '複数の Navidrome サーバーを追跡できますか？',
        a: 'はい。設定 → 接続 で各サーバーを追加します。再生はソースごとに記録され、ダッシュボードでサーバー別に絞り込めます。',
      },
      {
        q: '再生はどのように判定されますか？',
        a: '有効なリスニング時間の累計が PLAY_THRESHOLD_SEC（既定 30 秒）を超える必要があります。一時停止と欠落区間は除外され、チェックポイントは同じレコードを更新します。しきい値に達しないまま終わったセッションは再生ではなく試行として保存されます。',
      },
      {
        q: 'Jellyfin や Airsonic でも使えますか？',
        a: 'Subsonic API を話すサーバーなら動作しますが、開発とテストは Navidrome 基準で行っています。サーバーが対応していれば OpenSubsonic 拡張も自動的に使用します。',
      },
      {
        q: 'Last.fm や Maloja とは何が違いますか？',
        a: 'Last.fm は scrobble を他人のクラウドに記録します。Maloja はセルフホストですが、クライアントが scrobble を送信する前提です。Navidrome Stat はクライアントの協力を一切必要とせず、サーバー自身の now-playing フィードを観測するため、すべての Subsonic クライアントが既定で対象になり、データも自分のディスクに留まります。',
      },
      {
        q: 'データはどこに保存されますか？',
        a: '自分のディスク上、コンテナの /data ボリューム内の 1 つの SQLite ファイルです。設定ページから JSON としてエクスポート、別の場所へのインポート、ユーザーごとの履歴削除ができます。',
      },
      {
        q: 'リソース消費はどのくらい？',
        a: '小さなコンテナ 1 つ、SQLite ファイル 1 つ、10 秒間隔のポーリング。Raspberry Pi でも快適に動きます。',
      },
    ],
  },
  footer: {
    ctaTitle: '1 年の音楽との対面の準備はできましたか？',
    ctaButton: 'Navidrome Stat をデプロイ',
    links: {
      github: 'GitHub',
      docker: 'Docker Hub',
      ph: 'Product Hunt',
      issues: 'Issues',
      changelog: '更新履歴',
      license: 'MIT ライセンス',
    },
    version: `${SITE_VERSION} · MIT`,
  },
  notfound: {
    title: 'このページは拍子を外しました。',
    desc: 'お探しのページは存在しません。',
    home: 'トップへ戻る',
  },
};

const fr: Translation = {
  meta: {
    title: 'Navidrome Stat — statistiques d’écoute auto-hébergées pour Navidrome',
    ogImageAlt: 'Navidrome Stat — aperçu du tableau de bord auto-hébergé de statistiques d’écoute',
    description:
      'Un seul tableau de bord pour toutes vos écoutes, quel que soit le client Subsonique, l’appareil ou le nombre de serveurs Navidrome. Temps d’écoute, tendances, classements et rétrospective annuelle. Auto-hébergé, open source, MIT.',
  },
  nav: {
    features: 'Fonctionnalités',
    themes: 'Thèmes',
    review: 'Rétrospective',
    start: 'Démarrage rapide',
    faq: 'FAQ',
    docs: 'Docs',
    deploy: 'Déployer',
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
    language: 'Langue',
    soon: 'bientôt',
    skip: 'Aller au contenu',
  },
  hero: {
    badge: 'Auto-hébergé · Open source · MIT',
    titleA: 'Chaque écoute, ',
    titleB: 'comptée.',
    subtitle:
      'Navidrome Stat interroge l’API getNowPlaying de vos serveurs Navidrome et transforme vos écoutes en un tableau de bord auto-hébergé — temps d’écoute, tendances, classements et rétrospective annuelle. Vos données ne quittent jamais votre machine.',
    ctaDeploy: 'Déployer avec Docker',
    ctaGithub: 'Voir sur GitHub',
    np: {
      live: 'En écoute',
      track: 'Blue in Green',
      artist: 'Miles Davis — Kind of Blue',
      client: 'Feishin · home-nas',
      total: '5:37',
    },
  },
  proof: {
    ph: 'Présenté sur Product Hunt',
    mit: 'Licence MIT',
    docker: 'Docker Hub — stepaniah/navidrome-statistic',
    stack: '10 thèmes · 5 langues · tout client Subsonic',
  },
  bento: {
    title: 'Tout ce que votre historique d’écoute sait',
    subtitle:
      'Les clients Navidrome ne partagent pas leurs statistiques entre eux. Navidrome Stat observe le serveur à la place — un seul historique, tous les clients.',
    np: {
      title: 'En écoute, en direct',
      desc: 'Suivez l’activité d’écoute en temps réel, sur tous les clients et tous les serveurs.',
      caption: '3 clients · 2 serveurs · mise à jour en direct',
    },
    aggregate: {
      title: 'Tous les clients, un seul historique',
      desc: 'DSub, Symfonium, Feishin, lecteurs web — les écoutes de n’importe quel client Subsonic arrivent dans le même historique. Plusieurs serveurs Navidrome aussi.',
    },
    charts: {
      title: 'Des graphiques qui vont loin',
      desc: 'Tendances horaires et quotidiennes, carte de chaleur jour de l’heure, usage par client, taux de transcodage, et classements d’artistes, d’albums et de titres.',
    },
    review: {
      title: 'Une rétrospective annuelle',
      desc: 'Totaux, séries d’écoute, et vos meilleurs artistes, albums et titres — votre propre Wrapped, sur vos propres données.',
    },
    cover: {
      title: 'Pochettes relayées et mises en cache',
      desc: 'Les pochettes passent par un cache authentifié à taille limitée — votre bibliothèque reste privée.',
      caption: '1 024 pochettes en cache · 128 Mo',
    },
    privacy: {
      title: 'Vos données, vos règles',
      desc: 'Tout tient dans un fichier SQLite qui vous appartient. Export, import et suppression par utilisateur. Authentification par token optionnelle. Aucune télémétrie.',
      points: ['Export & import JSON', 'Suppression par utilisateur', 'Auth token optionnelle'],
    },
    themesCard: {
      title: 'Dix thèmes',
      desc: 'Catppuccin, Nord, Dracula, Tokyo Night, Gruvbox, Solarized — bascule instantanée.',
    },
    langs: {
      title: 'Cinq langues',
      desc: 'English, 简体中文, 繁體中文, 日本語, Deutsch — d’autres sont sur la feuille de route.',
    },
  },
  themes: {
    title: 'Choisissez votre thème',
    subtitle: 'Dix thèmes intégrés recolorent chaque onglet instantanément. Cliquez pour voir le tableau de bord se relooker :',
    urlLabel: 'localhost:39421',
    mockLabel: 'Aperçu interactif du tableau de bord Navidrome Stat dans le thème sélectionné',
    mock: {
      title: 'Playback Statistics',
      range: 'Last 30 days',
      servers: 'All servers',
      live: 'Listening in real time',
      nowPlaying: 'Now Playing',
      clientTag: 'Feishin · home-nas',
      plays: 'Total plays',
      listeningTime: 'Listening time',
      uniqueTracks: 'Unique tracks',
      clients: 'Clients · by play count',
      transcoding: 'Transcoding',
      directPlay: 'Direct Play',
      transcoded: 'Transcoded',
    },
  },
  review: {
    title: 'Votre année en musique',
    subtitle: 'Une page, toute votre année : totaux, séries, et les chansons qui vous ont accompagné.',
    plays: 'écoutes',
    hours: 'heures d’écoute',
    artists: 'artistes',
    streak: 'jours de série',
    topTrack: 'Titres du top',
    disclaimer: 'Données d’exemple — les vrais chiffres viennent de votre propre bibliothèque.',
    cta: 'Voir un exemple de rétrospective',
    modal: {
      tag: '2025 · Bibliothèque d’exemple',
      close: 'Fermer l’aperçu',
      deploy: 'Déployez pour la vôtre',
      how: 'Comment ça marche',
    },
  },
  how: {
    title: 'Comment ça marche',
    subtitle: 'Pas de plugin client, pas de compte, pas de cloud. Un petit conteneur à côté de votre serveur de musique.',
    step1: {
      title: 'Interroge getNowPlaying',
      desc: 'Toutes les 10 secondes (configurable), le collecteur demande à chaque serveur Navidrome ce qui est en lecture — via l’API Subsonic que vous utilisez déjà.',
    },
    step2: {
      title: 'Suit les vraies sessions',
      desc: 'Pauses et coupures sont exclues. Un titre compte comme joué une fois le seuil d’écoute active franchi — 30 secondes par défaut.',
    },
    step3: {
      title: 'Stocke et sert',
      desc: 'Les écoutes qualifiées atterrissent dans SQLite sur votre disque et s’affichent dans un tableau de bord autonome sur le port 39421.',
    },
    note: 'Quand un serveur annonce l’extension OpenSubsonic playbackReport, elle est utilisée automatiquement pour un suivi plus précis de la position et de la durée.',
  },
  start: {
    title: 'Opérationnel en un fichier compose',
    subtitle: 'Copiez, collez, ouvrez le port 39421. Fixez le tag de version pour des mises à jour reproductibles.',
    tabCompose: 'compose.yaml',
    tabRun: 'docker run',
    tabEnv: '.env',
    copy: 'Copier',
    copied: 'Copié',
    composeName: 'compose.yaml',
    runName: 'terminal',
    envName: '.env',
    docsLink: 'Référence complète de configuration',
    loginHint:
      'Avec STATS_API_TOKEN défini, saisissez-le une fois sur l’écran de connexion — le navigateur garde un cookie de session HttpOnly, jamais le token.',
  },
  trust: {
    privacyTitle: 'Privé par défaut',
    privacyItems: [
      {
        title: 'Les données restent locales',
        desc: 'L’historique d’écoute vit dans un fichier SQLite dans votre propre volume.',
      },
      {
        title: 'Export ou suppression à tout moment',
        desc: 'Export JSON, import et suppression par utilisateur sont intégrés à la page de paramètres.',
      },
      {
        title: 'Authentification optionnelle',
        desc: 'Définissez STATS_API_TOKEN et le tableau de bord comme les API exigent une connexion — les sessions utilisent un cookie HttpOnly.',
      },
      {
        title: 'Aucune télémétrie',
        desc: 'Le conteneur ne parle qu’à un seul tiers : vos serveurs Navidrome.',
      },
    ],
    limitsTitle: 'Limites honnêtes',
    limitItems: [
      {
        title: 'Une instance par ensemble de sources',
        desc: 'Plusieurs instances interrogeant les mêmes serveurs compteraient les écoutes en double.',
      },
      {
        title: 'SQLite en clair',
        desc: 'La base et les identifiants enregistrés via les paramètres ne sont pas chiffrés — protégez le volume comme un secret.',
      },
      {
        title: 'Pas de TLS intégré',
        desc: 'Pour un accès distant, placez-le derrière votre reverse proxy HTTPS.',
      },
    ],
  },
  faq: {
    title: 'Questions, réponses',
    items: [
      {
        q: 'Quels clients musicaux sont pris en charge ?',
        a: 'Tout client compatible Subsonic — DSub, Symfonium, Feishin, play:Sub, substreamer, l’interface web Navidrome, etc. Les statistiques viennent du point de terminaison getNowPlaying du serveur : rien à installer côté client.',
      },
      {
        q: 'Puis-je suivre plusieurs serveurs Navidrome ?',
        a: 'Oui. Ajoutez chaque serveur dans Paramètres → Connexions ; les écoutes sont marquées par source et le tableau de bord peut filtrer par serveur.',
      },
      {
        q: 'Comment une écoute est-elle comptée exactement ?',
        a: 'Le temps d’écoute active cumulé doit dépasser PLAY_THRESHOLD_SEC (30 secondes par défaut). Les pauses et intervalles manquants sont exclus, les points de contrôle mettent à jour le même enregistrement, et les sessions terminées sous le seuil sont conservées comme tentatives — pas comme des écoutes.',
      },
      {
        q: 'Ça marche avec Jellyfin ou Airsonic ?',
        a: 'Cela fonctionne avec tout serveur parlant l’API Subsonic, mais le développement et les tests se font contre Navidrome. Les extensions OpenSubsonic sont utilisées quand un serveur les propose.',
      },
      {
        q: 'Quelle différence avec Last.fm ou Maloja ?',
        a: 'Last.fm enregistre les scrobbles dans le cloud de quelqu’un d’autre ; Maloja est auto-hébergé mais dépend toujours des clients qui soumettent les scrobbles. Navidrome Stat n’a besoin d’aucun support client — il observe le flux now-playing du serveur lui-même, donc tout client Subsonic est couvert par défaut, et les données restent sur votre disque.',
      },
      {
        q: 'Où sont mes données ?',
        a: 'Dans un unique fichier SQLite sur votre disque, dans le volume /data du conteneur. Vous pouvez l’exporter en JSON, l’importer ailleurs, ou supprimer l’historique d’un utilisateur — tout depuis la page de paramètres.',
      },
      {
        q: 'C’est lourd en ressources ?',
        a: 'Un petit conteneur, un fichier SQLite, une boucle d’interrogation de 10 secondes. Un Raspberry Pi le fait tourner confortablement.',
      },
    ],
  },
  footer: {
    ctaTitle: 'Prêt à retrouver votre année en musique ?',
    ctaButton: 'Déployer Navidrome Stat',
    links: {
      github: 'GitHub',
      docker: 'Docker Hub',
      ph: 'Product Hunt',
      issues: 'Issues',
      changelog: 'Journal des modifications',
      license: 'Licence MIT',
    },
    version: `${SITE_VERSION} · MIT`,
  },
  notfound: {
    title: 'Cette page a perdu le rythme.',
    desc: 'La page que vous cherchez n’existe pas.',
    home: 'Retour à l’accueil',
  },
};

const es: Translation = {
  meta: {
    title: 'Navidrome Stat — estadísticas de escucha autoalojadas para Navidrome',
    ogImageAlt: 'Navidrome Stat — vista previa del panel autoalojado de estadísticas de escucha',
    description:
      'Un solo panel para todas tus reproducciones, sin importar el cliente Subsonic, el dispositivo o cuántos servidores Navidrome tengas. Tiempo de escucha, tendencias, rankings y resumen anual. Autoalojado, código abierto, MIT.',
  },
  nav: {
    features: 'Funciones',
    themes: 'Temas',
    review: 'Resumen anual',
    start: 'Inicio rápido',
    faq: 'FAQ',
    docs: 'Documentación',
    deploy: 'Desplegar',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    language: 'Idioma',
    soon: 'pronto',
    skip: 'Ir al contenido',
  },
  hero: {
    badge: 'Autoalojado · Código abierto · MIT',
    titleA: 'Cada reproducción ',
    titleB: 'cuenta.',
    subtitle:
      'Navidrome Stat sondea la API getNowPlaying de tus servidores Navidrome y convierte tus escuchas en un panel autoalojado: tiempo de escucha, tendencias, rankings y un resumen anual. Tus datos nunca salen de tu máquina.',
    ctaDeploy: 'Desplegar con Docker',
    ctaGithub: 'Ver en GitHub',
    np: {
      live: 'Escuchando ahora',
      track: 'Blue in Green',
      artist: 'Miles Davis — Kind of Blue',
      client: 'Feishin · home-nas',
      total: '5:37',
    },
  },
  proof: {
    ph: 'Presentado en Product Hunt',
    mit: 'Licencia MIT',
    docker: 'Docker Hub — stepaniah/navidrome-statistic',
    stack: '10 temas · 5 idiomas · cualquier cliente Subsonic',
  },
  bento: {
    title: 'Todo lo que sabe tu historial de escucha',
    subtitle:
      'Los clientes de Navidrome no comparten estadísticas entre sí. Navidrome Stat observa el servidor en su lugar: un solo historial, todos los clientes.',
    np: {
      title: 'Reproduciendo, en directo',
      desc: 'Sigue la actividad de escucha en tiempo real, en todos los clientes y servidores.',
      caption: '3 clientes · 2 servidores · actualización en directo',
    },
    aggregate: {
      title: 'Todos los clientes, un solo historial',
      desc: 'DSub, Symfonium, Feishin, reproductores web: las reproducciones de cualquier cliente Subsonic llegan al mismo historial. También varios servidores Navidrome.',
    },
    charts: {
      title: 'Gráficos que llegan a fondo',
      desc: 'Tendencias por hora y por día, mapa de calor día de la semana × hora, uso por cliente, tasas de transcodificación y rankings de artistas, álbumes y canciones.',
    },
    review: {
      title: 'Un resumen de tu año',
      desc: 'Totales, rachas de escucha y tus mejores artistas, álbumes y canciones: tu propio Wrapped, con tus propios datos.',
    },
    cover: {
      title: 'Portadas proxy y en caché',
      desc: 'Las portadas pasan por una caché autenticada y con límite de tamaño: tu biblioteca sigue siendo privada.',
      caption: '1 024 portadas en caché · 128 MB',
    },
    privacy: {
      title: 'Tus datos, tus reglas',
      desc: 'Todo vive en un archivo SQLite que te pertenece. Exportación, importación y borrado por usuario. Autenticación por token opcional. Sin telemetría.',
      points: ['Exportación e importación JSON', 'Borrado por usuario', 'Token de autenticación opcional'],
    },
    themesCard: {
      title: 'Diez temas',
      desc: 'Catppuccin, Nord, Dracula, Tokyo Night, Gruvbox, Solarized: cambio instantáneo.',
    },
    langs: {
      title: 'Cinco idiomas',
      desc: 'English, 简体中文, 繁體中文, 日本語, Deutsch: más en la hoja de ruta.',
    },
  },
  themes: {
    title: 'Elige el tema que quieras',
    subtitle: 'Diez temas integrados recolorean cada pestaña al instante. Haz clic y mira cómo cambia el panel:',
    urlLabel: 'localhost:39421',
    mockLabel: 'Vista previa interactiva del panel de Navidrome Stat con el tema seleccionado',
    mock: {
      title: 'Playback Statistics',
      range: 'Last 30 days',
      servers: 'All servers',
      live: 'Listening in real time',
      nowPlaying: 'Now Playing',
      clientTag: 'Feishin · home-nas',
      plays: 'Total plays',
      listeningTime: 'Listening time',
      uniqueTracks: 'Unique tracks',
      clients: 'Clients · by play count',
      transcoding: 'Transcoding',
      directPlay: 'Direct Play',
      transcoded: 'Transcoded',
    },
  },
  review: {
    title: 'Tu año en música',
    subtitle: 'Una página, todo tu año: totales, rachas y las canciones que te acompañaron.',
    plays: 'reproducciones',
    hours: 'horas de escucha',
    artists: 'artistas',
    streak: 'días de racha',
    topTrack: 'Canciones top',
    disclaimer: 'Datos de ejemplo: las cifras reales vienen de tu propia biblioteca.',
    cta: 'Ver un resumen anual de ejemplo',
    modal: {
      tag: '2025 · Biblioteca de ejemplo',
      close: 'Cerrar vista previa',
      deploy: 'Despliega y crea el tuyo',
      how: 'Cómo funciona',
    },
  },
  how: {
    title: 'Cómo funciona',
    subtitle: 'Sin plugins de cliente, sin cuentas, sin nube. Un contenedor pequeño junto a tu servidor de música.',
    step1: {
      title: 'Sondea getNowPlaying',
      desc: 'Cada 10 segundos (configurable), el colector pregunta a cada servidor Navidrome qué se está reproduciendo, mediante la API Subsonic que ya tienes.',
    },
    step2: {
      title: 'Sigue sesiones reales',
      desc: 'Pausas e interrupciones quedan excluidas. Una canción cuenta como reproducida cuando la escucha activa supera tu umbral: 30 segundos por defecto.',
    },
    step3: {
      title: 'Almacena y sirve',
      desc: 'Las reproducciones válidas se guardan en SQLite en tu disco y se muestran en un panel autosuficiente en el puerto 39421.',
    },
    note: 'Cuando un servidor anuncia la extensión OpenSubsonic playbackReport, se usa automáticamente para un seguimiento más preciso de posición y duración.',
  },
  start: {
    title: 'En marcha con un archivo compose',
    subtitle: 'Copia, pega y abre el puerto 39421. Fija la etiqueta de versión para actualizaciones reproducibles.',
    tabCompose: 'compose.yaml',
    tabRun: 'docker run',
    tabEnv: '.env',
    copy: 'Copiar',
    copied: 'Copiado',
    composeName: 'compose.yaml',
    runName: 'terminal',
    envName: '.env',
    docsLink: 'Referencia completa de configuración',
    loginHint:
      'Con STATS_API_TOKEN definido, introdúcelo una vez en la pantalla de inicio de sesión: el navegador guarda una cookie de sesión HttpOnly, nunca el token.',
  },
  trust: {
    privacyTitle: 'Privado por defecto',
    privacyItems: [
      {
        title: 'Los datos se quedan en local',
        desc: 'El historial de escucha vive en un archivo SQLite dentro de tu propio volumen.',
      },
      {
        title: 'Exporta o borra cuando quieras',
        desc: 'Exportación JSON, importación y borrado por usuario, integrados en la página de ajustes.',
      },
      {
        title: 'Autenticación opcional',
        desc: 'Define STATS_API_TOKEN y el panel y las API exigirán inicio de sesión; las sesiones usan una cookie HttpOnly.',
      },
      {
        title: 'Sin telemetría',
        desc: 'El contenedor solo habla con un tercero: tus servidores Navidrome.',
      },
    ],
    limitsTitle: 'Límites honestos',
    limitItems: [
      {
        title: 'Una instancia por conjunto de fuentes',
        desc: 'Varias instancias sondeando los mismos servidores contarían las reproducciones por duplicado.',
      },
      {
        title: 'SQLite sin cifrar',
        desc: 'La base de datos y las credenciales guardadas desde ajustes se almacenan sin cifrar: protege el volumen como cualquier secreto.',
      },
      {
        title: 'Sin TLS integrado',
        desc: 'Para acceso remoto, colócalo detrás de tu proxy inverso HTTPS.',
      },
    ],
  },
  faq: {
    title: 'Preguntas, respondidas',
    items: [
      {
        q: '¿Qué clientes de música admite?',
        a: 'Cualquier cliente compatible con Subsonic: DSub, Symfonium, Feishin, play:Sub, substreamer, la interfaz web de Navidrome y más. Las estadísticas vienen del endpoint getNowPlaying del servidor, así que no hay que instalar nada en el cliente.',
      },
      {
        q: '¿Puedo seguir varios servidores Navidrome?',
        a: 'Sí. Añade cada servidor en Ajustes → Conexiones; las reproducciones se etiquetan por origen y el panel puede filtrar por servidor.',
      },
      {
        q: '¿Cómo se cuenta exactamente una reproducción?',
        a: 'El tiempo de escucha activa acumulado debe superar PLAY_THRESHOLD_SEC (30 segundos por defecto). Las pausas e intervalos perdidos se excluyen, los puntos de control actualizan el mismo registro y las sesiones que terminan por debajo del umbral se guardan como intentos, no como reproducciones.',
      },
      {
        q: '¿Funciona con Jellyfin o Airsonic?',
        a: 'Funciona con cualquier servidor que hable la API Subsonic, pero se desarrolla y prueba contra Navidrome. Las extensiones OpenSubsonic se usan cuando el servidor las ofrece.',
      },
      {
        q: '¿En qué se diferencia de Last.fm o Maloja?',
        a: 'Last.fm registra los scrobbles en la nube de otro; Maloja es autoalojado pero sigue dependiendo de que los clientes envíen los scrobbles. Navidrome Stat no necesita nada del cliente: observa el propio flujo now-playing del servidor, así que cubre cualquier cliente Subsonic por defecto, y los datos se quedan en tu disco.',
      },
      {
        q: '¿Dónde viven mis datos?',
        a: 'En un único archivo SQLite en tu disco, dentro del volumen /data del contenedor. Puedes exportarlo a JSON, importarlo en otro sitio o borrar el historial de un usuario, todo desde la página de ajustes.',
      },
      {
        q: '¿Cuántos recursos consume?',
        a: 'Un contenedor pequeño, un archivo SQLite y un sondeo cada 10 segundos. Una Raspberry Pi lo lleva sin problemas.',
      },
    ],
  },
  footer: {
    ctaTitle: '¿Listo para reencontrarte con la música de tu año?',
    ctaButton: 'Desplegar Navidrome Stat',
    links: {
      github: 'GitHub',
      docker: 'Docker Hub',
      ph: 'Product Hunt',
      issues: 'Issues',
      changelog: 'Registro de cambios',
      license: 'Licencia MIT',
    },
    version: `${SITE_VERSION} · MIT`,
  },
  notfound: {
    title: 'Esta página perdió el compás.',
    desc: 'La página que buscas no existe.',
    home: 'Volver al inicio',
  },
};

export const ui: Record<Language, Translation> = { en, zh, 'zh-TW': zhTW, ja, fr, es };

export const CODE = {
  compose: `services:
  navidrome-stat:
    image: stepaniah/navidrome-statistic:${SITE_VERSION}
    container_name: navidrome-stat
    user: "1000:1000"
    ports:
      - "39421:39421"
    volumes:
      - navidrome-stat-data:/data
    environment:
      NAVIDROME_URL: \${NAVIDROME_URL}
      NAVIDROME_USER: \${NAVIDROME_USER}
      NAVIDROME_PASS: \${NAVIDROME_PASS}
      STATS_API_TOKEN: \${STATS_API_TOKEN}
      DATABASE_URL: /data/navidrome_stats.db
    restart: unless-stopped

volumes:
  navidrome-stat-data:`,
  run: `docker run -d --name navidrome-stat \\
  -p 39421:39421 \\
  -e NAVIDROME_URL=https://navidrome.example.com \\
  -e NAVIDROME_USER=you \\
  -e NAVIDROME_PASS=change-me \\
  -e STATS_API_TOKEN=$(openssl rand -hex 24) \\
  -v navidrome-stat-data:/data \\
  stepaniah/navidrome-statistic:${SITE_VERSION}`,
  env: `NAVIDROME_URL=https://navidrome.example.com
NAVIDROME_USER=example_user
NAVIDROME_PASS=change-me
STATS_API_TOKEN=use-a-long-random-value`,
};
