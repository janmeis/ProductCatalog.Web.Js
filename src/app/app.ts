import { httpResource } from '@angular/common/http';
import { AfterViewInit, Component, effect, inject } from '@angular/core';
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
  private themeService: ThemeService = inject(ThemeService);
  loggedUser: LoggedUserDto | null = null;
  loggedUserResource = httpResource<LoggedUserDto>(() => ({
      url: '/api/security/login',
      method: 'GET',
      headers: {
        'loginQT': '1073741824 sales_public'
      }
  }));

  loggedUserEffect = effect(() => {
    if (this.loggedUserResource.hasValue()) {
      this.loggedUser = this.loggedUserResource.value();
      console.log('Fetched logged user:', this.loggedUser);
    } else if (this.loggedUserResource.error()) {
      console.error('Error fetching logged user:', this.loggedUserResource.error());
    }
  });

  async ngAfterViewInit(): Promise<void> {
    await this.themeService.loadTheme();
  }

  async toggleTheme(): Promise<void> {
    await this.themeService.toggleTheme();
  }
}
