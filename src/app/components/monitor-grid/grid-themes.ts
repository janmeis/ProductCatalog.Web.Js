import { ThemeDefaultParams, themeQuartz } from 'ag-grid-community';

const _backgroundColor = (percent: number): string =>
  `color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) ${percent}%)`;

export const themeDark = themeQuartz
  .withParams({
    browserColorScheme: 'dark',
    backgroundColor: "#1f2836",
    foregroundColor: "#FFF",
    headerBackgroundColor: '#313131',
    headerTextColor: '#DDEFF6',
    oddRowBackgroundColor: '#0F0F0F',
    chromeBackgroundColor: {
        ref: "foregroundColor",
        mix: 0.07,
        onto: "backgroundColor"
    }
  });

export const themeLight = themeQuartz
  .withParams({
    browserColorScheme: 'light',
    headerBackgroundColor: _backgroundColor(10),
    oddRowBackgroundColor: _backgroundColor(2)
  });
