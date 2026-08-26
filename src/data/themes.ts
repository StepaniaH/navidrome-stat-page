export interface ThemeDef {
  id: string;
  name: string;
  bg: string;
  panel: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  c1: string;
  c2: string;
  c3: string;
  c4: string;
}

export const THEMES: ThemeDef[] = [
  {
    id: 'latte',
    name: 'Catppuccin Latte',
    bg: '#EFF1F5',
    panel: '#E6E9EF',
    border: '#CCD0DA',
    text: '#4C4F69',
    muted: '#7C7F93',
    accent: '#7287FD',
    c1: '#1E66F5',
    c2: '#40A02B',
    c3: '#EA76CB',
    c4: '#DF8E1D',
  },
  {
    id: 'frappe',
    name: 'Catppuccin Frappé',
    bg: '#303446',
    panel: '#414559',
    border: '#51576D',
    text: '#C6D3F5',
    muted: '#949CBB',
    accent: '#A6D189',
    c1: '#BABBf1',
    c2: '#A6D189',
    c3: '#F4B8E4',
    c4: '#EF9F76',
  },
  {
    id: 'macchiato',
    name: 'Catppuccin Macchiato',
    bg: '#24273A',
    panel: '#363A4F',
    border: '#494D64',
    text: '#CAD3F5',
    muted: '#939AB7',
    accent: '#B7BDF8',
    c1: '#B7BDF8',
    c2: '#A6DA95',
    c3: '#F5BDE6',
    c4: '#F5A97F',
  },
  {
    id: 'mocha',
    name: 'Catppuccin Mocha',
    bg: '#1E1E2E',
    panel: '#313244',
    border: '#45475A',
    text: '#CDD6F4',
    muted: '#9399B2',
    accent: '#B4BEFE',
    c1: '#B4BEFE',
    c2: '#A6E3A1',
    c3: '#F5C2E7',
    c4: '#FAB387',
  },
  {
    id: 'nord',
    name: 'Nord',
    bg: '#2E3440',
    panel: '#3B4252',
    border: '#434C5E',
    text: '#ECEFF4',
    muted: '#A0ACBD',
    accent: '#88C0D0',
    c1: '#88C0D0',
    c2: '#A3BE8C',
    c3: '#B48EAD',
    c4: '#D08770',
  },
  {
    id: 'dracula',
    name: 'Dracula',
    bg: '#282A36',
    panel: '#343746',
    border: '#44475A',
    text: '#F8F8F2',
    muted: '#8B93AD',
    accent: '#BD93F9',
    c1: '#BD93F9',
    c2: '#50FA7B',
    c3: '#FF79C6',
    c4: '#FFB86C',
  },
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    bg: '#1A1B26',
    panel: '#1F2335',
    border: '#2F334D',
    text: '#C0CAF5',
    muted: '#7982A9',
    accent: '#7AA2F7',
    c1: '#7AA2F7',
    c2: '#9ECE6A',
    c3: '#BB9AF7',
    c4: '#FF9E64',
  },
  {
    id: 'gruvbox',
    name: 'Gruvbox',
    bg: '#282828',
    panel: '#3C3836',
    border: '#504945',
    text: '#EBDBB2',
    muted: '#A89984',
    accent: '#FABD2F',
    c1: '#83A598',
    c2: '#B8BB26',
    c3: '#D3869B',
    c4: '#FE8019',
  },
  {
    id: 'solarized-dark',
    name: 'Solarized Dark',
    bg: '#002B36',
    panel: '#073642',
    border: '#0E4655',
    text: '#EEE8D5',
    muted: '#7C93A1',
    accent: '#268BD2',
    c1: '#268BD2',
    c2: '#859900',
    c3: '#D33682',
    c4: '#CB4B16',
  },
  {
    id: 'solarized-light',
    name: 'Solarized Light',
    bg: '#FDF6E3',
    panel: '#EEE8D5',
    border: '#DEDACA',
    text: '#586E75',
    muted: '#93A1A1',
    accent: '#268BD2',
    c1: '#268BD2',
    c2: '#859900',
    c3: '#D33682',
    c4: '#CB4B16',
  },
];

export const DEFAULT_THEME_ID = 'frappe';

export function themeVarsCss(): string {
  return THEMES.map(
    (t) =>
      `.dm-${t.id}{--dm-bg:${t.bg};--dm-panel:${t.panel};--dm-border:${t.border};--dm-text:${t.text};--dm-muted:${t.muted};--dm-accent:${t.accent};--dm-c1:${t.c1};--dm-c2:${t.c2};--dm-c3:${t.c3};--dm-c4:${t.c4};}`,
  ).join('\n');
}
