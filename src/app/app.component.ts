import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent {
  constructor(private readonly themeService: ThemeService) {
    this.themeService.initializeTheme();
  }
}
