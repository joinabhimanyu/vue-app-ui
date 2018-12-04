<template>
    <v-layout ref="layout" :default-active="defaultActive"
              :default-openeds="defaultOpeneds"
              @handleMenuItemClick="handleMenuItemClick">
        <!-- dynamic tab control -->
        <!--type="border-card"-->
        <el-tabs v-model="editableTabsValue"
                 closable
                 @tab-click="handleTabClick"
                 @tab-remove="removeTab">
            <!--:disabled="item.loading"-->
            <el-tab-pane ref="tabPanes" v-for="item in editableTabs"
                         :key="item.name"
                         :name="item.name">
                <span :class="item.pinned?'pinned':'unpinned'" slot="label" @contextmenu.prevent="$refs.menu.open($event,item.name)">
                    <template v-if="item.dirty">
                        <i class="fa fa-thumb-tack fa-rotate-90" v-if="!item.pinned" aria-hidden="true" @click="togglePin(item.name)"></i>
                        <i class="fa fa-thumb-tack" v-if="item.pinned" aria-hidden="true" @click="togglePin(item.name)"></i>
                        <span><t :t="item.label"></t></span>
                        <!-- <span>{{item.label}}</span> -->
                        <i class="el-icon-edit"></i>
                    </template>
                    <template v-else-if="!item.dirty">
                        <template v-if="item.loading">
                            <i class="fa fa-thumb-tack fa-rotate-90" v-if="!item.pinned" aria-hidden="true" @click="togglePin(item.name)"></i>
                            <i class="fa fa-thumb-tack" v-if="item.pinned" aria-hidden="true" @click="togglePin(item.name)"></i>
                            <span><t :t="item.label"></t></span>
                            <!-- <span>{{item.label}}</span> -->
                            <i class="el-icon-loading"></i>
                        </template>
                        <template v-else-if="!item.loading">
                            <i class="fa fa-thumb-tack fa-rotate-90" v-if="!item.pinned" aria-hidden="true" @click="togglePin(item.name)"></i>
                            <i class="fa fa-thumb-tack" v-if="item.pinned" aria-hidden="true" @click="togglePin(item.name)"></i>
                            <span><t :t="item.label"></t></span>
                            <!-- <span>{{item.label}}</span> -->
                        </template>
                    </template>
                </span>
                <!-- render the currently active component/page here -->
                <keep-alive>
                    <component :is="item.component" v-bind:args="item.args" ref="componentRef"></component>
                </keep-alive>
            </el-tab-pane>
        </el-tabs>

        <context-menu ref="menu" @ctx-cancel="resetCtxLocals" @ctx-close="onCtxClose">
            <ul class="options">
                <li @click="onClick('close')"><t t="close"></t></li>
                <li @click="onClick('close_all')"><t t="close_all"></t></li>
                <li @click="onClick('close_all_but_this')"><t t="close_all_but_this"></t></li>
            </ul>
        </context-menu>
    </v-layout>
</template>

<script>
import $ from 'jquery';
import { eventBus } from '../../main';
import ContextMenu from 'vue-context-menu';
import MenuMixin from '../../mixins/menuMixin';
import VLayout from '../../layouts/Default';
import Documents from '../DRSDocumentManagement/Documents';
import DocumentCategories from '../DRSDocumentManagement/DocumentCategories';
import DocumentProcessSchemas from '../DRSDocumentManagement/DocumentProcessSchemas';
import Fields from '../DRSDocumentManagement/Fields';
import DocumentCategoryDetails from '../DRSDocumentManagement/DocumentCategoryDetails';
import DocumentDetails from '../DRSDocumentManagement/DocumentDetails';
import FieldDetails from '../DRSDocumentManagement/FieldDetails';
import ProcessLogDetails from '../DRSDocumentManagement/ProcessLogDetails';
import ProcessQueueDetails from '../DRSDocumentManagement/ProcessQueueDetails';

import ProcessQueues from '../DRSDocumentProcess/ProcessQueues';
import ProcessQueueErrors from '../DRSDocumentProcess/ProcessQueueErrors';
import ProcessQueueTopErrors from '../DRSDocumentProcess/ProcessQueueTopErrors';

import Archives from '../DRSItemConfiguration/Archives';
import DocumentFields from '../DRSItemConfiguration/DocumentFields';
import DocumentRules from '../DRSItemConfiguration/DocumentRules';
import DocumentSettings from '../DRSItemConfiguration/DocumentSettings';
import DocumentSources from '../DRSItemConfiguration/DocumentSources';
import ImportMappings from '../DRSItemConfiguration/ImportMappings';
import ProcessHandlers from '../DRSItemConfiguration/ProcessHandlers';

import SystemSettings from '../DRSSystemConfiguration/SystemSettings';
import SystemLogos from '../DRSSystemConfiguration/SystemLogos';

import Roles from '../DRSSecurityAdministrations/Roles';
import Users from '../DRSSecurityAdministrations/Users';

import LaunchCRM from '../LinkdsAndTools/LaunchCRM';
import LaunchArchive from '../LinkdsAndTools/LaunchArchive';
import LaunchReports from '../LinkdsAndTools/LaunchReports';

/**
@description Index shell component containing tab control
Controls working of tabpane components and opening/closing sidemenu heirarchies
 */
export default {
  name: 'home-index',
  components: {
    ContextMenu,
    VLayout,
    Documents,
    DocumentCategories,
    DocumentProcessSchemas,
    Fields,
    ProcessQueues,
    ProcessQueueErrors,
    ProcessQueueTopErrors,
    Archives,
    DocumentFields,
    DocumentRules,
    DocumentSettings,
    DocumentSources,
    ImportMappings,
    ProcessHandlers,
    SystemSettings,
    SystemLogos,
    Roles,
    Users,
    LaunchCRM,
    LaunchArchive,
    LaunchReports,
    DocumentCategoryDetails,
    DocumentDetails,
    FieldDetails,
    ProcessLogDetails,
    ProcessQueueDetails,
  },
  mixins: [MenuMixin],
  data() {
    return {
      localName: '',
      defaultActive: '',
      defaultOpeneds: [],
      editableTabsValue: '',
      editableTabs: [],
    };
  },
  methods: {
    focusTabPane() {
      const acTab = self.$refs.tabPanes.filter(
        x => x.$options.propsData.name === self.editableTabsValue,
      )[0];
      if (acTab) {
        acTab.$el.focus();
      }
    },
    /**@description
    handles keyboard events:
    1:Ctrl+ArrowRight for stepping to next tabpane
    2:Ctrl+ArrowLeft for stepping to previous tabpane
    3:Ctrl+ArrowDown for opening next Submenu
    4:Ctrl+ArrowUp for opening previous Submenu
    5:Ctrl+Backspace for closing all opened Submenus
    6:Ctrl+NumpadEnter for toggling sidemenu collapse
    7:Ctrl+KeyX for closing currently active tab
    8:Ctrl+KeyV for opening search box for pages
     */
    keyHandler: _.debounce(function(...args) {
      const self = this;
      const flatmenu = JSON.parse(localStorage.getItem('flatmenu'));
      const mainMenus = flatmenu.filter(x => x.isMain);
      const subMenus = mainMenus.filter(x => x.type === 'submenu');
      const pages = mainMenus.filter(x => x.type === 'menuitem');
      const event = args[0];
      try {
        const openedMenus = self.$refs.layout.$refs.menuElementRef.openedMenus;
        if (event.code === 'ArrowRight' && event.ctrlKey) {
          if (self.editableTabs && self.editableTabs.length > 0) {
            const tab = self.editableTabs.filter(x => x.name === self.editableTabsValue)[0];
            const index = self.editableTabs.indexOf(tab);
            if (self.editableTabs[index + 1]) {
              self.editableTabsValue = self.editableTabs[index + 1].name || '';
            }
            self.focusTabPane();
          }
        } else if (event.code === 'ArrowLeft' && event.ctrlKey) {
          if (self.editableTabs && self.editableTabs.length > 0) {
            const tab = self.editableTabs.filter(x => x.name === self.editableTabsValue)[0];
            const index = self.editableTabs.indexOf(tab);
            if (self.editableTabs[index - 1]) {
              self.editableTabsValue = self.editableTabs[index - 1].name || '';
            }
            self.focusTabPane();
          }
        } else if (event.code === 'ArrowDown' && event.ctrlKey) {
          if (openedMenus != null && openedMenus.length > 0) {
            // something is open
            const openIndex = parseInt(openedMenus[0] || 0);
            const openMenu = subMenus.filter(x => x.index == openIndex)[0];
            const index = subMenus.indexOf(openMenu);
            if (subMenus[index + 1]) {
              self.$refs.layout.$refs.menuElementRef.open(
                subMenus[index + 1].index.toString().trim(),
              );
            }
          } else {
            // none is open
            self.$refs.layout.$refs.menuElementRef.open(subMenus[0].index.toString().trim());
          }
        } else if (event.code === 'ArrowUp' && event.ctrlKey) {
          if (openedMenus != null && openedMenus.length > 0) {
            // something is open
            const openIndex = parseInt(openedMenus[0] || 0);
            const openMenu = subMenus.filter(x => x.index == openIndex)[0];
            const index = subMenus.indexOf(openMenu);
            if (subMenus[index - 1]) {
              self.$refs.layout.$refs.menuElementRef.open(
                subMenus[index - 1].index.toString().trim(),
              );
            }
          } else {
            // none is open
            self.$refs.layout.$refs.menuElementRef.open(subMenus[0].index.toString().trim());
          }
        } else if (event.code === 'Backspace' && event.ctrlKey) {
          self.$refs.layout.$refs.menuElementRef.close(
            self.$refs.layout.$refs.menuElementRef.openedMenus.filter(x => x != 0)[0],
          );
        } else if (event.code === 'NumpadEnter' && event.ctrlKey) {
          if (self.$refs.layout) {
            self.$refs.layout.collapse();
          }
        } else if (event.code === 'KeyX' && event.ctrlKey) {
          // for tab close
          self.removeTab(self.editableTabsValue);
        } else if (event.code === 'KeyV' && event.ctrlKey) {
          // for tab search and open
          const pageSuggestion = [];
          const h = this.$createElement;
          for (let item of pages) {
            pageSuggestion.push(
              h(
                'elOption',
                {
                  attrs: {
                    key: item.menuId || 0,
                    label: item.label || '',
                    value: item.menuId || 0,
                  },
                },
                self.$t(item.label),
              ),
            );
          }
          const msgBox = this.$message({
            iconClass: 'none',
            duration: 0,
            message: h(
              'elSelect',
              {
                attrs: {
                  value: '',
                  placeholder: 'search page',
                  clearable: true,
                  filterable: true,
                  style: {
                    width: '250px',
                  },
                },
                on: {
                  change: function(event) {
                    const sMenu = pages.filter(x => x.menuId === event)[0];
                    self.addTab(
                      {
                        menuId: sMenu.menuId,
                        label: sMenu.label,
                        name: sMenu.name,
                        component: sMenu.component,
                      },
                      null,
                    );
                  },
                },
              },
              pageSuggestion,
            ),
          });
          setTimeout(() => {
            if (msgBox) {
              msgBox.$children[0].focus();
            }
          }, 100);
        }
      } catch (_) {}
    }, 100),
    resetCtxLocals() {
      this.localName = '';
    },
    onCtxClose(locals) {
      this.localName = locals;
    },
    /**@description
    Is fired when context menu on tabpane is clicked, options are:
    1:Close
    2:Close all
    3:Close all but this
     */
    onClick(option) {
      if (this.localName != '') {
        switch (option) {
          case 'close':
            this.tabRemoval(this.localName);
            break;
          case 'close_all':
            if (this.editableTabs && this.editableTabs.length > 0) {
              for (let tab of this.editableTabs) {
                this.tabRemoval(tab.name);
              }
            }
            break;
          case 'close_all_but_this':
            if (this.editableTabs && this.editableTabs.length > 0) {
              let filter = this.editableTabs.filter(x => x.name != this.localName);
              if (filter && filter.length > 0) {
                for (let tab of filter) {
                  this.tabRemoval(tab.name);
                }
              }
            }
            break;
        }
      }
      this.resetCtxLocals();
    },
    /**@description
    toggles pinned status of tabs
     */
    togglePin(name) {
      if (this.editableTabs && this.editableTabs.length > 0) {
        let filter = this.editableTabs.filter(x => x.name == name);
        if (filter && filter.length > 0) {
          filter[0].pinned = !filter[0].pinned;
        }
      }
    },
    /**@description
    handles selection of tabpane
     */
    handleTabClick(tab, _) {
      const activetabname = tab.$vnode.data.key || '';
      const flatmenu = JSON.parse(localStorage.getItem('flatmenu'));
      const mainMenus = flatmenu.filter(x => x.isMain);
      const activeTabIns = mainMenus.filter(x => x.name == activetabname);
      if (activeTabIns && activeTabIns.length > 0) {
        if (this.$refs.layout.$refs.menuElementRef) {
          this.$refs.layout.$refs.menuElementRef.activeIndex = activeTabIns[0].index
            .toString()
            .trim();
          if (!this.$refs.layout.collapsed) {
            this.$refs.layout.$refs.menuElementRef.open(
              this.getParentSubMenu(activeTabIns[0].parentId)
                .toString()
                .trim(),
            );
          }
        }
      }
    },
    /**@description
    handles opening of new tab on clicking menuitem
     */
    handleMenuItemClick(tab, args = null) {
      // tab.menuId, tab.label, tab.name, tab.component
      // args.type, args.additionalParam
      // insert new menu depending upon menuId, if already present toggle it as active
      this.addTab(tab, args);
    },
    /**@description
    internal function of adding new tabpane
    @argument
    1:tab:{menuId,label,name,component}
    2:args:{type:'onForce'|'onCascadeNavigation',additionalParam:{}}
     */
    addTab(tab, args = null) {
      args = args || { type: 'onForce' };
      switch (args.type) {
        case 'onForce':
          if (this.editableTabs.filter(x => x.name == tab.name).length == 0) {
            const newTabForce = {
              menuId: tab.menuId || 0,
              name: tab.name || '',
              label: tab.label || '',
              component: tab.component || '',
              dirty: false,
              loading: false,
              pinned: false,
            };
            this.attachProperties(newTabForce, Object.assign({}, args.additionalParam || {}));
            this.editableTabs.push(Object.assign({}, newTabForce));
            this.editableTabsValue = tab.name;
          } else {
            this.editableTabsValue = tab.name;
          }
          break;
        case 'onCascadeNavigation':
          if (
            this.editableTabs.filter(
              x => x.name == `${tab.name}_${args.additionalParam.navigationProperty}`,
            ).length == 0
          ) {
            const newTabNavigate = {
              menuId: tab.menuId || 0,
              name: `${tab.name}_${args.additionalParam.navigationProperty}`,
              label: tab.label || '',
              component: tab.component || '',
              dirty: false,
              loading: false,
              pinned: false,
            };
            this.attachProperties(newTabNavigate, Object.assign({}, args.additionalParam || {}));
            this.editableTabs.push(Object.assign({}, newTabNavigate));
            this.editableTabsValue = `${tab.name}_${args.additionalParam.navigationProperty}`;
          } else {
            this.editableTabsValue = `${tab.name}_${args.additionalParam.navigationProperty}`;
          }
          break;
      }
    },
    /**@description makes tabpane dirty */
    makeDirty(args, isDirty = false) {
      // args.menuId, args.label, args.name, args.component
      if (this.editableTabs.filter(x => x.name == args.name).length > 0) {
        const active = this.editableTabs.filter(x => x.name == args.name)[0];
        active.dirty = isDirty;
      }
    },
    /**@description makes tabpane loading */
    makeLoading(args, loading = false) {
      // args.menuId, args.label, args.name, args.component
      if (this.editableTabs.filter(x => x.name == args.name).length > 0) {
        const active = this.editableTabs.filter(x => x.name == args.name)[0];
        active.loading = loading;
      }
    },
    /**@description checks if tabpane is dirty */
    isDirty(args) {
      if (this.editableTabs.filter(x => x.name == args.name).length > 0) {
        const active = this.editableTabs.filter(x => x.name == args.name)[0];
        return active.dirty || false;
      } else return false;
    },
    /**@description internal function of making current tab active in sidemenu */
    makeCurrentTabActive() {
      const self = this;
      try {
        if (self.editableTabs.length > 0) {
          const flatmenu = JSON.parse(localStorage.getItem('flatmenu'));
          const mainMenus = flatmenu.filter(x => x.isMain);
          const activeTabIns = mainMenus.filter(x => x.name == self.editableTabsValue);
          if (activeTabIns && activeTabIns.length > 0) {
            if (self.$refs.layout.$refs.menuElementRef) {
              self.$refs.layout.$refs.menuElementRef.activeIndex = activeTabIns[0].index
                .toString()
                .trim();
              if (!self.$refs.layout.collapsed) {
                self.$refs.layout.$refs.menuElementRef.open(
                  self
                    .getParentSubMenu(activeTabIns[0].parentId)
                    .toString()
                    .trim(),
                );
              }
            }
          }
        } else {
          if (self.$refs.layout.$refs.menuElementRef) {
            self.$refs.layout.$refs.menuElementRef.activeIndex = '';
            self.$refs.layout.$refs.menuElementRef.close(
              self.$refs.layout.$refs.menuElementRef.openedMenus.filter(x => x != 0)[0],
            );
          }
        }
      } catch (e) {
        self.$message(self.$t('tab_remove_error'));
      }
    },
    /**@description internal function called for tab removal */
    tabRemoval(targetName) {
      const self = this;
      try {
        if (self.editableTabs.filter(x => x.name == targetName).length > 0) {
          if (!self.editableTabs.filter(x => x.name == targetName)[0].pinned) {
            let tabs = self.editableTabs;
            let activeName = self.editableTabsValue;
            if (activeName === targetName) {
              tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                  let nextTab = tabs[index + 1] || tabs[index - 1];
                  if (nextTab) {
                    activeName = nextTab.name;
                  }
                }
              });
            }
            self.editableTabsValue = activeName;
            self.editableTabs = JSON.parse(
              JSON.stringify(tabs.filter(tab => tab.name !== targetName)),
            );
            self.makeCurrentTabActive();
            setTimeout(() => {
              self.editableTabs = JSON.parse(JSON.stringify(self.editableTabs));
              eventBus.$emit('language');
            }, 100);
          }
        }
      } catch (e) {
        self.$message(self.$t('tab_remove_error'));
      }
    },
    /**@description function called for remove tab, asks for confirmation if tab is dirty */
    removeTab(targetName) {
      const self = this;
      const targetTab = this.editableTabs.filter(x => x.name == targetName);
      if (targetTab.length > 0) {
        if (!targetTab[0].pinned) {
          if (targetTab[0].dirty) {
            this.$confirm(this.$t('dirty_tab_confirmation'))
              .then(_ => {
                if (self.$refs.componentRef.length > 0) {
                  if (self.$refs.componentRef.filter(x => x.args.name == targetName).length > 0) {
                    self.$refs.componentRef
                      .filter(x => x.args.name == targetName)[0]
                      .saveToDB()
                      .then(_ => {
                        self.$message(self.$t('save_success'));
                        self.tabRemoval(targetName);
                      })
                      .catch(_ => {});
                  }
                }
              })
              .catch(_ => {
                self.tabRemoval(targetName);
              });
          } else {
            self.tabRemoval(targetName);
          }
        }
      }
    },
    /**@description
     * function attaced to input args of component for refreshing a list of dependent tabs
     * @argument
     * refreshConfig:[{name, type:'onCascadeNavigation'|'onForce',
     * navigationProperty, mode:'update'|'delete',
     * scope:'full'|'partial':only applicable for onCascadeNavigation}]
     */
    refreshTab(refreshConfig = []) {
      if (refreshConfig && refreshConfig.length > 0) {
        const self = this;
        const resetState = config => {
          // config.name,
          // config.type = onCascadeNavigation | onForce,
          // config.navigationProperty,
          // config.mode = update | delete,
          // config.scope = full | partial : only applicable for onCascadeNavigation
          switch (config.type) {
            case 'onCascadeNavigation':
              switch (config.scope) {
                case 'full':
                  switch (config.mode) {
                    case 'update':
                      if (
                        this.$refs.componentRef.filter(
                          comp => comp.args.name == `${config.name}_${config.navigationProperty}`,
                        ).length > 0
                      ) {
                        let target = null;
                        if (
                          this.editableTabs.filter(
                            x => x.name == `${config.name}_${config.navigationProperty}`,
                          ).length > 0
                        ) {
                          target = this.editableTabs.filter(
                            x => x.name == `${config.name}_${config.navigationProperty}`,
                          )[0];
                        }
                        if (target) {
                          target.loading = true;
                          target.dirty = false;
                        }
                        this.$refs.componentRef
                          .filter(
                            comp => comp.args.name == `${config.name}_${config.navigationProperty}`,
                          )[0]
                          .resetAfterSave()
                          .then(_ => {
                            target.loading = false;
                          });
                      }
                      break;
                    case 'delete':
                      this.tabRemoval(`${config.name}_${config.navigationProperty}`);
                      break;
                  }
                  break;
                case 'partial':
                  switch (config.mode) {
                    case 'update':
                      if (
                        this.$refs.componentRef.filter(
                          comp => comp.args.name.indexOf(config.name) != -1,
                        ).length > 0
                      ) {
                        let tabTarget = this.editableTabs.filter(
                          x => x.name.indexOf(config.name) != -1,
                        );
                        let compTarget = this.$refs.componentRef.filter(
                          comp => comp.args.name.indexOf(config.name) != -1,
                        );

                        for (let i = 0; i < tabTarget.length; i++) {
                          let target = tabTarget[i];
                          if (target) {
                            target.loading = true;
                            target.dirty = false;
                          }
                          compTarget[i].resetAfterSave().then(_ => {
                            target.loading = false;
                          });
                        }
                      }
                      break;
                    case 'delete':
                      let tabTarget = this.editableTabs.filter(
                        x => x.name.indexOf(config.name) != -1,
                      );
                      for (let item of tabTarget) {
                        this.tabRemoval(item.name);
                      }
                      break;
                  }
                  break;
              }
              break;
            case 'onForce':
              switch (config.mode) {
                case 'update':
                  if (
                    this.$refs.componentRef.filter(comp => comp.args.name == config.name).length > 0
                  ) {
                    let target = null;
                    if (this.editableTabs.filter(x => x.name == config.name).length > 0) {
                      target = this.editableTabs.filter(x => x.name == config.name)[0];
                    }
                    if (target) {
                      target.loading = true;
                      target.dirty = false;
                    }
                    this.$refs.componentRef
                      .filter(comp => comp.args.name == config.name)[0]
                      .resetAfterSave()
                      .then(_ => {
                        target.loading = false;
                      });
                  }
                  break;
                case 'delete':
                  this.tabRemoval(config.name);
                  break;
              }
              break;
          }
        };
        for (const config of refreshConfig) {
          resetState(config);
        }
      }
    },
    /**@description attach input properties to tab pane
     * attachInputProperties: attaches parts of additionalParam to tabinner.args
     * attachCommonProperties: attaches common properties and
     * functions like name,  changeMenuHandler, makeDirty,
     * makeLoading, isDirty, refreshTab
     */
    attachProperties(tabobj, additionalParam = null) {
      const self = this;
      const attachInputProperties = tabinner => {
        if (additionalParam) {
          for (let key in additionalParam) {
            tabinner.args[key] = additionalParam[key];
          }
        }
      };
      const attachCommonProperties = tabinner => {
        tabinner.args = {
          name: tabinner.name,
          changeMenuHandler(tab, args = null) {
            self.handleMenuItemClick(tab, args);
          },
          makeDirty(args, isDirty = false) {
            self.makeDirty(args, isDirty);
          },
          makeLoading(args, loading = false) {
            self.makeLoading(args, loading);
          },
          isDirty(args) {
            return self.isDirty(args);
          },
          refreshTab(refreshConfig) {
            self.refreshTab(refreshConfig);
          },
        };
      };
      attachCommonProperties(tabobj);
      attachInputProperties(tabobj);
    },
  },
  /**@description lifecycle hook fired when component is mounted
   * opens the first menuitem found from flatmenu and opens
   *  its parent menu hierarchy in sidemenu and makes it active
   */
  mounted() {
    // insert first tab into tab control depending upon menuId of first menu in flatmenu
    if (this.$store.state.auth.authenticated) {
      const flatmenu = JSON.parse(localStorage.getItem('flatmenu'));
      if (flatmenu && flatmenu.filter(x => x.isMain).length > 0) {
        const filter = flatmenu.filter(x => x.isMain).filter(x => x.type === 'menuitem');

        if (filter && filter.length > 0) {
          const newTab = {
            menuId: filter[0].menuId || 0,
            name: filter[0].name || '',
            label: filter[0].label || '',
            component: filter[0].component || '',
            dirty: false,
            loading: false,
            pinned: false,
          };
          this.attachProperties(newTab);
          this.editableTabs.push(Object.assign({}, newTab));
          this.editableTabsValue = filter[0].name || 0;

          // attach properties for active menu
          this.defaultActive = filter[0].index.toString().trim();
          this.defaultOpeneds.push(
            this.getParentSubMenu(filter[0].parentId)
              .toString()
              .trim(),
          );
        }
      }
    }
  },
  /**@description lifecycle hook fired when component is created
   * adds keyhandler for capturing keyboard events on window
   */
  created() {
    window.addEventListener('keyup', this.keyHandler);
  },
};
</script>

<style>
.el-table--mini,
.el-table--small {
  font-size: 12px !important;
}
.btn-showdetails {
  color: steelblue;
}
.menu-collapsed
  .el-menu
  .el-submenu
  .el-submenu__title
  .el-submenu__icon-arrow.el-icon-arrow-right {
  display: none;
}

.el-submenu [class^='el-icon-'] {
  margin-right: 10px !important;
  width: auto !important;
  text-align: left !important;
  font-size: inherit !important;
}

.el-row {
  padding-bottom: 8px;
}

.ctx-menu .options li {
  list-style-type: none;
  cursor: pointer;
  margin-left: -13px;
}

.options {
  width: 250px;
}

.ctx-menu {
  padding: 5px 0px 5px 0px !important;
  font-size: 0.8rem !important;
}

.ctx-menu .options {
  line-height: 2;
  width: auto;
}

.el-tabs__item {
  font-size: 13px !important;
}

.el-tabs__item span {
  padding-left: 10px !important;
}

.el-tabs__item .el-icon-close:hover {
  background-color: transparent !important;
  color: black !important;
  font-weight: bold !important;
}

.el-tabs__nav-wrap::after {
  background-color: #dfe46d !important;
}

.el-submenu [class^='el-icon-'] {
  margin-right: 10px !important;
  width: auto !important;
  text-align: left !important;
  font-size: inherit !important;
}

.el-submenu .el-submenu__title {
  color: white !important;
  font-weight: normal;
}

.el-submenu .el-submenu__title:hover {
  background-color: #141a1f !important;
}

.el-submenu .el-menu-item {
  background-color: #28343e;
  color: white;
}

.el-submenu .el-menu-item:hover {
  background-color: #1e272f;
}

body div.el-select-dropdown.el-popper:first-child {
  top: 59px !important;
}
</style>
