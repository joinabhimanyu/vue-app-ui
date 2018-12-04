<template>

    <div>
        <!--condition for submenu-->
        <el-submenu v-if="menu.type==='submenu'" :index="menu.index">
            <template :slot="menu.slot">
                <!--<i :class="menu.icon" aria-hidden="true"></i>-->
                <span :class="menu.icon" aria-hidden="true"></span>
                <span :slot="menu.slot" v-if="collapsed"></span>
                <span :slot="menu.slot" v-if="!collapsed"><t :t="menu.label"></t></span>
            </template>
            <template v-if="menu.children.length>0">
                <div v-for="child in menu.children"
                     :key="child.index"
                     :data="child">
                    <sub-menu :menu="child" :collapsed="collapsed"
                              @handleMenuItemClick="handleMenuItemClick"></sub-menu>
                </div>
            </template>
        </el-submenu>

        <!--condition for menugroup-->
        <el-menu-item-group v-else-if="menu.type==='menugroup'" :title="menu.title">
            <template v-if="menu.children.length>0">
                <div v-for="child in menu.children"
                     :key="child.index"
                     :data="child">
                    <sub-menu :menu="child" :collapsed="collapsed"
                              @handleMenuItemClick="handleMenuItemClick"></sub-menu>
                </div>
            </template>
        </el-menu-item-group>

        <!--condition for menuitem-->
        <el-menu-item v-else-if="menu.type==='menuitem'" :index="menu.index">
            <a @click.prevent="handleMenuItemClick({menuId:menu.menuId,label:menu.label,name:menu.name,component:menu.component})">
                <t :t="menu.label"></t>
            </a>
        </el-menu-item>

    </div>

</template>

<script>
import SubMenu from './SubMenu';

/**
 * @description Submenu component for generating sidemenu, recorsively calles
 * itself for n-level generation
 */
export default {
  name: 'sub-menu',
  props: {
    menu: {
      type: Object,
      required: true,
    },
    collapsed: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    SubMenu,
  },
  methods: {
    /**@description emits menu click event and delegates it to handler in Default.vue */
    handleMenuItemClick(args) {
      this.$emit('handleMenuItemClick', args);
    },
  },
};
</script>
