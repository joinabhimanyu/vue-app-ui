<template>
    <div>
        <v-card contextual-style="white">
            <div slot="body">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content">
                            <el-dropdown @command="onCommandCategory">
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
                        <el-form v-loading="loadingCategory"
                                     :label-position="'right'"
                                     label-width="120px"
                                     :model="category"
                                     ref="categoryForm"
                                     :rules="categoryFormRules"
                                     size="mini"
                                     status-icon>
                                <el-row>
                                    <el-col :span="13">
                                        <el-form-item prop="category" :label="$t('category')">
                                            <el-input v-model="category.category" :placeholder="$t('enter_category')" style="width:250px" @change="fieldChanged"></el-input>
                                        </el-form-item>
                                        <el-form-item prop="name" :label="$t('name')">
                                            <el-input v-model="category.name" :placeholder="$t('enter_name')" style="width:250px" @change="fieldChanged"></el-input>
                                        </el-form-item>
                                        <el-form-item prop="description" :label="$t('description')">
                                            <el-input v-model="category.description" :placeholder="$t('enter_description')" style="width:250px" @change="fieldChanged"></el-input>
                                        </el-form-item>
                                        <el-form-item :label="$t('show')">
                                            <el-checkbox v-model="category.isActive" @change="fieldChanged"></el-checkbox>
                                        </el-form-item>
                                        <el-form-item prop="archiveId" :label="$t('archive')">
                                            <!-- autocomplete for archive -->
                                            <el-select v-model="category.archiveId"
                                                       clearable
                                                       filterable
                                                       remote
                                                       reserve-keyword
                                                       style="width:250px"
                                                       :placeholder="$t('select_archive')"
                                                       :remote-method="loadArchiveList"
                                                       :loading="loadingArchiveList"
                                                       @change="fieldChanged">
                                                <el-option v-for="item in archiveList"
                                                           :key="item.value"
                                                           :label="item.label"
                                                           :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item :label="$t('created')">
                                            <span>{{category.created}}</span>
                                        </el-form-item>
                                        <el-form-item :label="$t('created_by')">
                                            <span>{{category.createdBy}}</span>
                                        </el-form-item>
                                        <el-form-item :label="$t('updated')">
                                            <span>{{category.updated}}</span>
                                        </el-form-item>
                                        <el-form-item :label="$t('updated_by')">
                                            <span>{{category.updatedBy}}</span>
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
                        <span><t t="documents"></t></span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content">
                            <data-tables-server ref="documentsTable"
                                                :data="documentSource"
                                                :total="documentsTotal"
                                                :loading="loadingDocuments"
                                                :table-props="documentTableProps"
                                                :show-action-bar="false"
                                                :custom-filters="documentsFilter"
                                                @query-change="documentsQueryChange"
                                                @row-click="onDocumentRowClicked"
                                                @select="handleSelectionChange"
                                                @select-all="handleSelectionChange">
                                <el-row slot="custom-tool-bar" style="margin-bottom:8px">
                                    <el-col :span="5">
                                        <el-dropdown @command="onCommandDocuments">
                                            <el-button type="primary"><t t="actions"></t>
                                            <i class="el-icon-loading" v-if="loadingDialogDocuments"></i>
                                            <i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item command="new"><i class="fa fa-plus fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="new"></t></span></el-dropdown-item>
                                                <el-dropdown-item command="edit"><i class="fa fa-pencil fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="edit"></t></span></el-dropdown-item>
                                                <el-dropdown-item command="delete"><i class="fa fa-trash-o fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="delete"></t></span></el-dropdown-item>
                                                <el-dropdown-item command="import"><i class="fa fa-upload fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="import"></t></span></el-dropdown-item>
                                                <el-dropdown-item command="clearSelection"><i class="fa fa-repeat fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="reset"></t></span></el-dropdown-item>
                                                <el-dropdown-item command="refresh"><i class="fa fa-refresh fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="refresh"></t></span></el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </el-col>
                                    <el-col :span="3" :offset="10">
                                        <el-select v-model="documentsFilterOption" placeholder="Select">
                                            <el-option v-for="item in documentsFilterValue" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="5" :offset="1">
                                        <el-input v-model="documentsFilter[0].vals"
                                                  prefix-icon="el-icon-search"
                                                  :placeholder="$t('search_documents')">
                                        </el-input>
                                    </el-col>
                                </el-row>
                                <el-table-column type="selection"
                                                 reserve-selection
                                                 width="55">
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
                                        <el-checkbox v-model="scope.row[documentCols[6].prop]"
                                                     @change="handleChange(scope.row,$event)"></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="documentCols[7].label" min-width="auto">
                                    <template scope="scope">
                                        {{scope.row[documentCols[7].prop]}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="" min-width="auto">
                                    <template scope="scope">
                                        <el-button type="text" @click="openDocumentDetailsTab(scope.row)">
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

        <el-dialog :title="$t('document')"
                   width="822px"
                   :visible.sync="showDocumentDialog"
                   :before-close="onBeforeCloseDocumentDialog">
            <el-row>
                <el-col :span="24">
                    <el-form :label-position="'right'"
                             label-width="125px"
                             :model="selectedDocument"
                             ref="documentForm"
                             :rules="documentFormRules"
                             status-icon>
                        <el-col :span="12">
                            <el-form-item prop="documentIdentity" :label="$t('document_identity')">
                                <el-input v-model="selectedDocument.documentIdentity" :placeholder="$t('enter_document_identity')" style="width:220px"></el-input>
                            </el-form-item>
                            <el-form-item prop="documentSourceId" :label="$t('document_source')">
                                <!--autocomplete for documentSourceList-->
                                <el-select v-model="selectedDocument.documentSourceId"
                                           clearable
                                           filterable
                                           remote
                                           reserve-keyword
                                           :placeholder="$t('select_document_source')"
                                           :remote-method="loadDocumentSource"
                                           :loading="loadingDocumentSource"
                                           @change="documentSourceChanged">
                                    <el-option v-for="item in documentSourceList"
                                               :key="item.value"
                                               :label="item.label"
                                               :value="item.value">
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
                                <el-date-picker v-model="selectedDocument.created"
                                                type="datetime"
                                                :placeholder="$t('select_created')"
                                                size="small"
                                                :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item prop="updated" :label="$t('updated_by')">
                                <el-date-picker v-model="selectedDocument.updated"
                                                type="datetime"
                                                :placeholder="$t('select_updated')"
                                                size="small"
                                                :picker-options="pickerOptions">
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
import VCard from '../../components/Card';
import UtilityMixin from '../../mixins/utilityMixin';
import DocumentsMixin from '../../mixins/documentsMixin';
import { eventBus } from '../../main';
import _ from 'lodash';
import DocumentCategoryDetailsViewModel from '../../view_models/documentCategoryDetails_viewmodel';

const categoryApi = 'documentCategory';
const getallarchiveapi = 'getallArchives';
const documentApi = 'document';
const getalldocumentapi = 'getallDocuments';

/**@author Abhimanyu Chkarborty
 * @description Document category details component
 * follows standard details compnent template with new, edit and CRUD of dependents
 */
export default {
  name: 'documentCategoryDetails',
  components: {
    VCard,
  },
  mixins: [DocumentCategoryDetailsViewModel, UtilityMixin, DocumentsMixin],
  props: {
    args: {
      type: Object,
      required: true,
    },
  },
  methods: {
    /**@description field change handler for firing makeDirty event */
    fieldChanged() {
      this.args.makeDirty(Object.assign({}, this.args), true);
    },
    /**@description reset form field errors for document category details */
    resetFormFields() {
      this.$children[2].$children[2].$children[0].$children[0].clearValidate();
    },
    /**@description on command handler for document category details */
    onCommandCategory(command) {
      switch (command) {
        case 'save':
          if (this.args.isDirty(this.args)) {
            this.saveCategoryToDB();
          } else this.$message(this.$t('no_pending_changes'));
          break;
        case 'refresh':
          this.args.makeDirty(Object.assign({}, this.args), false);
          this.resetAfterSave();
          break;
      }
    },
    /**@description on command handler for documents */
    onCommandDocuments(command) {
      const self = this;
      switch (command) {
        case 'import':
          break;
        case 'refresh':
          this.loadDocuments({
            page: this.$refs.documentsTable.currentPage,
            pageSize: this.$refs.documentsTable.innerPageSize,
            NavigationProperty: {
              Props: [
                {
                  PropName: 'DocumentCategoryId',
                  PropValue: this.args.navigationProperty,
                },
              ],
            },
            OrderByProp: {
              PropName: 'DocumentId',
            },
          });
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
                  // refresh documentDetails onCascadeNavigation full delete,
                  //documentCategories onForce udpate and documents onForce update
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
                      name: 'documents',
                      type: 'onForce',
                      mode: 'update',
                    },
                  ]);
                  this.loadDocuments({
                    page: this.$refs.documentsTable.currentPage,
                    pageSize: this.$refs.documentsTable.innerPageSize,
                    NavigationProperty: {
                      Props: [
                        {
                          PropName: 'DocumentCategoryId',
                          PropValue: this.args.navigationProperty,
                        },
                      ],
                    },
                    OrderByProp: {
                      PropName: 'DocumentId',
                    },
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
    /**@description reset current document category details */
    resetCurrentCategory() {
      this.category = {};
      this.archiveList = [];
    },
    /**@description protocol function resetAfterSave for document category details */
    resetAfterSave() {
      this.resetCurrentCategory();
      this.resetCurrentDocument();
      this.resetDocument();
      const self = this;
      return this.loadCategoryDetails();
    },
    /**@description save document category details */
    saveCategoryToDB() {
      const self = this;
      self
        .saveToDB()
        .then(_ => {
          self.$message(self.$t('save_success'));
          self.args.refreshTab([
            {
              name: 'documentCategories',
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
    /**@description save category details */
    saveCategorDetails() {
      const data = this.transformToOutputCategory(this.category);
      return this.updateSingle(this.args.navigationProperty, data, categoryApi);
    },
    /**@description protocol function saveToDB */
    saveToDB() {
      const self = this;
      return new Promise((resolve, reject) => {
        self.$refs.categoryForm.validate(valid => {
          if (valid) {
            self
              .saveCategorDetails()
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

    /**@description load category details data with submitargs
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
    loadCategoryDetails() {
      const self = this;
      return new Promise((resolve, reject) => {
        self.loadingCategory = true;
        self.args.makeLoading(Object.assign({}, self.args), true);

        self.find(self.args.navigationProperty, `${categoryApi}`).then(resp => {
          self.args.makeLoading(Object.assign({}, self.args), false);
          if (resp && resp.msg === 'success') {
            self.category = self.transformToInputCategory(resp.data);
            self.$refs.categoryForm.clearValidate();

            self
              .loadArchiveList(null, 'initload')
              .then(_ => {
                self.loadingCategory = false;
                self
                  .loadDocuments({
                    page: self.$refs.documentsTable.currentPage,
                    pageSize: self.$refs.documentsTable.innerPageSize,
                    NavigationProperty: {
                      Props: [
                        {
                          PropName: 'DocumentCategoryId',
                          PropValue: self.args.navigationProperty,
                        },
                      ],
                    },
                    OrderByProp: {
                      PropName: 'DocumentId',
                    },
                  })
                  .then(_ => {
                    resolve();
                  })
                  .catch(_ => {
                    resolve();
                  });
              })
              .catch(_ => {
                self.$message(self.$t('error_loading_data'));
                self.loadingCategory = false;
                resolve();
              });
          } else {
            self.$message(self.$t('error_loading_data'));
            self.loadingCategory = false;
            resolve();
          }
        });
      });
    },

    /**@description load archive list data with submitargs
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
    loadArchiveList(...args) {
      const query = args[0] || '';
      const target = args[1] || '';
      let submitargs = {};
      const self = this;
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
        self.loadingArchiveList = true;
        self.submit(getallarchiveapi, submitargs).then(resp => {
          if (resp && resp.msg === 'success') {
            self.loadingArchiveList = false;
            self.archiveList = resp.data.result.map(x => {
              return {
                value: x.archiveId || 0,
                label: x.name || '',
              };
            });
            resolve();
          } else {
            self.loadingArchiveList = false;
            reject();
          }
        });
      });
    },
    /**@description query change event handler for documents */
    documentsQueryChange: _.debounce(function(args) {
      if (args) {
        if (this.documentsFilterValue != '') {
          if (args.filters[0].vals.length > 0) {
            let filerProps = [
              {
                PropName: this.documentsFilterValue,
                PropValue: args.filters[0].vals[0].toString(),
              },
            ];
            this.loadDocuments({
              page: args.page,
              pageSize: args.pageSize,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'DocumentCategoryId',
                    PropValue: this.args.navigationProperty,
                  },
                ],
              },
              FilterProps: {
                Props: filterProps,
              },
              OrderByProp: {
                PropName: 'DocumentId',
              },
            });
          } else {
            this.documentsFilter[0].vals = '';
            this.loadDocuments({
              page: args.page,
              pageSize: args.pageSize,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'DocumentCategoryId',
                    PropValue: this.args.navigationProperty,
                  },
                ],
              },
              OrderByProp: {
                PropName: 'DocumentId',
              },
            });
          }
        } else {
          this.$message(this.$t('select_filter_col'));
          this.documentsFilter[0].vals = '';
        }
      }
    }, 1000),
    /**@description transform function for input document category details */
    transformToInputCategory(x) {
      return {
        documentCategoryId: x.documentCategoryId || 0,
        archiveId: x.archiveId || 0,
        category: x.category || '',
        name: x.name || '',
        description: x.description || '',
        isActive: x.isActive,
        created: new Date(x.created).toLocaleDateString(),
        createdBy: x.createdBy,
        updated: new Date(x.updated).toLocaleDateString(),
        updatedBy: x.updatedBy,
        document: x.document.length || 0,
        archive: x.archive.name || '',
      };
    },
    /**@description transfrom function for output category details */
    transformToOutputCategory(x) {
      return {
        documentCategoryId: x.documentCategoryId || 0,
        archiveId: x.archiveId || 0,
        category: x.category || '',
        name: x.name || '',
        description: x.description || '',
        isActive: x.isActive,
        createdBy: x.createdBy,
        updatedBy: x.updatedBy,
        created: x.created,
        updated: x.updated,
      };
    },
    /**@description refresh translations */
    refreshTranslations() {
      this.pickerOptions.shortcuts[0].text = this.$t('today');
      this.pickerOptions.shortcuts[1].text = this.$t('yesterday');
      this.pickerOptions.shortcuts[2].text = this.$t('a_week_ago');
      this.categoryFormRules.category[0].message = this.$t('category_blank');
      this.categoryFormRules.category[1].message = this.$t('length_validation');
      this.categoryFormRules.name[0].message = this.$t('name_blank');
      this.categoryFormRules.name[1].message = this.$t('length_validation');
      this.categoryFormRules.description[0].message = this.$t('description_blank');
      this.categoryFormRules.description[1].message = this.$t('length_validation');
      this.documentFormRules.documentIdentity[0].message = this.$t('document_identity_blank');
      this.documentFormRules.documentIdentity[1].message = this.$t('length_validation');
      this.documentFormRules.number[0].message = this.$t('number_blank');
      this.documentFormRules.number[1].message = this.$t('length_validation');
      this.documentFormRules.version[0].message = this.$t('version_blank');
      this.documentFormRules.version[1].message = this.$t('length_validation');
      this.documentFormRules.name[0].message = this.$t('name_blank');
      this.documentFormRules.name[1].message = this.$t('length_validation');
      this.documentFormRules.description[0].message = this.$t('description_blank');
      this.documentFormRules.description[1].message = this.$t('length_validation');
      this.documentFormRules.created[0].message = this.$t('created_blank');
      this.documentFormRules.updated[0].message = this.$t('updated_blank');
      this.documentFormRules.updatedBy[0].message = this.$t('updated_by_blank');
      this.documentCols[0].label = this.$t('document_identity');
      this.documentCols[0].label = this.$t('document_source');
      this.documentCols[0].label = this.$t('number');
      this.documentCols[0].label = this.$t('version');
      this.documentCols[0].label = this.$t('name');
      this.documentCols[0].label = this.$t('description');
      this.documentCols[0].label = this.$t('is_active');
      this.documentCols[0].label = this.$t('updated');
    },
  },
  /**@description mounted lifecycle hook for component */
  mounted() {
    if (this.args.navigationProperty != null && this.args.navigationProperty != undefined) {
      this.loadCategoryDetails();
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

<style scoped>
.el-dialog__body {
  padding: 0px 20px;
}
</style>
