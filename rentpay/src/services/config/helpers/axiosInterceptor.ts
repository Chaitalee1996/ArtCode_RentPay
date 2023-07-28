import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ENUMS_ASYNCH } from '../../../constants/enums';
import { API_URL } from '../../../styles/url';


let headers = {};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers,
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem(ENUMS_ASYNCH.ACCESS_TOKEN);
    //const customer_id = await AsyncStorage.getItem('customer_id');
    // console.log('token', token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.SessionId = '';
    } else {
      config.headers.Authorization = '';
    }

    return config;
  },

  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
