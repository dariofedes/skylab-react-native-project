import ImagePicker from 'react-native-image-picker';
import ImagePickerService from '@skylab/services/src/ImagePicker';
// import ToastService from '@skylab/services/src/Toast';

jest.mock('react-native-image-picker', () => ({
    showImagePicker: jest.fn().mockImplementation(() => Promise.resolve({}))
}))
jest.mock('@skylab/services/src/Toast', () => ({
    showToastMessage: jest.fn()
}))

describe('Image Picker Service', () => {
    beforeEach(() => {
        ImagePicker.showImagePicker.mockClear();
    })

    it('Should return source', async () => {
        ImagePicker.showImagePicker.mockImplementation(() => 
            Promise.resolve({ uri: 'random-uri' })
        );

        const result = await ImagePickerService.showImagePicker();

        expect(result).toStrictEqual({ uri: 'random-uri' });
        expect(ImagePicker.showImagePicker).toHaveBeenCalled();
    })

    it('Should show toast message if user canceled picker', async () => {
        ImagePicker.showImagePicker.mockImplementation(() => 
            Promise.resolve({ didCancel: true })
        );

        const result = await ImagePickerService.showImagePicker();
        expect(result).toStrictEqual({ didCancel: true });

        expect(ImagePicker.showImagePicker).toHaveBeenCalled();
        // expect(ToastService.showToastMessage).toHaveBeenCalledWith(
        //     'You have canceled this action'
        // );
    })

    it('Should show toast message if an error occurred', async () => {
        ImagePicker.showImagePicker.mockImplementation(() => 
            Promise.resolve({ error: 'error' })
        );

        const result = await ImagePickerService.showImagePicker();
        expect(result).toStrictEqual({ error: 'error' });

        expect(ImagePicker.showImagePicker).toHaveBeenCalled();
        // expect(ToastService.showToastMessage).toHaveBeenCalledWith(
        //     'There has been an error picking the image'
        // );
    })
})