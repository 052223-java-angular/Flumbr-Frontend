import { environment } from '../../environments/environment';
import { environment as envDev } from 'src/environments/environment.development';

export class AppSettings {
  public static API_URL = 'http://localhost:5000/flumblr/api';
  public static DEFAULT_MESSAGE_LIFE = 3000;
  public static BYTES_PER_MEGABYTE = 1048576;
  public static CREATE_POST_SIZE_LIMIT = 128 * this.BYTES_PER_MEGABYTE;
  public static GIPHY_API_URL = envDev.giphyApiBaseUrl;
  public static GIPHY_API_KEY = envDev.giphyApiKey;
}
