import { Component } from '@angular/core'
import { Observable } from 'rxjs'

import { ThemeService, Theme } from './services/theme.service'
import { ApiService } from './services/api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  theme: Observable<Theme>

  constructor(private themeService: ThemeService, private apiService: ApiService) {
  }

  ngOnInit() {
    this.theme = this.themeService.mode$
  }

  toggleTheme() {
    this.themeService.toggleMode()
  }
}
