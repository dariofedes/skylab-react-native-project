import {
  getRocketsAllLandings,
  getRocketLandingById
} from '@skylab/client-logic/src/space/Landing';
import { executeRequest } from '@skylab/client-logic/src/space';
import { assertParamExist } from '@skylab/utils/src/Asserts';

jest.mock('@skylab/client-logic/src/space', () => ({
  executeRequest: jest.fn()
}));
jest.mock('@skylab/utils/src/Asserts', () => ({
  assertParamExist: jest.fn()
}));

describe('Landing Requests', () => {
  beforeEach(() => {
    executeRequest.mockClear();
  });

  describe('Get all landings', () => {
    it('Should call request get all landings correctly', () => {
      getRocketsAllLandings();

      expect(executeRequest).toHaveBeenCalledWith('landpads');
    });
  });

  describe('Get landing by id', () => {
    it('Should call request get landing by id correctly', () => {
      getRocketLandingById('123');

      expect(assertParamExist).not.toThrow();
      expect(executeRequest).toHaveBeenCalledWith('landpads/123');
    });

    it('Should throw error if no id passed', () => {
      getRocketLandingById();

      expect(assertParamExist).toHaveBeenCalled();
      expect(executeRequest).not.toHaveBeenCalledWith('landpads/123');
    });
  });
});
