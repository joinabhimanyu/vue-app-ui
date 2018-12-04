<template>
  <div>
    <el-row>
        <el-col :span="24">
            <div class="grid-content">
              <!-- ref="documentFieldsTable" -->
                <data-tables-server ref="documentFieldsTable"
                                    :data="documentFields"
                                    :total="documentFieldsTotal"
                                    :loading="loadingDocumentFields"
                                    :table-props="documentFieldsTableProps"
                                    :show-action-bar="false"
                                    :custom-filters="documentFieldsFilter"
                                    @query-change="documentFieldsQueryChange"
                                    @row-click="onDocumentFieldsRowClicked"
                                    @select="handleSelectionChangeDocumentFields"
                                    @select-all="handleSelectionChangeDocumentFields">
                    <el-row slot="custom-tool-bar" style="margin-bottom:8px">
                        <el-col :span="5">
                            <el-dropdown @command="onCommandDocumentFields">
                                <el-button type="primary"><t t="actions"></t>
                                <i class="el-icon-loading" v-if="loadingDialogDocumentField"></i>
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
                        <el-col :span="3" :offset="10">
                            <el-select v-model="documentFieldsFilterValue" placeholder="Select">
                                <el-option v-for="item in documentFieldsFilterOption" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5" :offset="1">
                            <!--@input="debounceInput"-->
                            <el-input v-model="documentFieldsFilter[0].vals"
                                        prefix-icon="el-icon-search"
                                        :placeholder="$t('search_document_fields')">
                            </el-input>
                        </el-col>
                    </el-row>
                    <!-- reserve-selection -->
                    <el-table-column type="selection"
                                        width="55">
                    </el-table-column>
                    <el-table-column :label="documentFieldCols[0].label" min-width="auto">
                        <template scope="scope">
                            {{scope.row[documentFieldCols[0].prop]}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="documentFieldCols[1].label" min-width="auto">
                        <template scope="scope">
                            {{scope.row[documentFieldCols[1].prop]}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="documentFieldCols[2].label" min-width="auto">
                        <template scope="scope">
                            {{scope.row[documentFieldCols[2].prop]}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="documentFieldCols[3].label" min-width="auto">
                        <template scope="scope">
                            <el-checkbox v-model="scope.row[documentFieldCols[3].prop]"
                                            @change="handleChange(scope.row,$event)"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column :label="documentFieldCols[4].label" min-width="auto">
                        <template scope="scope">
                            {{scope.row[documentFieldCols[4].prop]}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="documentFieldCols[5].label" min-width="auto">
                        <template scope="scope">
                            {{scope.row[documentFieldCols[5].prop]}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="documentFieldCols[6].label" min-width="auto">
                        <template scope="scope">
                            {{scope.row[documentFieldCols[6].prop]}}
                        </template>
                    </el-table-column>
                    <el-table-column label="" min-width="auto">
                        <template scope="scope">
                            <el-button type="text" class="btn-showdetails" @click="openFieldDetailsTab(scope.row)">
                                <t t="show_details"></t>
                            </el-button>
                        </template>
                    </el-table-column>
                </data-tables-server>
            </div>
        </el-col>
    </el-row>

    <!-- fields form -->
    <el-dialog
                :title="$t('document_fields')"
                width="567px"
                :visible.sync="showDocumentFieldsDialog"
                :before-close="onBeforeCloseDocumentFieldsDialog">
        <!-- document fields contents -->
        <el-row>
            <el-col :span="24">
                <div class="grid-content">
                    <!-- form with fields for name,category and description -->
                    <el-form 
                    :label-position="'right'"
                                size="mini"
                                label-width="165px"
                                :model="selectedDocumentField"
                                :rules="documentFieldFormRules"
                                status-icon>
                        <el-form-item prop="fieldId" :label="$t('field')">
                            <!-- autocomplete for archive -->
                            <el-select v-model="selectedDocumentField.fieldId"
                                        :disabled="documentFieldsModalMode=='update'"
                                        clearable
                                        filterable
                                        remote
                                        style="width:250px"
                                        reserve-keyword
                                        :placeholder="$t('select_field')"
                                        :remote-method="loadFields"
                                        :loading="loadingFields"
                                        @change="fieldChanged">
                                <el-option v-for="item in fieldList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="externalFieldname" :label="$t('external_field_name')">
                            <el-input v-model="selectedDocumentField.externalFieldname"
                                        :placeholder="$t('external_field_name')"
                                        style="width:250px"></el-input>
                        </el-form-item>
                        <el-form-item prop="fixedValue" :label="$t('fixed_value')">
                            <el-input v-model="selectedDocumentField.fixedValue"
                                        :placeholder="$t('fixed_value')"
                                        style="width:250px"></el-input>
                        </el-form-item>
                        <el-form-item prop="parameter" :label="$t('parameter')">
                            <!-- autocomplete for archive -->
                            <el-select v-model="selectedDocumentField.parameter"
                                        clearable
                                        filterable
                                        remote
                                        reserve-keyword
                                        style="width:250px"
                                        :placeholder="$t('select_parameter')"
                                        :remote-method="loadParameters"
                                        :loading="loadingParameters">
                                <el-option v-for="item in parameterList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('field_name')">
                            <span style="width:250px">{{selectedDocumentField.fieldName}}</span>
                        </el-form-item>
                        <el-form-item :label="$t('field_description')">
                            <span style="width:250px">{{selectedDocumentField.fieldDescription}}</span>
                        </el-form-item>
                        <el-form-item :label="$t('field_datatype_no')">
                            <span style="width:250px">{{selectedDocumentField.fieldDataTypeNo}}</span>
                        </el-form-item>
                        <el-form-item :label="$t('field_isactive')">
                            <el-checkbox v-model="selectedDocumentField.isActive"></el-checkbox>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCloseDocumentFieldsDialog"><t t="cancel"></t></el-button>
            <el-button type="primary" @click="onSaveDocumentFieldsDialog"><t t="save"></t></el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
import Vue from 'vue';
import UtilityMixin from '../mixins/utilityMixin';
import { eventBus } from '../main';
import _ from 'lodash';
import DocumentFieldViewModel from '../view_models/documentField_viewmodel';

const getalldocumentfields = 'getallDocumentFields';
const documentFieldsApi = 'documentField';
const getallfields = 'getallFields';
const getalldocumentfieldparameter = 'getallDocumentFieldParameters';

/**@author Abhimanyu Chkarborty
 * @description Document Fields component
 * follows standard list compnent template with new, edit and delete
 */
export default {
  name: 'documentField',
  mixins: [DocumentFieldViewModel, UtilityMixin],
  props: {
    navigationProperty: {
      type: String,
      required: true,
    },
    parentContext: {
      type: Object,
      required: true,
    },
  },
  methods: {
    /**@description open field details tab */
    /* begin document fields grid transaction */
    openFieldDetailsTab(row) {
      let fieldId = row.fieldId || 0;
      this.redirectHandler(
        'fieldDetails',
        {
          type: 'onCascadeNavigation',
          additionalParam: {
            navigationProperty: fieldId || 0,
          },
        },
        this.parentContext,
      );
    },
    /**@description refresh translations for filter options */
    refreshFilterOptions() {
      this.documentFieldsFilterOption[0].label = this.$t('field_name');
      this.documentFieldsFilterOption[1].label = this.$t('field_description');
      this.documentFieldsFilterOption[2].label = this.$t('name');
      this.documentFieldsFilterOption[3].label = this.$t('value');
      this.documentFieldsFilterOption[4].label = this.$t('parameter');
    },
    /**@description refresh translations for grid cols */
    refreshGridCols() {
      this.documentFieldCols[0].label = this.$t('field_name');
      this.documentFieldCols[1].label = this.$t('field_description');
      this.documentFieldCols[2].label = this.$t('data_type');
      this.documentFieldCols[3].label = this.$t('is_active');
      this.documentFieldCols[4].label = this.$t('parameter');
      this.documentFieldCols[5].label = this.$t('external_field_name');
      this.documentFieldCols[6].label = this.$t('fixed_value');
    },
    /**@description refresh translations */
    refreshTranslations() {
      this.refreshFilterOptions();
      this.refreshGridCols();
    },
    /**@description handles selection change to toggle markForDelete for document field */
    handleSelectionChangeDocumentFields(row) {
      let viewportdata = JSON.parse(JSON.stringify(this.$refs.documentFieldsTable.curTableData));
      if (viewportdata && viewportdata.length > 0) {
        let filtered = [];
        for (const item of viewportdata) {
          if (
            this.documentFields.filter(
              x => x.documentId == item.documentId && x.fieldId == item.fieldId,
            ).length > 0
          ) {
            filtered.push(
              this.documentFields.filter(
                x => x.documentId == item.documentId && x.fieldId == item.fieldId,
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
              filtered.filter(x => x.documentId == item.documentId && x.fieldId == item.fieldId)
                .length > 0
            ) {
              filtered.filter(
                x => x.documentId == item.documentId && x.fieldId == item.fieldId,
              )[0].markForDelete = true;
            }
          }
        }
      }
    },
    /**@description reset current document fieldds */
    resetCurrentDocumentFields() {
      this.selectedDocumentField = {};
      if (this.$refs.documentFieldsTable) {
        this.$refs.documentFieldsTable.$children[1].setCurrentRow(null);
      }
    },
    /**@description reset form field erros for document fields */
    resetFormFieldsDocumentFields() {
      this.$children[1].$children[2].$children[0].$children[0].clearValidate();
    },
    /**@description load fields for document field data with submitargs
     * @argument submitArgs:{
     * PaginationArgs:{
     * Type, Page, PageSize, BaseFilterProps:{ Props:[{PropName,PropValue,IsNestedProp:true|false}],
     *  IsMultipleValue:true|false
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
    loadFields(...args) {
      let submitargs = {
        OrderByProp: {
          PropName: 'FieldId',
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
          submitArgs.filterProps = {
            Props: [
              {
                PropName: 'Name',
                PropValue: query && query != '' ? query.toString().toLowerCase() : '',
              },
            ],
          };
        }
      }
      this.loadingFields = true;
      return new Promise((resolve, reject) => {
        this.submit(getallfields, submitargs)
          .then(resp => {
            if (resp && resp.msg === 'success') {
              this.loadingFields = false;
              this.fieldList = resp.data.result.map(x => {
                return {
                  value: x.fieldId || 0,
                  label: x.name || '',
                  description: x.description || '',
                  fieldDataTypeNo: x.fieldDataTypeNo || '',
                  isActive: x.isActive || false,
                };
              });
              resolve();
            } else {
              this.loadingFields = false;
              reject();
            }
          })
          .catch(err => {
            self.$message(err);
            reject();
          });
      });
    },
    /**@description load parameters for document field data with submitargs
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
    loadParameters(...args) {
      const query = args && args.length > 0 ? args[0] || '' : '';
      const target = args && args.length > 0 ? args[1] || '' : '';
      const self = this;
      const data = [
        { label: 'CrmAccountIdentity', value: 'CrmAccountIdentity' },
        { label: 'CrmFormFieldValue', value: 'CrmFormFieldValue' },
        { label: 'FixedValue', value: 'FixedValue' },
      ];
      if (target != 'initload') {
        if (query && query != '') {
          // load matched set
          return new Promise((resolve, reject) => {
            self.loadingParameters = true;
            setTimeout(_ => {
              self.loadingParameters = false;
              self.parameterList = data
                .filter(x =>
                  x.label
                    .toString()
                    .toLowerCase()
                    .indexOf(query.toString().toLowerCase() != -1),
                )
                .map(x => {
                  return {
                    value: x.label || '',
                    label: x.value || '',
                  };
                });
              resolve();
            }, 100);
          });
        } else {
          // load entire set
          return new Promise((resolve, reject) => {
            self.loadingParameters = true;
            setTimeout(_ => {
              self.loadingParameters = false;
              self.parameterList = data.map(x => {
                return {
                  value: x.label || '',
                  label: x.value || '',
                };
              });
              resolve();
            }, 100);
          });
        }
      } else {
        // load entire set
        return new Promise((resolve, reject) => {
          self.loadingParameters = true;
          setTimeout(_ => {
            self.loadingParameters = false;
            self.parameterList = data.map(x => {
              return {
                value: x.label || '',
                label: x.value || '',
              };
            });
            resolve();
          }, 100);
        });
      }
    },
    /**@description field changed handler for document field */
    fieldChanged(item) {
      let filter = this.fieldList.filter(x => x.value == item);
      if (filter && filter.length > 0) {
        this.selectedDocumentField.fieldId = filter[0].value || 0;
        this.selectedDocumentField.fieldName = filter[0].label;
        this.selectedDocumentField.fieldDescription = filter[0].description;
        this.selectedDocumentField.fieldDataTypeNo = filter[0].fieldDataTypeNo;
        this.selectedDocumentField.isActive = filter[0].isActive;
      }
    },
    /**@description on command handler for document fields */
    onCommandDocumentFields(command) {
      const self = this;
      return new Promise((resolve, reject) => {
        if (command) {
          switch (command) {
            case 'new':
              this.loadingDialogDocumentField = true;
              this.documentFieldsModalMode = 'create';
              this.resetCurrentDocumentFields();
              try {
                this.loadFields(null, 'initload').then(() => {
                  this.loadParameters(null, 'initload').then(() => {
                    this.showDocumentFieldsDialog = true;
                    this.loadingDialogDocumentField = false;
                    setTimeout(_ => {
                      self.resetFormFieldsDocumentFields();
                      resolve();
                    }, 100);
                  });
                });
              } catch (_) {
                this.$message(this.$t('error_new'));
                reject();
              }
              break;
            case 'edit':
              if (Object.keys(this.selectedDocumentField).length > 0) {
                this.loadingDialogDocumentField = true;
                this.documentFieldsModalMode = 'update';
                try {
                  this.loadFields(null, 'initload').then(() => {
                    this.loadParameters(null, 'initload').then(() => {
                      this.showDocumentFieldsDialog = true;
                      this.loadingDialogDocumentField = false;
                      setTimeout(_ => {
                        self.resetFormFieldsDocumentFields();
                        resolve();
                      }, 100);
                    });
                  });
                } catch (_) {
                  this.$message(this.$t('error_new'));
                  reject();
                }
              } else {
                this.$message(this.$t('select_for_edit'));
                reject();
              }
              break;
            case 'delete':
              const dExisting = this.documentFields.filter(x => x.markForDelete);

              if (dExisting.length > 0) {
                try {
                  this.deleteList(
                    JSON.parse(
                      JSON.stringify(
                        dExisting.map(x => {
                          return {
                            documentId: x.documentId,
                            fieldId: x.fieldId,
                          };
                        }),
                      ),
                    ),
                    documentFieldsApi,
                  ).then(resp => {
                    if (resp.data && resp.status == 200) {
                      this.$message(this.$t('delete_success'));
                      this.resetAfterSaveDocumentFields().then(() => {
                        this.documentFields = JSON.parse(JSON.stringify(this.documentFields));
                        resolve();
                      });
                    } else {
                      this.$message(this.$t('delete_error'));
                      reject();
                    }
                  });
                } catch (_) {
                  this.$message(this.$t('delete_error'));
                  reject();
                }
              } else {
                this.$message(this.$t('nothing_to_delete'));
                reject();
              }
              break;
            case 'clearSelection':
              this.clearSelectionDocumentFields();
              resolve();
              break;
            case 'refresh':
              this.resetAfterSaveDocumentFields().then(() => {
                resolve();
              });
              break;
          }
        }
      });
    },
    /**@description reset document fields to empty */
    resetDocumentFields(call_target = '') {
      this.documentFieldsModalMode = '';
      this.fieldList = [];
      this.parameterList = [];
      this.showDocumentFieldsDialog = false;
      if (call_target != 'on_close') {
        this.documentFields = [];
        this.documentFieldsFilterValue = '';
        this.documentFieldsFilter[0].vals = '';
      }
    },
    /**@description protocol function resetAfterSave for document fields */
    resetAfterSaveDocumentFields() {
      this.resetCurrentDocumentFields();
      this.resetDocumentFields();
      return new Promise((resolve, reject) => {
        if (this.navigationProperty || '' != '') {
          this.loadDocumentFieldsFromDocument({
            pageSize: this.defaultPageSizeGrid,
            NavigationProperty: {
              Props: [
                {
                  PropName: 'Document.DocumentIdentity',
                  PropValue: this.navigationProperty || '',
                  IsNestedProp: true,
                },
              ],
            },
            OrderByProp: {
              Propname: 'Field.Name',
            },
            IsNavigationEnabled: true,
          }).then(() => {
            resolve();
          });
        } else resolve();
      });
    },
    /**@description clear selection and reset markForDelete for document fields */
    clearSelectionDocumentFields() {
      if (this.$refs.documentFieldsTable) {
        this.$refs.documentFieldsTable.$children[1].clearSelection();
      }
      if (this.documentFields && this.documentFields.length > 0) {
        this.documentFields = this.documentFields.map(x => {
          x.markForDelete = false;
          return x;
        });
      }
    },
    /**@description save document fields */
    saveDocumentFields() {
      let result = '';
      return new Promise((resolve, reject) => {
        switch (this.documentFieldsModalMode) {
          case 'create':
            this.saveNewDocumentField(
              this.transformToOutputDocumentFields(this.selectedDocumentField),
            ).then(resp1 => {
              if (resp1.data && resp1.status == 200) {
                resolve('success');
              } else {
                resolve('error');
              }
            });
            break;
          case 'update':
            this.saveDirtyDocumentField(
              this.transformToOutputDocumentFields(this.selectedDocumentField),
            ).then(resp2 => {
              if (resp2.data && resp2.status == 200) {
                resolve('success');
              } else {
                resolve('error');
              }
            });
            break;
        }
      });
    },
    /**@description save new document field */
    saveNewDocumentField(data) {
      return this.create(data, documentFieldsApi);
    },
    /**@description save dirty document field */
    saveDirtyDocumentField(data) {
      return this.updateList(data, documentFieldsApi);
    },
    /**@description on before close handler for document fields dialog */
    onBeforeCloseDocumentFieldsDialog(done) {
      const self = this;
      return new Promise((resolve, reject) => {
        this.$confirm(self.$t('close_dialog_confirm')).then(() => {
          done();
          self.restoreSelectedDocumentFieldToOldState();
          self.resetDocumentFields('on_close');
          resolve();
        });
      });
    },
    /**@description on close handler for document fields */
    onCloseDocumentFieldsDialog() {
      this.restoreSelectedDocumentFieldToOldState();
      this.resetDocumentFields('on_close');
    },
    /**@description restore selected document field to old state */
    restoreSelectedDocumentFieldToOldState() {
      switch (this.documentFieldsModalMode) {
        case 'create':
          this.resetCurrentDocumentFields();
          break;
        case 'update': {
          let edited = {};
          if (
            this.documentFields.filter(
              x =>
                x.documentId === this.selectedDocumentField.documentId &&
                x.fieldId == this.selectedDocumentField.fieldId,
            ).length > 0
          ) {
            edited = this.documentFields.filter(
              x =>
                x.documentId === this.selectedDocumentField.documentId &&
                x.fieldId == this.selectedDocumentField.fieldId,
            )[0];
          }
          this.selectedDocumentField = Object.assign({}, edited);
          break;
        }
      }
    },
    /**@description on save document field dialog */
    onSaveDocumentFieldsDialog() {
      const self = this;
      return new Promise((resolve, reject) => {
        this.$children[1].$children[2].$children[0].$children[0].validate(valid => {
          if (valid) {
            self.saveDocumentFields().then(resp => {
              if (resp || '' == 'success') {
                self.resetAfterSaveDocumentFields();
                resolve('valid');
              } else resolve('invalid');
            });
          } else resolve('invalid');
        });
      });
    },
    /**@description on row click handler for document field */
    onDocumentFieldsRowClicked(row) {
      this.selectedDocumentField = Object.assign({}, row);
    },
    /**@description transform function for input document field */
    transformToInputDocumentFields(data = []) {
      var y = data.map(x => {
        return {
          documentId: x.documentId || 0,
          fieldId: x.fieldId || 0,
          fieldName: x.field ? x.field.name || '' : '',
          fieldDescription: x.field ? x.field.description || '' : '',
          fieldDataTypeNo: x.field ? x.field.fieldDataTypeNo || '' : '',
          isActive: x.field ? Boolean(JSON.parse(x.field.isActive)) || false : false,
          parameter: x.parameter || '',
          externalFieldname: x.name || '',
          fixedValue: x.value || '',

          created: x.created ? new Date(x.created).toLocaleDateString() : null,
          createdBy: x.createdBy,
          updated: x.updated ? new Date(x.updated).toLocaleDateString() : null,
          updatedBy: x.updatedBy,
          fieldCreated: x.field ? (x.field.created ? new Date(x.field.created) : null) : null,
          fieldCreatedBy: x.field ? x.field.createdBy || '' : '',
          fieldUpdated: x.field ? (x.field.updated ? new Date(x.field.updated) : null) : null,
          fieldUpdatedBy: x.field ? x.field.updatedBy || '' : '',

          markForDelete: false,
        };
      });
      return y;
    },
    /**@description transform function for output document field */
    transformToOutputDocumentFields(x) {
      return [
        {
          documentId: x.documentId || 0,
          fieldId: x.fieldId || 0,
          parameter: x.parameter || '',
          name: x.externalFieldname || '',
          value: x.fixedValue || '',
          created: new Date(x.created).toLocaleDateString(),
          createdBy: x.createdBy,
          updated: new Date(x.updated).toLocaleDateString(),
          updatedBy: x.updatedBy,
          field: {
            fieldId: x.fieldId || 0,
            name: x.fieldName || '',
            description: x.fieldDescription || '',
            fieldDataTypeNo: x.fieldDataTypeNo || '',
            isActive: x.isActive || false,
            created: new Date(x.fieldCreated).toLocaleDateString(),
            createdBy: x.fieldCreatedBy,
            updated: new Date(x.fieldUpdated).toLocaleDateString(),
            updatedBy: x.fieldUpdatedBy,
          },
        },
      ];
    },

    /**@description load document fields from document data with submitargs
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
    loadDocumentFieldsFromDocument(submitArgs = {}) {
      const self = this;
      return new Promise((resolve, reject) => {
        self.loadingDocumentFields = true;
        self
          .submit(getalldocumentfields, submitArgs)
          .then(resp => {
            let filter = self.transformToInputDocumentFields(resp.data.result);
            self.documentFields = filter;
            self.documentFieldsTotal = resp.data.total;
            self.loadingDocumentFields = false;
            resolve();
          })
          .catch(err => {
            self.$message(self.$t('error_loading_data'));
            self.loadingDocumentFields = false;
            reject();
          });
      });
    },
    /**@description query change handler for document field */
    documentFieldsQueryChange: _.debounce(function(args) {
      if (args) {
        this.resetCurrentDocumentFields();
        if (this.documentFieldsFilterValue || '' != '') {
          if (args.filters.length > 0 && args.filters[0].vals && args.filters[0].vals.length > 0) {
            let filterProps = [
              {
                PropName: this.documentFieldsFilterValue,
                PropValue: args.filters[0].vals[0].toString(),
                IsNestedProp: this.documentFieldsFilterValue.indexOf('.') != -1 ? true : false,
              },
            ];
            this.loadDocumentFieldsFromDocument({
              page: args.page,
              pageSize: args.pageSize,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'Document.DocumentIdentity',
                    PropValue: this.navigationProperty || '',
                    IsNestedProp: true,
                  },
                ],
              },
              FilterProps: {
                Props: filterProps,
              },
              OrderByProp: {
                Propname: 'Field.Name',
              },
              IsNavigationEnabled: true,
            });
          } else {
            this.rwer = '';
            this.documentFieldsFilter[0].vals = '';
            this.loadDocumentFieldsFromDocument({
              page: args.page,
              pageSize: args.pageSize,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'Document.DocumentIdentity',
                    PropValue: this.navigationProperty || '',
                    IsNestedProp: true,
                  },
                ],
              },
              OrderByProp: {
                Propname: 'Field.Name',
              },
              IsNavigationEnabled: true,
            });
          }
        } else {
          //this.$message(this.$t('select_filter_col'));
          this.documentFieldsFilter[0].vals = '';
        }
      }
    }, 1000),
    /* end document fields grid transaction */
  },
  /**@description created lifecycle hook for document field component */
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
