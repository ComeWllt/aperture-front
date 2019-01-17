export interface IApiConfig {
  headers: {
    Authorization: string;
  };
}

export interface ILoginPayload {
  username: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  token: string;
}

export interface ILoginError {
  success: boolean;
  msg: string;
}

export function isError(
  resp: ILoginResponse | ILoginError
): resp is ILoginError {
  return (resp as Partial<ILoginError>).success === false;
}
