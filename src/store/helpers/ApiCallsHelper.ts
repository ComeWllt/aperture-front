import axios, { AxiosResponse } from 'axios';
import store from '@/store';
import { IAlbum, IPortfolio } from '@/interfaces/data';

export default class ApiCallsHelper {
  public static async getAlbums(): Promise<IAlbum[]> {
    const apiConfig = store.state.LoginModule.apiConfig;
    const backendURL = store.state.LoginModule.backendURL;
    const result: AxiosResponse<IAlbum[]> = await axios.get(
      `${backendURL}/api/albums`,
      apiConfig
    );
    return result.data;
  }

  public static async getPortfolio(): Promise<IPortfolio> {
    const apiConfig = store.state.LoginModule.apiConfig;
    const backendURL = store.state.LoginModule.backendURL;
    const result: AxiosResponse<[IPortfolio]> = await axios.get(
      `${backendURL}/api/portfolio`,
      apiConfig
    );
    return result.data[0];
  }
}
