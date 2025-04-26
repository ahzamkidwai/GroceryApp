import axios from 'axios';
import {BASE_URL} from './config';
import {refresh_tokens_handler} from './authService';
import {Alert} from 'react-native';
import {tokenStorage} from '@/state/storage';

export const appAxios = axios.create({baseURL: BASE_URL});

appAxios.interceptors.response.use(async config => {
  const accessToken = tokenStorage.getString('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

appAxios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessTokens = await refresh_tokens_handler();
        if (newAccessTokens) {
          error.config.headers.Authorization = `Bearer ${newAccessTokens}`;
          return axios(error.config);
        }
      } catch (error) {
        console.log('ERROR REFRESH TOKEN -> API Interceptors : ', error);
      }
    }

    if (error.response && error.response.status !== 401) {
      const errorMessage =
        error.response.data.message || 'something went wrong';
      Alert.alert('ERROR Occurred!!! API Interceptors', errorMessage);
    }
  },
);
