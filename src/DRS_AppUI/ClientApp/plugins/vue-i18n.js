/* ============
 * Vue i18n
 * ============
 *
 * Internationalization plugin of Vue.js.
 *
 * https://kazupon.github.io/vue-i18n/
 */

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ElementLocale from 'element-ui/lib/locale';

import enLocale from 'element-ui/lib/locale/lang/en';
import nbNOLocale from 'element-ui/lib/locale/lang/nb-NO';
import svSELocale from 'element-ui/lib/locale/lang/sv-SE';

import enMessage from '../locale/en';
import nbNOMessage from '../locale/nb-NO';
import svSEMessage from '../locale/sv-SE';

Vue.use(VueI18n);

const messages = {
  en: Object.assign(enMessage.app.default, enLocale),
  nbNO: Object.assign(nbNOMessage.app.default, nbNOLocale),
  svSE: Object.assign(svSEMessage.app.default, svSELocale),
};

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

ElementLocale.i18n((key, value) => i18n.t(key, value));
export default {
  i18n,
};
