import axios, { AxiosResponse } from 'axios';
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
    > = await axios.post(
      this.backendAuthURL,
      JSON.stringify({
        username: payload.username,
        password: payload.password,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return result.data;
  }
  private static backendAuthURL = 'http://localhost:3000/api/signin';
}
