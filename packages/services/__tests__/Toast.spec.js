import Toast from 'react-native-root-toast';
import ToastService from '@skylab/services/src/Toast';

jest.mock('react-native-root-toast', () => ({
    show: jest.fn(),
    durations: {
        LONG: 'LONG'
    },
    positions: {
        BOTTOM: 'BOTTOM'
    }
}))

describe('Toast Service', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
    })
    
    it('Should show toast', () => {
        ToastService.showToastMessage('message')

        expect(Toast.show).toHaveBeenCalledWith('message', {
            duration: 'LONG',
            position: 'BOTTOM',
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
        })
    })

    it('Should throw error if no message', () => {
        expect(() => ToastService.showToastMessage()).toThrow('')
    })
})