import { AG_GRID_LOCALE_CZ } from '@ag-grid-community/locale';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef, GridOptions } from 'ag-grid-community'; // Column Definition Type Interface
import { ThemeService, ThemeType } from '../../theme.service';
import { themeDark, themeLight } from './grid-themes';

@Component({
  selector: 'app-monitor-grid',
  standalone: true,
  imports: [AgGridAngular, FormsModule, CommonModule], // Add Angular Data Grid Component
  templateUrl: './monitor-grid.component.html',
  styleUrl: './monitor-grid.component.less'
})
export class MonitorGridComponent {
  private platformId = inject(PLATFORM_ID);
  private themeService = inject(ThemeService);
  isBrowser = isPlatformBrowser(this.platformId);

  theme = themeLight;

  // React to global theme changes via ThemeService
  private themeEffect = effect(() => {
    const current = this.themeService.theme();
    this.theme = current === ThemeType.dark ? themeDark : themeLight;
  });

  // Row Data Signal: The data to be displayed via Angular Signals.
  rowData = signal(new Array(5).fill([
      { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
      { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
      { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ]).flat());

  defaultColDef: ColDef = {
    editable: false,
    filter: true,
    sortable: true,
  };

  gridOptions: GridOptions = {
    rowSelection: { mode: 'singleRow', checkboxes: false },
    suppressHorizontalScroll: true,
    cellSelection: false,
    autoSizeStrategy: { type: 'fitGridWidth' },
    alwaysShowVerticalScroll: true,
    localeText: AG_GRID_LOCALE_CZ
  }

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
      { field: 'make' },
      { field: 'model' },
      { field: 'price' },
      { field: 'electric' }
  ];
}
