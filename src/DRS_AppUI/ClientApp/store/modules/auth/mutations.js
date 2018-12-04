/* ============
 * Mutations for the auth module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import Vue from 'vue';
import { CHECK, REGISTER, LOGIN, LOGOUT } from './mutation-types';

export default {
  /**
   * check authorization header and set CORS header
   *
   * @param state The current state
   *
   */
  [CHECK](state) {
    state.authenticated = !!localStorage.getItem('id_token');
    if (state.authenticated) {
      Vue.$http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
        'id_token',
      )}`;
      Vue.$http.options.xhr = { withCredentials: true };
      Vue.$http.defaults.headers.common['Access-Control-Allow-Origin'] =
        'http://localhost:56516/api';
    }
  },

  [REGISTER]() {
    //
  },

  [LOGIN](state, data) {
    state.authenticated = true;
    localStorage.setItem('id_token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('menu', JSON.stringify(data.menu));
    localStorage.setItem('flatmenu', JSON.stringify(data.flatMenu));
    Vue.$http.defaults.headers.common.Authorization = `Bearer ${data.token}`;
  },

  [LOGOUT](state) {
    state.authenticated = false;
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
    localStorage.removeItem('flatmenu');
    Vue.$http.defaults.headers.common.Authorization = '';
  },
};
