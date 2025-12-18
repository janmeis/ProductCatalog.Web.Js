import { Injectable, signal } from '@angular/core';

export enum ThemeType {
  dark = 'dark',
  default = 'default',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme = ThemeType.default;
  // Reactive theme state for components to subscribe to
  theme = signal<ThemeType>(ThemeType.default);

  constructor() {
    this.theme.set(this.currentTheme);
  }

  private reverseTheme(theme: string): ThemeType {
    return theme === ThemeType.dark ? ThemeType.default : ThemeType.dark;
  }

  private removeUnusedTheme(theme: ThemeType): void {
    document.documentElement.classList.remove(theme);
    const removedThemeStyle = document.getElementById(theme);
    if (removedThemeStyle) {
      document.head.removeChild(removedThemeStyle);
    }
  }

  private async loadCss(href: string, id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = href;
      style.id = id;
      style.onload = () => resolve();
      style.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`));
      document.head.append(style);
    });
  }

  async loadTheme(firstLoad = true): Promise<void> {
    const theme = this.currentTheme;
    if (firstLoad) {
      document.documentElement.classList.add(theme);
    }
    await this.loadCss(`${theme}.css`, theme);
    if (!firstLoad) {
      document.documentElement.classList.add(theme);
    }
    // Notify subscribers after ensuring classes/styles are applied
    this.theme.set(this.currentTheme);
    this.removeUnusedTheme(this.reverseTheme(theme));
  }

  async toggleTheme(): Promise<void> {
    this.currentTheme = this.reverseTheme(this.currentTheme);
    // Emit immediately for reactive consumers; CSS swap follows
    this.theme.set(this.currentTheme);
    return this.loadTheme(false);
  }
}
