/**
 *
 * @param {any} param // any param to validate
 *
 * @throws {Error} if param does not exist
 */
export const assertParamExist = param => {
  if (!param || param === undefined) {
    throw new Error('Param is required');
  }
};

/**
 *
 * @param {Date} param // a param of date type to validate
 *
 * @throws {Error} if param does not exist or is not a date
 */
export const assertDateParam = param => {
  this.assertParamExist(param);

  if (!(param instanceof Date)) {
    throw new Error('Param must be a date');
  }
};

/**
 *
 * @param {Number} param // a numeric param to validate
 *
 * @throws {Error} if param does not exist or is not a number
 */
export const assertNumericParam = param => {
  this.assertParamExist(param);

  if (typeof param !== 'number') {
    throw new Error('Param must be a number');
  }
};

export default {
  assertParamExist,
  assertDateParam,
  assertNumericParam,
};
