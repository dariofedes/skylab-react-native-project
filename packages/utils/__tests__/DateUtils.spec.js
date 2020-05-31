import {sumDaysToDate, formatDate} from '@skylab/utils/src/Date';

jest.mock('moment', () => {
  return () => jest.requireActual('moment')('2020-01-01T00:00:00.000Z');
});

describe('Date Utils', () => {
  describe('Sum Days To Date Util', () => {
    it('Should add one day to a day', () => {
      const newDate = sumDaysToDate(2, '2020-01-01');

      expect(JSON.stringify(newDate)).toStrictEqual(
        JSON.stringify('2020-01-03T00:00:00.000Z'),
      );
    });

    it('Should throw error if no number passed', () => {
      expect(() => sumDaysToDate(null, '2020-01-01')).toThrow(
        'Param is required',
      );
    });

    it('Should throw error if days are not type numeric', () => {
      expect(() => sumDaysToDate('abc', '2020-01-01')).toThrow(
        'Param must be a number',
      );
    });

    it('Should throw error if no date passed', () => {
      expect(() => sumDaysToDate(1, undefined)).toThrow('Param is required');
    });
  });

  describe('Format Date Util', () => {
    it('Should return formatted date', () => {
      expect(formatDate('2020-01-01 10:00', 'YYYY-MM-DD')).toStrictEqual(
        '2020-01-01',
      );
    });

    it('Should return default formatted date if format not passed', () => {
      expect(formatDate('2020-01-01')).toStrictEqual('2020-01-01 01:00:00');
    });

    it('Should throw error if no date passed', () => {
      expect(() => sumDaysToDate(undefined)).toThrow('Param is required');
    });
  });
});
