import moment from 'moment';
import {assertNumericParam, assertParamExist} from './Asserts';

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 *
 * @param {moment.MomentInput | String} date // the date wanna be formatted
 * @param {String} format // format type
 *
 * @returns formatted date
 */
export const formatDate = (date, format = DEFAULT_FORMAT) => {
  assertParamExist(date);

  return moment(date).format(format);
};
/**
 *
 * @param {Number} days  // days wanna add to the date
 * @param {moment.MomentInput | String} date  // initial date
 *
 * @returns a new date
 */
export const sumDaysToDate = (days, date) => {
  assertNumericParam(days);
  assertParamExist(date);

  const newDate = moment(date).add(days, 'day');

  return newDate;
};

export default {
  formatDate,
  sumDaysToDate,
};
