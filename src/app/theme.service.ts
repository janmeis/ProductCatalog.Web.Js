import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

enum ThemeType {
  dark = 'dark',
  default = 'default',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme = ThemeType.default;
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private reverseTheme(theme: string): ThemeType {
    return theme === ThemeType.dark ? ThemeType.default : ThemeType.dark;
  }

  private removeUnusedTheme(theme: ThemeType): void {
    if (!this.isBrowser) return;
    document.documentElement.classList.remove(theme);
    const removedThemeStyle = document.getElementById(theme);
    if (removedThemeStyle) {
      document.head.removeChild(removedThemeStyle);
    }
  }

  private loadCss(href: string, id: string): Promise<void> {
    if (!this.isBrowser) return Promise.resolve();
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

  public loadTheme(firstLoad = true): Promise<void> {
    const theme = this.currentTheme;
    if (!this.isBrowser) return Promise.resolve();
    if (firstLoad) {
      document.documentElement.classList.add(theme);
    }
    return this.loadCss(`${theme}.css`, theme).then(() => {
      if (!firstLoad) {
        document.documentElement.classList.add(theme);
      }
      this.removeUnusedTheme(this.reverseTheme(theme));
    });
  }

  public toggleTheme(): Promise<void> {
    this.currentTheme = this.reverseTheme(this.currentTheme);
    return this.loadTheme(false);
  }
}
