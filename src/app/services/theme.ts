import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeKey = 'app-theme'; // para persistir en localStorage

  constructor() {
    this.loadSavedTheme();
  }

  private loadSavedTheme() {
    const saved = localStorage.getItem(this.themeKey);
    if (saved) {
      this.setTheme(saved as 'light' | 'dark');
    } else {
      // Detectar modo del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('color-theme') as 'light' | 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    localStorage.setItem(this.themeKey, next);
  }

  setTheme(theme: 'light' | 'dark') {
    document.documentElement.setAttribute('color-theme', theme);
  }

  get currentTheme(): 'light' | 'dark' {
    return (document.documentElement.getAttribute('color-theme') as 'light' | 'dark') || 'light';
  }
}
