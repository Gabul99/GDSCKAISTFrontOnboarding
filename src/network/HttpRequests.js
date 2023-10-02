import Axios from 'axios';
import qs from 'qs';

const HttpMethod = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
};

const requestForEntity = async (method, url, params, data, arrayNoBrackets) => {
  try {
    const axiosResult = await Axios.request({
      url,
      method,
      params,
      data,
      baseURL: 'http://localhost:8080/',
      paramsSerializer: arrayNoBrackets ? param => qs.stringify(param, { arrayFormat: 'repeat' }) : undefined,
    });
    return axiosResult.data;
  } catch (e) {
    if (e.code === 200) return Promise.resolve();
    throw e;
  }
};

export const getForEntity = (url, params, arrayNoBrackets) => {
  return requestForEntity(HttpMethod.GET, url, params, null, arrayNoBrackets);
};

export const deleteForEntity = (url, params, arrayNoBrackets) => {
  return requestForEntity(HttpMethod.DELETE, url, params, null, arrayNoBrackets);
};

export const postForEntity = (url, data) => {
  return requestForEntity(HttpMethod.POST, url, null, data);
};

export const putForEntity = (url, data) => {
  return requestForEntity(HttpMethod.PUT, url, null, data);
};
