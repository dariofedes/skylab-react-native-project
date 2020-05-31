import Toast from 'react-native-root-toast';
import { assertParamExist } from '@skylab/utils/src/Asserts';

/**
 *
 * @param {String} message The message wanna show on the toast
 *
 * shows a toast message
 */
const showToastMessage = message => {
  assertParamExist(message);

  const { LONG } = Toast.durations;
  const { BOTTOM } = Toast.positions;

  Toast.show(message, {
    duration: LONG,
    position: BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  });
};

export default {
  showToastMessage
};
