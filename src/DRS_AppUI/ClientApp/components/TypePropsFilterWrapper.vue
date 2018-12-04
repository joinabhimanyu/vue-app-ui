<template>
    <div>
      <el-row>
        <el-form :inline="true" label-width="125px" status-icon>
<el-form-item :label="$t('saved_filters')">
<el-select clearable ref="savedFilters" v-model="selectedFilter" placeholder="Select saved filters" @change="savedFilterSelected($event)">
                        <el-option v-for="item in savedFilters" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
        </el-form-item>
        <el-button @click="saveFilter">
                    <t t="save_filter"></t>
                </el-button>
                <el-button @click="clearFilter">
                    <t t="clear_filter"></t>
                </el-button>
        </el-form>
      </el-row>
        <el-row ref="propsFilterContainer" v-for="node in propsFilterCollection" :key="node.args.index" :name="node.component">
            <keep-alive>
                <component :is="node.component" v-bind:args="node.args" ref="componentRef"></component>
            </keep-alive>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-button @click="addClause">
                    <t t="add_clause"></t>
                </el-button>
                <el-button @click="applyFilter">
                    <t t="apply_filter"></t>
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Vue from 'vue';
import UtilityMixin from '../mixins/utilityMixin';
import { eventBus } from '../main';
import _ from 'lodash';
import typePropsFilter from '../components/TypePropsFilter';
import TypePropsFilterWrapperViewModel from '../view_models/typePropsFilterWrapper_viewmodel';

/**@author Abhimanyu Chkarborton Type props filter wrapper component
 * props: {propTypeUrl}
 * events: {apply-filter}
 */
export default {
  name: 'typePropsFilterWrapper',
  mixins: [TypePropsFilterWrapperViewModel, UtilityMixin],
  components: { typePropsFilter },
  props: {
    propTypeUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
    loadSavedFilters() {},
    saveFilter() {
      this.$prompt('Please enter the name of the filter', 'Filter', {
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        inputPattern: /([^\s])/,
        inputErrorMessage: 'Invalid filter name',
      })
        .then(value => {
          this.$message({
            type: 'success',
            message: 'Your filter is:' + value,
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled',
          });
        });
    },
    clearFilter() {},
    savedFilterSelected(args) {},
    /** method for removing any clause other than the default first clause */
    removeClause(args) {
      if (args.index != 0) {
        if (this.propsFilterCollection && this.propsFilterCollection.length > 0) {
          let i = this.propsFilterCollection.length;
          while (i--) {
            if (this.propsFilterCollection[i].args.index == args.index) {
              this.propsFilterCollection.splice(i, 1);
            }
          }
        }
      }
    },
    /** method for adding clause,
     * added clause will
     * contain joining clause part and not filter clause part
     * only the first default clause will contain the filter
     * clause part, it will not contain the joining clause part
     */
    addClause() {
      if (this.propsFilterCollection && this.propsFilterCollection.length == 0) {
        this.propsFilterCollection.push({
          component: 'typePropsFilter',
          args: { propTypeUrl: this.propTypeUrl, index: 0 },
        });
      } else {
        let maxindex = 0;
        for (let item of this.propsFilterCollection) {
          if (item.args.index > maxindex) {
            maxindex = item.args.index;
          }
        }
        maxindex += 1;
        this.propsFilterCollection.push({
          component: 'typePropsFilter',
          args: {
            propTypeUrl: this.propTypeUrl,
            removeClause: this.removeClause,
            index: maxindex,
          },
        });
      }
    },
    /** method for validating the filter panel */
    validateFilter() {
      let valid = true;
      if (this.$refs.componentRef.length == 1) {
        if (
          this.$refs.componentRef.filter(
            x =>
              x.filterModel.filterClause == '' ||
              x.filterModel.propName == '' ||
              x.filterModel.operator == '' ||
              x.filterModel.propValue == '',
          ).length > 0
        ) {
          valid = false;
        }
      } else {
        if (
          this.$refs.componentRef[0].filterModel.filterClause == '' ||
          this.$refs.componentRef[0].filterModel.propName == '' ||
          this.$refs.componentRef[0].filterModel.operator == '' ||
          this.$refs.componentRef[0].filterModel.propValue == ''
        ) {
          valid = false;
        } else {
          // check next entries other than the first
          const others = this.$refs.componentRef.slice(1, this.$refs.componentRef.length);
          if (
            others.filter(
              x =>
                x.filterModel.joiningClause == '' ||
                x.filterModel.propName == '' ||
                x.filterModel.operator == '' ||
                x.filterModel.propValue == '',
            ).length > 0
          ) {
            valid = false;
          }
        }
      }
      return valid;
    },
    /**
     * singnature of search args:
     * searchArgs:{
     * filterClause:string,
     * Props:[{
     * joiningClause:string,
     * IsNestedProp:bool,
     * propName:string,
     * operator:string,
     * propValue:any
     * }],
     * IsMultiple:bool}
     */
    applyFilter() {
      if (this.$refs.componentRef && this.$refs.componentRef.length > 0) {
        if (!this.validateFilter()) {
          this.$message(this.$t('invalid_property_filter'));
        } else {
          let searchData = [];
          let searchArgs = {};
          if (this.$refs.componentRef.length == 1) {
            searchData = [
              {
                joiningClause: '',
                IsNestedProp:
                  this.$refs.componentRef[0].filterModel.propName.indexOf('.') != -1 ? true : false,
                propName: this.$refs.componentRef[0].filterModel.propName,
                operator: this.$refs.componentRef[0].filterModel.operator,
                propValue: this.$refs.componentRef[0].filterModel.propValue,
              },
            ];
          } else {
            for (let index = 0; index < this.$refs.componentRef.length; index++) {
              let joiningClause = '';
              if (index == this.$refs.componentRef.length - 1) {
                joiningClause = '';
              } else {
                joiningClause = this.$refs.componentRef[index + 1].filterModel.joiningClause;
              }
              searchData.push({
                joiningClause: joiningClause,
                IsNestedProp:
                  this.$refs.componentRef[index].filterModel.propName.indexOf('.') != -1
                    ? true
                    : false,
                propName: this.$refs.componentRef[index].filterModel.propName,
                operator: this.$refs.componentRef[index].filterModel.operator,
                propValue: this.$refs.componentRef[index].filterModel.propValue,
              });
            }
          }
          searchArgs = {
            filterClause: this.$refs.componentRef[0].filterModel.filterClause,
            Props: searchData,
            IsMultiple: searchData.length == 1 ? false : true,
          };
          this.$emit('apply-filter', searchArgs);
        }
      }
    },
  },
  /** mounted event of wrapper component, adds one default prop filter on initialization */
  mounted() {
    if (this.propsFilterCollection && this.propsFilterCollection.length == 0) {
      this.propsFilterCollection.push({
        component: 'typePropsFilter',
        args: { propTypeUrl: this.propTypeUrl, index: 0 },
      });
    }
  },
};
</script>

