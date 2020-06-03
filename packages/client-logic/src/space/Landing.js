import {assertParamExist} from '@skylab/utils/src/Asserts';
import {executeRequest} from '.';

/**
 * @returns all landings list
 */
export const getRocketsAllLandings = async () => {
  const result = await executeRequest('landpads');

  if (result.status === 200) return result.data
  else return []
};

/**
 *
 * @param {String} id  // landing id
 *
 * @returns a specific landing info
 */
export const getRocketLandingById = async id => {
  assertParamExist(id);

  const result = await executeRequest(`landpads/${id}`);;

  if (result.status === 200) return result.data
  else return null
};

export default {
  getRocketsAllLandings,
  getRocketLandingById,
};
