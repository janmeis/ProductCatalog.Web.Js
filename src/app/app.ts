import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App implements AfterViewInit {
  isCollapsed = false;
  private readonly isBrowser: boolean;

  constructor(private themeService: ThemeService, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.isBrowser) {
      await this.themeService.loadTheme();
    }
  }

  async toggleTheme(): Promise<void> {
    if (this.isBrowser) {
      await this.themeService.toggleTheme();
    }
  }
}
