import {sumDaysToDate, formatDate} from '@skylab/utils/src/Date';
import {assertParamExist} from '@skylab/utils/src/Asserts';
import {executeRequest} from '.';

/**
 * @returns all launches list
 */
export const getRocketsAllLaunches = async () => {
  const result = await executeRequest('launches');

  if (result.status === 200) return result.data
  else return []
  
};

/**
 *
 * @param {moment.MomentInput | String} date // valid JavaScript date format :   2016-06-23
 *
 * @returns the launches on one specific date
 */
export const getRocketsLaunchesByDate = async date => {
  assertParamExist(date);

  const nextDay = sumDaysToDate(1, date);
  const formattedDate = formatDate(nextDay, 'YYYY-MM-DD');

  const result = await executeRequest(`launches?start=${date}&end=${formattedDate}`);

  if (result.status === 200) return result.data
  else return []
};

/**
 *
 * @param {moment.MomentInput | String} startDate // valid JavaScript date format :   2016-06-23
 * @param {moment.MomentInput | String} endDate // valid JavaScript date format :   2017-06-23
 *
 * @returns the launches between two specific dates
 */
export const getRocketsLaunchesByDateRange = async (startDate, endDate) => {
  assertParamExist(startDate);
  assertParamExist(endDate);

  const result = await executeRequest(`launches?start=${startDate}&end=${endDate}`);

  if (result.status === 200) return result.data
  else return []
};

/**
 *
 * @param {String} id  // flight_number
 *
 * @returns a specific launch info
 */
export const getRocketLaunchById = async id => {
  assertParamExist(id);

  const result = await executeRequest(`launches/${id}`);

  if (result.status === 200) return result.data
  else return {}
  
};

export default {
  getRocketsAllLaunches,
  getRocketsLaunchesByDate,
  getRocketsLaunchesByDateRange,
  getRocketLaunchById,
};
