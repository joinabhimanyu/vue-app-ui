<template>
  <div class="not-found">
      <div class="row" id="intro-area">
          <div class="twelve columns">
              <intro></intro>
          </div>
      </div>
      <div class="not-found-content">
          <h1><t t="notfound"></t></h1>
          <h3><t t="notfound1"></t></h3>
      </div>
  </div>
</template>

<script>
import Intro from '../components/Intro';

/**
 * @description common layout for 404 not found page
 */
export default {
  data() {
    return {};
  },
  components: {
    Intro
  }
};
</script>

<style scoped>
.not-found-content {
  text-align: center;
  font-weight: 600;
}
</style>
