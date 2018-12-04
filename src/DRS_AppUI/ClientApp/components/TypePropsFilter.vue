<template>
    <el-col :span="24">
        <el-form :inline="true" label-width="125px" :model="filterModel" status-icon>
            <template v-if="args.index==0">
                <!-- filter clause -->
                <el-form-item prop="filterClause">
                    <el-select clearable ref="filterClause" v-model="filterModel.filterClause" placeholder="Select filter clause">
                        <el-option v-for="item in filterClauses" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </template>

            <template v-if="args.index!=0">
                <!-- joining clause -->
                <el-form-item prop="joiningClause">
                    <el-select clearable ref="joiningClause" v-model="filterModel.joiningClause" placeholder="Select joining clause">
                        <el-option v-for="item in joiningClauses" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </template>

            <!-- prop name filter -->
            <el-form-item prop="propName">
                <el-select popper-class="propFilter" clearable ref="propFilter" v-model="filterModel.propName" placeholder="Select prop name" @visible-change="propFilterVisiblityChange($event)">
                    <el-option v-loading="loadingPropFilter" element-loading-spinner="el-icon-loading" value="">
                        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </el-option>
                </el-select>
            </el-form-item>

            <!-- operator selector -->
            <el-form-item prop="operator">
                <el-select clearable ref="operator" v-model="filterModel.operator" placeholder="Select operator">
                    <el-option v-for="item in operators" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <!-- prop value field -->
            <el-form-item prop="propValue">
                <el-input v-model="filterModel.propValue" :placeholder="$t('enter_value')" style="width:220px"></el-input>
            </el-form-item>

            <el-button @click="resetClauseHandler">
                <t t="reset_clause"></t>
            </el-button>
            <template v-if="args.index!=0">
              <el-button @click="removeClauseHandler">
                    <t t="remove_clause"></t>
                </el-button>
            </template>
        </el-form>
    </el-col>
</template>

<script>
import Vue from 'vue';
import UtilityMixin from '../mixins/utilityMixin';
import { eventBus } from '../main';
import _ from 'lodash';

/**@author Abhimanyu Chkarborton Type props filter component
 * props:{args:{propTypeUrl,removeClause(),index}}
 */
export default {
  name: 'typePropsFilter',
  mixins: [UtilityMixin],
  props: {
    args: {
      propTypeUrl: {
        type: String,
        required: true,
      },
      removeClause: {
        type: Function,
        required: false,
      },
      index: {
        type: Number,
        required: true,
      },
    },
  },
  data() {
    return {
      filterModel: {
        filterClause: '',
        joiningClause: '',
        propName: '',
        operator: '',
        propValue: '',
      },
      filterClauses: [
        {
          value: 'where',
          label: 'Where',
        },
        {
          value: 'where-not',
          label: 'Where-Not',
        },
      ],
      joiningClauses: [
        {
          value: 'and',
          label: 'And',
        },
        {
          value: 'or',
          label: 'Or',
        },
      ],
      operators: [
        {
          value: 'eq',
          label: 'eq',
        },
        {
          value: 'not-eq',
          label: 'not-eq',
        },
        {
          value: 'gt-eq',
          label: 'gt-eq',
        },
        {
          value: 'gt',
          label: 'gt',
        },
        {
          value: 'lt',
          label: 'lt',
        },
        {
          value: 'lt-eq',
          label: 'lt-eq',
        },
        {
          value: 'contains',
          label: 'contains',
        },
        {
          value: 'not-contains',
          label: 'not-contains',
        },
        {
          value: 'starts-with',
          label: 'starts-with',
        },
      ],
      loadingPropFilter: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  methods: {
    resetClauseHandler() {
      this.filterModel = {
        filterClause: '',
        joiningClause: '',
        propName: '',
        operator: '',
        propValue: '',
      };
    },
    removeClauseHandler() {
      if (this.args.removeClause) {
        this.args.removeClause(this.args);
      }
    },
    /** Event Handler after selection of node in treeview */
    handleNodeClick(data) {
      if (!data.hasChildren) {
        // consider data.depth
        const result = this.construnctPropName(data.label || '', data.nonLeafnodeIndex || '');
        this.filterModel.propName = result;
        this.$refs.propFilter.toggleMenu();
      }
    },
    /** Construction of the propname with proper heirarchy after selection in treeview */
    construnctPropName(label, nonLeafnodeIndex) {
      const traverseChildren = (children, propName, parentName, nonLeafnodeIndex) => {
        let result = '';
        for (let a of children) {
          if (!a.hasChildren) {
            if (a.label == propName && a.nonLeafnodeIndex == nonLeafnodeIndex) {
              result = parentName != '' ? `${parentName}.${propName}` : `${propName}`;
            }
          } else {
            result = traverseChildren(
              a.children,
              propName,
              parentName != '' ? `${parentName}.${a.label}` : a.label,
              nonLeafnodeIndex,
            );
          }
          if (result != '') {
            break;
          } else {
            continue;
          }
        }
        return result;
      };
      return traverseChildren(this.data, label, '', nonLeafnodeIndex);
    },
    /** Event handler for toggling loading state of option in dropdown */
    propFilterVisiblityChange(event) {
      const self = this;
      if (event) {
        self.loadingPropFilter = true;
        setTimeout(() => {
          self.loadingPropFilter = false;
        }, 500);
      }
    },
    /** Client api method to initialise loading of data of treeview */
    loadData() {
      const self = this;
      self.data = [];
      return new Promise((resolve, reject) => {
        self
          .fetchData(self.args.propTypeUrl)
          .then(response => {
            if (response.msg == 'success') {
              self.data = JSON.parse(JSON.stringify(response.data || []));
              resolve();
            } else {
              self.$message(err || self.$t('error_loading_data'));
              reject();
            }
          })
          .catch(err => {
            self.$message(err || self.$t('error_loading_data'));
            reject();
          });
      });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>