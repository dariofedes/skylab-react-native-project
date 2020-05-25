import {assertParamExist} from 'utils/src/Asserts';
import {executeRequest} from '.';

/**
 * @returns all landings list
 */
export const getRocketsAllLandings = () => {
  return executeRequest('landpads');
};

/**
 *
 * @param {String} id  // landing id
 *
 * @returns a specific landing info
 */
export const getRocketLandingById = id => {
  assertParamExist(id);

  return executeRequest(`landpads/${id}`);
};

export default {
  getRocketsAllLandings,
  getRocketLandingById,
};
