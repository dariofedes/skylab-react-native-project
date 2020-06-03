import { Toast } from 'native-base';
import { assertParamExist } from '@skylab/utils/src/Asserts';

/**
 *
 * @param {String} message The message wanna show on the toast
 *
 * shows a toast message
 */
const showToastMessage = message => {
  assertParamExist(message);

  const duration = 3000

  Toast.show({
    text: message,
    duration,
    position: "bottom"
  });
};

export {
  showToastMessage
};
