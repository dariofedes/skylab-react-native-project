import {sumDaysToDate, formatDate} from 'utils/src/Date';
import {assertParamExist} from 'utils/src/Asserts';
import {executeRequest} from '.';

/**
 * @returns all launches list
 */
export const getRocketsAllLaunches = () => {
  return executeRequest('launches');
};

/**
 *
 * @param {moment.MomentInput | String} date // valid JavaScript date format :   2016-06-23
 *
 * @returns the launches on one specific date
 */
export const getRocketsLaunchesByDate = date => {
  assertParamExist(date);

  const nextDay = sumDaysToDate(1, date);
  const formattedDate = formatDate(nextDay, 'YYYY-MM-DD');

  return executeRequest(`launches?start=${date}&end=${formattedDate}`);
};

/**
 *
 * @param {moment.MomentInput | String} startDate // valid JavaScript date format :   2016-06-23
 * @param {moment.MomentInput | String} endDate // valid JavaScript date format :   2017-06-23
 *
 * @returns the launches between two specific dates
 */
export const getRocketsLaunchesByDateRange = (startDate, endDate) => {
  assertParamExist(startDate);
  assertParamExist(endDate);

  return executeRequest(`launches?start=${startDate}&end=${endDate}`);
};

/**
 *
 * @param {String} id  // flight_number
 *
 * @returns a specific launch info
 */
export const getRocketLaunchById = id => {
  assertParamExist(id);

  return executeRequest(`launches/${id}`);
};

export default {
  getRocketsAllLaunches,
  getRocketsLaunchesByDate,
  getRocketsLaunchesByDateRange,
  getRocketLaunchById,
};
