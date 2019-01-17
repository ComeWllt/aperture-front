import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Cookies from 'js-cookie';
import {
  SIGN_ON,
  SIGN_OUT,
  AUTHENTICATION_FAILURE,
  SHOW_REQUEST_ERROR,
  HIDE_REQUEST_ERROR,
} from '../constants/mutation-types';
import { SUBMIT_AUTHENTICATION } from '../constants/action-types';
import LoginHelper from '@/store/helpers/LoginHelper';
import { IApiConfig, ILoginPayload, isError } from '@/interfaces/loginConfig';
import router from '@/router';

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
    const context = this.context;
    context.commit(AUTHENTICATION_FAILURE, { failure: false });
    try {
      const authenticationResponse = await LoginHelper.submitAuthentication(
        payload
      );
      if (isError(authenticationResponse)) {
        console.error('Failed to login', authenticationResponse.msg);
        context.commit(AUTHENTICATION_FAILURE, { failure: true });
        context.commit(
          `ErrorModule/${SHOW_REQUEST_ERROR}`,
          { errorText: authenticationResponse.msg },
          { root: true }
        );
      } else {
        Cookies.set('token', authenticationResponse.token, {
          expires: 1,
        });
        context.commit(SIGN_ON, {
          token: authenticationResponse.token,
        });
        context.commit(`ErrorModule/${HIDE_REQUEST_ERROR}`, undefined, {
          root: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
