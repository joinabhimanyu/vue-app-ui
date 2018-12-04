/* global jest, it, describe, expect,beforeEach */

import {
  createLocalVue,
  mount,
} from 'vue-test-utils';
import {
  eventBus,
} from '../main';
import UtilityMixin from '../mixins/utilityMixin';
import T from '../components/T.vue';

jest.mock('../main');
jest.mock('../mixins/utilityMixin');

describe('T.spec.js', () => {
  let wrapper;
  const localVue = createLocalVue();
  localVue.use(UtilityMixin);

  beforeEach(() => {
    const $t = content => content.toString().toUpperCase();
    wrapper = mount(T, {
      localVue,
      mocks: {
        $t,
      },
      propsData: {
        t: 'demo string',
      },
    });
  });
  it('has proper props', () => {
    expect(wrapper.vm.t).toEqual('demo string');
  });

  it('has proper data', () => {
    expect(wrapper.vm.translated).toEqual('DEMO STRING');
  });

  it('works with eventBus', () => {
    eventBus.$emit('language');
    expect(wrapper.vm.translated).toEqual('DEMO STRING');
  });
});