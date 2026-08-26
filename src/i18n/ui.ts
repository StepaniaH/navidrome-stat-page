export type Language = 'en' | 'zh';

export const LANGUAGES: Record<Language, string> = {
  en: 'English',
  zh: '简体中文',
};

export const FUTURE_LANGUAGES: string[] = ['Deutsch', '日本語', 'Français', 'Español'];

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
    titleA: 'Every play,',
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
      elapsed: '1:05',
      total: '12:04',
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
    subtitle: 'Ten built-in themes recolor every tab instantly. Two of them, for real:',
    frappe: 'Catppuccin Frappé',
    gruvbox: 'Gruvbox',
    urlLabel: 'localhost:39421',
    paletteNote: 'All ten palettes:',
    alt: 'Navidrome Stat dashboard in the {name} theme',
  },
  review: {
    title: 'Your year in music',
    subtitle: 'One page, your whole year: totals, streaks, and the songs that got you through it.',
    plays: 'plays',
    hours: 'hours listened',
    artists: 'artists',
    streak: 'day streak',
    topTrack: 'Top track',
    disclaimer: 'Sample data — the real numbers come from your own library.',
    cta: 'Start your own review',
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
    disclaimer: 'Independent open-source project. Not affiliated with the Navidrome project.',
    links: {
      github: 'GitHub',
      docker: 'Docker Hub',
      ph: 'Product Hunt',
      issues: 'Issues',
      changelog: 'Changelog',
      license: 'MIT License',
    },
    version: 'v0.8.1 · MIT',
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
      elapsed: '1:05',
      total: '12:04',
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
    subtitle: '十套内置主题让所有页面即时换色。其中两套的真实截图：',
    frappe: 'Catppuccin Frappé',
    gruvbox: 'Gruvbox',
    urlLabel: 'localhost:39421',
    paletteNote: '全部十套色板：',
    alt: '{name} 主题下的 Navidrome Stat 仪表盘',
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
    cta: '开始你的年度回顾',
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
    disclaimer: '独立开源项目，与 Navidrome 官方无关联。',
    links: {
      github: 'GitHub',
      docker: 'Docker Hub',
      ph: 'Product Hunt',
      issues: 'Issues',
      changelog: '更新日志',
      license: 'MIT 许可证',
    },
    version: 'v0.8.1 · MIT',
  },
  notfound: {
    title: '这个页面跳拍了。',
    desc: '你要找的页面不存在。',
    home: '回到首页',
  },
};

export const ui: Record<Language, Translation> = { en, zh };

export const CODE = {
  compose: `services:
  navidrome-stat:
    image: stepaniah/navidrome-statistic:v0.8.1
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
  stepaniah/navidrome-statistic:v0.8.1`,
  env: `NAVIDROME_URL=https://navidrome.example.com
NAVIDROME_USER=example_user
NAVIDROME_PASS=change-me
STATS_API_TOKEN=use-a-long-random-value`,
};
