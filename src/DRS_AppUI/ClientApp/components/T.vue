<template>
   <span>
        {{ translated }}
    </span>
</template>

<script>
import { eventBus } from '../main';
import UtilityMixin from '../mixins/utilityMixin';
/**
 * @description component that handles lanugage event of event bus
 * and translates label to new locale
 */
export default {
  name: 't',
  mixins: [UtilityMixin],
  props: {
    t: '',
  },
  data() {
    return {
      translated: '',
    };
  },
  methods: {},
  created() {
    this.translated = this.$t(this.t);
    const self = this;
    eventBus.$on('language', _ => {
      try {
        self.translated = self.$t(self.t);
      } catch (e) {}
    });
  },
};
</script>