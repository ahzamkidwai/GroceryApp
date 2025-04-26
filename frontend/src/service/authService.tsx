import {tokenStorage} from '@/state/storage';
import {BASE_URL} from './config';
import axios from 'axios';
import {useAuthStore} from '@/state/authStore';
import {resetAndNavigate} from '@/utils/NavigationUtils';
import {appAxios} from './apiInterceptors';

export const customerLoginHandler = async (phone: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/login`, {phone});
    const {accessToken, refreshToken, customer} = response.data;
    tokenStorage.set('accessStorage', accessToken);
    tokenStorage.set('refreshStorage', refreshToken);
    const {setUser} = useAuthStore.getState();
    setUser(customer);
  } catch (error) {
    console.log('Error occurred while customer Login : ', error);
  }
};

export const deliveryLoginHandler = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/delivery/login`, {
      email,
      password,
    });
    const {accessToken, refreshToken, deliveryPartner} = response.data;
    tokenStorage.set('accessStorage', accessToken);
    tokenStorage.set('refreshStorage', refreshToken);
    const {setUser} = useAuthStore.getState();
    setUser(deliveryPartner);
  } catch (error) {
    console.log('Error occurred while customer Login : ', error);
  }
};

export const refresh_tokens_handler = async () => {
  try {
    const refreshToken = tokenStorage.getString('refreshToken');
    const response = await axios.post(`${BASE_URL}/refresh-token`, {
      refreshToken,
    });

    const new_access_token = response.data.accessToken;
    const new_refresh_token = response.data.refreshToken;

    tokenStorage.set('accessToken', new_access_token);
    tokenStorage.set('refreshToken', new_refresh_token);
    return new_access_token;
  } catch (error) {
    console.log('REFRESH TOKEN ERROR : ', error);
    tokenStorage.clearAll();
    resetAndNavigate('CustomerLogin');
  }
};

export const refetchUser = async (setUser: any) => {
  try {
    const response = await appAxios.get('/user');
    setUser(response.data.user);
  } catch (error) {
    console.log('Login error!!! REFETCH ERROR : ', error);
  }
};

export const updateUserLocation = async (data: any, setUser: any) => {
  try {
    const response = await appAxios.patch('/user', data);
    refetchUser(setUser);
  } catch (error) {
    console.log('ERROR -> Update User Location : ', error);
  }
};
