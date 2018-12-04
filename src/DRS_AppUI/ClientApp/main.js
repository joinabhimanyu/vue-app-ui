/**
 * @description main file for application
 */

import Vue from 'vue';
import './plugins/vuex';
import './plugins/axios';
import { i18n } from './plugins/vue-i18n';
import { router } from './plugins/vue-router';
import './plugins/vuex-router-sync';
import './plugins/element';
import './plugins/font-awesome';
import './assets/stylus/app.styl';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;
// Vue.config.lang = i18n;
store.dispatch('auth/logout');
store.dispatch('auth/check');

/**
 * @description global event bus component, first event:
 * 1:language
 */
export const eventBus = new Vue({}); // eslint-disable-line import/prefer-default-export

// reactive lanuage translation component
Vue.component('t', {
  template: `
<span>
        {{ translated }}
    </span>
`,
  props: {
    t: '',
  },
  data() {
    return {
      translated: '',
    };
  },
  created() {
    this.translated = this.$t(this.t);
    const self = this;
    eventBus.$on('language', () => {
      try {
        self.translated = self.$t(self.t);
      } catch (e) {
        throw e;
      }
    });
  },
});

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App),
});
