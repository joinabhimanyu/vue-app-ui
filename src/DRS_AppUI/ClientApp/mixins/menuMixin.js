// mixin for fetching the parent submenu of any submenu, menugroup or menuitem
/**
 * @description common function for getting index of parent menu of any menuitem
 */
export default {
  methods: {
    /**
     * @description get index of parent menu of any menuitem
     * @param {*} parentId,
     */
    getParentSubMenu(parentId) {
      const flatmenu = JSON.parse(localStorage.getItem('flatmenu'));
      const temp = flatmenu.filter(x => x.isMain).filter(x => x.menuId === parentId);
      if (temp && temp.length > 0) {
        if (temp[0].type === 'submenu') {
          return temp[0].index.toString().trim();
        }
        return this.getParentSubMenu(temp[0].parentId)
          .toString()
          .trim();
      }
      return null;
    },
  },
};
