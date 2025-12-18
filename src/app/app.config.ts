import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import cs from '@angular/common/locales/cs';
// SSR hydration removed; no client hydration providers
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { routes } from './app.routes';
import { icons } from './icons-provider';
import { provideGlobalGridOptions } from 'ag-grid-community';
import { AG_GRID_LOCALE_CZ } from '@ag-grid-community/locale';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(cs);
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

// provide localeText to all grids via global options
provideGlobalGridOptions({
  defaultColDef: {
    editable: false,
    filter: true,
    sortable: true,
  },
  rowSelection: { mode: 'singleRow', checkboxes: false },
  suppressHorizontalScroll: true,
  cellSelection: false,
  autoSizeStrategy: { type: 'fitGridWidth' },
  alwaysShowVerticalScroll: true,
  localeText: AG_GRID_LOCALE_CZ
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideNzIcons(icons), provideNzI18n(en_US), provideAnimationsAsync(), provideHttpClient(withFetch())
  ]
};
