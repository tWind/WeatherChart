import axios from 'axios';
import constants from '@/constants';

class API {
  constructor() {
    this.service = axios.create();

    this.service.interceptors.request.use(config => {
      config.headers.token = constants.API_KEY;
      return config;
    });
  }

  get(path, params) {
    return this.service.get(path, {params});
  }
}

export default new API();