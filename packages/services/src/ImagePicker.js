import ImagePicker from 'react-native-image-picker';
import { showToastMessage } from './Toast';

// More info on all the options is below in the API Reference... just some common use cases shown here
const customButtons = [{ name: 'fb', title: 'Choose Photo from Facebook' }, {name: 'ig', title: 'pick from instagram'}];
const options = {
  title: 'Select Photo',
  rotation: -90,
  customButtons,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const showImagePicker = callback => {
  ImagePicker.showImagePicker(options, response => {
    if (response.didCancel) {
      showToastMessage('You have canceled this action');
    } else if (response.error) {
      showToastMessage(
        'There has been an error picking the image'
      );
    } else if (response.customButton) {
      console.log(response)
      if(response.customButton === 'fb') {
      showToastMessage('this should lead to facebook');
      } else if(response.customButton === 'ig') {
      showToastMessage('this should lead to instagram');
      }
      
    } else {
      const source = { uri: response.uri };

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };

     callback(source)
    }
  });
};

export {
  showImagePicker
};
