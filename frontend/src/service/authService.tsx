import {tokenStorage} from '@/state/storage';
import {BASE_URL} from './config';
import axios from 'axios';
import {useAuthStore} from '@/state/authStore';

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
