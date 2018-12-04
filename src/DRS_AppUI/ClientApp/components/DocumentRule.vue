<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content">
                    <data-tables-server ref="rulesTable"
                                        :data="documentRules"
                                        :total="rulesTotal"
                                        :loading="loadingRules"
                                        :table-props="rulesTableProps"
                                        :show-action-bar="false"
                                        :custom-filters="rulesFilter"
                                        @query-change="rulesQueryChange"
                                        @row-click="onRulesRowClicked"
                                        @select="handleSelectionChangeRules"
                                        @select-all="handleSelectionChangeRules">
                        <el-row slot="custom-tool-bar" style="margin-bottom:8px">
                            <el-col :span="3">
                                <el-dropdown @command="onCommandRules">
                                    <el-button type="primary"><t t="actions"></t>
                                    <i class="el-icon-loading" v-if="loadingDialogDocumentRule"></i>
                                    <i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="new"><i class="fa fa-plus fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="new"></t></span></el-dropdown-item>
                                        <el-dropdown-item command="edit"><i class="fa fa-pencil fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="edit"></t></span></el-dropdown-item>
                                        <el-dropdown-item command="delete"><i class="fa fa-trash-o fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="delete"></t></span></el-dropdown-item>
                                        <el-dropdown-item command="copy_to_new"><i class="fa fa-clone fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="copy_to_new"></t></span></el-dropdown-item>
                                        <el-dropdown-item command="clearSelection"><i class="fa fa-repeat fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="reset"></t></span></el-dropdown-item>
                                        <el-dropdown-item command="refresh"><i class="fa fa-refresh fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="refresh"></t></span></el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-col>
                            <el-col :span="6" class="switch-container">
                                <el-switch v-model="toggleRuleSettings"
                                            :active-text="$t('toggle_rule_settings')">
                                </el-switch>
                            </el-col>
                            <el-col :span="3" :offset="7">
                                <el-select v-model="rulesFilterValue" placeholder="Select">
                                    <el-option v-for="item in rulesFilterOption" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="4" :offset="1">
                                <!--@input="debounceInput"-->
                                <el-input v-model="rulesFilter[0].vals"
                                            prefix-icon="el-icon-search"
                                            :placeholder="$t('search_rules')">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-table-column type="selection"
                                            reserve-selection
                                            width="55">
                        </el-table-column>
                        <el-table-column :label="ruleCols[0].label" min-width="auto">
                            <template scope="scope">
                                {{scope.row[ruleCols[0].prop]}}
                            </template>
                        </el-table-column>
                        <el-table-column :label="ruleCols[1].label" min-width="auto">
                            <template scope="scope">
                                <el-checkbox v-model="scope.row[ruleCols[1].prop]"
                                                @change="handleChange(scope.row,$event)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column :label="ruleCols[2].label" min-width="auto">
                            <template scope="scope">
                                {{scope.row[ruleCols[2].prop]}}
                            </template>
                        </el-table-column>
                        <el-table-column :label="ruleCols[3].label" min-width="auto">
                            <template scope="scope">
                                {{scope.row[ruleCols[3].prop]}}
                            </template>
                        </el-table-column>
                        <el-table-column :label="ruleCols[4].label" min-width="auto">
                            <template scope="scope">
                                {{scope.row[ruleCols[4].prop]}}
                            </template>
                        </el-table-column>
                        <el-table-column :label="ruleCols[5].label" min-width="auto">
                            <template scope="scope">
                                {{scope.row[ruleCols[5].prop]}}
                            </template>
                        </el-table-column>
                    </data-tables-server>
                </div>
            </el-col>
        </el-row>
        <el-row v-show="toggleRuleSettings">
            <el-col :span="24">
                <el-tabs value="rule_settings">
                    <el-tab-pane :label="$t('rule_settings')" name="rule_settings">
                        <el-row>
                            <el-col :span="24">
                                <div class="grid-content">
                                    <data-tables-server ref="ruleSettingsTable"
                                                        :data="ruleSettings"
                                                        :total="ruleSettingsTotal"
                                                        :loading="loadingRuleSettings"
                                                        :table-props="ruleSettingsTableProps"
                                                        :show-action-bar="false"
                                                        :custom-filters="ruleSettingsFilter"
                                                        @query-change="ruleSettingsQueryChange"
                                                        @row-click="onRuleSettingsRowClicked"
                                                        @select="handleSelectionChangeRuleSettings"
                                                        @select-all="handleSelectionChangeRuleSettings">
                                        <el-row slot="custom-tool-bar" style="margin-bottom:8px">
                                            <el-col :span="3">
                                                <el-dropdown @command="onCommandRuleSettings">
                                                    <el-button type="primary"><t t="actions"></t>
                                                    <i class="el-icon-loading" v-if="loadingDialogDocumentRuleSettings"></i>
                                                    <i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                                                    <el-dropdown-menu slot="dropdown">
                                                        <el-dropdown-item command="new"><i class="fa fa-plus fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="new"></t></span></el-dropdown-item>
                                                        <el-dropdown-item command="edit"><i class="fa fa-pencil fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="edit"></t></span></el-dropdown-item>
                                                        <el-dropdown-item command="delete"><i class="fa fa-trash-o fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="delete"></t></span></el-dropdown-item>
                                                        <el-dropdown-item command="clearSelection"><i class="fa fa-repeat fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="reset"></t></span></el-dropdown-item>
                                                        <el-dropdown-item command="refresh"><i class="fa fa-refresh fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="refresh"></t></span></el-dropdown-item>
                                                    </el-dropdown-menu>
                                                </el-dropdown>
                                            </el-col>
                                            <el-col :span="3" :offset="13">
                                                <el-select v-model="ruleSettingsFilterValue" placeholder="Select">
                                                    <el-option v-for="item in ruleSettingsFilterOption" :key="item.value" :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-col>
                                            <el-col :span="4" :offset="1">
                                                <!--@input="debounceInput"-->
                                                <el-input v-model="ruleSettingsFilter[0].vals"
                                                            prefix-icon="el-icon-search"
                                                            :placeholder="$t('search_rule_settings')">
                                                </el-input>
                                            </el-col>
                                        </el-row>
                                        <el-table-column type="selection"
                                                            reserve-selection
                                                            width="55">
                                        </el-table-column>
                                        <el-table-column :label="ruleSettingsCols[0].label" min-width="auto">
                                            <template scope="scope">
                                                {{scope.row[ruleSettingsCols[0].prop]}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column :label="ruleSettingsCols[1].label" min-width="auto">
                                            <template scope="scope">
                                                {{scope.row[ruleSettingsCols[1].prop]}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column :label="ruleSettingsCols[2].label" min-width="auto">
                                            <template scope="scope">
                                                {{scope.row[ruleSettingsCols[2].prop]}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column :label="ruleSettingsCols[3].label" min-width="auto">
                                            <template scope="scope">
                                                {{scope.row[ruleSettingsCols[3].prop]}}
                                            </template>
                                        </el-table-column>
                                    </data-tables-server>
                                </div>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('schema_step_settings')" name="schema_step_settings">
                        <el-row>
                            <el-col :span="24">
                                <div class="grid-content">
                                    <data-tables-server ref="schemaStepSettingsTable"
                                                        :data="schemaStepSettings"
                                                        :total="schemaStepSettingsTotal"
                                                        :loading="loadingSchemStepSettings"
                                                        :table-props="schemaStepSettingsTableProps"
                                                        :show-action-bar="false"
                                                        :custom-filters="schemaStepSettingsFilter"
                                                        @query-change="schemaStepSettingsQueryChange">
                                        <el-row slot="custom-tool-bar" style="margin-bottom:8px">
                                            <el-col :span="3" :offset="16">
                                                <el-select v-model="schemaStepSettingsFilterValue" placeholder="Select">
                                                    <el-option v-for="item in schemaStepSettingsFilterOption" :key="item.value" :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-col>
                                            <el-col :span="4" :offset="1">
                                                <!--@input="debounceInput"-->
                                                <el-input v-model="schemaStepSettingsFilter[0].vals"
                                                            prefix-icon="el-icon-search"
                                                            :placeholder="$t('search_schemastep_settings')">
                                                </el-input>
                                            </el-col>
                                        </el-row>
                                        <el-table-column :label="schemaStepSettingsCols[0].label" min-width="auto">
                                            <template scope="scope">
                                                {{scope.row[schemaStepSettingsCols[0].prop]}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column :label="schemaStepSettingsCols[1].label" min-width="auto">
                                            <template scope="scope">
                                                {{scope.row[schemaStepSettingsCols[1].prop]}}
                                           </template>
                                        </el-table-column>
                                        <el-table-column :label="schemaStepSettingsCols[2].label" min-width="auto">
                                            <template scope="scope">
                                                {{scope.row[schemaStepSettingsCols[2].prop]}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column :label="schemaStepSettingsCols[3].label" min-width="auto">
                                            <template scope="scope">
                                                {{scope.row[schemaStepSettingsCols[3].prop]}}
                                            </template>
                                        </el-table-column>
                                    </data-tables-server>
                                </div>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>

         <!-- rules form -->
        <el-dialog :title="$t('document_rules')"
                   width="745px"
                   :visible.sync="showRuleDialog"
                   :before-close="onBeforeCloseRulesDialog">
            <el-row>
                <el-col :span="24">
                    <el-form
                             :label-position="'right'"
                             label-width="200px"
                             :model="selectedRule"
                             :rules="rulesFormRules"
                             status-icon>
                        <el-form-item prop="documentRuleGuid" :label="$t('document_rule_guid')">
                            <el-input v-model="selectedRule.documentRuleGuid" :placeholder="$t('enter_document_rule_guid')" style="width:300px"></el-input>
                        </el-form-item>
                        <el-form-item prop="name" :label="$t('name')">
                            <el-input v-model="selectedRule.name" :placeholder="$t('enter_name')" style="width:300px"></el-input>
                        </el-form-item>
                        <el-form-item prop="description" :label="$t('description')">
                            <el-input v-model="selectedRule.description" :placeholder="$t('enter_description')" style="width:300px"></el-input>
                        </el-form-item>
                        <el-form-item prop="ruleOrder" :label="$t('rule_order')">
                            <el-input v-model="selectedRule.ruleOrder" :placeholder="$t('enter_rule_order')" style="width:300px"></el-input>
                        </el-form-item>
                        <el-form-item prop="fieldQueryRule" :label="$t('field_query_rule')">
                            <el-input v-model="selectedRule.fieldQueryRule" :placeholder="$t('enter_field_query_rule')" style="width:300px"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('is_active')">
                            <el-checkbox v-model="selectedRule.isActive"></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="updated" :label="$t('updated')">
                            <el-date-picker style="width:300px"
                                            v-model="selectedRule.updated"
                                            type="datetime"
                                            :placeholder="$t('select_updated')"
                                            size="small"
                                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item prop="updatedBy" :label="$t('updated_by')">
                            <el-input v-model="selectedRule.updatedBy" :placeholder="$t('enter_updatd_by')" style="width:300px"></el-input>
                        </el-form-item>
                        <el-form-item prop="processSchemaId" :label="$t('process_schema')">
                            <!--autocomplete for processScemaList-->
                            <el-select style="width:300px"
                                       v-model="selectedRule.processSchemaId"
                                       clearable
                                       filterable
                                       remote
                                       reserve-keyword
                                       :placeholder="$t('select_process_schema')"
                                       :remote-method="loadRulesProcessSchemaList"
                                       :loading="loadingRulesProcessSchema"
                                       @change="rulesProcessSchemaChanged">
                                <el-option v-for="item in rulesProcessSchemaList"
                                           :key="item.value"
                                           :label="item.label"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('document_rule_name')">
                            {{selectedRule.processSchema}} - {{selectedRule.name}}
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCloseRulesDialog"><t t="cancel"></t></el-button>
                <el-button type="primary" @click="onSaveRulesDialog"><t t="save"></t></el-button>
            </span>
        </el-dialog>

         <!-- rule settings form -->
        <el-dialog :title="$t('document_rule_setting')"
                   width="745px"
                   :visible.sync="showRuleSettingsDialog"
                   :before-close="onBeforeCloseRuleSettingsDialog">
            <el-row>
                <el-col :span="24">
                    <el-form :label-position="'right'"
                             label-width="200px"
                             :model="selectedRuleSetting"
                             :rules="ruleSettingsFormRules"
                             status-icon>
                        <el-form-item prop="name" :label="$t('name')">
                            <el-input v-model="selectedRuleSetting.name" :placeholder="$t('enter_name')" style="width:300px"></el-input>
                        </el-form-item>
                        <el-form-item prop="value" :label="$t('value')">
                            <el-input v-model="selectedRuleSetting.name" :placeholder="$t('enter_value')" style="width:300px"></el-input>
                        </el-form-item>
                        <el-form-item prop="description" :label="$t('description')">
                            <el-input v-model="selectedRuleSetting.description" :placeholder="$t('enter_description')" style="width:300px"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCloseRuleSettingsDialog"><t t="cancel"></t></el-button>
                <el-button type="primary" @click="onSaveRuleSettingsDialog"><t t="save"></t></el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Vue from 'vue';
import UtilityMixin from '../mixins/utilityMixin';
import { eventBus } from '../main';
import _ from 'lodash';
import DocumentRuleViewModel from '../view_models/documentRule_viewmodel';

const getallrulesapi = 'getallDocumentRules';
const rulesApi = 'documentRule';
const getallrulesprocessschema = 'getallProcessSchema';
const ruleSettingsApi = 'documentRuleSetting';
const getallrulesettingsapi = 'getallDocumentRuleSettings';
const getallschemastepsettingsfromrule = 'getallProcessSchemaStepSettings';

/**@author Abhimanyu Chkarborty
 * @description Document rule component
 * follows standard list compnent template with new, edit and delete
 */
export default {
  name: 'documentRule',
  mixins: [DocumentRuleViewModel, UtilityMixin],
  props: {
    navigationProperty: {
      type: String,
      required: true,
    },
  },
  methods: {
    /* begin rules grid transaction */
    /**@description load document rule dependent entities:
     * 1:loadRuleSettingsFromRule
     * 2:loadSchemaStepSettingsFromRule
     */
    loadRuleDependents() {
      const self = this;

      return new Promise((resolve, reject) => {
        if (
          self.selectedRule &&
          self.selectedRule.documentRuleId &&
          self.selectedRule.documentRuleId != 0
        ) {
          self
            .loadRuleSettingsFromRule({
              pageSize: self.defaultPageSizeGrid,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'DocumentRuleId',
                    PropValue: self.selectedRule.documentRuleId || 0,
                  },
                ],
              },
              OrderByProp: {
                PropName: 'DocumentRuleSettingId',
              },
            })
            .then(() => {
              self
                .loadSchemaStepSettingsFromRule({
                  pageSize: self.defaultPageSizeGrid,
                  NavigationProperty: {
                    Props: [
                      {
                        PropName: 'ProcessSchemaStep.ProcessSchema.ProcessSchemaId',
                        PropValue: self.selectedRule.processSchemaId || 0,
                        IsNestedProp: true,
                      },
                    ],
                  },
                  OrderByProp: {
                    PropName: 'ProcessSchemaStepSettingId',
                  },
                  IsNavigationEnabled: true,
                })
                .then(() => {
                  resolve();
                })
                .catch(() => {
                  reject();
                });
            })
            .catch(() => {
              reject();
            });
        } else {
          reject();
        }
      });
    },
    /**@description refresh translations for form rules */
    refreshFormRules() {
      this.pickerOptions.shortcuts[0].text = this.$t('today');
      this.pickerOptions.shortcuts[1].text = this.$t('yesterday');
      this.pickerOptions.shortcuts[2].text = this.$t('a_week_ago');
      this.ruleSettingsFormRules.name[0].message = this.$t('name_blank');
      this.ruleSettingsFormRules.name[1].message = this.$t('length_validation');
      this.ruleSettingsFormRules.value[0].message = this.$t('value_blank');
      this.ruleSettingsFormRules.value[1].message = this.$t('length_validation');
      this.ruleSettingsFormRules.description[0].message = this.$t('description_blank');
      this.ruleSettingsFormRules.description[1].message = this.$t('length_validation');
      this.rulesFormRules.documentRuleGuid[0].message = this.$t('document_rule_guid_blank');
      this.rulesFormRules.documentRuleGuid[1].message = this.$t('length_validation');
      this.rulesFormRules.name[0].message = this.$t('name_blank');
      this.rulesFormRules.name[1].message = this.$t('length_validation');
      this.rulesFormRules.description[0].message = this.$t('description_blank');
      this.rulesFormRules.description[1].message = this.$t('length_validation');
      this.rulesFormRules.updated[0].message = this.$t('updated_blank');
      this.rulesFormRules.updatedBy[0].message = this.$t('updated_by_blank');
    },
    /**@description refresh translations for filter options */
    refreshFilterOptions() {
      this.schemaStepSettingsFilterOption[0].label = this.$t('name');
      this.schemaStepSettingsFilterOption[1].label = this.$t('value');
      this.schemaStepSettingsFilterOption[2].label = this.$t('description');

      this.ruleSettingsFilterOption[0].label = this.$t('name');
      this.ruleSettingsFilterOption[1].label = this.$t('value');
      this.ruleSettingsFilterOption[2].label = this.$t('description');

      this.rulesFilterOption[0].label = this.$t('rule_order');
      this.rulesFilterOption[1].label = this.$t('field_query_rule');
      this.rulesFilterOption[2].label = this.$t('name');
      this.rulesFilterOption[3].label = this.$t('description');
    },
    /**@description refresh translations for grid cols */
    refreshGridCols() {
      this.schemaStepSettingsCols[0].label = this.$t('name');
      this.schemaStepSettingsCols[1].label = this.$t('value');
      this.schemaStepSettingsCols[2].label = this.$t('description');
      this.schemaStepSettingsCols[3].label = this.$t('updated');

      this.ruleSettingsCols[0].label = this.$t('name');
      this.ruleSettingsCols[1].label = this.$t('value');
      this.ruleSettingsCols[2].label = this.$t('description');
      this.ruleSettingsCols[3].label = this.$t('updated');

      this.ruleCols[0].label = this.$t('order');
      this.ruleCols[1].label = this.$t('is_active');
      this.ruleCols[2].label = this.$t('name');
      this.ruleCols[3].label = this.$t('description');
      this.ruleCols[4].label = this.$t('field_query_rule');
      this.ruleCols[5].label = this.$t('process_schema');
    },
    /**@description refresh translations */
    refreshTranslations() {
      this.refreshFormRules();
      this.refreshFilterOptions();
      this.refreshGridCols();
    },
    /**@description handle selection change function for toggling markForDelete */
    handleSelectionChangeRules(row) {
      let viewportdata = JSON.parse(JSON.stringify(this.$refs.rulesTable.curTableData));
      if (viewportdata && viewportdata.length > 0) {
        let filtered = [];
        for (const item of viewportdata) {
          if (this.documentRules.filter(x => x.documentRuleId == item.documentRuleId).length > 0) {
            filtered.push(
              this.documentRules.filter(x => x.documentRuleId == item.documentRuleId)[0],
            );
          }
        }
        if (filtered && filtered.length > 0) {
          filtered = filtered.map(x => {
            x.markForDelete = false;
            return x;
          });
          for (const item of row) {
            if (filtered.filter(x => x.documentRuleId == item.documentRuleId).length > 0) {
              filtered.filter(x => x.documentRuleId == item.documentRuleId)[0].markForDelete = true;
            }
          }
        }
      }
    },
    /**@description reset current document rule */
    resetCurrentRule() {
      this.selectedRule = {};
      if (this.$refs.rulesTable) {
        this.$refs.rulesTable.$children[1].setCurrentRow(null);
      }
    },
    /**@description feset form field errors */
    resetFormFieldsRules() {
      this.$children[2].$children[2].$children[0].$children[0].clearValidate();
    },

    /**@description load process schema for document rule data with submitargs
     * @argument submitArgs:{
     * PaginationArgs:{
     * Type, Page, PageSize, BaseFilterProps:{ Props:[{PropName,PropValue,IsNestedProp:true|false}],
     * IsMultipleValue:true|false
     * }, FilterProps:{ Props:[{PropName,PropValue,IsNestedProp:true|false}],
     * IsMultipleValue:true|false
     * }, NavigationProperty:{ Props:[{PropName,PropValue,IsNestedProp:true|false}],
     * IsMultipleValue:true|false
     * }, OrderByProp:{ PropName, Order:'asc'|'desc'
     * }, IsNavigationEnabled:true|false
     * } |
     * GetSingleArgs:{ FilterProps:{ Props:[{PropName, PropValue, IsNestedProp:true|false}],
     * IsMultipleValue:true|false }, IsNavigationEnabled:true|false
     * }
     * }
     */
    loadRulesProcessSchemaList(...args) {
      let submitargs = {
        OrderByProp: {
          Propname: 'Name',
        },
      };
      let query = '';
      let target = '';
      if (args && args.length > 0) {
        query = args[0] || '';
        target = args[1] || '';
      }
      if (target != 'initload') {
        if (query && query != '') {
          submitargs = Object.assign(submitargs, {
            filterProps: {
              Props: [
                {
                  PropName: 'Name',
                  PropValue: query && query != '' ? query.toString().toLowerCase() : '',
                },
              ],
            },
          });
        }
      }
      const self = this;
      return new Promise((resolve, reject) => {
        self.loadingRulesProcessSchema = true;
        self.submit(getallrulesprocessschema, submitargs).then(resp => {
          if (resp && resp.msg === 'success') {
            self.loadingRulesProcessSchema = false;
            self.rulesProcessSchemaList = resp.data.result.map(x => {
              return {
                value: x.processSchemaId || 0,
                label: x.name || '',
              };
            });
            resolve();
          } else {
            self.loadingRulesProcessSchema = false;
            reject();
          }
        });
      });
    },
    /**@description process schema changed for document fule */
    rulesProcessSchemaChanged: _.debounce(function(_) {
      debugger;
      // check children for ruleProcessSchemaControl
      if (
        this.$children[2].$children[2].$children[0].$children[0].$children[8].$children[0].selected
      ) {
        this.selectedRule.processSchema =
          this.$children[2].$children[2].$children[0].$children[0].$children[8].$children[0]
            .selected.currentLabel || '';
      }
    }, 100),
    /**@description on command handler for document rule */
    onCommandRules(command) {
      const self = this;
      return new Promise((resolve, reject) => {
        switch (command) {
          case 'clearSelection':
            self.clearSelectionRules();
            resolve();
            break;
          case 'new':
            try {
              self.loadingDialogDocumentRule = true;
              self.rulesModalMode = 'create';
              self.resetCurrentRule();
              self
                .loadRulesProcessSchemaList(null, 'initload')
                .then(() => {
                  self.showRuleDialog = true;
                  self.loadingDialogDocumentRule = false;
                  setTimeout(_ => {
                    self.resetFormFieldsRules();
                    resolve();
                  }, 100);
                })
                .catch(() => {
                  reject();
                });
            } catch (_) {
              self.$message(self.$t('error_new'));
              reject();
            }
            break;
          case 'edit':
            if (Object.keys(self.selectedRule).length > 0) {
              try {
                self.loadingDialogDocumentRule = true;
                self.rulesModalMode = 'update';
                self
                  .loadRulesProcessSchemaList(null, 'initload')
                  .then(() => {
                    self.showRuleDialog = true;
                    self.loadingDialogDocumentRule = false;
                    setTimeout(_ => {
                      self.resetFormFieldsRules();
                      resolve();
                    }, 100);
                  })
                  .catch(() => {
                    reject();
                  });
              } catch (_) {
                self.$message(self.$t('error_editing'));
                reject();
              }
            } else {
              self.$message(self.$t('select_for_edit'));
              reject();
            }
            break;
          case 'delete':
            const dExisting = self.documentRules.filter(x => x.markForDelete);
            if (dExisting.length > 0) {
              self
                .deleteList(
                  JSON.parse(
                    JSON.stringify(
                      dExisting.map(x => {
                        documentRuleId: x.documentRuleId;
                      }),
                    ),
                  ),
                  rulesApi,
                )
                .then(resp => {
                  resolve(resp);
                  if (resp.data && resp.status == 200) {
                    self.$message(self.$t('delete_success'));
                    self
                      .resetAfterSaveRules()
                      .then(() => {
                        self.documentRules = JSON.parse(JSON.stringify(self.documentRules));
                        resolve();
                      })
                      .catch(err => {
                        reject(err);
                      });
                  } else {
                    self.$message(self.$t('delete_error'));
                    reject(resp.status);
                  }
                });
            } else {
              self.$message(self.$t('nothing_to_delete'));
              reject('nothing_to_delete');
            }
            break;
          case 'copy_to_new':
            resolve();
            break;
          case 'refresh':
            self.resetAfterSaveRules().then(resp => {
              resolve(resp);
            });
            break;
        }
      });
    },
    /**@description reset document rules to empty with dependents */
    resetRules(call_target) {
      this.rulesModalMode = '';
      this.rulesProcessSchemaList = [];
      this.showRuleDialog = false;
      if (call_target != 'on_close') {
        this.toggleRuleSettings = false;
        this.documentRules = [];
        this.rulesFilterValue = '';
        this.rulesFilter[0].vals = '';
      }
    },
    /**@description protocol function resetAfterSave for document rule */
    resetAfterSaveRules() {
      const self = this;
      return new Promise((resolve, reject) => {
        self.resetCurrentRule();
        self.resetCurrentRuleSettings();
        self.resetRules();
        self.resetRuleSettings();
        if (self.navigationProperty || '' != '') {
          self
            .loadRulesFromDocument({
              pageSize: self.defaultPageSizeGrid,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'DocumentIdentity',
                    PropValue: self.navigationProperty || '',
                  },
                ],
              },
              OrderByProp: {
                PropName: 'DocumentRuleId',
              },
            })
            .then(resp => {
              resolve(resp);
            })
            .catch(() => {
              reject();
            });
        } else resolve();
      });
    },
    /**@description clear selecction and reset markForDelete for document rules */
    clearSelectionRules() {
      if (this.$refs.rulesTable) {
        this.$refs.rulesTable.$children[1].clearSelection();
      }
      if (this.documentRules && this.documentRules.length > 0) {
        this.documentRules = this.documentRules.map(x => {
          x.markForDelete = false;
          return x;
        });
      }
    },
    /**@description save document rules */
    saveRules() {
      const self = this;
      return new Promise((resolve, reject) => {
        switch (self.rulesModalMode) {
          case 'create':
            self
              .saveNewRule(self.transformToOutputRules(self.selectedRule))
              .then(resp => {
                if (resp.data && resp.status == 200) {
                  resolve('success');
                } else {
                  self.$message(self.$t('save_error'));
                  reject();
                }
              })
              .catch(_ => {
                self.$message(self.$t('save_error'));
                reject();
              });
            break;
          case 'update':
            self
              .saveDirtyRule(self.transformToOutputRules(self.selectedRule))
              .then(resp => {
                if (resp.data && resp.status == 200) {
                  resolve('success');
                } else {
                  self.$message(self.$t('save_error'));
                  reject();
                }
              })
              .catch(_ => {
                self.$message(self.$t('save_error'));
                reject();
              });
            break;
        }
      });
    },
    /**@description save new document rule */
    saveNewRule(data) {
      return this.create(data, rulesApi);
    },
    /**@description save dirty document rule */
    saveDirtyRule(data) {
      return this.updateSingle(this.selectedRule.documentRuleId, data, rulesApi);
    },
    /**@description on before close document rules dialog */
    onBeforeCloseRulesDialog(done) {
      const self = this;
      return new Promise((resolve, reject) => {
        self
          .$confirm(self.$t('close_dialog_confirm'))
          .then(_ => {
            done();
            self.restoreSelectedRuleToOldState();
            self.resetRules('on_close');
            resolve();
          })
          .catch(err => reject(err));
      });
    },
    /**@description on close document rule dialog */
    onCloseRulesDialog() {
      this.restoreSelectedRuleToOldState();
      this.resetRules('on_close');
    },
    /**@description internal function for restore selected document rule to old state */
    restoreSelectedRuleToOldState() {
      switch (this.rulesModalMode) {
        case 'create':
          this.resetCurrentRule();
          break;
        case 'update':
          let edited = {};
          if (
            this.documentRules.filter(x => x.documentRuleId === this.selectedRule.documentRuleId)
              .length > 0
          ) {
            edited = this.documentRules.filter(
              x => x.documentRuleId === this.selectedRule.documentRuleId,
            )[0];
          }
          this.selectedRule = Object.assign({}, edited);
          break;
      }
    },
    /**@description on save document rules dialog */
    onSaveRulesDialog() {
      const self = this;
      return new Promise((resolve, reject) => {
        self.$children[2].$children[2].$children[0].$children[0].validate(valid => {
          if (valid) {
            self
              .saveRules()
              .then(_ => {
                self.resetAfterSaveRules();
                resolve('valid');
              })
              .catch(_ => {
                resolve('invalid');
              });
          } else {
            resolve('invalid');
          }
        });
      });
    },
    /**@description on row click handler for document rule */
    onRulesRowClicked(row) {
      this.selectedRule = Object.assign({}, row);
      this.loadRuleDependents();
    },
    /**@description transform function for input document rule */
    transformToInputRules(data = []) {
      return [
        ...data.map(x => {
          return {
            documentRuleId: x.documentRuleId || 0,
            documentRuleGuid: x.documentRuleGuid || '',
            documentId: x.documentId || 0,
            processSchemaId: x.processSchemaId || 0,
            processSchema: x.processSchema ? x.processSchema.name || '' : '',
            name: x.name || '',
            description: x.description || '',
            ruleOrder: x.ruleOrder || 0,
            fieldQueryRule: x.fieldQueryRule || '',
            isActive: x.isActive || false,
            created: x.created ? new Date(x.created).toLocaleDateString() : new Date(),
            createdBy: x.createdBy || '',
            updated: x.updated ? new Date(x.updated).toLocaleDateString() : new Date(),
            updatedBy: x.updatedBy || '',
            markForDelete: false,
          };
        }),
      ];
    },
    /**@description transform function for output document rule */
    transformToOutputRules(x = {}) {
      return {
        documentRuleId: x.documentRuleId || 0,
        documentRuleGuid: x.documentRuleGuid || '',
        documentId: x.documentId || 0,
        processSchemaId: x.processSchemaId || 0,
        name: x.name || '',
        description: x.description || '',
        ruleOrder: x.ruleOrder || 0,
        fieldQueryRule: x.fieldQueryRule || '',
        isActive: x.isActive,
        created: new Date(x.created).toLocaleDateString(),
        createdBy: x.createdBy,
        updated: new Date(x.updated).toLocaleDateString(),
        updatedBy: x.updatedBy,
      };
    },

    /**@description load document rules data with submitargs
     * @argument submitArgs:{
     * PaginationArgs:{
     * Type, Page, PageSize, BaseFilterProps:{ Props:[{PropName,PropValue,IsNestedProp:true|false}],
     * IsMultipleValue:true|false
     * }, FilterProps:{ Props:[{PropName,PropValue,IsNestedProp:true|false}],
     * IsMultipleValue:true|false
     * }, NavigationProperty:{ Props:[{PropName,PropValue,IsNestedProp:true|false}],
     * IsMultipleValue:true|false
     * }, OrderByProp:{ PropName, Order:'asc'|'desc'
     * }, IsNavigationEnabled:true|false
     * } |
     * GetSingleArgs:{ FilterProps:{ Props:[{PropName, PropValue, IsNestedProp:true|false}],
     * IsMultipleValue:true|false }, IsNavigationEnabled:true|false
     * }
     * }
     */
    loadRulesFromDocument(submitArgs = {}) {
      const self = this;
      return new Promise((resolve, reject) => {
        self.loadingRules = true;
        self
          .submit(getallrulesapi, submitArgs)
          .then(resp => {
            try {
              self.documentRules = [...self.transformToInputRules(resp.data.result)];
              self.rulesTotal = resp.data.total;
              self.loadingRules = false;
              self.clearSelectionRules.call(self);
              self.resetCurrentRule();
              resolve(resp);
            } catch (error) {
              resolve(error);
            }
          })
          .catch(_ => {
            self.$message(self.$t('error_loading_data'));
            self.loadingRules = false;
            reject();
          });
      });
    },
    /**@description query change handler for document rule */
    rulesQueryChange: _.debounce(function(args) {
      if (args) {
        this.resetCurrentRule();
        if (this.rulesFilterValue != '') {
          if (args.filters[0].vals && args.filters[0].vals.length > 0) {
            let filterProps = [
              {
                PropName: this.rulesFilterValue,
                PropValue: args.filters[0].vals[0].toString(),
              },
            ];
            this.loadRulesFromDocument({
              page: args.page,
              pageSize: args.pageSize,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'DocumentIdentity',
                    PropValue: this.navigationProperty || '',
                  },
                ],
              },
              FilterProps: {
                Props: filterProps,
              },
              OrderByProp: {
                PropName: 'DocumentRuleId',
              },
            }).then(_ => {
              this.resetAfterSaveRuleSettings().then(() => {
                this.resetAfterSaveSchemaStepSettings();
              });
            });
          } else {
            this.rulesFilter[0].vals = '';
            this.loadRulesFromDocument({
              page: args.page,
              pageSize: args.pageSize,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'DocumentIdentity',
                    PropValue: this.navigationProperty || '',
                  },
                ],
              },
              OrderByProp: {
                PropName: 'DocumentRuleId',
              },
            }).then(_ => {
              this.resetAfterSaveRuleSettings().then(() => {
                this.resetAfterSaveSchemaStepSettings();
              });
            });
          }
        } else {
          //this.$message(this.$t('select_filter_col'));
          this.rulesFilter[0].vals = '';
        }
      }
    }, 1000),
    /* end rules grid transaction */

    /* begin document rule settings */
    /**@description handles selection change for document rule settings */
    handleSelectionChangeRuleSettings(row) {
      let viewportdata = JSON.parse(JSON.stringify(this.$refs.ruleSettingsTable.curTableData));
      if (viewportdata && viewportdata.length > 0) {
        let filtered = [];
        for (const item of viewportdata) {
          if (
            this.ruleSettings.filter(x => x.documentRuleSettingId == item.documentRuleSettingId)
              .length > 0
          ) {
            filtered.push(
              this.ruleSettings.filter(
                x => x.documentRuleSettingId == item.documentRuleSettingId,
              )[0],
            );
          }
        }
        if (filtered && filtered.length > 0) {
          filtered = filtered.map(x => {
            x.markForDelete = false;
            return x;
          });
          for (const item of row) {
            if (
              filtered.filter(x => x.documentRuleSettingId == item.documentRuleSettingId).length > 0
            ) {
              filtered.filter(
                x => x.documentRuleSettingId == item.documentRuleSettingId,
              )[0].markForDelete = true;
            }
          }
        }
      }
    },
    /**@description reset current document rule settings */
    resetCurrentRuleSettings() {
      this.selectedRuleSetting = {};
      if (this.$refs.ruleSettingsTable) {
        this.$refs.ruleSettingsTable.$children[1].setCurrentRow(null);
      }
    },
    /**@description reset form fields for document rule settings */
    resetFormFieldsRuleSettings() {
      this.$children[3].$children[2].$children[0].$children[0].clearValidate();
    },
    /**@description on command handler for document rule setttings */
    onCommandRuleSettings(command) {
      const self = this;
      return new Promise((resolve, reject) => {
        switch (command) {
          case 'new':
            self.loadingDialogDocumentRuleSettings = true;
            self.ruleSettingsModalMode = 'create';
            self.resetCurrentRuleSettings();
            self.showRuleSettingsDialog = true;
            self.loadingDialogDocumentRuleSettings = false;
            setTimeout(_ => {
              self.resetFormFieldsRuleSettings();
              resolve();
            }, 100);
            break;
          case 'edit':
            if (Object.keys(self.selectedRuleSetting).length > 0) {
              self.loadingDialogDocumentRuleSettings = true;
              self.ruleSettingsModalMode = 'update';
              self.showRuleSettingsDialog = true;
              self.loadingDialogDocumentRuleSettings = false;
              setTimeout(_ => {
                self.resetFormFieldsRuleSettings();
                resolve();
              }, 100);
            } else {
              self.$message(self.$t('select_for_edit'));
              reject();
            }
            break;
          case 'delete':
            const dExisting = self.ruleSettings.filter(x => x.markForDelete);

            if (dExisting.length > 0) {
              self
                .deleteList(
                  JSON.parse(
                    JSON.stringify(
                      dExisting.map(x => {
                        documentRuleSettingId: x.documentRuleSettingId;
                      }),
                    ),
                  ),
                  ruleSettingsApi,
                )
                .then(resp => {
                  if (resp.data && resp.status == 200) {
                    self.$message(self.$t('delete_success'));
                    self.resetAfterSaveRuleSettings().then(() => {
                      self.ruleSettings = JSON.parse(JSON.stringify(self.ruleSettings));
                      resolve();
                    });
                  } else {
                    self.$message(self.$t('delete_error'));
                    reject();
                  }
                })
                .catch(_ => {
                  self.$message(self.$t('delete_error'));
                  reject();
                });
            } else {
              self.$message(self.$t('nothing_to_delete'));
              reject();
            }
            break;
          case 'clearSelection':
            this.clearSelectionRuleSettings();
            resolve();
            break;
          case 'refresh':
            this.resetAfterSaveRuleSettings().then(() => {
              resolve();
            });
            break;
        }
      });
    },
    /**@description reset document rule settings data to empty */
    resetRuleSettings(call_target = '') {
      this.ruleSettingsModalMode = '';
      this.showRuleSettingsDialog = false;
      if (call_target != 'on_close') {
        this.ruleSettings = [];
        this.ruleSettingsFilterValue = '';
        this.ruleSettingsFilter[0].vals = '';
      }
    },
    /**@description protocol function resetAfterSave for document rule settings */
    resetAfterSaveRuleSettings() {
      const self = this;
      return new Promise((resolve, reject) => {
        self.resetCurrentRuleSettings();
        self.resetRuleSettings();
        if (self.selectedRule.documentRuleId || 0 != 0) {
          self
            .loadRuleSettingsFromRule({
              pageSize: self.defaultPageSizeGrid,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'DocumentRuleId',
                    PropValue: self.selectedRule.documentRuleId || 0,
                  },
                ],
              },
              OrderByProp: {
                PropName: 'DocumentRuleSettingId',
              },
            })
            .then(() => {
              resolve();
            });
        } else {
          reject();
        }
      });
    },
    /**@description clear selection and reset markForDelete for document rule settings */
    clearSelectionRuleSettings() {
      if (this.$refs.ruleSettingsTable) {
        this.$refs.ruleSettingsTable.$children[1].clearSelection();
      }
      if (this.ruleSettings && this.ruleSettings.length > 0) {
        this.ruleSettings = this.ruleSettings.map(x => {
          x.markForDelete = false;
          return x;
        });
      }
    },
    /**@description save document rule settings */
    saveRuleSettings() {
      const self = this;
      return new Promise((resolve, reject) => {
        switch (self.ruleSettingsModalMode) {
          case 'create':
            self
              .saveNewRuleSetting(self.transformToOutputRuleSettings(self.selectedRuleSetting))
              .then(resp => {
                if (resp.data && resp.status == 200) {
                  resolve();
                } else {
                  self.$message(self.$t('save_error'));
                  reject();
                }
              })
              .catch(_ => {
                self.$message(self.$t('save_error'));
                reject();
              });
            break;
          case 'update':
            self
              .saveDirtyRuleSettings(self.transformToOutputRuleSettings(self.selectedRuleSetting))
              .then(resp => {
                if (resp.data && resp.status == 200) {
                  resolve();
                } else {
                  self.$message(self.$t('save_error'));
                  reject();
                }
              })
              .catch(_ => {
                self.$message(self.$t('save_error'));
                reject();
              });
            break;
        }
      });
    },
    /**@description save new document rule settings */
    saveNewRuleSetting(data) {
      return this.create(data, ruleSettingsApi);
    },
    /**@description save dirty document rule settings */
    saveDirtyRuleSettings(data) {
      return this.updateSingle(
        this.selectedRuleSetting.documentRuleSettingId,
        data,
        ruleSettingsApi,
      );
    },
    /**@description on before close for document rule settings dialog */
    onBeforeCloseRuleSettingsDialog(done) {
      const self = this;
      self
        .$confirm(self.$t('close_dialog_confirm'))
        .then(_ => {
          done();
          self.restoreSelectedRuleSettingToOldState();
          self.resetRuleSettings('on_close');
        })
        .catch(_ => {});
    },
    /**@description on close for document rule settings dialog */
    onCloseRuleSettingsDialog() {
      this.restoreSelectedRuleSettingToOldState();
      this.resetRuleSettings('on_close');
    },
    /**@description restore selected document rule settings to old state */
    restoreSelectedRuleSettingToOldState() {
      switch (this.ruleSettingsModalMode) {
        case 'create':
          this.resetCurrentRuleSettings();
          break;
        case 'update':
          let edited = {};
          if (
            this.ruleSettings.filter(
              x => x.documentRuleSettingId === this.selectedRuleSetting.documentRuleSettingId,
            ).length > 0
          ) {
            edited = this.ruleSettings.filter(
              x => x.documentRuleSettingId === this.selectedRuleSetting.documentRuleSettingId,
            )[0];
          }
          this.selectedRuleSetting = Object.assign({}, edited);
          break;
      }
    },
    /**@description on save document rule settings dialog */
    onSaveRuleSettingsDialog() {
      const self = this;
      return new Promise((resolve, reject) => {
        self.$children[3].$children[2].$children[0].$children[0].validate(valid => {
          if (valid) {
            self.saveRuleSettings().then(_ => {
              self
                .resetAfterSaveRuleSettings()
                .then(() => {
                  resolve('valid');
                })
                .catch(() => {
                  resolve('invalid');
                });
            });
          } else resolve('invalid');
        });
      });
    },
    /**@description on row click for document rule settings */
    onRuleSettingsRowClicked(row) {
      this.selectedRuleSetting = Object.assign({}, row);
    },
    /**@description transform function for input document rule settings */
    transformToInputRuleSettings(data = []) {
      return [
        ...data.map(x => {
          return {
            documentRuleSettingId: x.documentRuleSettingId || 0,
            documentRuleId: x.documentRuleId || '',
            name: x.name || '',
            description: x.description || '',
            value: x.value || 0,
            created: new Date(x.created).toLocaleDateString(),
            createdBy: x.createdBy,
            updated: new Date(x.updated).toLocaleDateString(),
            updatedBy: x.updatedBy,
            markForDelete: false,
          };
        }),
      ];
    },
    /**@description transform function for output document rule settings */
    transformToOutputRuleSettings(x = {}) {
      return {
        documentRuleSettingId: x.documentRuleSettingId || 0,
        documentRuleId: x.documentRuleId || '',
        name: x.name || '',
        description: x.description || '',
        value: x.value || 0,
        created: new Date(x.created).toLocaleDateString(),
        createdBy: x.createdBy,
        updated: new Date(x.updated).toLocaleDateString(),
        updatedBy: x.updatedBy,
      };
    },

    /**@description load document rule settings from rule data with submitargs
     * @argument submitArgs:{
     * PaginationArgs:{
     * Type, Page, PageSize, BaseFilterProps:{ Props:[{PropName,PropValue,IsNestedProp:true|false}],
     * IsMultipleValue:true|false
     * }, FilterProps:{ Props:[{PropName,PropValue,IsNestedProp:true|false}],
     * IsMultipleValue:true|false
     * }, NavigationProperty:{ Props:[{PropName,PropValue,IsNestedProp:true|false}],
     * IsMultipleValue:true|false
     * }, OrderByProp:{ PropName, Order:'asc'|'desc'
     * }, IsNavigationEnabled:true|false
     * } |
     * GetSingleArgs:{ FilterProps:{ Props:[{PropName, PropValue, IsNestedProp:true|false}],
     * IsMultipleValue:true|false }, IsNavigationEnabled:true|false
     * }
     * }
     */
    loadRuleSettingsFromRule(submitArgs = {}) {
      const self = this;
      return new Promise((resolve, reject) => {
        self.loadingRuleSettings = true;
        self
          .submit(getallrulesettingsapi, submitArgs)
          .then(resp => {
            self.ruleSettings = [...self.transformToInputRuleSettings(resp.data.result)];
            self.ruleSettingsTotal = resp.data.total;
            self.loadingRuleSettings = false;
            resolve();
          })
          .catch(() => {
            self.$message(self.$t('error_loading_data'));
            self.loadingRuleSettings = false;
            reject();
          });
      });
    },
    /**@description query change handler for document rule settings */
    ruleSettingsQueryChange: _.debounce(function(args) {
      if (args) {
        this.resetCurrentRuleSettings();
        if (this.ruleSettingsFilterValue != '') {
          if (args.filters[0].vals && args.filters[0].vals.length > 0) {
            let filterProps = [
              {
                PropName: this.ruleSettingsFilterValue,
                PropValue: args.filters[0].vals[0].toString(),
              },
            ];
            this.loadRuleSettingsFromRule({
              page: args.page,
              pageSize: args.pageSize,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'DocumentRuleId',
                    PropValue: this.selectedRule.documentRuleId || 0,
                  },
                ],
              },
              FilterProps: {
                Props: filterProps,
              },
              OrderByProp: {
                PropName: 'DocumentRuleSettingId',
              },
            });
          } else {
            this.ruleSettingsFilter[0].vals = '';
            this.loadRuleSettingsFromRule({
              page: args.page,
              pageSize: args.pageSize,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'DocumentRuleId',
                    PropValue: this.selectedRule.documentRuleId || 0,
                  },
                ],
              },
              OrderByProp: {
                PropName: 'DocumentRuleSettingId',
              },
            });
          }
        } else {
          //this.$message(this.$t('select_filter_col'));
          this.ruleSettingsFilter[0].vals = '';
        }
      }
    }, 1000),
    /* end document rule settings */

    /* begin schema step settings */
    /**@description reset schema step settings to empty */
    resetSchemaStepSettings() {
      this.schemaStepSettings = [];
      this.schemaStepSettingsFilterValue = '';
      this.schemaStepSettingsFilter[0].vals = '';
    },
    /**@description protocol function resetAfterSave for schema step settings */
    resetAfterSaveSchemaStepSettings() {
      const self = this;
      return new Promise((resolve, reject) => {
        self.resetSchemaStepSettings();
        if (self.selectedRule.documentRuleId || 0 != 0) {
          self
            .loadSchemaStepSettingsFromRule({
              pageSize: self.defaultPageSizeGrid,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'ProcessSchemaStep.ProcessSchema.ProcessSchemaId',
                    PropValue: self.selectedRule.processSchemaId || 0,
                  },
                ],
              },
              OrderByProp: {
                PropName: 'ProcessSchemaStepSettingId',
              },
              IsNavigationEnabled: true,
            })
            .then(() => {
              resolve();
            });
        } else {
          reject();
        }
      });
    },
    /**@description load schema step settings from rule data with submitargs
     * @argument submitArgs:{
     * PaginationArgs:{
     * Type, Page, PageSize, BaseFilterProps:{ Props:[{PropName,PropValue,IsNestedProp:true|false}],
     * IsMultipleValue:true|false
     * }, FilterProps:{ Props:[{PropName,PropValue,IsNestedProp:true|false}],
     * IsMultipleValue:true|false
     * }, NavigationProperty:{ Props:[{PropName,PropValue,IsNestedProp:true|false}],
     * IsMultipleValue:true|false
     * }, OrderByProp:{ PropName, Order:'asc'|'desc'
     * }, IsNavigationEnabled:true|false
     * } |
     * GetSingleArgs:{ FilterProps:{ Props:[{PropName, PropValue, IsNestedProp:true|false}],
     * IsMultipleValue:true|false }, IsNavigationEnabled:true|false
     * }
     * }
     */
    loadSchemaStepSettingsFromRule(submitArgs = {}) {
      const self = this;
      return new Promise((resolve, reject) => {
        self.schemaStepSettingsFilterValue = '';
        self.schemaStepSettingsFilter[0].vals = '';
        self.loadingSchemStepSettings = true;
        self
          .submit(getallschemastepsettingsfromrule, submitArgs)
          .then(resp => {
            self.schemaStepSettings = [
              ...self.transformToInputSchemaStepSettings(resp.data.result),
            ];
            self.schemaStepSettingsTotal = resp.data.total;
            self.loadingSchemStepSettings = false;
            self.clearSelectionRuleSettings.call(self);
            self.resetCurrentRuleSettings();
            resolve();
          })
          .catch(() => {
            self.$message(self.$t('error_loading_data'));
            self.loadingSchemStepSettings = false;
            reject();
          });
      });
    },
    /**@description query change handler for schema step settings */
    schemaStepSettingsQueryChange: _.debounce(function(args) {
      if (args) {
        if (this.schemaStepSettingsFilterValue != '') {
          if (args.filters[0].vals && args.filters[0].vals.length > 0) {
            let filterProps = [
              {
                PropName: this.schemaStepSettingsFilterValue,
                PropValue: args.filters[0].vals[0].toString(),
              },
            ];
            this.loadSchemaStepSettingsFromRule({
              page: args.page,
              pageSize: args.pageSize,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'ProcessSchemaStep.ProcessSchema.ProcessSchemaId',
                    PropValue: this.selectedRule.processSchemaId || 0,
                  },
                ],
              },
              FilterProps: {
                Props: filterProps,
              },
              OrderByProp: {
                PropName: 'ProcessSchemaStepSettingId',
              },
              IsNavigationEnabled: true,
            });
          } else {
            this.schemaStepSettingsFilter[0].vals = '';
            this.loadSchemaStepSettingsFromRule({
              page: args.page,
              pageSize: args.pageSize,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'ProcessSchemaStep.ProcessSchema.ProcessSchemaId',
                    PropValue: this.selectedRule.processSchemaId || 0,
                  },
                ],
              },
              OrderByProp: {
                PropName: 'ProcessSchemaStepSettingId',
              },
              IsNavigationEnabled: true,
            });
          }
        } else {
          //this.$message(this.$t('select_filter_col'));
          this.schemaStepSettingsFilter[0].vals = '';
        }
      }
    }, 1000),
    /**@description transform function for schema step settings */
    transformToInputSchemaStepSettings(data = []) {
      return [
        ...data.map(x => {
          return {
            processSchemaStepSettingId: x.processSchemaStepSettingId || 0,
            processSchemaStepId: x.processSchemaStepId || '',
            name: x.name || '',
            description: x.description || '',
            value: x.value || '',
            created: new Date(x.created).toLocaleDateString(),
            createdBy: x.createdBy,
            updated: new Date(x.updated).toLocaleDateString(),
            updatedBy: x.updatedBy,
          };
        }),
      ];
    },
    /* end schema step settings */
  },
  /**@description created lifecycle hook for document rule component */
  created() {
    const self = this;
    eventBus.$on('language', function() {
      try {
        self.refreshTranslations();
      } catch (e) {}
    });
  },
};
</script>
