/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  axios
    .patch(
      `${
        type === 'password'
          ? '/api/v1/users/updatePassword'
          : '/api/v1/users/updateCurrentUser'
      }`,
      data
    )
    .then((res) => {
      if (res.data.status === 'success') {
        showAlert('success', `${type.toUpperCase()} updated successfully!`);
      }
    })
    .catch((error) => {
      showAlert('error', error.response.data.message);
    });
};
