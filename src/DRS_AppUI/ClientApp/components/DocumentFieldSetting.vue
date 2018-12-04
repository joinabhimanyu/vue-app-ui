<template>
  <div>
    <el-row>
        <el-col :span="24">
            <div class="grid-content">
                <data-tables-server ref="documentFieldSettingsTable"
                                    :data="documentFieldSettings"
                                    :total="documentFieldSettingsTotal"
                                    :loading="loadingDocumentFieldSettings"
                                    :table-props="documentFieldSettingsTableProps"
                                    :show-action-bar="false"
                                    :custom-filters="documentFieldSettingsFilter"
                                    @query-change="documentFieldSettingsQueryChange"
                                    @row-click="onDocumentFieldSettingsRowClicked"
                                    @select="handleSelectionChangeDocumentFieldSettings"
                                    @select-all="handleSelectionChangeDocumentFieldSettings">
                    <el-row slot="custom-tool-bar" style="margin-bottom:8px">
                        <el-col :span="3">
                            <el-dropdown @command="onCommandDocumentFieldSettings">
                                <el-button type="primary"><t t="actions"></t>
                                <i class="el-icon-loading" v-if="loadingDialogDocumentFieldSettings"></i>
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
                            <el-select v-model="documentFieldSettingsFilterValue" placeholder="Select">
                                <el-option v-for="item in documentFieldSettingsFilterOption" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <!--@input="debounceInput"-->
                            <el-input v-model="documentFieldSettingsFilter[0].vals"
                                        prefix-icon="el-icon-search"
                                        :placeholder="$t('search_document_field_settings')">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-table-column type="selection"
                                        reserve-selection
                                        width="55">
                    </el-table-column>
                    <el-table-column :label="documentFieldSettingsCols[0].label" min-width="auto">
                        <template scope="scope">
                            {{scope.row[documentFieldSettingsCols[0].prop]}}
                        </template>
</el-table-column>
<el-table-column :label="documentFieldSettingsCols[1].label" min-width="auto">
    <template scope="scope">
                            {{scope.row[documentFieldSettingsCols[1].prop]}}
                        </template>
</el-table-column>
<el-table-column :label="documentFieldSettingsCols[2].label" min-width="auto">
    <template scope="scope">
                            {{scope.row[documentFieldSettingsCols[2].prop]}}
                        </template>
</el-table-column>
<el-table-column :label="documentFieldSettingsCols[3].label" min-width="auto">
    <template scope="scope">
                            <el-checkbox v-model="scope.row[documentFieldSettingsCols[3].prop]"
                                            @change="handleChange(scope.row,$event)"></el-checkbox>
                        </template>
</el-table-column>
</data-tables-server>
</div>
</el-col>
</el-row>

<!-- document field setttings form -->
<!-- ref="documentFieldSettingsForm" -->
<el-dialog :title="$t('document_field_settings')" width="567px" :visible.sync="showDocumentFieldSettingsDialog" :before-close="onBeforeCloseDocumentFieldSettingsDialog">
    <!-- document fields contents -->
    <el-row>
        <el-col :span="24">
            <div class="grid-content">
                <!-- form with fields for name,category and description -->
                <el-form :label-position="'right'" label-width="165px" :model="selectedDocumentFieldSetting" :rules="documentFieldSettingsFormRules" status-icon>

                    <el-form-item prop="name" :label="$t('name')">
                        <el-input v-model="selectedDocumentFieldSetting.name" :placeholder="$t('name')" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item prop="value" :label="$t('value')">
                        <el-input v-model="selectedDocumentFieldSetting.value" :placeholder="$t('value')" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item prop="description" :label="$t('description')">
                        <el-input v-model="selectedDocumentFieldSetting.description" :placeholder="$t('description')" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('is_active')">
                        <el-checkbox v-model="selectedDocumentFieldSetting.isActive"></el-checkbox>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
            <el-button @click="onCloseDocumentFieldSettingsDialog"><t t="cancel"></t></el-button>
            <el-button type="primary" @click="onSaveDocumentFieldSettingsDialog"><t t="save"></t></el-button>
        </span>
</el-dialog>
</div>
</template>

<script>
import Vue from 'vue';
import UtilityMixin from '../mixins/utilityMixin';
import { eventBus } from '../main';
import _ from 'lodash';
import DocumentFieldSettingViewModel from '../view_models/documentFieldSetting_viewmodel';

const getalldocumentfieldsettings = 'getallDocumentFieldSettings';
const documentFieldSettingsApi = 'documentFieldSettings';

/**@author Abhimanyu Chkarborty
 * @description Document Field settings component
 * follows standard list compnent template with new, edit and delete
 */
export default {
  name: 'documentFieldSetting',
  mixins: [DocumentFieldSettingViewModel, UtilityMixin],
  props: {
    navigationProperty: {
      type: String,
      required: true,
    },
  },
  methods: {
    /* begin document field setting grid transaction */
    /**@description refresh translations for form rules */
    refreshFormRules() {
      this.documentFieldSettingsFormRules.name[0].message = this.$t('name_blank');
      this.documentFieldSettingsFormRules.name[1].message = this.$t('length_validation');
      this.documentFieldSettingsFormRules.value[0].message = this.$t('value_blank');
      this.documentFieldSettingsFormRules.value[1].message = this.$t('length_validation');
      this.documentFieldSettingsFormRules.description[0].message = this.$t('description_blank');
      this.documentFieldSettingsFormRules.description[1].message = this.$t('length_validation');
    },
    /**@description refresh translations for filter options */
    refreshFilterOptions() {
      this.documentFieldSettingsFilterOption[0].label = this.$t('name');
      this.documentFieldSettingsFilterOption[1].label = this.$t('value');
      this.documentFieldSettingsFilterOption[2].label = this.$t('description');
    },
    /**@description refresh translations for grid cols */
    refreshGridCols() {
      this.documentFieldSettingsCols[0].label = this.$t('name');
      this.documentFieldSettingsCols[1].label = this.$t('value');
      this.documentFieldSettingsCols[2].label = this.$t('description');
      this.documentFieldSettingsCols[3].label = this.$t('is_active');
    },
    /**@description refresh translations */
    refreshTranslations() {
      this.refreshFormRules();
      this.refreshFilterOptions();
      this.refreshGridCols();
    },
    /**@description handle selection change and toggle markForDelete for document field settings */
    handleSelectionChangeDocumentFieldSettings(row) {
      const viewportdata = JSON.parse(JSON.stringify(this.$refs.documedSettingsTable.curTableData));
      if (viewportdata && viewportdata.length > 0) {
        let filtered = [];
        for (const item of viewportdata) {
          if (
            this.documentFieldSettings.filter(
              x => x.documentFieldSettingId === item.documentFieldSettingId,
            ).length > 0
          ) {
            filtered.push(
              this.documentFieldSettings.filter(
                x => x.documentFieldSettingId === item.documentFieldSettingId,
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
              filtered.filter(x => x.documentFieldSettingId === item.documentFieldSettingId)
                .length > 0
            ) {
              filtered.filter(
                x => x.documentFieldSettingId === item.documentFieldSettingId,
              )[0].markForDelete = true;
            }
          }
        }
      }
    },
    /**@description reset current document field settings */
    resetCurrentDocumentFieldSettings() {
      this.selectedDocumentFieldSetting = {};
      if (this.$refs.documentFieldSettingsTable) {
        this.$refs.documentFieldSettingsTable.$children[1].setCurrentRow(null);
      }
    },
    /**@description reset form field errors for document field settings */
    resetFormFieldsDocumentFieldSettings() {
      this.$children[1].$children[2].$children[0].$children[0].clearValidate();
    },
    /**@description on command handler for document field settings */
    onCommandDocumentFieldSettings(command) {
      const self = this;
      return new Promise((resolve, reject) => {
        if (command) {
          switch (command) {
            case 'new':
              this.loadingDialogDocumentFieldSettings = true;
              this.documentFieldSettingsModalMode = 'create';
              this.resetCurrentDocumentFieldSettings();
              this.showDocumentFieldSettingsDialog = true;
              this.loadingDialogDocumentFieldSettings = false;
              setTimeout(() => {
                self.resetFormFieldsDocumentFieldSettings();
                resolve();
              }, 100);
              break;
            case 'edit':
              if (Object.keys(this.selectedDocumentFieldSetting).length > 0) {
                this.loadingDialogDocumentFieldSettings = true;
                this.documentFieldSettingsModalMode = 'update';
                this.showDocumentFieldSettingsDialog = true;
                this.loadingDialogDocumentFieldSettings = false;
                setTimeout(() => {
                  self.resetFormFieldsDocumentFieldSettings();
                  resolve();
                }, 100);
              } else {
                this.$message(this.$t('select_for_edit'));
              }
              break;
            case 'delete': {
              const dExisting = this.documentFieldSettings.filter(x => x.markForDelete);

              if (dExisting.length > 0) {
                try {
                  this.deleteList(
                    JSON.parse(
                      JSON.stringify(
                        dExisting.map(x => {
                          return {
                            documentFieldSettingId: x.documentFieldSettingId,
                          };
                        }),
                      ),
                    ),
                    documentFieldSettingsApi,
                  ).then(resp => {
                    if (resp.data && resp.status === 200) {
                      this.$message(this.$t('delete_success'));
                      this.resetAfterSaveDocumentFieldSettings().then(() => {
                        this.documentFieldSettings = JSON.parse(
                          JSON.stringify(this.documentFieldSettings),
                        );
                        resolve();
                      });
                    } else {
                      this.$message(this.$t('delete_error'));
                      resolve();
                    }
                  });
                } catch (error) {
                  this.$message(this.$t('delete_error'));
                  resolve();
                }
              } else {
                this.$message(this.$t('nothing_to_delete'));
                resolve();
              }
              break;
            }
            case 'clearSelection':
              this.clearSelectionDocumentFieldSettings();
              resolve();
              break;
            case 'refresh':
              this.resetAfterSaveDocumentFieldSettings().then(() => {
                resolve();
              });
              break;
            default:
              break;
          }
        }
      });
    },
    /**@description reset document field settings to empty */
    resetDocumentFieldSettings(callTarget = '') {
      this.documentFieldSettingsModalMode = '';
      this.showDocumentFieldSettingsDialog = false;
      if (callTarget !== 'on_close') {
        this.documentFieldSettings = [];
        this.documentFieldSettingsFilterValue = '';
        this.documentFieldSettingsFilter[0].vals = '';
      }
    },
    /**@description protocol function resetAfterSave for document field settings */
    resetAfterSaveDocumentFieldSettings() {
      this.resetCurrentDocumentFieldSettings();
      this.resetDocumentFieldSettings();
      return new Promise((resolve, reject) => {
        if (this.navigationProperty !== '') {
          this.loadDocumentFieldSettingsFromDocument({
            pageSize: this.defaultPageSizeGrid,
            NavigationProperty: {
              Props: [
                {
                  PropName: 'DocumentIdentity',
                  PropValue: this.navigationProperty || '',
                },
              ],
            },
            OrderByProp: {
              PropName: 'DocumentFieldSettingId',
            },
          })
            .then(() => {
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        } else resolve();
      });
    },
    /**@description clear selection and reset markForDelete for document field settings */
    clearSelectionDocumentFieldSettings() {
      if (this.$refs.documentFieldSettingsTable) {
        this.$refs.documentFieldSettingsTable.$children[1].clearSelection();
      }
      if (this.documentFieldSettings && this.documentFieldSettings.length > 0) {
        this.documentFieldSettings = this.documentFieldSettings.map(x => {
          x.markForDelete = false;
          return x;
        });
      }
    },
    /**@description save document field settings */
    saveDocumentFieldSettings() {
      let result = '';
      return new Promise((resolve, reject) => {
        switch (this.documentFieldSettingsModalMode) {
          case 'create':
            try {
              this.saveNewDocumentFieldSetting(
                this.transformToOutputDocumentFieldSettings(this.selectedDocumentFieldSetting),
              ).then(resp => {
                if (resp.data && resp.status === 200) {
                  resolve('success');
                } else {
                  resolve('error');
                }
              });
            } catch (e) {
              resolve('error');
            }
            break;
          case 'update':
            try {
              this.saveDirtyDocumentFieldSetting(
                this.transformToOutputDocumentFieldSettings(this.selectedDocumentFieldSetting),
              ).then(resp2 => {
                if (resp2.data && resp2.status === 200) {
                  resolve('success');
                } else {
                  resolve('error');
                }
              });
            } catch (e) {
              resolve('error');
            }
            break;
          default:
            break;
        }
      });
    },
    /**@description save new document field settings */
    saveNewDocumentFieldSetting(data) {
      return this.create(data, documentFieldSettingsApi);
    },
    /**@description save dirty document field settings */
    saveDirtyDocumentFieldSetting(data) {
      return this.updateSingle(
        this.selectedDocumentFieldSetting.documentFieldSettingId,
        data,
        documentFieldSettingsApi,
      );
    },
    /**@description on before close for document field settings dialog */
    onBeforeCloseDocumentFieldSettingsDialog(done) {
      const self = this;
      this.$confirm(self.$t('close_dialog_confirm'))
        .then(() => {
          done();
          self.restoreSelectedDocumentFieldSettingsToOldState();
          self.resetDocumentFieldSettings('on_close');
        })
        .catch(e => {});
    },
    /**@description on close for document field settings dialog */
    onCloseDocumentFieldSettingsDialog() {
      this.restoreSelectedDocumentFieldSettingsToOldState();
      this.resetDocumentFieldSettings('on_close');
    },
    /**@description restore selected document field settings to old state */
    restoreSelectedDocumentFieldSettingsToOldState() {
      switch (this.documentFieldSettingsModalMode) {
        case 'create':
          this.resetCurrentDocumentFieldSettings();
          break;
        case 'update': {
          let edited = {};
          if (
            this.documentFieldSettings.filter(
              x =>
                x.documentFieldSettingId ===
                this.selectedDocumentFieldSetting.documentFieldSettingId,
            ).length > 0
          ) {
            edited = this.documentFieldSettings.filter(
              x =>
                x.documentFieldSettingId ===
                this.selectedDocumentFieldSetting.documentFieldSettingId,
            )[0];
          }
          this.selectedDocumentFieldSetting = Object.assign({}, edited);
          break;
        }
        default:
          break;
      }
    },
    /**@description on save document field settings */
    onSaveDocumentFieldSettingsDialog() {
      const self = this;
      return new Promise((resolve, reject) => {
        this.$children[1].$children[2].$children[0].$children[0].validate(valid => {
          if (valid) {
            self.saveDocumentFieldSettings().then(resp => {
              if (resp || '' === 'success') {
                self
                  .resetAfterSaveDocumentFieldSettings()
                  .then(() => {
                    resolve('valid');
                  })
                  .catch(() => {
                    resolve('invalid');
                  });
              } else resolve('invalid');
            });
          } else resolve('invalid');
        });
      });
    },
    /**@description on row click for document field settings */
    onDocumentFieldSettingsRowClicked(row) {
      this.selectedDocumentFieldSetting = Object.assign({}, row);
    },
    /**@description transform function for input document field settings */
    transformToInputDocumentFieldSettings(data = []) {
      return [
        ...data.map(x => {
          return {
            documentFieldSettingId: x.documentFieldSettingId || 0,
            documentId: x.documentId || 0,
            fieldId: x.fieldId || 0,
            name: x.name || '',
            description: x.description || '',
            value: x.value || '',
            isActive: x.isActive || false,
            created: new Date(x.created).toLocaleDateString(),
            createdBy: x.createdBy,
            updated: new Date(x.updated).toLocaleDateString(),
            updatedBy: x.updatedBy,
            markForDelete: false,
          };
        }),
      ];
    },
    /**@description transform function for output document field settings */
    transformToOutputDocumentFieldSettings(x = {}) {
      return {
        documentFieldSettingId: x.documentFieldSettingId || 0,
        documentId: x.documentId || 0,
        fieldId: x.fieldId || 0,
        name: x.name || '',
        description: x.description || '',
        value: x.value || '',
        isActive: x.isActive || false,
        created: new Date(x.created).toLocaleDateString(),
        createdBy: x.createdBy,
        updated: new Date(x.updated).toLocaleDateString(),
        updatedBy: x.updatedBy,
      };
    },

    /**@description load document field settings from document data with submitargs
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
    loadDocumentFieldSettingsFromDocument(submitArgs = {}) {
      return new Promise((resolve, reject) => {
        try {
          this.loadingDocumentFieldSettings = true;
          this.submit(getalldocumentfieldsettings, submitArgs).then(resp => {
            this.documentFieldSettings = [
              ...this.transformToInputDocumentFieldSettings(resp.data.result),
            ];
            this.documentFieldSettingsTotal = resp.data.total;
            this.loadingDocumentFieldSettings = false;
            resolve();
          });
        } catch (e) {
          this.$message(self.$t('error_loading_data'));
          this.loadingDocumentFieldSettings = false;
          resolve();
        }
      });
    },
    /**@description query change handler for document field settings */
    documentFieldSettingsQueryChange: _.debounce(function(args) {
      if (args) {
        this.resetCurrentDocumentFieldSettings();
        if (this.documentFieldSettingsFilterValue !== '') {
          if (args.filters[0].vals && args.filters[0].vals.length > 0) {
            let filterProps = [
              {
                PropName: this.documentFieldSettingsFilterValue,
                PropValue: args.filters[0].vals[0].toString(),
              },
            ];
            this.loadDocumentFieldSettingsFromDocument({
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
                PropName: 'DocumentFieldSettingId',
              },
            });
          } else {
            this.documentFieldSettingsFilter[0].vals = '';
            this.loadDocumentFieldSettingsFromDocument({
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
                PropName: 'DocumentFieldSettingId',
              },
            });
          }
        } else {
          //this.$message(this.$t('select_filter_col'));
          this.documentFieldSettingsFilter[0].vals = '';
        }
      }
    }, 1000),
    /* end document field setting grid transaction */
  },
  /**@description created lifecycle hook for component */
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
