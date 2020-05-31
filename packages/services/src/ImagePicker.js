import ImagePicker from 'react-native-image-picker';
import ToastService from './Toast';

// More info on all the options is below in the API Reference... just some common use cases shown here
const customButtons = [{ name: 'fb', title: 'Choose Photo from Facebook' }];
const options = {
  title: 'Select Photo',
  customButtons,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const showImagePicker = async () => {
  return await ImagePicker.showImagePicker(options, response => {
    if (response.didCancel) {
      ToastService.showToastMessage('You have canceled this action');
    } else if (response.error) {
      ToastService.showToastMessage(
        'There has been an error picking the image'
      );
    } else if (response.customButton) {
      // if custom button exist, should return respons here
    } else {
      const source = { uri: response.uri };

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };

      return source;
    }
  });
};

export default {
  showImagePicker
};
