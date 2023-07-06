import {Component, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent {

  isDarkThemeActive = false;

  constructor(@Inject(DOCUMENT) private document:Document) {
  }
  onChange(newValue:boolean):void{
    console.log(newValue)
    if (newValue){
    this.document.body.classList.add('dark-mode');
    }
    else{
      this.document.body.classList.remove('dark-mode');
    }
  }
}
