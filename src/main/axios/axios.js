import Axios from 'axios';
import { cloneDeep } from 'lodash';

const axiosInstance = Axios.create({
  baseURL: ECOMMERCE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async config => {
  const clonedConfig = cloneDeep(config);
  const token = ECOMMERCE_PUBLIC_KEY;

  clonedConfig.headers.common = {
    Authorization: `Bearer ${token}`,
  };

  return clonedConfig;
});

export default axiosInstance;
