import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import moment from 'moment';
import {
  FETCH_DATA,
  FETCH_ALBUMS,
  FETCH_PORTFOLIO,
} from '@/store/constants/action-types';
import {
  SET_ALBUMS,
  SET_PORTFOLIO,
  IS_LOADING_DATA,
} from '@/store/constants/mutation-types';
import {
  FORMATTED_ALBUMS,
  GET_ALBUM_BY_TITLE,
} from '@/store/constants/getter-types';
import { IPortfolio, IAlbum, IFormattedAlbum } from '@/interfaces/data';

import ApiCallsHelper from '@/store/helpers/ApiCallsHelper';

@Module({ namespaced: true, name: 'DataModule' })
export default class DataModule extends VuexModule {
  public albums: IAlbum[] = [];
  public portfolio: IPortfolio = {
    photos: [],
    _id: '',
    title: '',
    author: '',
    createdAt: '',
    updatedAt: '',
  };
  public isLoadingAlbums: boolean = false;
  public isLoadingPortfolio: boolean = false;

  @Mutation
  public [SET_ALBUMS](payload: { albums: IAlbum[] }): void {
    this.albums = payload.albums;
  }
  @Mutation
  public [SET_PORTFOLIO](payload: { portfolio: IPortfolio }): void {
    this.portfolio = payload.portfolio;
  }
  @Mutation
  public [IS_LOADING_DATA](payload: {
    dataType: string;
    isLoading: boolean;
  }): void {
    switch (payload.dataType) {
      case 'albums':
        this.isLoadingAlbums = payload.isLoading;
        break;
      case 'portfolio':
        this.isLoadingPortfolio = payload.isLoading;
        break;
      default:
        break;
    }
  }

  @Action
  public async [FETCH_DATA](): Promise<void> {
    this[IS_LOADING_DATA]({ dataType: 'albums', isLoading: true });
    this[IS_LOADING_DATA]({ dataType: 'portfolio', isLoading: true });
    this[FETCH_ALBUMS]().catch(error => console.error(error));
    this[FETCH_PORTFOLIO]().catch(error => console.error(error));
  }
  @Action
  public async [FETCH_ALBUMS](): Promise<void> {
    try {
      const result = await ApiCallsHelper.getAlbums();
      this[SET_ALBUMS]({ albums: result });
    } catch (error) {
      console.error(error);
    }
    this[IS_LOADING_DATA]({ dataType: 'albums', isLoading: false });
  }
  @Action
  public async [FETCH_PORTFOLIO](): Promise<void> {
    try {
      const result = await ApiCallsHelper.getPortfolio();
      this[SET_PORTFOLIO]({ portfolio: result });
    } catch (error) {
      console.error(error);
    }
    this[IS_LOADING_DATA]({ dataType: 'portfolio', isLoading: false });
  }

  get [FORMATTED_ALBUMS](): IFormattedAlbum[] {
    return this.albums.map(album => {
      return {
        ...album,
        formattedDate: moment(album.date).format('MMMM YYYY'),
      };
    });
  }

  get [GET_ALBUM_BY_TITLE](): IAlbum | {} {
    return (title: string) =>
      this[FORMATTED_ALBUMS].find(album => album.title === title) || {};
  }
}
