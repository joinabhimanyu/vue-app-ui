<template>
  <div>
    <v-card contextual-style="white">
      <div slot="body">
        <el-row>
          <el-col :span="24">
            <div class="grid-content">
              <data-tables-server ref="categoryTable"
                                  :data="categorySource"
                                  :total="categoryTotal"
                                  :loading="loadingCategory"
                                  :table-props="categoryTableProps"
                                  :show-action-bar="false"
                                  :custom-filters="categoryFilter"
                                  @query-change="categoryQueryChange"
                                  @row-click="onCategoryRowClicked"
                                  @select="handleSelectionChange"
                                  @select-all="handleSelectionChange">
                <el-row slot="custom-tool-bar" style="margin-bottom:8px">
                  <el-col :span="5">
                    <el-dropdown @command="onCommandCategory">
                      <el-button type="primary">
                        <t t="actions"></t>
                        <i class="el-icon-loading" v-if="loadingDialogDocumentCategories"></i>
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="new">
                          <i class="fa fa-plus fa-fw" aria-hidden="true"></i>
                          <span style="margin-left:5px">
                            <t t="new"></t>
                          </span>
                        </el-dropdown-item>
                        <el-dropdown-item command="edit">
                          <i class="fa fa-pencil fa-fw" aria-hidden="true"></i>
                          <span style="margin-left:5px">
                            <t t="edit"></t>
                          </span>
                        </el-dropdown-item>
                        <el-dropdown-item command="delete">
                          <i class="fa fa-trash-o fa-fw" aria-hidden="true"></i>
                          <span style="margin-left:5px">
                            <t t="delete"></t>
                          </span>
                        </el-dropdown-item>
                        <el-dropdown-item command="import">
                          <i class="fa fa-upload fa-fw" aria-hidden="true"></i>
                          <span style="margin-left:5px">
                            <t t="import"></t>
                          </span>
                        </el-dropdown-item>
                        <el-dropdown-item command="clearSelection">
                          <i class="fa fa-repeat fa-fw" aria-hidden="true"></i>
                          <span style="margin-left:5px">
                            <t t="reset"></t>
                          </span>
                        </el-dropdown-item>
                        <el-dropdown-item command="refresh">
                          <i class="fa fa-refresh fa-fw" aria-hidden="true"></i>
                          <span style="margin-left:5px">
                            <t t="refresh"></t>
                          </span>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                  <el-col :span="3" :offset="10">
                    <el-select v-model="categoryFilterOption" placeholder="Select">
                      <el-option v-for="item in categoryFilterOption" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="5" :offset="1">
                    <!--@input="debounceInput"-->
                    <el-input v-model="categoryFilter[0].vals"
                              prefix-icon="el-icon-search"
                              :placeholder="$t('select_doc_categories')">
                    </el-input>
                  </el-col>
                </el-row>
                <el-table-column type="selection"
                                 reserve-selection=""
                                 width="55">
                </el-table-column>
                <el-table-column :label="categoryCols[0].label" min-width="auto">
                  <template scope="scope">
                    {{scope.row[categoryCols[0].prop]}}
                  </template>
                </el-table-column>
                <el-table-column :label="categoryCols[1].label" min-width="auto">
                  <template scope="scope">
                    {{scope.row[categoryCols[1].prop]}}
                  </template>
                </el-table-column>
                <el-table-column :label="categoryCols[2].label" min-width="auto">
                  <template scope="scope">
                    {{scope.row[categoryCols[2].prop]}}
                  </template>
                </el-table-column>
                <el-table-column :label="categoryCols[3].label" min-width="auto">
                  <template scope="scope">
                    <el-checkbox v-model="scope.row[categoryCols[3].prop]"
                                 @change="handleChange(scope.row,$event)"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column :label="categoryCols[4].label" min-width="auto">
                  <template scope="scope">
                    {{scope.row[categoryCols[4].prop]}}
                  </template>
                </el-table-column>
                <el-table-column :label="categoryCols[5].label" min-width="auto">
                  <template scope="scope">
                    {{scope.row[categoryCols[5].prop]}}
                  </template>
                </el-table-column>
                <el-table-column :label="categoryCols[6].label" min-width="auto">
                  <template scope="scope">
                    {{scope.row[categoryCols[6].prop]}}
                  </template>
                </el-table-column>
                <el-table-column label="" min-width="auto">
                  <template scope="scope">
                    <el-button type="text" @click="openCategoryDetailsTab(scope.row)">
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
            <div class="grid-content">
              <data-tables-server ref="documentsTable"
                                  :data="documentSource"
                                  :total="documentsTotal"
                                  :loading="loadingDocuments"
                                  :table-props="documentTableProps"
                                  :show-action-bar="false"
                                  :custom-filters="documentsFilter"
                                  @query-change="documentsQueryChange">
                <el-row slot="custom-tool-bar" style="margin-bottom:8px">
                  <el-col :span="4">
                    <el-button type="primary">
                      <t t="documents"></t>
                    </el-button>
                  </el-col>
                  <el-col :span="3" :offset="11">
                    <el-select v-model="documentsFilterValue" placeholder="Select">
                      <el-option v-for="item in documentsFilterOption" :key="item.value" :label="item.label" :value="item.value">
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

    <el-dialog :title="$t('document_category')"
               width="480px"
               :visible.sync="showCategoryDialog"
               :before-close="onBeforeCloseCategoryDialog">
      <el-row>
        <el-col :span="24">
          <div class="grid-content">
            <!-- form with fields for name,category and description -->
            <el-form :label-position="'right'"
                     label-width="120px"
                     :model="selectedCategory"
                     ref="categoryForm"
                     :rules="categoryFormRules"
                     status-icon="">
              <el-form-item prop="category" :label="$t('category')">
                <el-input v-model="selectedCategory.category"
                          :placeholder="$t('category')"
                          style="width:220px"></el-input>
              </el-form-item>
              <el-form-item prop="name" :label="$t('name')">
                <el-input v-model="selectedCategory.name"
                          :placeholder="$t('name')"
                          style="width:220px"></el-input>
              </el-form-item>
              <el-form-item prop="description" :label="$t('description')">
                <el-input v-model="selectedCategory.description"
                          :placeholder="$t('description')"
                          style="width:220px"></el-input>
              </el-form-item>
              <el-form-item :label="$t('show')">
                <el-checkbox v-model="selectedCategory.isActive"></el-checkbox>
              </el-form-item>
              <el-form-item prop="archiveId" :label="$t('archive')">
                <!-- autocomplete for archive -->
                <el-select v-model="selectedCategory.archiveId"
                           clearable=""
                           filterable=""
                           remote=""
                           reserve-keyword=""
                           :placeholder="$t('select_archive')"
                           :remote-method="loadArchive"
                           :loading="loadingArchive">
                  <el-option v-for="item in archiveList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item :label="$t('category_name')">
                <template v-if="selectedCategory.category!='' && selectedCategory.name!=''">
                  <span>{{selectedCategory.category}} - {{selectedCategory.name}}</span>
                </template>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCloseCategoryDialog">
          <t t="cancel"></t>
        </el-button>
        <el-button type="primary" @click="onSaveCategoryDialog">
          <t t="save"></t>
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue';
import VCard from '../../components/Card';
import UtilityMixin from '../../mixins/utilityMixin';
import { eventBus } from '../../main';
import _ from 'lodash';
import DocumentCategoriesViewModel from '../../view_models/documentCategories_viewmodel';

const categoryApi = 'documentCategory';
const getallcategoryapi = 'getallDocumentCategories';
const getalldocumentapi = 'getallDocuments';
const getallarchiveapi = 'getallArchives';

/**@author Abhimanyu Chkarborty
 * @description Document categories component
 * follows standard list compnent template with new, edit and delete
 */
export default {
  name: 'documentCategories',
  components: {
    VCard,
  },
  mixins: [DocumentCategoriesViewModel, UtilityMixin],
  props: {
    args: {
      type: Object,
      required: true,
    },
  },
  methods: {
    /* begin document grid transaction */
    /**@description handle selection change to toggle markForDelete for document categories */
    handleSelectionChange(row) {
      let viewportdata = JSON.parse(JSON.stringify(this.$refs.categoryTable.curTableData));
      if (viewportdata && viewportdata.length > 0) {
        let filtered = [];
        for (const item of viewportdata) {
          if (
            this.categorySource.filter(x => x.documentCategoryId == item.documentCategoryId)
              .length > 0
          ) {
            filtered.push(
              this.categorySource.filter(x => x.documentCategoryId == item.documentCategoryId)[0],
            );
          }
        }
        if (filtered && filtered.length > 0) {
          filtered = filtered.map(x => {
            x.markForDelete = false;
            return x;
          });
          for (const item of row) {
            if (filtered.filter(x => x.documentCategoryId == item.documentCategoryId).length > 0) {
              filtered.filter(
                x => x.documentCategoryId == item.documentCategoryId,
              )[0].markForDelete = true;
            }
          }
        }
      }
    },
    /**@description reset current document category */
    resetCurrentCategory() {
      this.selectedCategory = {};
      if (this.$refs.categoryTable) {
        this.$refs.categoryTable.$children[1].setCurrentRow(null);
      }
    },
    /**@description handle change to not edit isActive of document category */
    handleChange(row, value) {
      row.isActive = !value;
    },
    /**@description reset form fields errors for document category */
    resetFormFields() {
      this.$children[2].$children[2].$children[0].$children[0].clearValidate();
    },
    /**@description on command handler for document category */
    onCommandCategory(command) {
      const self = this;
      switch (command) {
        case 'clearSelection':
          this.clearSelection();
          break;
        case 'new':
          this.loadingDialogDocumentCategories = true;
          this.categoryModalMode = 'create';
          this.resetCurrentCategory();
          this.loadArchive(null, 'initload')
            .then(_ => {
              this.showCategoryDialog = true;
              this.loadingDialogDocumentCategories = false;
              setTimeout(_ => {
                self.resetFormFields();
              }, 100);
            })
            .catch(_ => {
              this.$message(this.$t('error_new'));
            });
          break;
        case 'edit':
          if (Object.keys(this.selectedCategory).length > 0) {
            this.loadingDialogDocumentCategories = true;
            this.categoryModalMode = 'update';
            this.loadArchive(null, 'initload')
              .then(_ => {
                this.showCategoryDialog = true;
                this.loadingDialogDocumentCategories = false;
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
          const dExisting = this.categorySource.filter(x => x.markForDelete);

          if (dExisting.length > 0) {
            this.deleteList(
              JSON.parse(
                JSON.stringify(
                  dExisting.map(x => {
                    documentCategoryId: x.documentCategoryId;
                  }),
                ),
              ),
              categoryApi,
            )
              .then(resp => {
                if (resp.data && resp.status == 200) {
                  this.$message(this.$t('delete_success'));
                  for (let item of dExisting.map(x => x.documentCategoryId)) {
                    self.args.refreshTab([
                      {
                        name: 'documentCategoryDetails',
                        type: 'onCascadeNavigation',
                        navigationProperty: item,
                        mode: 'delete',
                        scope: 'full',
                      },
                    ]);
                  }
                  this.resetAfterSave().then(_ => {
                    this.categorySource = JSON.parse(JSON.stringify(this.categorySource));
                  });
                } else this.$message(this.$t('delete_error'));
              })
              .catch(_ => {
                this.$message(this.$t('delete_error'));
              });
          } else this.$message(this.$t('nothing_to_delete'));
          break;
        case 'import':
          break;
        case 'refresh':
          this.resetAfterSave();
          break;
      }
    },
    /**@description load archive data with submitargs
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
    loadArchive(...args) {
      const query = args[0] || '';
      const target = args[1] || '';
      let submitargs = {};
      if (target != 'initload') {
        if (query && query != '') {
          submitargs = {
            FilterProps: {
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
        self.loadingArchive = true;
        this.submit(getallarchiveapi, submitargs).then(resp => {
          if (resp && resp.msg === 'success') {
            self.loadingArchive = false;
            self.archiveList = resp.data.result.map(x => {
              return {
                value: x.archiveId || 0,
                label: x.name || '',
              };
            });
            resolve();
          } else {
            self.loadingArchive = false;
            reject();
          }
        });
      });
    },
    /**@description reset category to empty with dependents */
    resetCategory(call_target = '') {
      this.categoryModalMode = '';
      this.archiveList = [];
      this.showCategoryDialog = false;
      if (call_target != 'on_close') {
        this.categorySource = [];
        this.categoryFilterValue = '';
        this.categoryFilter[0].vals = '';
      }
    },
    /**@description reset document to empty with dependents */
    resetDocument() {
      this.documentSource = [];
      this.documentsFilterValue = '';
      this.documentsFilter[0].vals = '';
    },
    /**@description protocol function resetAfterSave for document category */
    resetAfterSave() {
      this.resetCurrentCategory();
      this.resetCategory();
      this.resetDocument();
      const self = this;
      return this.loadCategory({
        pageSize: this.defaultPageSizeGrid,
        OrderByProp: {
          PropName: 'DocumentCategoryId',
        },
      });
    },
    /**@description clear selection and reset markForDelete document category */
    clearSelection() {
      if (this.$refs.categoryTable) {
        this.$refs.categoryTable.$children[1].clearSelection();
      }
      if (this.categorySource && this.categorySource.length > 0) {
        this.categorySource = this.categorySource.map(x => {
          x.markForDelete = false;
          return x;
        });
      }
    },
    /**@description save document category */
    saveCategoryDetails() {
      const self = this;
      return new Promise((resolve, reject) => {
        switch (self.categoryModalMode) {
          case 'create':
            this.saveNewCategory(this.transformToOutputCategory(this.selectedCategory))
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
            this.saveDirtyCategory(this.transformToOutputCategory(this.selectedCategory))
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
    /**@description save new document category */
    saveNewCategory(data) {
      return this.create(data, categoryApi);
    },
    /**@description save dirty document category */
    saveDirtyCategory(data) {
      return this.updateSingle(this.selectedCategory.documentCategoryId, data, categoryApi);
    },
    /**@description on before close handler for document category dialog */
    onBeforeCloseCategoryDialog(done) {
      const self = this;
      this.$confirm(self.$t('close_dialog_confirm'))
        .then(_ => {
          done();
          self.restoreSelectedCategoryToOldState();
          self.resetCategory('on_close');
        })
        .catch(_ => {});
    },
    /**@description on close handler for document category dialog  */
    onCloseCategoryDialog() {
      this.restoreSelectedCategoryToOldState();
      this.resetCategory('on_close');
    },
    /**@description restore selected document category to old state */
    restoreSelectedCategoryToOldState() {
      switch (this.categoryModalMode) {
        case 'create':
          this.resetCurrentCategory();
          break;
        case 'update':
          let edited = {};
          if (
            this.categorySource.filter(
              x => x.documentCategoryId === this.selectedCategory.documentCategoryId,
            ).length > 0
          ) {
            edited = this.categorySource.filter(
              x => x.documentCategoryId === this.selectedCategory.documentCategoryId,
            )[0];
          }
          this.selectedCategory = Object.assign({}, edited);
          break;
      }
    },
    /**@description on save document category dialog */
    onSaveCategoryDialog() {
      const self = this;
      this.$refs.categoryForm.validate(valid => {
        if (valid) {
          self.saveCategoryDetails().then(_ => {
            self.args.refreshTab([
              {
                name: 'documentCategoryDetails',
                type: 'onCascadeNavigation',
                navigationProperty: this.selectedCategory.documentCategoryId,
                mode: 'update',
                scope: 'full',
              },
            ]);
            self.resetAfterSave();
          });
        }
      });
    },
    /**@description on row click handler for document category */
    onCategoryRowClicked(row) {
      if (row) {
        this.selectedCategory = Object.assign({}, row);
        this.loadDocumentsFromCategory(
          this.$refs.documentsTable.currentPage,
          this.$refs.documentsTable.innerPageSize,
        );
      }
    },
    /**@description load categories from document data with submitargs
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
    loadDocumentsFromCategory(page, pageSize, filterProps = []) {
      const self = this;
      this.loadingDocuments = true;
      let args = {
        page: page,
        pageSize: pageSize,
        NavigationProperty: {
          Props: [
            {
              PropName: 'DocumentCategoryId',
              PropValue: this.selectedCategory.documentCategoryId,
            },
          ],
        },
        OrderByProp: {
          PropName: 'DocumentId',
        },
      };
      if (filterProps.length > 0) {
        args.FilterProps = {
          Props: filterProps,
        };
      }
      this.submit(getalldocumentapi, args)
        .then(resp => {
          self.documentSource = [...this.transformToInputDocument(resp.data.result)];
          self.documentsTotal = resp.data.total;
          self.loadingDocuments = false;
        })
        .catch(_ => {
          self.$message(self.$t('error_loading_data'));
          self.loadingDocuments = false;
        });
    },
    /**@description transform function for input document */
    transformToInputDocument(data) {
      return [
        ...data.map(x => {
          return {
            documentId: x.documentId || 0,
            documentIdentity: x.documentIdentity || '',
            number: x.number || '',
            version: x.version || '',
            documentCategoryId: x.documentCategoryId || 0,
            name: x.name || '',
            description: x.description,
            isActive: x.isActive || false,
            updated: new Date(x.updated).toLocaleDateString(),
            documentSource: x.documentSource.name || '',
            documentSourceId: x.documentSourceId || 0,
          };
        }),
      ];
    },
    /**@description transform function from input document category */
    transformToInputCategory(data) {
      return [
        ...data.map(x => {
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
            markForDelete: false,
          };
        }),
      ];
    },
    /**@description transform function for output document category */
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

    /**@description load document categories data with submitargs
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
    loadCategory(args) {
      return new Promise((resolve, reject) => {
        const self = this;
        this.loadingCategory = true;
        self.args.makeLoading(Object.assign({}, this.args), true);
        this.submit(getallcategoryapi, args).then(resp => {
          self.args.makeLoading(Object.assign({}, this.args), false);
          if (resp && resp.msg === 'success') {
            self.categorySource = [...self.transformToInputCategory(resp.data.result)];
            self.categoryTotal = resp.data.total;
            self.loadingCategory = false;
            self.clearSelection.call(self);
            this.resetCurrentCategory();
            resolve();
          } else {
            self.$message(resp.msg);
            self.loadingCategory = false;
            resolve();
          }
        });
      });
    },
    /**@description query change handler for document categories */
    categoryQueryChange: _.debounce(function(args) {
      if (args) {
        if (this.categoryFilterValue != '') {
          if (args.filters[0].vals && args.filters[0].vals.length > 0) {
            let filterProps = [
              {
                PropName: this.categoryFilterValue,
                PropValue: args.filters[0].vals[0].toString(),
              },
            ];
            this.loadCategory({
              page: args.page,
              pageSize: args.pageSize,
              FilterProps: {
                Props: filterProps,
              },
              OrderByProp: {
                PropName: 'DocumentCategoryId',
              },
            });
          } else {
            this.categoryFilter[0].vals = '';
            this.loadCategory({
              page: args.page,
              pageSize: args.pageSize,
              OrderByProp: {
                PropName: 'DocumentCategoryId',
              },
            });
          }
        } else {
          this.$message(this.$t('select_filter_col'));
          this.categoryFilter[0].vals = '';
        }
      }
    }, 1000),
    /**@description query change handler for documents */
    documentsQueryChange: _.debounce(function(args) {
      if (args) {
        if (this.documentsFilterValue != '') {
          if (args.filters[0].vals && args.filters[0].vals.length > 0) {
            var filterProps = [
              {
                PropName: this.documentsFilterValue,
                PropValue: args.filters[0].vals[0].toString(),
              },
            ];
            this.loadDocumentsFromCategory(args.page, args.pageSize, filterProps);
          } else {
            this.documentsFilter[0].vals = '';
            this.loadDocumentsFromCategory(args.page, args.pageSize);
          }
        } else {
          this.$message(this.$t('select_filter_col'));
          this.documentsFilter[0].vals = '';
        }
      }
    }, 1000),
    /**@description open document category details tab */
    /* end document grid transaction */
    openCategoryDetailsTab(row) {
      // open category details vue from flatjson
      this.redirectHandler('documentCategoryDetails', {
        type: 'onCascadeNavigation',
        additionalParam: {
          navigationProperty: row.documentCategoryId,
        },
      });
    },
    /**@description open document details tab */
    openDocumentDetailsTab(row) {
      // open document details vue from flatjson
      this.redirectHandler('documentDetails', {
        type: 'onCascadeNavigation',
        additionalParam: {
          navigationProperty: row.documentId,
        },
      });
    },
    /**@description refresh translatinos */
    refreshTranslations() {
      this.categoryFormRules.category[0].message = this.$t('category_blank');
      this.categoryFormRules.category[1].message = this.$t('length_validation');
      this.categoryFormRules.name[0].message = this.$t('name_blank');
      this.categoryFormRules.name[1].message = this.$t('length_validation');
      this.categoryFormRules.description[0].message = this.$t('description_blank');
      this.categoryFormRules.description[1].message = this.$t('length_validation');
      this.categoryCols[0].label = this.$t('category');
      this.categoryCols[0].label = this.$t('name');
      this.categoryCols[0].label = this.$t('description');
      this.categoryCols[0].label = this.$t('show');
      this.categoryCols[0].label = this.$t('documents');
      this.categoryCols[0].label = this.$t('archive');
      this.categoryCols[0].label = this.$t('updated');
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
    this.loadCategory({
      page: this.$refs.categoryTable.currentPage,
      pageSize: this.$refs.categoryTable.innerPageSize,
      OrderByProp: {
        PropName: 'DocumentCategoryId',
      },
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
