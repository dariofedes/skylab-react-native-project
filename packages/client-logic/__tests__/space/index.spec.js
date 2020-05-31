import axios from 'axios';
import {executeRequest} from '@skylab/client-logic/src/space';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve('result')),
}));

describe('Client Requests', () => {
  describe('Execute Request', () => {
    beforeEach(() => {
      axios.get.mockClear();
    });

    it('Should return result', () => {
      return executeRequest('path').then(res => {
        expect(res).toStrictEqual('result');
        expect(axios.get).toHaveBeenCalledWith(
          'https://api.spacexdata.com/v3/path',
        );
      });
    });

    it('Should throw error on request', () => {
      axios.get.mockReturnValue(Promise.reject('error'));

      return executeRequest('path').catch(error => {
        expect(error).toStrictEqual(new Error('error'));
        expect(axios.get).toHaveBeenCalledWith(
          'https://api.spacexdata.com/v3/path',
        );
      });
    });
  });
});
