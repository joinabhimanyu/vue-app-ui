/* global  it, describe, expect,beforeEach */

import { mount } from 'vue-test-utils';
import Intro from '../components/Intro.vue';

describe('Intro.spec.js', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Intro, {
      // Beaware that props is overriden using `propsData`
      data: {
        appTitle: 'Intro title',
      },
    });
  });

  it('has proper args name', () => {
    expect(wrapper.vm.appTitle).toEqual('Intro title');
  });
});
