/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  axios
    .post('/api/v1/users/login', {
      email,
      password,
    })
    .then(function (res) {
      if (res.data.status === 'success') {
        showAlert('success', 'Logged in successfully!');
        window.setTimeout(() => location.assign('/'), 1500);
      }
    })
    .catch(function (error) {
      showAlert('error', error.response.data.message);
    });
};

export const logout = async () => {
  axios
    .get('/api/v1/users/logout')
    .then(function (res) {
      if (res.data.status === 'success') {
        location.reload(true);
      }
    })
    .catch(function (error) {
      showAlert('error', 'Error logging out! Try again later');
    });
};
