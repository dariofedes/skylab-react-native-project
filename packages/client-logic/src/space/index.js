import axios from 'axios';
import {API_BASE_URL, API_VERSION} from './Constants';

const API_URL = `${API_BASE_URL}${API_VERSION}`;

/**
 *
 * @param {String} path  // the apis path to get data
 *
 * @returns result data according to request
 * @throws {Error} if the request has catch any error
 */
export const executeRequest = path => {
  return axios
    .get(`${API_URL}${path}`)
    .then(result => {
      return result;
    })
    .catch(err => {
      throw new Error(err);
    });
};

export default {
  executeRequest,
};
