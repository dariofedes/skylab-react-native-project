import {
  getRocketsAllLaunches,
  getRocketLaunchById,
  getRocketsLaunchesByDate,
  getRocketsLaunchesByDateRange,
} from 'client-logic/src/space/Launches';
import {executeRequest} from 'client-logic/src/space';
import {assertParamExist} from 'utils/src/Asserts';

jest.mock('client-logic/src/space', () => ({
  executeRequest: jest.fn(),
}));
jest.mock('utils/src/Asserts', () => ({
  assertParamExist: jest.fn(),
}));
jest.mock('utils/src/Date', () => ({
  sumDaysToDate: jest.fn(),
  formatDate: jest.fn(() => '2020-10-03'),
}));

describe('Launches Requests', () => {
  beforeEach(() => {
    executeRequest.mockClear();
  });

  describe('Get all launches', () => {
    it('Should call request get all launches correctly', () => {
      getRocketsAllLaunches();

      expect(executeRequest).toHaveBeenCalledWith('launches');
    });
  });

  describe('Get launches by date', () => {
    it('Should call request get launches by date correctly', () => {
      getRocketsLaunchesByDate('2020-10-01');

      expect(executeRequest).toHaveBeenCalledWith(
        'launches?start=2020-10-01&end=2020-10-03',
      );
    });

    it('Should throw error if no date passed', () => {
      getRocketsLaunchesByDate();

      expect(assertParamExist).toHaveBeenCalled();
    });
  });

  describe('Get launches by date range', () => {
    it('Should call request get launches by date range correctly', () => {
      getRocketsLaunchesByDateRange('2020-10-01', '2020-10-03');

      expect(executeRequest).toHaveBeenCalledWith(
        'launches?start=2020-10-01&end=2020-10-03',
      );
    });

    it('Should throw error if no start date passed', () => {
      getRocketsLaunchesByDateRange(undefined, '2020-10-03');

      expect(assertParamExist).toHaveBeenCalled();
    });

    it('Should throw error if no end date passed', () => {
      getRocketsLaunchesByDateRange('2020-10-01');

      expect(assertParamExist).toHaveBeenCalled();
    });
  });

  describe('Get launch by id', () => {
    it('Should call request get launch by id correctly', () => {
      getRocketLaunchById('123');

      expect(assertParamExist).not.toThrow();
      expect(executeRequest).toHaveBeenCalledWith('launches/123');
    });

    it('Should throw error if no id passed', () => {
      getRocketLaunchById();

      expect(assertParamExist).toHaveBeenCalled();
      expect(executeRequest).not.toHaveBeenCalledWith('launches/123');
    });
  });
});
