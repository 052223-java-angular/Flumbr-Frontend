import { environment } from 'src/environments/environment';

export class AppSettings {
  public static API_URL = environment.apiBaseUrl;
  public static DEFAULT_MESSAGE_LIFE = 3000;
}
