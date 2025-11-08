import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getRemoteConfig, fetchAndActivate, getValue, RemoteConfig } from 'firebase/remote-config';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RemoteConfigService {
  private rc!: RemoteConfig;

  constructor() {
    const app = initializeApp(environment.firebase);
    this.rc = getRemoteConfig(app);
    // Para desarrollo, reduce el intervalo si quieres probar cambios rápidamente
    this.rc.settings = {
      fetchTimeoutMillis: 60000,
      minimumFetchIntervalMillis: 0
    };
  }

  async fetchAndActivate(): Promise<void> {
    try {
      await fetchAndActivate(this.rc);
    } catch (err) {
      console.warn('RemoteConfig fetch failed', err);
    }
  }

  getBoolean(key: string): boolean {
    try {
      const val = getValue(this.rc, key);
      return !!val ? val.asBoolean() : false;
    } catch (e) {
      return false;
    }
  }

  getString(key: string): string {
    try {
      const val = getValue(this.rc, key);
      return val ? val.asString() : '';
    } catch (e) {
      return '';
    }
  }
}
