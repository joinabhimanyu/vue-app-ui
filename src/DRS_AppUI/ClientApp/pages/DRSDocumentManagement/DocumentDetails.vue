<template>
    <!--<p>document details {{args.documentId}}</p>-->
    <div>
        <v-card contextual-style="white">
            <div slot="body">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content">
                            <el-dropdown @command="onCommandDocument">
                                <el-button type="primary"><t t="actions"></t><i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="save"><i class="fa fa-floppy-o fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="save"></t></span></el-dropdown-item>
                                    <el-dropdown-item command="refresh"><i class="fa fa-refresh fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="refresh"></t></span></el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                       <el-form v-loading="loadingDocument"
                                     :label-position="'right'"
                                     label-width="158px"
                                     :model="document"
                                     ref="documentForm"
                                     :rules="documentFormRules"
                                     size="mini"
                                     status-icon>
                                <el-row>
                                  <el-col :span="12">
                                    <el-form-item prop="documentIdentity" :label="$t('documentIdentity')">
                                            <el-input v-model="document.documentIdentity" 
                                            :placeholder="$t('enter_document_identity')" 
                                            style="width:250px" @change="documentFormFieldChanged"></el-input>
                                        </el-form-item>
                                        <el-form-item prop="number" :label="$t('number')">
                                            <el-input v-model="document.number" 
                                            :placeholder="$t('enter_number')" 
                                            style="width:250px" @change="documentFormFieldChanged"></el-input>
                                        </el-form-item>
                                        <el-form-item prop="version" :label="$t('version')">
                                            <el-input v-model="document.version" 
                                            :placeholder="$t('enter_version')" 
                                            style="width:250px" @change="documentFormFieldChanged"></el-input>
                                        </el-form-item>
                                        <el-form-item prop="pages" :label="$t('pages')">
                                            <el-input v-model="document.pages" 
                                            :placeholder="$t('enter_pages')" 
                                            style="width:250px" @change="documentFormFieldChanged"></el-input>
                                        </el-form-item>
                                         <el-form-item prop="documentTemplateId" 
                                         :label="$t('document_template_id')">
                                            <el-input v-model="document.documentTemplateId" 
                                            :placeholder="$t('enter_documentTemplate_id')" 
                                            style="width:250px" @change="documentFormFieldChanged"></el-input>
                                        </el-form-item>
                                        <el-form-item prop="companyCode" :label="$t('company_code')">
                                            <el-input v-model="document.companyCode" 
                                            :placeholder="$t('enter_company_code')" 
                                            style="width:250px" @change="documentFormFieldChanged"></el-input>
                                        </el-form-item>
                                        <el-form-item prop="batchClass" :label="$t('batch_class')">
                                            <el-input v-model="document.batchClass" 
                                            :placeholder="$t('enter_batch_class')" 
                                            style="width:250px" @change="documentFormFieldChanged"></el-input>
                                        </el-form-item>
                                  </el-col>
                                  <el-col :span="12">
                                        <el-form-item prop="exportFileType" :label="$t('export_file_type')">
                                            <el-input v-model="document.exportFileType" 
                                            :placeholder="$t('enter_export_filetype')" 
                                            style="width:250px" @change="documentFormFieldChanged"></el-input>
                                        </el-form-item>
                                        <el-form-item prop="name" :label="$t('name')">
                                            <el-input v-model="document.name" 
                                            :placeholder="$t('enter_name')" 
                                            style="width:250px" @change="documentFormFieldChanged"></el-input>
                                        </el-form-item>
                                        <el-form-item prop="description" :label="$t('description')">
                                            <el-input v-model="document.descriptionname" 
                                            :placeholder="$t('enter_description')" 
                                            style="width:250px" @change="documentFormFieldChanged"></el-input>
                                        </el-form-item>
                                        <el-form-item :label="$t('is_active')">
                                            <el-checkbox v-model="document.isActive" @change="documentFormFieldChanged"></el-checkbox>
                                        </el-form-item>
                                        <el-form-item prop="link" :label="$t('pdf_template_url')">
                                            <el-input v-model="document.link" 
                                            :placeholder="$t('enter_pdf_template_url')" 
                                            style="width:250px" @change="documentFormFieldChanged"></el-input>
                                        </el-form-item>
                                        <el-form-item prop="documentCategoryId" :label="$t('document_category')">
                                            <!-- autocomplete for document category -->
                                            <el-select v-model="document.documentCategoryId"
                                                       clearable
                                                       filterable
                                                       remote
                                                       reserve-keyword
                                                       style="width:250px"
                                                       :placeholder="$t('select_document_category')"
                                                       :remote-method="loadDocumentCategory"
                                                       :loading="loadingDocumentCategoryList"
                                                       @change="documentFormFieldChanged">
                                                <el-option v-for="item in documentCategoryList"
                                                           :key="item.value"
                                                           :label="item.label"
                                                           :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item prop="documentSourceId" :label="$t('document_source')">
                                            <!-- autocomplete for document source -->
                                            <el-select v-model="document.documentSourceId"
                                                       clearable
                                                       filterable
                                                       remote
                                                       reserve-keyword
                                                       style="width:250px"
                                                       :placeholder="$t('select_document_source')"
                                                       :remote-method="loadDocumentSource"
                                                       :loading="loadingDocumentSourceList"
                                                       @change="documentFormFieldChanged">
                                                <el-option v-for="item in documentSourceList"
                                                           :key="item.value"
                                                           :label="item.label"
                                                           :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                  </el-col>
                                </el-row>
                            </el-form>
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
                     <document-rule ref="documentRule" :navigationProperty="document.documentIdentity||''"></document-rule>
                   </el-tab-pane>
                   <el-tab-pane :label="$t('fields')" name="fields">
                     <document-field ref="documentField" :navigationProperty="document.documentIdentity||''" :parentContext="this"></document-field>
                   </el-tab-pane>
                   <el-tab-pane :label="$t('settings')" name="settings">
                     <document-field-setting ref="documentFieldSetting" :navigationProperty="document.documentIdentity||''"></document-field-setting>
                   </el-tab-pane>
                   <el-tab-pane :label="$t('process_queues')" name="process_queues">
                      <process-queue ref="processQueue" :navigationProperty="document.documentIdentity||''"></process-queue>
                   </el-tab-pane>
                </el-tabs>
              </el-col>
            </el-row>
          </div>
        </v-card>

    </div>
</template>

<script>
import Vue from 'vue';
import VCard from '../../components/Card';
import documentRule from '../../components/DocumentRule';
import documentField from '../../components/DocumentField';
import documentFieldSetting from '../../components/DocumentFieldSetting';
import processQueue from '../../components/ProcessQueue';
import UtilityMixin from '../../mixins/utilityMixin';
import { eventBus } from '../../main';
import DocumentDetailsViewModel from '../../view_models/documentDetails_viewmodel';

const documentApi = 'document';
const getSingleDocumentApi = 'getSingleDocument';
const getAllDocumentSourceApi = 'getallDocumentSources';
const getAllDocumentCategoryApi = 'getallDocumentCategories';

/**@author Abhimanyu Chkarborty
 * @description Document details component
 * follows standard details compnent template with new, edit and CRUD of dependents
 */
export default {
  name: 'documentDetails',
  components: {
    VCard,
    documentRule,
    documentField,
    documentFieldSetting,
    processQueue,
  },
  mixins: [DocumentDetailsViewModel, UtilityMixin],
  props: {
    args: {
      type: Object,
      required: true,
    },
  },
  methods: {
    /**@description reset current document */
    resetCurrentDocument() {
      this.document = {};
      this.documentCategoryList = [];
      this.documentSourceList = [];
    },
    /**@description protocol function resetAfterSave */
    resetAfterSave() {
      this.resetCurrentDocument();
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
      this.loadDocumentDetails();
    },
    /**@description save documents to db */
    saveDocumentToDB() {
      const self = this;
      self
        .saveToDB()
        .then(_ => {
          self.$message(self.$t('save_success'));
          self.args.refreshTab([
            {
              name: 'documents',
              type: 'onForce',
              mode: 'update',
            },
          ]);
          self.resetAfterSave();
        })
        .catch(err => {
          if (err.status != 200 && err.status != 401) {
            self.$message(self.$t('save_error'));
          }
        });
    },
    /**@description save document details */
    saveDocumentDetails() {
      const data = this.transformToOutputDocument(this.document);
      return this.updateSingle(data.documentId || 0, data, documentApi);
    },
    /**@description protocol function saveToDB */
    saveToDB() {
      const self = this;
      return new Promise((resolve, reject) => {
        self.$refs.documentForm.validate(valid => {
          if (valid) {
            self
              .saveDocumentDetails()
              .then(_ => {
                self.args.makeDirty(Object.assign({}, this.args), false);
                resolve();
              })
              .catch(err => {
                reject(err);
              });
          } else reject({ status: 401 });
        });
      });
    },
    /**@description on command handler for documents */
    onCommandDocument(command) {
      switch (command) {
        case 'save':
          if (this.args.isDirty(this.args)) {
            this.saveDocumentToDB();
          } else this.$message(this.$t('no_pending_changes'));
          break;
        case 'refresh':
          this.args.makeDirty(Object.assign({}, this.args), false);
          this.resetAfterSave();
          break;
      }
    },
    /**@description field change handler for firing makeDirty event */
    documentFormFieldChanged() {
      this.args.makeDirty(Object.assign({}, this.args), true);
    },

    /**@description load document category data with submitargs
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
    loadDocumentCategory(...args) {
      const query = args[0] || '';
      const target = args[1] || '';
      let submitargs = {};
      if (target != 'initload') {
        if (query && query != '') {
          submitargs = {
            filterProps: {
              Props: [
                {
                  PropName: 'Name',
                  PropValue: query && query != '' ? query.toString().toLowerCase() : '',
                },
              ],
            },
          };
        }
      }
      return new Promise((resolve, reject) => {
        const self = this;
        self.loadingDocumentCategoryList = true;
        this.submit(getAllDocumentCategoryApi, submitargs).then(resp => {
          if (resp && resp.msg === 'success') {
            self.loadingDocumentCategoryList = false;
            self.documentCategoryList = resp.data.result.map(x => {
              return {
                value: x.documentCategoryId || 0,
                label: x.name || '',
              };
            });
            resolve();
          } else {
            self.loadingDocumentCategoryList = false;
            reject();
          }
        });
      });
    },

    /**@description load document source data with submitargs
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
    loadDocumentSource(...args) {
      const query = args[0] || '';
      const target = args[1] || '';
      let submitargs = {};
      if (target != 'initload') {
        if (query && query != '') {
          submitargs = {
            filterProps: {
              Props: [
                {
                  PropName: 'Name',
                  PropValue: query && query != '' ? query.toString().toLowerCase() : '',
                },
              ],
            },
          };
        }
      }
      return new Promise((resolve, reject) => {
        const self = this;
        self.loadingDocumentSourceList = true;
        this.submit(getAllDocumentSourceApi, submitargs).then(resp => {
          if (resp && resp.msg === 'success') {
            self.loadingDocumentSourceList = false;
            self.documentSourceList = resp.data.result.map(x => {
              return {
                value: x.documentSourceId || 0,
                label: x.name || '',
              };
            });
            resolve();
          } else {
            self.loadingDocumentSourceList = false;
            reject();
          }
        });
      });
    },
    /**@description load dependent entities on document:
     * 1:loadRulesFromDocument
     * 2:loadDocumentFieldsFromDocument
     * 3:loadDocumentFieldSettingsFromDocument
     * 4:loadProcessQueuesDocument
     */
    loadDocumentDependents() {
      return new Promise((resolve, reject) => {
        try {
          if (this.document && this.document.documentId && this.document.documentIdentity) {
            if (this.$refs.documentRule) {
              this.$refs.documentRule
                .loadRulesFromDocument({
                  pageSize: this.defaultPageSizeGrid,
                  NavigationProperty: {
                    Props: [
                      {
                        PropName: 'DocumentIdentity',
                        PropValue: this.document.documentIdentity || '',
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
                              PropValue: this.document.documentIdentity || '',
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
                                    PropValue: this.document.documentIdentity || '',
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
                                          PropValue: this.document.documentIdentity || '',
                                        },
                                      ],
                                    },
                                    OrderByProp: {
                                      PropName: 'ProcessQueueId',
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
          }
        } catch (error) {
          resolve(error);
        }
      });
    },
    /**@description load document details data with submitargs
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
    loadDocumentDetails() {
      const self = this;
      return new Promise((resolve, reject) => {
        self.loadingDocument = true;
        // loading of all dependents
        if (self.$refs.documentRule) {
          self.$refs.documentRule.loadingRules = true;
        }
        if (self.$refs.documentField) {
          self.$refs.documentField.loadingDocumentFields = true;
        }
        if (self.$refs.documentFieldSetting) {
          self.$refs.documentFieldSetting.loadingDocumentFieldSettings = true;
        }
        if (self.$refs.processQueue) {
          self.$refs.processQueue.loadingProcessQueues = true;
        }
        self.args.makeLoading(Object.assign({}, this.args), true);
        const submitargs = {
          FilterProps: {
            Props: [
              {
                PropName: 'DocumentIdentity',
                PropValue: self.args.navigationProperty || '', //16SPP5012
              },
            ],
          },
          IsNavigationEnabled: true,
        };
        this.submit(getSingleDocumentApi, submitargs)
          .then(resp => {
            self.args.makeLoading(Object.assign({}, this.args), false);
            self.loadingDocument = false;
            if (resp && resp.msg == 'success') {
              self.document = self.transformToInputDocument(resp.data);
              self.$refs.documentForm.clearValidate();
              self.loadDocumentCategory(null, 'initload').then(_ => {
                self.loadDocumentSource(null, 'initload').then(_ => {
                  self.loadDocumentDependents();
                });
              });
            }
          })
          .catch(_ => {
            self.$message(self.$t('error_loading_data'));
            self.loadingDocument = false;
            resolve();
          });
      });
    },
    /**@description transform function for input document */
    transformToInputDocument(x = {}) {
      return {
        documentId: x.documentId || 0,
        documentIdentity: x.documentIdentity || '',
        documentSourceId: x.documentSourceId || 0,
        documentSource: x.documentSource.name || '',
        documentCategoryId: x.documentCategoryId || 0,
        documentCategory: x.documentCategory.name || '',
        number: x.number || '',
        version: x.version || '',
        name: x.name || '',
        description: x.description,
        pages: x.pages,
        companyCode: x.companyCode || '',
        batchClass: x.batchClass || '',
        link: x.link || '',
        isActive: x.isActive || false,
        documentTemplateId: x.documentTemplateId || 0,
        exportFileType: x.exportFileType || '',
        created: new Date(x.created).toLocaleDateString(),
        createdBy: x.createdBy,
        updated: new Date(x.updated).toLocaleDateString(),
        updatedBy: x.updatedBy,
        stamp: x.stamp || '',
        documentRule: JSON.parse(JSON.stringify(x.documentRule)),
      };
    },
    /**@description transform function for output document */
    transformToOutputDocument(x = {}) {
      return {
        documentId: x.documentId || 0,
        documentIdentity: x.documentIdentity || '',
        number: x.number || '',
        version: x.version || '',
        name: x.name || '',
        description: x.description,
        pages: x.pages,
        companyCode: x.companyCode || '',
        batchClass: x.batchClass || '',
        exportFileType: x.exportFileType || '',
        link: x.link || '',
        documentTemplateId: x.documentTemplateId || 0,
        documentCategoryId: x.documentCategoryId || 0,
        documentSourceId: x.documentSourceId || 0,
        isActive: x.isActive || false,
        created: new Date(x.created).toLocaleDateString(),
        updated: new Date(x.updated).toLocaleDateString(),
        createdBy: x.createdBy,
        updatedBy: x.updatedBy,
        stamp: x.stamp || '',
      };
    },
    /**@description refresh translations for form rules */
    refreshFormRules() {
      this.documentFormRules.documentIdentity[0].message = this.$t('document_identity_blank');
      this.documentFormRules.documentIdentity[1].message = this.$t('length_validation');
      this.documentFormRules.name[0].message = this.$t('name_blank');
      this.documentFormRules.name[1].message = this.$t('length_validation');
      this.documentFormRules.description[0].message = this.$t('description_blank');
      this.documentFormRules.description[1].message = this.$t('length_validation');
    },
    /**@description refresh translations for filte options */
    refreshFilterOptions() {
      this.documentsFilterOption[0].label = this.$t('document_identity');
      this.documentsFilterOption[1].label = this.$t('number');
      this.documentsFilterOption[2].label = this.$t('name');
      this.documentsFilterOption[3].label = this.$t('description');
    },
    /**@description refresh translations for grid cols */
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
      this.refreshFormRules();
      this.refreshFilterOptions();
      this.refreshGridCols();
    },
  },

  /**@description mounted lifecycle hook for component */
  mounted() {
    if (this.args.navigationProperty != null && this.args.navigationProperty != undefined) {
      this.loadDocumentDetails();
    } else {
      this.$message(this.$t('invalid_navigation_record'));
    }
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
