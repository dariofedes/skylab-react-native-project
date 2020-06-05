import {
  getRocketsAllLaunches,
  getRocketLaunchById,
  getRocketsLaunchesByDate,
  getRocketsLaunchesByDateRange
} from '@skylab/client-logic/src/space/Launches';
import ApiLogic from '@skylab/client-logic/src/space';
import { assertParamExist } from '@skylab/utils/src/Asserts';

jest.mock('@skylab/client-logic/src/space');

jest.mock('@skylab/utils/src/Asserts', () => ({
  assertParamExist: jest.fn()
}));
jest.mock('@skylab/utils/src/Date', () => ({
  sumDaysToDate: jest.fn(),
  formatDate: jest.fn(() => '2020-10-03')
}));

describe('Launches Requests', () => {
  beforeEach(() => {
    ApiLogic.executeRequest.mockClear();
  });

  describe('Get all launches', () => {


    it('Should call request get all launches correctly', async () => {
      jest.spyOn(ApiLogic, 'executeRequest').mockImplementation(() => ({
        status: 200,
        data: [{ id: 'id-1' }]
      }))

      const res = await getRocketsAllLaunches();

      expect(ApiLogic.executeRequest).toHaveBeenCalledWith('launches');

      expect(res).toStrictEqual([{ id: 'id-1' }])
    });
  });

  describe('Get launches by date', () => {
    it('Should call request get launches by date correctly', () => {
      getRocketsLaunchesByDate('2020-10-01');

      expect(ApiLogic.executeRequest).toHaveBeenCalledWith(
        'launches?start=2020-10-01&end=2020-10-03'
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

      expect(ApiLogic.executeRequest).toHaveBeenCalledWith(
        'launches?start=2020-10-01&end=2020-10-03'
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
      expect(ApiLogic.executeRequest).toHaveBeenCalledWith('launches/123');
    });

    it('Should throw error if no id passed', () => {
      getRocketLaunchById();

      expect(assertParamExist).toHaveBeenCalled();
      expect(ApiLogic.executeRequest).not.toHaveBeenCalledWith('launches/123');
    });
  });
});
