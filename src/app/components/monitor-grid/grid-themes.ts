import { ThemeDefaultParams, themeQuartz } from 'ag-grid-community';

const _backgroundColor = (percent: number): string =>
  `color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) ${percent}%)`;

  const themeParamsDefault = {
    headerFontSize: 14,
    headerFontWeight: 700,
    headerRowBorder: true,
    rowBorder: true,
    wrapperBorder: false,
    wrapperBorderRadius: 0
} as ThemeDefaultParams;

export const themeDark = themeQuartz
  .withParams({
    ...themeParamsDefault,
    browserColorScheme: 'dark',
    backgroundColor: '#575757',
    foregroundColor: '#B9B9B9',
    headerBackgroundColor: '#313131',
    headerTextColor: '#DDEFF6',
    oddRowBackgroundColor: '#4A4A4A'
  });

export const themeLight = themeQuartz
  .withParams({
    ...themeParamsDefault,
    browserColorScheme: 'light',
    headerBackgroundColor: _backgroundColor(10),
    oddRowBackgroundColor: _backgroundColor(2)
  });
