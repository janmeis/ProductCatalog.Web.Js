import { CommonModule, formatDate } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { IListFilter } from '../../models/ListFilter';
import { IPageResult } from '../../models/PageResult';
import { IProductDto } from '../../models/ProductDto';
import { ProductOfferingType } from '../../models/ProductOfferingType';
import { ProductState } from '../../models/ProductState';
import { ApiBaseService } from '../../services/api-base.service';
import { ThemeService, ThemeType } from '../../services/theme.service';
import { themeDark, themeLight } from './grid-themes';

@Component({
  selector: 'app-monitor-grid',
  standalone: true,
  imports: [AgGridAngular, FormsModule, CommonModule], // Add Angular Data Grid Component
  templateUrl: './monitor-grid.component.html',
  styleUrl: './monitor-grid.component.less'
})
export class MonitorGridComponent {
  private themeService = inject(ThemeService);
  private apiBase: ApiBaseService = inject(ApiBaseService);
  theme = themeLight;
  private productFilter = {
    PageInfo: { PageNumber: 1, PageSize: 50 }
  } as IListFilter;
  productResource = this.apiBase.post<IPageResult<IProductDto>>('products/list', null, this.productFilter);

  // React to global theme changes via ThemeService
  private themeEffect = effect(() => {
    const current = this.themeService.theme();
    this.theme = current === ThemeType.dark ? themeDark : themeLight;
  });

  // Column Definitions: match IProductDto fields
  colDefs: ColDef[] = [
    { headerName: 'Název', field: 'Name' },
    { headerName: 'Název 2', field: 'Name2' },
    { headerName: 'Název EN', field: 'NameEN' },
    { headerName: 'Typ', field: 'Type', valueFormatter: params => params.value !== undefined ? ProductOfferingType[params.value as number] : '' },
    { headerName: 'Pořadí', field: 'Order', width: 80 },
    { headerName: 'Stav', field: 'State', valueFormatter: params => params.value !== undefined ? ProductState[params.value as number] : '' },
    { headerName: 'Poslední změna stavu', field: 'LastStateChangeDate', valueFormatter: params => params.value ? formatDate(params.value, 'dd.MM.yyyy hh:mm', 'cs-CZ' ) : '' },
    { headerName: 'Print Composite', field: 'PrintComposite', width: 80}
  ];
}



