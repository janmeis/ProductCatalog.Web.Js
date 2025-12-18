import { AG_GRID_LOCALE_CZ } from '@ag-grid-community/locale';
import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef, GridOptions } from 'ag-grid-community'; // Column Definition Type Interface
import { ThemeService, ThemeType } from '../../theme.service';
import { themeDark, themeLight } from './grid-themes';
import { User } from '../../models/user';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-monitor-grid',
  standalone: true,
  imports: [AgGridAngular, FormsModule, CommonModule], // Add Angular Data Grid Component
  templateUrl: './monitor-grid.component.html',
  styleUrl: './monitor-grid.component.less'
})
export class MonitorGridComponent {
  private themeService = inject(ThemeService);
  theme = themeLight;
  rowDataResource = httpResource<User[]>(() => 'https://jsonplaceholder.typicode.com/users');

  // React to global theme changes via ThemeService
  private themeEffect = effect(() => {
    const current = this.themeService.theme();
    this.theme = current === ThemeType.dark ? themeDark : themeLight;
  });

  // Column Definitions: Display user fields, with nested mappers for city and company name.
  colDefs: ColDef[] = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Username', field: 'username' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'City', valueGetter: params => params.data?.address?.city },
    { headerName: 'Company', valueGetter: params => params.data?.company?.name }
  ];
}
