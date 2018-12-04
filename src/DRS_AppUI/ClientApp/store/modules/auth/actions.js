/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import Vue from 'vue';
import store from '../../../store';
import Proxy from '../../../proxies/Proxy';
import * as types from './mutation-types';

const config = require('../../../../config');
// const allComponents = {
//    AccountIndex,
//    HomeIndex,
//    Documents
// };

const fetchData = uri =>
  new Promise((resolve, reject) => {
    Vue.$http.defaults.baseURL = '';
    Vue.$http.defaults.baseURL = config.build.env.ASSETS_LOCATION;
    new Proxy(uri)
      .all()
      .then((response) => {
        Vue.$http.defaults.baseURL = '';
        Vue.$http.defaults.baseURL = config.build.env.API_LOCATION;
        resolve(response.data);
      })
      .catch((err) => {
        Vue.$http.defaults.baseURL = '';
        Vue.$http.defaults.baseURL = config.build.env.API_LOCATION;
        reject(err);
      });
  });

const transormData = (menuData) => {
  // data transformation here from flatmenu to cookedmenu
  const prepareMenuObject = (rawMenu) => {
    const cookedMenu = {};
    cookedMenu.menuId = rawMenu.menuId || 0;
    cookedMenu.parentId = rawMenu.parentId || 0;
    cookedMenu.type = rawMenu.type || '';
    cookedMenu.index = rawMenu.index || '';
    cookedMenu.slot = rawMenu.slot || '';
    cookedMenu.label = rawMenu.label || '';
    cookedMenu.title = rawMenu.title || '';
    cookedMenu.name = rawMenu.name || '';
    cookedMenu.component = rawMenu.component || '';
    cookedMenu.icon = rawMenu.icon || '';
    cookedMenu.meta = Object.assign({}, rawMenu.meta);
    if (menuData.filter(x => (x.parentId || 0) === rawMenu.menuId).length > 0) {
      const children = menuData
        .filter(x => (x.parentId || 0) === rawMenu.menuId)
        .sort((a, b) => a.order - b.order);
      const cookedChildren = [];
      children.forEach((child) => {
        const cookedChild = Object.assign({}, prepareMenuObject(child));
        cookedChildren.push(Object.assign({}, cookedChild));
      });
      cookedMenu.children = JSON.parse(JSON.stringify(cookedChildren));
    } else {
      cookedMenu.children = [];
    }
    return cookedMenu;
  };
  const finalMenu = [];
  const parentMenu = menuData
    .filter(x => (x.parentId || 0) === 0)
    .sort((a, b) => a.order - b.order);
  parentMenu.forEach((item) => {
    const singleMenu = Object.assign({}, prepareMenuObject(item));
    finalMenu.push(Object.assign({}, singleMenu));
  });
  return finalMenu;
};

export const check = ({ commit }) => {
  commit(types.CHECK);
};

export const register = ({ commit }) => {
  /*
     * Normally you would use a proxy to register the user:
     *
     * new Proxy()
     *  .register(payload)
     *  .then((response) => {
     *    commit(types.REGISTER, response);
     *  })
     *  .catch(() => {
     *    console.log('Request failed...');
     *  });
     */
  commit(types.LOGIN, 'RandomGeneratedToken');
  Vue.router.push({
    name: 'home.index',
  });
};

export const login = ({ commit }, payload) => {
  /*
     * Normally you would use a proxy to log the user in:
     *
     * new Proxy()
     *  .login(payload)
     *  .then((response) => {
     *    commit(types.LOGIN, response);
     *    store.dispatch('account/find');
     *    Vue.router.push({
     *      name: 'home.index',
     *    });
     *  })
     *  .catch(() => {
     *    console.log('Request failed...');
     *  });
     */
  const token = 'RandomGeneratedToken';
  const user = {
    first_name: 'abhi',
    last_name: 'chak',
    email: payload.email,
  };
  let menu = [];
  const apiUrl = 'static/flatmenu.json';

  fetchData(apiUrl)
    .then((response) => {
      menu = JSON.parse(JSON.stringify(transormData(response.filter(x => x.isMain))));
      const commitPayload = {
        token,
        user,
        menu,
        flatMenu: response,
      };
      commit(types.LOGIN, commitPayload);
      store.dispatch('account/find');
      // alterRouteTable();
      Vue.router.push({
        name: 'home.index',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * alter route table with flatmenu
 */
// const alterRouteTable = () => {
//   const flatmenu = JSON.parse(localStorage.getItem('flatmenu'));
//   if (flatmenu && flatmenu.filter(x => x.isMain).length > 0) {
//     const modifyroute = () => {
//       const menuItems = flatmenu.filter(x => x.isMain).filter(x => x.type === 'menuitem');
//       const finalRoutes = [];
//       for (const item of menuItems) {
//         // finalRoutes.push({
//         //    path: item.path,
//         //    name: item.name,
//         //    component: allComponents[item.component],
//         //    meta: Object.assign({}, item.meta)
//         // });
//       }
//       Vue.router.addRoutes([...finalRoutes]);
//     };
//     modifyroute();
//   }
// };
export const logout = ({ commit }) => {
  commit(types.LOGOUT);
  Vue.router.push({
    name: 'login.index',
  });
};

export default {
  check,
  register,
  login,
  logout,
};
