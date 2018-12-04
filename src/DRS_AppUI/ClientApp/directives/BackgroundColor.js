const defaultBackgroundColor = '#86bbff';

const emit = (vnode, name, data) => {
  const handlers =
    (vnode.data && vnode.data.on) || (vnode.componentOptions && vnode.componentOptions.listeners);

  if (handlers && handlers[name]) {
    handlers[name].fns(data);
  }
};

/**
 * @description directive for changing background color
 */
export default {
  bind(el, binding, vnode) {
    // Allow users to customise the color by passing an expression.
    const color = binding.value || defaultBackgroundColor;

    // el might not be present for server-side rendering.
    if (el) {
      // Set the element's background color.
      el.style.backgroundColor = color;
      emit(vnode, 'directiveEvent', { some: 'event', data: 'here' });
    }
  },
};
