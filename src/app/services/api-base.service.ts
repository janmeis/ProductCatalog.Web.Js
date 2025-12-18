import { Injectable, inject } from '@angular/core';
import { httpResource, HttpResourceRef, HttpResourceRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {
  options: HttpResourceRequest = {
    url: '',
    method: 'GET',
    headers: {
      'loginQT': '1073741824 sales_public',
    },
    withCredentials: true,
    reportProgress: false,
  };
  private readonly baseUrl = '/api/';

  get<T>(url: string, args: any = null): HttpResourceRef<T | undefined> {
    const _options = {
      ...this.options,
      url: this.normalizeUrl(url),
      method: 'GET',
    };
    return httpResource<T | undefined>(() => _options);
  }

  post<T>(url: string, args: any = null, data: any = null): HttpResourceRef<T | undefined> {
    const _options = {
      ...this.options,
      url: this.normalizeUrl(url),
      method: 'POST',
    };
    if (data) {
      _options.body = data;
    }
    return httpResource<T | undefined>(() => _options);
  }

  private normalizeUrl = (url: string): string => (this.baseUrl + url).replace(/\/\/+/g, '/');
}
