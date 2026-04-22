import { Injectable } from '@angular/core';

/**
 * Cinematic theme is driven entirely by CSS variables in variables.scss.
 * This service exists for app bootstrap symmetry; no runtime theme toggling.
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  initializeTheme(): void {
    // Intentionally empty — permanent dark theme via :root in variables.scss.
  }
}
