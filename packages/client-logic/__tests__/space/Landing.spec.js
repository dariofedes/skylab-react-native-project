import {
  getRocketsAllLandings,
  getRocketLandingById
} from '@skylab/client-logic/src/space/Landing';
import { executeRequest } from '@skylab/client-logic/src/space';
import { assertParamExist } from '@skylab/utils/src/Asserts';

// mockea "esconde" la función del archivo
jest.mock('@skylab/client-logic/src/space', () => ({
  // return undefined
  executeRequest: jest.fn(),

  // returns false data
  executeRequest: jest.fn(() => ({
    status: 200,
    data: [{ id: 'id-1' }]
  })),
  executeRequest: jest.fn().mockImplementation(() => ({
    status: 200,
    data: [{ id: 'id-1' }]
  }))
}));

// mockea "esconde" el archivo entero
// jest.mock('@skylab/client-logic/src/space');


jest.mock('@skylab/utils/src/Asserts', () => ({
  assertParamExist: jest.fn()
}));


describe('Landing Requests', () => {
  beforeEach(() => {
    executeRequest.mockClear();
  });

  describe('Get all landings', () => {
    it('Should call request get all landings correctly', async () => {
      executeRequest.mockImplementation(() => ({
        status: 200,
        data: [{ id: 'id-1' }]
      }))

      const result = await getRocketsAllLandings();

      expect(executeRequest).toHaveBeenCalledWith('landpads');

      expect(executeRequest).toHaveBeenCalled()
      expect(executeRequest).toHaveBeenCalledTimes(1)


      expect(result).toStrictEqual([{ id: 'id-1' }])
    });

    it('Should call request and return empty array because status is 400', async () => {
      executeRequest.mockImplementation(() => ({
        status: 400,
        data: [{ id: 'id-1' }]
      }))

      const result = await getRocketsAllLandings();

      expect(executeRequest).toHaveBeenCalledWith('landpads');

      expect(executeRequest).toHaveBeenCalled()
      expect(executeRequest).toHaveBeenCalledTimes(1)


      expect(result).toStrictEqual([])
    });

    it('Should call request and return and undefined result', async () => {
      executeRequest.mockImplementation(() => undefined)

      const result = await getRocketsAllLandings();

      expect(executeRequest).toHaveBeenCalledWith('landpads');

      expect(executeRequest).toHaveBeenCalled()
      expect(executeRequest).toHaveBeenCalledTimes(1)


      expect(result).toStrictEqual([])
    });
  });

  describe('Get landing by id', () => {

    beforeEach(() => {
      executeRequest.mockImplementation(() => ({
        status: 200,
        data: [{ id: 'id-1' }]
      }))
    })
    
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
