import { Component} from '@angular/core';
import { DarkModeService } from "../../services/dark-mode.service";

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent {
  isDarkThemeActive: boolean = false;

  constructor(private darkModeService: DarkModeService) {
    console.log(this.isDarkThemeActive);
    console.log(this.darkModeService.getDarkMode());
    this.isDarkThemeActive = this.darkModeService.getDarkMode() === 'true';

  }

  onChange(result: boolean) {
    this.isDarkThemeActive = result;
    this.darkModeService.toggleDarkMode();
  }
}
