<template>

  <el-card class="box-card">
    <div slot="header" class="clearfix"
         v-if="hasSlot('header')">
      <slot name="header"></slot>
    </div>
    <slot name="body"></slot>
  </el-card>

</template>
<script>
/* ============
   * Card Component
   * ============
   *
   * A basic card component.
   *
   * Gives an idea how components work.
   */

import SlotMixin from '../mixins/slot';

export default {
  /**
   * The name of the component.
   */
  name: 'card',

  /**
   * The mixins that the component can use.
   */
  mixins: [SlotMixin],

  /**
   * The properties that the component accepts.
   */
  props: {
    contextualStyle: {
      type: String,
      required: false
    }
  },

  /**
   * The computed properties that the component can use.
   */
  computed: {
    /**
     * Computed property which will compute the classes
     * for the header of the card.
     *
     * @returns {Array} The classes for the header.
     */
    classNamesHeader() {
      const classNames = ['card-header'];

      if (this.contextualStyle) {
        classNames.push(`bg-${this.contextualStyle}`);
        classNames.push('text-white');
      } else {
        classNames.push('bg-default');
      }

      return classNames;
    }
  },
  mounted() {},
  methods: {}
};
</script>
