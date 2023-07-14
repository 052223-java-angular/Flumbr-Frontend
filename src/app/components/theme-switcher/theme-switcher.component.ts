import { Component, OnInit } from '@angular/core';
import { DarkModeService } from "../../services/dark-mode.service";

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {
  isDarkThemeActive: boolean = false;

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit() {
    this.isDarkThemeActive = this.darkModeService.getDarkMode() === 'true';
  }

  onChange() {
    this.isDarkThemeActive = !this.isDarkThemeActive;
    this.darkModeService.toggleDarkMode();
  }
}
