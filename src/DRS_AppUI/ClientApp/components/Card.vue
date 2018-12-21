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

import SlotMixin from '../mixins/slot';

export default {
  name: 'card',
  mixins: [SlotMixin],
  props: {
    contextualStyle: {
      type: String,
      required: false
    }
  },
  computed: {
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
		methods: {
		}
};
</script>
