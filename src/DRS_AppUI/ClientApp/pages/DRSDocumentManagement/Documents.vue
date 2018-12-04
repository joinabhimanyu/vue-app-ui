<template>

    <div>
        <v-card contextual-style="white">
            <div slot="body">
                <el-row>
                    <el-col :span="12">
                        <el-form class="docSourceForm">
                            <el-form-item :label="$t('document_source_filter')">
                                <!--filter with documentSourceList-->
                                <el-select class="docSourceControl" v-model="documentSourceFilterValue" clearable filterable remote reserve-keyword :placeholder="$t('select_document_source')" :remote-method="loadDocumentSource" :loading="loadingDocumentSource" @change="documentSourceFilterChanged">
                                    <el-option v-for="item in documentSourceList" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content">
                            <data-tables-server ref="documentsTable" :data="documentSource" :total="documentsTotal" :loading="loadingDocuments" :table-props="documentTableProps" :show-action-bar="false" :custom-filters="documentsFilter" @query-change="documentsQueryChange" @row-click="onDocumentRowClicked" @select="handleSelectionChange" @select-all="handleSelectionChange">
                                <el-row slot="custom-tool-bar" style="margin-bottom:8px">
                                    <el-col :span="5">
                                        <el-dropdown @command="onCommandDocuments">
                                            <el-button type="primary">
                                                <t t="actions"></t>
                                                <i class="el-icon-loading" v-if="loadingDialogDocuments"></i>
                                                <i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item command="new"><i class="fa fa-plus fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="new"></t></span></el-dropdown-item>
                                                <el-dropdown-item command="edit"><i class="fa fa-pencil fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="edit"></t></span></el-dropdown-item>
                                                <el-dropdown-item command="delete"><i class="fa fa-trash-o fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="delete"></t></span></el-dropdown-item>
                                                <el-dropdown-item command="copy_to_new"><i class="fa fa-clone fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="copy_to_new"></t></span></el-dropdown-item>
                                                <el-dropdown-item command="export"><i class="fa fa-download fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="export"></t></span></el-dropdown-item>
                                                <el-dropdown-item command="clearSelection"><i class="fa fa-repeat fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="reset"></t></span></el-dropdown-item>
                                                <el-dropdown-item command="refresh"><i class="fa fa-refresh fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="refresh"></t></span></el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </el-col>
                                    <el-col :span="3" :offset="10">
                                        <el-select v-model="documentsFilterValue" placeholder="Select" @change="documentsFilter[0].vals=''">
                                            <el-option v-for="item in documentsFilterOption" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="5" :offset="1">
                                        <!--@input="debounceInput"-->
                                        <el-input v-model="documentsFilter[0].vals" prefix-icon="el-icon-search" :placeholder="$t('search_documents')">
                                        </el-input>
                                    </el-col>
                                </el-row>
                                <el-table-column type="selection" reserve-selection width="55">
                                </el-table-column>
                                <el-table-column :label="documentCols[0].label" min-width="auto">
                                    <template scope="scope">
                                        {{scope.row[documentCols[0].prop]}}
                                    </template>
                                </el-table-column>
                                <el-table-column :label="documentCols[1].label" min-width="auto">
                                    <template scope="scope">
                                        {{scope.row[documentCols[1].prop]}}
                                    </template>
                                </el-table-column>
                                <el-table-column :label="documentCols[2].label" min-width="auto">
                                    <template scope="scope">
                                        {{scope.row[documentCols[2].prop]}}
                                    </template>
                                </el-table-column>
                                <el-table-column :label="documentCols[3].label" min-width="auto">
                                    <template scope="scope">
                                        {{scope.row[documentCols[3].prop]}}
                                    </template>
                                </el-table-column>
                                <el-table-column :label="documentCols[4].label" min-width="auto">
                                    <template scope="scope">
                                        {{scope.row[documentCols[4].prop]}}
                                    </template>
                                </el-table-column>
                                <el-table-column :label="documentCols[5].label" min-width="auto">
                                    <template scope="scope">
                                        {{scope.row[documentCols[5].prop]}}
                                    </template>
                                </el-table-column>
                                <el-table-column :label="documentCols[6].label" min-width="auto">
                                    <template scope="scope">
                                        <el-checkbox v-model="scope.row[documentCols[6].prop]" @change="handleChange(scope.row,$event)"></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="documentCols[7].label" min-width="auto">
                                    <template scope="scope">
                                        {{scope.row[documentCols[7].prop]}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="" min-width="auto">
                                    <template scope="scope">
                                        <el-button type="text" class="btn-showdetails" @click="openDocumentDetailsTab(scope.row)">
                                            <t t="show_details"></t>
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </data-tables-server>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </v-card>

        <v-card contextual-style="white">
            <div slot="body">
                <el-row>
                    <el-col :span="24">
                        <el-tabs value="rules">
                            <el-tab-pane :label="$t('rules')" name="rules">
                                <document-rule ref="documentRule" :navigationProperty="selectedDocument.documentIdentity||''"></document-rule>
                            </el-tab-pane>
                            <el-tab-pane :label="$t('fields')" name="fields">
                                <document-field ref="documentField" :navigationProperty="selectedDocument.documentIdentity||''" :parentContext="this"></document-field>
                            </el-tab-pane>
                            <el-tab-pane :label="$t('settings')" name="settings">
                                <document-field-setting ref="documentFieldSetting" :navigationProperty="selectedDocument.documentIdentity||''"></document-field-setting>
                            </el-tab-pane>
                            <el-tab-pane :label="$t('process_queues')" name="process_queues">
                                <process-queue ref="processQueue" :navigationProperty="selectedDocument.documentIdentity||''"></process-queue>
                            </el-tab-pane>
                            <el-tab-pane :label="$t('process_errors')" name="process_errors">
                                <process-log ref="processLog" :navigationProperty="selectedDocument.documentId||0"></process-log>
                            </el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
            </div>
        </v-card>

        <!-- documents form -->
        <el-dialog :title="$t('document')" width="745px" :visible.sync="showDocumentDialog" :before-close="onBeforeCloseDocumentDialog">
            <el-row>
                <el-col :span="24">
                    <el-form ref="documentForm" :label-position="'right'" label-width="125px" :model="selectedDocument" :rules="documentFormRules" status-icon>
                        <el-col :span="12">
                            <el-form-item prop="documentIdentity" :label="$t('document_identity')">
                                <el-input v-model="selectedDocument.documentIdentity" :placeholder="$t('enter_document_identity')" style="width:220px"></el-input>
                            </el-form-item>
                            <el-form-item prop="documentSourceId" :label="$t('document_source')">
                                <!--autocomplete for documentSourceList-->
                                <el-select v-model="selectedDocument.documentSourceId" clearable filterable remote reserve-keyword :placeholder="$t('select_document_source')" :remote-method="loadDocumentSource" :loading="loadingDocumentSource">
                                    <el-option v-for="item in documentSourceList" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="number" :label="$t('number')">
                                <el-input v-model="selectedDocument.number" :placeholder="$t('enter_number')" style="width:220px"></el-input>
                            </el-form-item>
                            <el-form-item prop="version" :label="$t('version')">
                                <el-input v-model="selectedDocument.version" :placeholder="$t('enter_version')" style="width:220px"></el-input>
                            </el-form-item>
                            <el-form-item prop="name" :label="$t('name')">
                                <el-input v-model="selectedDocument.name" :placeholder="$t('enter_name')" style="width:220px"></el-input>
                            </el-form-item>
                            <el-form-item prop="description" :label="$t('description')">
                                <el-input v-model="selectedDocument.description" :placeholder="$t('enter_description')" style="width:220px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="pages" :label="$t('pages')">
                                <el-input v-model="selectedDocument.pages" :placeholder="$t('enter_pages')" style="width:220px"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('is_active')">
                                <el-checkbox v-model="selectedDocument.isActive"></el-checkbox>
                            </el-form-item>
                            <el-form-item prop="created" :label="$t('created')">
                                <el-date-picker v-model="selectedDocument.created" :disabled="true" type="datetime" :placeholder="$t('select_created')" size="small" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item prop="updated" :label="$t('updated')">
                                <el-date-picker v-model="selectedDocument.updated" :disabled="true" type="datetime" :placeholder="$t('select_updated')" size="small" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item prop="updatedBy" :label="$t('updated_by')">
                                <el-input v-model="selectedDocument.updatedBy" :placeholder="$t('enter_updatd_by')" style="width:220px"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('document_list_name')">
                                {{selectedDocument.documentIdentity}} ({{selectedDocument.version}}) - {{selectedDocument.name}}
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCloseDocumentDialog"><t t="cancel"></t></el-button>
                <el-button type="primary" @click="onSaveDocumentDialog"><t t="save"></t></el-button>
            </span>
        </el-dialog>

    </div>

</template>

<script>
import Vue from 'vue';
import co from 'co';
import VCard from '../../components/Card';
import documentRule from '../../components/DocumentRule';
import documentField from '../../components/DocumentField';
import documentFieldSetting from '../../components/DocumentFieldSetting';
import processQueue from '../../components/ProcessQueue';
import processLog from '../../components/ProcessLog';
import UtilityMixin from '../../mixins/utilityMixin';
import DocumentsMixin from '../../mixins/documentsMixin';
import { eventBus } from '../../main';
import _ from 'lodash';
import DocumentsViewModel from '../../view_models/documents_viewmodel';

const documentApi = 'document';

/**@author Abhimanyu Chkarborty
 * @description Documents component
 * follows standard list compnent template with new, edit and delete
 */
export default {
  name: 'documents',
  components: {
    VCard,
    documentRule,
    documentField,
    documentFieldSetting,
    processQueue,
    processLog,
  },
  mixins: [DocumentsViewModel, UtilityMixin, DocumentsMixin],
  props: {
    args: {
      type: Object,
      required: true,
    },
  },
  methods: {
    /* begin generic section */
    /**@description load dependents on document:
     * 1:loadRulesFromDocument
     * 2:loadDocumentFieldsFromDocument
     * 3:loadDocumentFieldSettingsFromDocument
     * 4:loadProcessQueuesDocument
     * 5:loadProcessLogsFromDocument
     */
    loadDocumentDependents() {
      return new Promise((resolve, reject) => {
        try {
          if (
            this.selectedDocument &&
            this.selectedDocument.documentId &&
            this.selectedDocument.documentId != 0
          ) {
            if (this.$refs.documentRule) {
              this.$refs.documentRule
                .loadRulesFromDocument({
                  pageSize: this.defaultPageSizeGrid,
                  NavigationProperty: {
                    Props: [
                      {
                        PropName: 'DocumentIdentity',
                        PropValue: this.selectedDocument.documentIdentity || '',
                      },
                    ],
                  },
                  OrderByProp: {
                    PropName: 'DocumentRuleId',
                  },
                })
                .then(() => {
                  if (this.$refs.documentField) {
                    this.$refs.documentField
                      .loadDocumentFieldsFromDocument({
                        pageSize: this.defaultPageSizeGrid,
                        NavigationProperty: {
                          Props: [
                            {
                              PropName: 'Document.DocumentIdentity',
                              PropValue: this.selectedDocument.documentIdentity || '',
                              IsNestedProp: true,
                            },
                          ],
                        },
                        OrderByProp: {
                          Propname: 'Field.Name',
                        },
                        IsNavigationEnabled: true,
                      })
                      .then(() => {
                        if (this.$refs.documentFieldSetting) {
                          this.$refs.documentFieldSetting
                            .loadDocumentFieldSettingsFromDocument({
                              pageSize: this.defaultPageSizeGrid,
                              NavigationProperty: {
                                Props: [
                                  {
                                    PropName: 'DocumentIdentity',
                                    PropValue: this.selectedDocument.documentIdentity || '',
                                  },
                                ],
                              },
                              OrderByProp: {
                                PropName: 'DocumentFieldSettingId',
                              },
                            })
                            .then(() => {
                              if (this.$refs.processQueue) {
                                this.$refs.processQueue
                                  .loadProcessQueuesDocument({
                                    pageSize: this.defaultPageSizeGrid,
                                    NavigationProperty: {
                                      Props: [
                                        {
                                          PropName: 'DocumentIdentity',
                                          PropValue: this.selectedDocument.documentIdentity || '',
                                        },
                                      ],
                                    },
                                    OrderByProp: {
                                      PropName: 'ProcessQueueId',
                                    },
                                    IsNavigationEnabled: true,
                                  })
                                  .then(() => {
                                    if (this.$refs.processLog) {
                                      this.$refs.processLog
                                        .loadProcessLogsFromDocument({
                                          pageSize: this.defaultPageSizeGrid,
                                          NavigationProperty: {
                                            Props: [
                                              {
                                                PropName: 'ProcessQueue.Document.DocumentId',
                                                PropValue: this.selectedDocument.documentId || 0,
                                                IsNestedProp: true,
                                              },
                                            ],
                                          },
                                          BaseFilterProps: {
                                            Props: [
                                              {
                                                PropName: 'Severity',
                                                PropValue: 'Error',
                                              },
                                            ],
                                          },
                                          OrderByProp: {
                                            PropName: 'ProcessLogId',
                                          },
                                          IsNavigationEnabled: true,
                                        })
                                        .then(() => {
                                          resolve();
                                        });
                                    }
                                  });
                              }
                            });
                        }
                      });
                  }
                });
            }
          }
        } catch (error) {
          resolve(error);
        }
      });
    },
    loadDocumentDependents3() {
      const self = this;
      if (
        self.selectedDocument &&
        self.selectedDocument.documentId &&
        self.selectedDocument.documentId != 0
      ) {
        co(function*() {
          if (self.$refs.documentRule) {
            yield self.$refs.documentRule.loadRulesFromDocument({
              pageSize: self.defaultPageSizeGrid,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'DocumentIdentity',
                    PropValue: self.selectedDocument.documentIdentity || '',
                  },
                ],
              },
              OrderByProp: {
                PropName: 'DocumentRuleId',
              },
            });
          }
          if (self.$refs.documentField) {
            yield self.$refs.documentField.loadDocumentFieldsFromDocument({
              pageSize: self.defaultPageSizeGrid,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'Document.DocumentIdentity',
                    PropValue: self.selectedDocument.documentIdentity || '',
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
          if (self.$refs.documentFieldSetting) {
            yield self.$refs.documentFieldSetting.loadDocumentFieldSettingsFromDocument({
              pageSize: self.defaultPageSizeGrid,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'DocumentIdentity',
                    PropValue: self.selectedDocument.documentIdentity || '',
                  },
                ],
              },
              OrderByProp: {
                PropName: 'DocumentFieldSettingId',
              },
            });
          }
          if (self.$refs.processQueue) {
            yield self.$refs.processQueue.loadProcessQueuesDocument({
              pageSize: self.defaultPageSizeGrid,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'DocumentIdentity',
                    PropValue: self.selectedDocument.documentIdentity || '',
                  },
                ],
              },
              OrderByProp: {
                PropName: 'ProcessQueueId',
              },
              IsNavigationEnabled: true,
            });
          }
          if (self.$refs.processLog) {
            yield self.$refs.processLog.loadProcessLogsFromDocument({
              pageSize: self.defaultPageSizeGrid,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'ProcessQueue.Document.DocumentId',
                    PropValue: self.selectedDocument.documentId || 0,
                    IsNestedProp: true,
                  },
                ],
              },
              BaseFilterProps: {
                Props: [
                  {
                    PropName: 'Severity',
                    PropValue: 'Error',
                  },
                ],
              },
              OrderByProp: {
                PropName: 'ProcessLogId',
              },
              IsNavigationEnabled: true,
            });
          }
        }).catch(err => {
          self.$message(err || this.$t('error_loading_data'));
        });
      }
    },
    /**@description refresh translations form rules */
    refreshFormRules() {
      this.pickerOptions.shortcuts[0].text = this.$t('today');
      this.pickerOptions.shortcuts[1].text = this.$t('yesterday');
      this.pickerOptions.shortcuts[2].text = this.$t('a_week_ago');

      this.documentFormRules.documentIdentity[0].message = this.$t('document_identity_blank');
      this.documentFormRules.documentIdentity[1].message = this.$t('length_validation');
      this.documentFormRules.name[0].message = this.$t('name_blank');
      this.documentFormRules.name[1].message = this.$t('length_validation');
      this.documentFormRules.description[0].message = this.$t('description_blank');
      this.documentFormRules.description[1].message = this.$t('length_validation');
    },
    /**@description refresh translations filter options */
    refreshFilterOptions() {
      this.documentsFilterOption[0].label = this.$t('document_identity');
      this.documentsFilterOption[1].label = this.$t('number');
      this.documentsFilterOption[2].label = this.$t('name');
      this.documentsFilterOption[3].label = this.$t('description');
    },
    /**@description refresh translations grid cols */
    refreshGridCols() {
      this.documentCols[0].label = this.$t('document_identity');
      this.documentCols[1].label = this.$t('document_source');
      this.documentCols[2].label = this.$t('number');
      this.documentCols[3].label = this.$t('version');
      this.documentCols[4].label = this.$t('name');
      this.documentCols[5].label = this.$t('description');
      this.documentCols[6].label = this.$t('is_active');
      this.documentCols[7].label = this.$t('updated');
    },
    /**@description refresh translations */
    refreshTranslations() {
      // refresh translations
      this.refreshFormRules();
      this.refreshFilterOptions();
      this.refreshGridCols();
    },
    /* end generic section */

    /* begin documents grid transaction */
    /**@description document source filter change to refresh documents */
    documentSourceFilterChanged: _.debounce(function(_) {
      if (this.documentSourceFilterValue && parseInt(this.documentSourceFilterValue) != 0) {
        this.loadDocuments({
          pageSize: this.defaultPageSizeGrid,
          NavigationProperty: {
            Props: [
              {
                PropName: 'DocumentSourceId',
                PropValue: parseInt(this.documentSourceFilterValue) || 0,
              },
            ],
          },
          OrderByProp: {
            PropName: 'DocumentId',
          },
        }).then(_ => {
          if (this.$refs.documentRule) {
            this.$refs.documentRule.resetAfterSaveRules();
          }
          if (this.$refs.documentField) {
            this.$refs.documentField.resetAfterSaveDocumentFields();
          }
          if (this.$refs.documentFieldSetting) {
            this.$refs.documentFieldSetting.resetAfterSaveDocumentFieldSettings();
          }
          if (this.$refs.processQueue) {
            this.$refs.processQueue.resetAfterSaveProcessQueues();
          }
          if (this.$refs.processLog) {
            this.$refs.processLog.resetAfterSaveProcessLogs();
          }
        });
      } else this.resetAfterSave();
    }, 1000),
    /**@description protocol function resetAfterSave */
    resetAfterSave() {
      this.documentSourceFilterValue = '';
      this.resetCurrentDocument();
      this.resetDocument();

      // reload any dependents
      return new Promise((resolve, rejct) => {
        this.loadDocuments(
          {
            pageSize: this.defaultPageSizeGrid,
            OrderByProp: {
              PropName: 'DocumentId',
            },
          },
          true,
        ).then(_ => {
          if (this.$refs.documentRule) {
            this.$refs.documentRule.resetAfterSaveRules();
          }
          if (this.$refs.documentField) {
            this.$refs.documentField.resetAfterSaveDocumentFields();
          }
          if (this.$refs.documentFieldSetting) {
            this.$refs.documentFieldSetting.resetAfterSaveDocumentFieldSettings();
          }
          if (this.$refs.processQueue) {
            this.$refs.processQueue.resetAfterSaveProcessQueues();
          }
          if (this.$refs.processLog) {
            this.$refs.processLog.resetAfterSaveProcessLogs();
          }
          resolve();
        });
      });
    },
    /**@description reset form field errors */
    resetFormFields() {
      this.$children[2].$children[2].$children[0].$children[0].clearValidate();
    },
    /**@description on command handler for documents */
    onCommandDocuments(command) {
      const self = this;
      switch (command) {
        case 'copy_to_new':
          break;
        case 'export':
          break;
        case 'import':
          break;
        case 'refresh':
          this.resetAfterSave();
          break;
        case 'clearSelection':
          this.clearSelection();
          break;
        case 'new':
          this.loadingDialogDocuments = true;
          this.documentModalMode = 'create';
          this.resetCurrentDocument();
          this.loadDocumentSource(null, 'initload')
            .then(_ => {
              this.showDocumentDialog = true;
              this.loadingDialogDocuments = false;
              setTimeout(_ => {
                self.resetFormFields();
              }, 100);
            })
            .catch(_ => {
              this.$message(this.$t('error_new'));
            });
          break;
        case 'edit':
          if (Object.keys(this.selectedDocument).length > 0) {
            this.loadingDialogDocuments = true;
            this.documentModalMode = 'update';
            this.loadDocumentSource(null, 'initload')
              .then(_ => {
                this.showDocumentDialog = true;
                this.loadingDialogDocuments = false;
                setTimeout(_ => {
                  self.resetFormFields();
                }, 100);
              })
              .catch(_ => {
                this.$message(this.$t('error_editing'));
              });
          } else {
            this.$message(this.$t('select_for_edit'));
          }
          break;
        case 'delete':
          const dExisting = this.documentSource.filter(x => x.markForDelete);

          if (dExisting.length > 0) {
            const self = this;
            this.deleteList(
              JSON.parse(
                JSON.stringify(
                  dExisting.map(x => {
                    documentId: x.documentId;
                  }),
                ),
              ),
              documentApi,
            )
              .then(resp => {
                if (resp.data && resp.status == 200) {
                  this.$message(this.$t('delete_success'));

                  for (let item of dExisting.map(x => x.documentIdentity || '')) {
                    self.args.refreshTab([
                      {
                        name: 'documentDetails',
                        type: 'onCascadeNavigation',
                        navigationProperty: item,
                        mode: 'delete',
                        scope: 'full',
                      },
                    ]);
                  }
                  self.args.refreshTab([
                    {
                      name: 'documentCategories',
                      type: 'onForce',
                      mode: 'update',
                    },
                    {
                      name: 'documentCategoryDetails',
                      type: 'onCascadeNavigation',
                      mode: 'update',
                      scope: 'partial',
                    },
                  ]);
                  this.resetAfterSave().then(_ => {
                    this.documentSource = JSON.parse(JSON.stringify(this.documentSource));
                  });
                } else this.$message(this.$t('delete_error'));
              })
              .catch(_ => {
                this.$message(this.$t('delete_error'));
              });
          } else this.$message(this.$t('nothing_to_delete'));
          break;
      }
    },
    /**@description query change event handler for documents */
    documentsQueryChange: _.debounce(function(args) {
      if (args) {
        this.resetCurrentDocument();
        let submitargs = {
          page: args.page,
          pageSize: args.pageSize,
          OrderByProp: {
            PropName: 'DocumentId',
          },
        };
        if (this.documentSourceFilterValue && parseInt(this.documentSourceFilterValue) != 0) {
          submitargs.NavigationProperty = {
            Props: [
              {
                PropName: 'DocumentSourceId',
                PropValue: parseInt(this.documentSourceFilterValue) || 0,
              },
            ],
          };
        }
        if (this.documentsFilterValue != '') {
          if (args.filters[0].vals && args.filters[0].vals.length > 0) {
            let filterProps = [
              {
                PropName: this.documentsFilterValue,
                PropValue: args.filters[0].vals[0].toString(),
              },
            ];
            submitargs.FilterProps = {
              Props: filterProps,
            };
          } else {
            this.documentsFilter[0].vals = '';
          }
          this.loadDocuments(submitargs).then(() => {
            if (this.$refs.documentRule) {
              this.$refs.documentRule.resetAfterSaveRules();
            }
            if (this.$refs.documentField) {
              this.$refs.documentField.resetAfterSaveDocumentFields();
            }
            if (this.$refs.documentFieldSetting) {
              this.$refs.documentFieldSetting.resetAfterSaveDocumentFieldSettings();
            }
            if (this.$refs.processQueue) {
              this.$refs.processQueue.resetAfterSaveProcessQueues();
            }
            if (this.$refs.processLog) {
              this.$refs.processLog.resetAfterSaveProcessLogs();
            }
          });
        } else {
          //this.$message(this.$t('select_filter_col'));
          this.documentsFilter[0].vals = '';
        }
      }
    }, 1000),
    /* end documents grid transaction */
  },
  /**@description mounted lifecycle hook for component */
  mounted() {
    const self = this;
    self
      .loadDocumentSource(null, 'initload')
      .then(() => {
        self.loadDocuments(
          {
            pageSize: self.defaultPageSizeGrid,
            OrderByProp: {
              PropName: 'DocumentId',
            },
          },
          true,
        );
      })
      .catch(_ => {
        self.$message(self.$t('error_loading_data'));
      });
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

<style scoped>
.el-dialog__body {
  padding: 0px 20px;
}

.docSourceControl {
  width: 243px;
}

.switch-container {
  height: 32px;
}

.switch-container .el-switch {
  padding-top: 8px;
}
</style>
