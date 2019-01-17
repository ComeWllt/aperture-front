import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import Cookies from 'js-cookie';
import {
  SIGN_ON,
  SIGN_OUT,
  AUTHENTICATION_FAILURE,
  SHOW_REQUEST_ERROR,
  HIDE_REQUEST_ERROR,
} from '../constants/mutation-types';
import { SUBMIT_AUTHENTICATION, FETCH_DATA } from '../constants/action-types';
import LoginHelper from '@/store/helpers/LoginHelper';
import { IApiConfig, ILoginPayload, isError } from '@/interfaces/loginConfig';
import router from '@/router';
import ErrorModule from '@/store/modules/ErrorModule';
import DataModule from '@/store/modules/DataModule';

@Module({ namespaced: true, name: 'LoginModule' })
export default class LoginModule extends VuexModule {
  public isLoggedIn: boolean = !!Cookies.get('token');
  public failedToAuthenticate: boolean = false;
  public backendURL: string = 'http://localhost:3000';
  public apiConfig: IApiConfig = {
    headers: { Authorization: `JWT ${Cookies.get('token') || 'null'}` },
  };

  @Mutation
  public [SIGN_ON](payload: { token: string }): void {
    this.apiConfig.headers.Authorization = `JWT ${payload.token}`;
    this.isLoggedIn = true;
    // use (router as any) because of a types issue
    router.push((router as any).history.current.query.redirect || '/');
  }
  @Mutation
  public [SIGN_OUT](): void {
    if (this.isLoggedIn === false) {
      return;
    }
    this.isLoggedIn = false;
    Cookies.remove('token');
    this.apiConfig.headers.Authorization = 'JWT null';
    router.push({
      path: '/login',
      // use (router as any) because of a types issue
      query: { redirect: (router as any).history.current.path },
    });
  }
  @Mutation
  public [AUTHENTICATION_FAILURE](payload: { failure: boolean }): void {
    this.failedToAuthenticate = payload.failure;
  }

  @Action
  public async [SUBMIT_AUTHENTICATION](payload: ILoginPayload): Promise<void> {
    const errorModule = getModule(ErrorModule);
    const dataModule = getModule(DataModule);
    this[AUTHENTICATION_FAILURE]({ failure: false });
    try {
      const authenticationResponse = await LoginHelper.submitAuthentication(
        payload
      );
      if (isError(authenticationResponse)) {
        console.error('Failed to login', authenticationResponse.msg);
        this[AUTHENTICATION_FAILURE]({ failure: true });
        errorModule[SHOW_REQUEST_ERROR]({
          errorText: authenticationResponse.msg,
        });
      } else {
        Cookies.set('token', authenticationResponse.token, {
          expires: 1,
        });
        this[SIGN_ON]({ token: authenticationResponse.token });
        errorModule[HIDE_REQUEST_ERROR]();
        dataModule[FETCH_DATA]().catch(error => console.error(error));
      }
    } catch (error) {
      console.log(error);
    }
  }
}
