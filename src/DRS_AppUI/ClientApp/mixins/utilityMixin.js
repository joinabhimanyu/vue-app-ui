import Proxy from '../proxies/Proxy';

/**
 * @description common functions for redirect to menu and wrapper functions for proxy
 */
export default {
  data() {
    return {
      defaultPageSizeGrid: 20,
    };
  },
  methods: {
    /**
     * @description common function for redirect to menu
     * @param {*} pageName
     * @param {*} args
     */
    redirectHandler(pageName, args = null, context = null) {
      const flatmenu = JSON.parse(localStorage.getItem('flatmenu'));
      try {
        if (flatmenu && flatmenu.filter(x => !x.isMain).length > 0) {
          const filter = flatmenu
            .filter(x => !x.isMain)
            .filter(x => x.type === 'menuitem' && x.name === pageName);
          if (filter && filter.length > 0) {
            const detailstab = {
              menuId: filter[0].menuId || 0,
              name: filter[0].name || '',
              label: filter[0].label || '',
              component: filter[0].component || '',
            };
            if (!context) {
              this.args.changeMenuHandler(detailstab, args);
            } else {
              context.args.changeMenuHandler(detailstab, args);
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * @description wrapper function for fetch data from proxy
     * @param {*} uri
     */
    fetchData(uri) {
      return new Promise((resolve) => {
        const apiUrl = uri;
        new Proxy(apiUrl)
          .all()
          .then((response) => {
            resolve({
              data: response.data,
              msg: 'success',
            });
          })
          .catch(() => {
            resolve({
              data: null,
              msg: this.$t('error_loading_data'),
            });
          });
      });
    },
    /**
     * @description wrapper function for find by id from proxy
     * @param {*} id
     * @param {*} uri
     */
    find(id, uri) {
      return new Promise((resolve) => {
        new Proxy(uri)
          .find(id)
          .then((response) => {
            resolve({
              data: response.data,
              msg: 'success',
            });
          })
          .catch(() => {
            resolve({
              data: null,
              msg: this.$t('error_loading_data'),
            });
          });
      });
    },
    /**
     * @description wrapper function for submit from proxy
     * @param {*} uri
     * @param {*} data
     */
    submit(uri, data) {
      return new Promise((resolve) => {
        if (uri !== '' && data) {
          new Proxy(uri)
            .submit('post', uri, data)
            .then((response) => {
              resolve({
                data: response.data,
                msg: 'success',
              });
            })
            .catch(() => {
              resolve({
                data: null,
                msg: this.$t('error_loading_data'),
              });
            });
        } else {
          resolve({
            data: null,
            msg: this.$t('error_loading_data'),
          });
        }
      });
    },
    /**
     * @description wrapper function for create from proxy
     * @param {*} data
     * @param {*} uri
     */
    create(data, uri) {
      return new Promise((resolve, reject) => {
        new Proxy(uri)
          .create(data)
          .then((response) => {
            resolve({
              data: response.data,
              status: response.status,
            });
          })
          .catch((response) => {
            reject({
              data: response.data,
              status: response.status,
            });
          });
      });
    },
    /**
     * @description wrapper function for update list from proxy
     * @param {*} data
     * @param {*} uri
     */
    updateList(data, uri) {
      return new Promise((resolve, reject) => {
        new Proxy(uri)
          .updateList(data)
          .then((response) => {
            resolve({
              data: response.data,
              status: response.status,
            });
          })
          .catch((response) => {
            reject({
              data: response.data,
              status: response.status,
            });
          });
      });
    },
    /**
     * @description wrapper function for update single with id from proxy
     * @param {*} id
     * @param {*} data
     * @param {*} uri
     */
    updateSingle(id, data, uri) {
      return new Promise((resolve, reject) => {
        new Proxy(uri)
          .update(id, data)
          .then((response) => {
            resolve({
              data: response.data,
              status: response.status,
            });
          })
          .catch((response) => {
            reject({
              data: response.data,
              status: response.status,
            });
          });
      });
    },
    /**
     * @description wrapper function for delete list from proxy
     * @param {*} data
     * @param {*} uri
     */
    deleteList(data, uri) {
      return new Promise((resolve, reject) => {
        new Proxy(uri)
          .destroyList({
            data,
          })
          .then((response) => {
            if (response && response.data) {
              resolve({
                data: response.data,
                status: response.status,
              });
            } else {
              resolve(null);
            }
          })
          .catch(() => {
            reject(null);
          });
      });
    },
    /**
     * @description wrapper function for delete single with id from proxy
     * @param {*} id
     * @param {*} uri
     */
    deleteSingle(id, uri) {
      return new Promise((resolve, reject) => {
        new Proxy(uri)
          .destroy(id)
          .then((response) => {
            if (response && response.data) {
              resolve({
                data: response.data,
                status: response.status,
              });
            } else {
              resolve(null);
            }
          })
          .catch(() => {
            reject(null);
          });
      });
    },
    /**
     *
     * @param {generator function} g
     * @description iterates over generator and calls next over it
     */
    runGenerator(g) {
      const it = g();
      let ret;

      // asynchronously iterate over generator
      (function iterate(val) {
        ret = it.next(val);

        if (!ret.done) {
          // poor man's "is it a promise?" test
          if ('then' in ret.value) {
            // wait on the promise
            ret.value.then(iterate);
          } else {
            // immediate value: just send right back in
            // avoid synchronous recursion
            setTimeout(() => {
              iterate(ret.value);
            }, 0);
          }
        }
      }());
    },
  },
};
