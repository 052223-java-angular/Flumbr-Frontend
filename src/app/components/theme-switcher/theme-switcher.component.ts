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
    console.log("current: "+this.isDarkThemeActive);
    console.log("local storage: "+ this.darkModeService.getDarkMode());

    this.isDarkThemeActive = this.darkModeService.getDarkMode() === 'true';//change the value based on the local storage value

  }

  /**
   * Change the status of  isDarkThemeActive based on event handler
   * Toggle the change of dark-mode
   * @param result - event change
   */
  onChange(result: boolean) {
    this.isDarkThemeActive = result;
    console.log("current: "+this.isDarkThemeActive);
    this.darkModeService.toggleDarkMode();
  }
}
