import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private isDarkModeActive: boolean;//controls if dark-mode is true or false

  constructor() {

    this.isDarkModeActive = this.getDarkMode() === 'true';
    this.updateDarkMode();
  }

  /**
   * saves if dark-mode is true or false in local storage
   */
  saveDarkMode() {

    localStorage.setItem('dark', this.isDarkModeActive.toString());
  }

  /**
   * retrieves the value of dark-mode in local storage
   */
  getDarkMode(): string {
    console.log("current "+localStorage.getItem('dark'));
    return localStorage.getItem('dark')! ;
  }

  /**
   * if dark-mode is true set to false, if dark-mode is false set to true
   * update the dom based on the value of isDarkModeActive
   * save the current value to local storage
   */
  toggleDarkMode(): void {
    this.isDarkModeActive = !this.isDarkModeActive;
    this.updateDarkMode();
    this.saveDarkMode();
  }

  /**
   * helper class to manipulate the DOM
   * @private
   */
  private updateDarkMode(): void {
    if (this.isDarkModeActive) {

      document.body.classList.add('dark-mode');
      document.documentElement.classList.add('dark')
    }
    else {

      document.body.classList.remove('dark-mode');
      document.documentElement.classList.remove('dark')

    }
  }
}
