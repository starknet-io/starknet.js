import axios from 'axios';
import * as AxiosLogger from 'axios-logger';

jest.setTimeout(50 * 60 * 1000);

if (process.env.DEBUG === 'true') {
  axios.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
  axios.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);
}
