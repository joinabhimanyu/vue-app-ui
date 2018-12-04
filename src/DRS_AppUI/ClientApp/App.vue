<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
/* ============
     * Entry Point
     * ============
     *
     * The entry point of the application
     */
/**@description bootstarpping component for application */
export default {
  // package.json
  //  "unit": "cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run",
  /**
   * The name of the application.
   */
  name: 'vue-boilerplate',

  /**
   * Fires when the app has been mounted.
   */
  mounted() {
    // If the user is authenticated,
    // fetch the data from the API
    if (this.$store.state.auth.authenticated) {
      this.$store.dispatch('account/find');
    }
  },
};
</script>

<style>
/* global styles */
body {
  margin: 0px;
  padding: 0px;
  /*background: url(assets/bg1.jpg) center !important;
        background-size: cover;*/
  /*background: #1F2D3D;*/
  /*font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;*/
  /*font-family: 'Roboto Mono', monospace;*/
  /*font-family: 'Ubuntu', sans-serif;*/
  /*font-family: 'Open Sans Condensed', sans-serif;*/
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
}

.menu-expanded .el-submenu__title {
  font-size: 12px !important;
  font-weight: bold !important;
  padding-left: 10px !important;
}
.menu-collapsed .el-submenu__title {
  font-size: 12px !important;
  font-weight: bold !important;
  padding-left: 25px !important;
}

.el-menu-item {
  font-size: 12px !important;
}

#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}

.el-submenu [class^='fa'] {
  vertical-align: baseline;
  margin-right: 2px;
}

.el-menu-item [class^='fa'] {
  vertical-align: baseline;
  margin-right: 10px;
}

.toolbar {
  background: #f2f2f2;
  padding: 10px;
  /*border:1px solid #dfe6ec;*/
  margin: 10px 0px;
}

.toolbar .el-form-item {
  margin-bottom: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

div.el-select-dropdown.el-popper.propFilter {
  height: auto;
}
div.el-select-dropdown.el-popper.propFilter div.el-scrollbar {
  height: auto;
  padding-bottom: 20px;
}
div.el-select-dropdown.el-popper.propFilter
  div.el-scrollbar
  div.el-select-dropdown__wrap.el-scrollbar__wrap {
  overflow: auto;
  height: auto;
}
div.el-select-dropdown.el-popper.propFilter
  div.el-scrollbar
  div.el-select-dropdown__wrap.el-scrollbar__wrap
  ul.el-scrollbar__view.el-select-dropdown__list {
  height: auto;
}
div.el-select-dropdown.el-popper.propFilter
  div.el-scrollbar
  div.el-select-dropdown__wrap.el-scrollbar__wrap
  ul.el-scrollbar__view.el-select-dropdown__list
  li.el-select-dropdown__item {
  height: auto;
  font-weight: normal;
}
</style>
