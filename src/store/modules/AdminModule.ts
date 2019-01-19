import { Module, VuexModule, Action, getModule } from 'vuex-module-decorators';
import { SUBMIT_ALBUM_DESCRIPTION } from '@/store/constants/action-types';
import {
  SET_ALBUM_DESCRIPTION,
  SHOW_REQUEST_ERROR,
} from '@/store/constants/mutation-types';
import ErrorModule from '@/store/modules/ErrorModule';
import DataModule from '@/store/modules/DataModule';

import ApiCallsHelper from '@/store/helpers/ApiCallsHelper';

@Module({ namespaced: true, name: 'AdminModule' })
export default class AdminModule extends VuexModule {
  @Action
  public async [SUBMIT_ALBUM_DESCRIPTION](payload: {
    albumId: string;
    newDescription: string;
  }): Promise<void> {
    const errorModule = getModule(ErrorModule);
    const dataModule = getModule(DataModule);
    try {
      await ApiCallsHelper.modifyAlbum(payload.albumId, {
        description: payload.newDescription,
      });
      dataModule[SET_ALBUM_DESCRIPTION]({
        albumId: payload.albumId,
        newDescription: payload.newDescription,
      });
    } catch (error) {
      errorModule[SHOW_REQUEST_ERROR]({
        errorText: 'Oops, your submission failed...',
      });
      console.error(error);
      throw new Error(error);
    }
  }
}
