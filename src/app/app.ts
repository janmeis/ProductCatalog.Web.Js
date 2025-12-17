import { isPlatformBrowser } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { AfterViewInit, Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LoggedUserDto } from './models/LoggedUserDto';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App implements AfterViewInit {
  isCollapsed = false;
  private readonly platformId: Object = inject(PLATFORM_ID);
  readonly isBrowser: boolean = isPlatformBrowser(this.platformId);
  private themeService: ThemeService = inject(ThemeService);
  loggedUser: LoggedUserDto | null = null;
  loggedUserResource = httpResource<LoggedUserDto>(() => ({
      url: '/api/security/login',
      method: 'GET',
      headers: {
        'loginQT': '1073741824 sales_public'
      }
  }));

  async ngAfterViewInit(): Promise<void> {
    if (this.isBrowser) {
      await this.themeService.loadTheme();
    }
    if (this.loggedUserResource.hasValue()) {
      this.loggedUser = this.loggedUserResource.value();
      console.log('Fetched logged user:', this.loggedUser);
    }
  }

  async toggleTheme(): Promise<void> {
    if (this.isBrowser) {
      await this.themeService.toggleTheme();
    }
  }
}
