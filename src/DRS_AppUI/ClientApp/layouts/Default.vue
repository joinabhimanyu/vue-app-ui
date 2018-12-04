<template>
    <div>
        <el-row class="container main">
            <el-col :span="24" class="header">
                <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
                    <transition name="fade" mode="out-in">
                        <template v-if="!collapsed">
                            <!--<router-link :to="{ name: 'home.index' }" active-class="active">
                                <i class="el-icon-news"><span style="padding:3px">DRS</span></i>
                            </router-link>-->
                            <el-input @input="debounceInput"
                                    prefix-icon="el-icon-search"
                                    :placeholder="$t('search_menu')"></el-input>
                        </template>
                    </transition>
                </el-col>
                <el-col :span="9">
                    <div class="tools" @click.prevent="collapse">
                        <i class="fa fa-align-justify"></i>
                    </div>
                </el-col>
                <el-col :span="2" :offset="collapsed?10:7">
                    <el-dropdown trigger="click" @command="changeLang">
                        <span class="el-dropdown-link">
                            {{lang}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="item in langList"
                                            :key="item.value"
                                            :command="item.value">
                                <t :t="item.label"></t>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                </el-col>
                <el-col :span="1.5" class="userinfo">
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="logout"><t t="logout"></t></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-col>
            <el-col :span="24" class="main">
                <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
                    <el-menu ref="menuElementRef"
                            :collapse="collapsed"
                            active-text-color="#42B5DB"
                            :unique-opened="uniqueOpenend"
                            :default-active="defaultActive"
                            :default-openeds="dDefaultOpeneds"
                            v-loading="fullscreenLoading"
                            class="el-menu-vertical-demo">
                        <div v-for="m in menu"
                            :key="m.index"
                            :data="m">
                            <sub-menu :menu="m" :collapsed="collapsed"
                                    @handleMenuItemClick="handleMenuItemClick"></sub-menu>
                        </div>

                        <!--<menu-component :menu-data="menu" :collapsed="collapsed"
                                        @handleMenuItemClick="handleMenuItemClick"></menu-component>-->
                    </el-menu>

                </aside>
                <section id="lockSection" class="content-container">
                    <div class="grid-content bg-purple-light">
                        <el-col :span="24" class="content-wrapper">
                            <slot></slot>
                        </el-col>
                    </div>
                </section>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Vue from 'vue';
import { i18n } from '../plugins/vue-i18n';
import { eventBus } from '../main';
import _ from 'lodash';
import MenuMixin from '../mixins/menuMixin';
import SubMenu from '../components/SubMenu';

/**
 * @description default layout component containing header, sidemenu
 * and slot for tabcomponent in Hoem/Index.vue
 * Contains reference to eventBus and fires language event when language is changed
 */
export default {
  name: 'default-layout',
  components: {
    SubMenu,
  },
  mixins: [MenuMixin],
  props: {
    defaultActive: {
      type: String,
      required: true,
    },
    defaultOpeneds: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      loadingDialog: null,
      fullscreenLoading: false,
      collapsed: false,
      sysUserAvatar:
        'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
      uniqueOpenend: true,
      menu: [],
      flatmenu: [],
      lang: '',
      langList: [],
    };
  },
  /**@description computed properties
   * 1:comp_collapsed
   * 2:dDefaultOpeneds
   */
  computed: {
    comp_collapsed: {
      get() {
        return this.collapsed || false;
      },
      set(value) {
        if (!value) {
          if (this.$refs.menuElementRef) {
            this.$refs.menuElementRef.close(
              this.$refs.menuElementRef.openedMenus.filter(x => x != 0)[0],
            );
            if (this.$refs.menuElementRef.$el) {
              this.$refs.menuElementRef.$el.style.width = 'auto';
            }
          }
        }
        this.collapsed = value;
      },
    },
    dDefaultOpeneds: {
      get() {
        return JSON.parse(JSON.stringify(this.defaultOpeneds));
      },
      set(value) {
        if (this.$refs.menuElementRef) {
          this.$refs.menuElementRef = JSON.parse(JSON.stringify(value));
        }
      },
    },
  },
  /**@description lifecycle hook fired when component is created
   * fills up the language list in dropdown and gets the main menu
   */
  created() {
    const self = this;
    this.menu = JSON.parse(localStorage.getItem('menu'));
    // select the default language
    this.setSelectedLang();
    this.langList = [
      {
        value: 'en',
        label: 'english',
      },
      {
        value: 'nbNO',
        label: 'norse',
      },
      {
        value: 'svSE',
        label: 'swedish',
      },
    ];
  },
  methods: {
    /**@description selects the default language */
    setSelectedLang() {
      let lang = i18n;
      let locale = lang.locale;
      switch (locale) {
        case 'en':
          this.lang = 'English';
          break;
        case 'nbNO':
          this.lang = 'Norwegian';
          break;
        case 'svSE':
          this.lang = 'Swedish';
          break;
      }
    },
    /**@description changes the current language and fires language event on eventBus */
    changeLang(value) {
      let lang = i18n;
      lang.locale = value;
      this.setSelectedLang();
      this.$message(this.$t('lang_changed'));
      eventBus.$emit('language');
    },
    /**@description function for toggling collapse of sidemenu */
    collapse() {
      this.fullscreenLoading = true;
      this.comp_collapsed = !this.collapsed;
      const self = this;
      setTimeout(() => {
        self.fullscreenLoading = false;
      }, 700);
    },
    /**@description search handler called from menu search
     * opens and highlights the search result in side menu
     */
    debounceInput: _.debounce(function(value) {
      this.openMenuChanged.call(this, value);
    }, 1000),
    /**@description function called on logout
     * resets the language to default,i.e: en/US and dispatches event on store
     */
    logout() {
      let lang = i18n;
      lang.locale = 'en';
      eventBus.$emit('language');
      this.$store.dispatch('auth/logout');
    },
    /**@description forward delegates the event fired by sidemenu component */
    handleMenuItemClick(args) {
      this.$emit('handleMenuItemClick', args);
    },
    /**@description internal function called on menu searching
     * for hightlighting the search result */
    openMenuChanged(value) {
      if (value && value != '') {
        const flatmenu = JSON.parse(localStorage.getItem('flatmenu'));
        const mainMenus = flatmenu.filter(x => x.isMain);
        const self = this;
        if (mainMenus && mainMenus.length > 0) {
          const submenufilter = mainMenus.filter(x => x.type == 'submenu').filter(
            x =>
              x.label
                .toString()
                .toLowerCase()
                .indexOf(value.toString().toLowerCase()) != -1,
          );
          if (submenufilter && submenufilter.length > 0) {
            if (self.$refs.menuElementRef && !this.collapsed) {
              self.$refs.menuElementRef.open(submenufilter[0].index.toString().trim());
            }
          } else {
            const menugroupfilter = mainMenus.filter(x => x.type == 'menugroup').filter(
              x =>
                x.title
                  .toString()
                  .toLowerCase()
                  .indexOf(value.toString().toLowerCase()) != -1,
            );
            if (menugroupfilter && menugroupfilter.length > 0) {
              // open parent submenu of menugroup
              if (self.$refs.menuElementRef && !this.collapsed) {
                self.$refs.menuElementRef.open(
                  self
                    .getParentSubMenu(menugroupfilter[0].parentId)
                    .toString()
                    .trim(),
                );
              }
            } else {
              const menuitemfilter = mainMenus.filter(x => x.type == 'menuitem').filter(
                x =>
                  x.label
                    .toString()
                    .toLowerCase()
                    .indexOf(value.toString().toLowerCase()) != -1,
              );
              if (menuitemfilter && menuitemfilter.length > 0) {
                // open parent submenu of menuitem
                if (self.$refs.menuElementRef && !this.collapsed) {
                  self.$refs.menuElementRef.open(
                    self
                      .getParentSubMenu(menuitemfilter[0].parentId)
                      .toString()
                      .trim(),
                  );
                }
              } else {
                if (this.$refs.menuElementRef) {
                  this.$refs.menuElementRef.close(
                    this.$refs.menuElementRef.openedMenus.filter(x => x != 0)[0],
                  );
                }
              }
            }
          }
        }
      } else {
        if (this.$refs.menuElementRef) {
          this.$refs.menuElementRef.close(
            this.$refs.menuElementRef.openedMenus.filter(x => x != 0)[0],
          );
        }
      }
    },
  },
};
</script>

<style scoped>
.container .header .el-col.el-col-2.el-col-offset-7 {
  text-align: right !important;
}

.container .header .el-col.el-col-2.el-col-offset-10 {
  text-align: right !important;
}

.container .header .userinfo[data-v-25af95b0] {
  text-align: right;
  padding-right: 35px;
  float: none !important;
}

.container .header .el-dropdown {
  color: white;
}

.el-dropdown-link {
  cursor: pointer;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.container.main {
  max-width: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  padding-left: 0px !important;
  padding-right: 0px !important;
}

.container .header {
  height: 60px;
  line-height: 60px;
  background: #212729;
  color: #fff;
}

.container .header a {
  color: #fff;
}

.container .header .userinfo {
  text-align: right;
  padding-right: 35px;
  float: right;
}

.container .header .userinfo .userinfo-inner {
  cursor: pointer;
  color: #fff;
}

.container .header .userinfo .userinfo-inner img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0px 10px 10px;
  float: right;
}

.container .header .logo {
  height: 60px;
  font-size: 22px;
  padding-left: 20px;
  padding-right: 20px;
  border-color: rgba(238, 241, 146, 0.3);
  border-right-width: 1px;
  border-right-style: solid;
}

.container .header .logo img {
  width: 40px;
  float: left;
  margin: 10px 10px 10px 18px;
}

.container .header .logo .txt {
  color: #fff;
}

.container .header .logo-width {
  width: 230px;
}

.container .header .logo-collapse-width {
  width: 60px;
}

.container .header .tools {
  padding: 0px 23px;
  width: 14px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
}

.container .main {
  display: flex;
  position: absolute;
  top: 60px;
  bottom: 0px;
  overflow: hidden;
}

.container .main aside {
  flex: 0 0 230px;
  width: 230px;
  z-index: 100;
}

.container .main aside .el-menu {
  height: 100%;
}

.container .main aside .collapsed {
  width: 60px;
}

.container .main aside .collapsed .item {
  position: relative;
}

.container .main aside .collapsed .submenu {
  position: absolute;
  top: 0px;
  left: 60px;
  z-index: 99999;
  height: auto;
  display: none;
}

.container .main .menu-collapsed {
  flex: 0 0 60px;
  overflow-y: scroll;
  width: 60px;
}

.container .main .menu-expanded {
  flex: 0 0 230px;
  overflow-y: scroll;
  width: 230px;
}

.container .main .content-container {
  flex: 1;
  overflow-y: scroll;
  padding: 20px;
}

.container .main .content-container .breadcrumb-container .title {
  width: 200px;
  float: left;
  color: #475669;
}

.container .main .content-container .breadcrumb-container .breadcrumb-inner {
  float: right;
}

.container .main .content-container .content-wrapper {
  background-color: #fff;
  box-sizing: border-box;
}

.container .main aside .el-menu[data-v-25af95b0] {
  height: 100%;
  background-color: #1a2229;
  font-weight: none;
}

</style>
