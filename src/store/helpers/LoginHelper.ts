import axios, { AxiosResponse } from 'axios';
import secrets from '@/assets/secrets.json';
import {
  ILoginPayload,
  ILoginResponse,
  ILoginError,
} from '@/interfaces/loginConfig';

export default class LoginHelper {
  public static async submitAuthentication(
    payload: ILoginPayload
  ): Promise<ILoginResponse | ILoginError> {
    const result: AxiosResponse<
      ILoginResponse | ILoginError
    > = await axios.post(this.backendAuthURL, {
      username: payload.username,
      password: payload.password,
    });
    return result.data;
  }
  private static backendAuthURL: string = `${secrets.backendUrl}/api/signin`;
}
