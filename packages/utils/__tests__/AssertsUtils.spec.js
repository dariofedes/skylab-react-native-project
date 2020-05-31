import {
  assertDateParam,
  assertNumericParam,
  assertParamExist,
} from '@skylab/utils/src/Asserts';

describe('Asserts Utils', () => {
  describe('Date Assert', () => {
    it('Should not throw if a date is passed', () => {
      expect(() => assertDateParam(new Date('2020-01-01'))).not.toThrow();
    });

    it('Should throw if a date is passed but in string format', () => {
      expect(() => assertDateParam('2020-01-01')).toThrow(
        'Param must be a date',
      );
    });

    it('Should throw if is passed anything that is not a date', () => {
      expect(() => assertDateParam(21423435)).toThrow('Param must be a date');
    });

    it('Should throw if no date passed', () => {
      expect(() => assertDateParam()).toThrow('Param is required');
    });
  });

  describe('Numeric Assert', () => {
    it('Should not throw if a number is passed', () => {
      expect(() => assertNumericParam(12324234235)).not.toThrow();
    });

    it('Should throw if is passed anything that is not a number', () => {
      expect(() => assertNumericParam('sdbsfd')).toThrow(
        'Param must be a number',
      );
    });

    it('Should throw if no number passed', () => {
      expect(() => assertNumericParam()).toThrow('Param is required');
    });
  });

  describe('Generic Assert', () => {
    it('Should not throw if a value is passed', () => {
      expect(() => assertParamExist('asfdsf')).not.toThrow();
    });

    it('Should throw if any value is passed', () => {
      expect(() => assertParamExist()).toThrow('Param is required');
    });
  });
});
