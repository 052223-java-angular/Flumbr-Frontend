import { environment} from "../../environments/environment";

export class AppSettings {
  public static API_URL = environment.apiBaseUrl;
  public static DEFAULT_MESSAGE_LIFE = 3000;
  public static BYTES_PER_MEGABYTE = 1048576;
  public static CREATE_POST_SIZE_LIMIT = 128 * this.BYTES_PER_MEGABYTE;
}

