const getalldocumentapi = 'getallDocuments';
const getalldocumentsourceapi = 'getallDocumentSources';
const documentApi = 'document';

/** @author Abhimanyu Chkarborty
 * @description common functions for Document.vue and DocumentCategoryDetails.vue component
 */
export default {
  methods: {
    /* begin document grid transaction */
    /** @description handle selection change for toggling markForDelete documents */
    handleSelectionChange(row) {
      const viewportdata = JSON.parse(JSON.stringify(this.$refs.documentsTable.curTableData));
      if (viewportdata && viewportdata.length > 0) {
        let filtered = [];
        viewportdata.forEach((item) => {
          if (this.documentSource.filter(x => x.documentId === item.documentId).length > 0) {
            filtered.push(this.documentSource.filter(x => x.documentId === item.documentId)[0]);
          }
        });
        if (filtered && filtered.length > 0) {
          filtered = filtered.map((x) => {
            x.markForDelete = false;
            return x;
          });
          row.forEach((item) => {
            if (filtered.filter(x => x.documentId === item.documentId).length > 0) {
              filtered.filter(x => x.documentId === item.documentId)[0].markForDelete = true;
            }
          });
        }
      }
    },
    /** @description document source change handler */
    documentSourceChanged(value) {
      this.selectedDocument.documentSource = value.label || '';
    },
    /** @description reset currenty document */
    resetCurrentDocument() {
      this.selectedDocument = {};
      if (this.$refs.documentsTable) {
        this.$refs.documentsTable.$children[1].setCurrentRow(null);
      }
    },
    /** @description handle change for document to not edit isActive on gird */
    handleChange(row, value) {
      row.isActive = !value;
    },

    /** @description load document source for document data with submitargs
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
    loadDocumentSource(query, target = '') {
      let submitargs = {};
      if (target !== 'initload') {
        if (query && query !== '') {
          submitargs = {
            filterProps: {
              Props: [
                {
                  PropName: 'Name',
                  PropValue: query && query !== '' ? query.toString().toLowerCase() : '',
                },
              ],
            },
          };
        }
      }
      return new Promise((resolve, reject) => {
        const self = this;
        self.loadingDocumentSource = true;
        this.submit(getalldocumentsourceapi, submitargs).then((resp) => {
          if (resp && resp.msg === 'success') {
            self.loadingDocumentSource = false;
            self.documentSourceList = resp.data.result.map(x => ({
              value: x.documentSourceId || 0,
              label: x.name || '',
            }));
            resolve();
          } else {
            self.loadingDocumentSource = false;
            reject();
          }
        });
      });
    },
    /** @description reset documents to empty */
    resetDocument(callTarget = '') {
      this.documentModalMode = '';
      this.documentSourceList = [];
      this.showDocumentDialog = false;
      if (callTarget !== 'on_close') {
        this.documentSource = [];
        this.documentSourceFilterValue = '';
        this.documentsFilterValue = '';
        this.documentsFilter[0].vals = '';
      }
    },
    /** @description clear selection and reset markForDelete for documents */
    clearSelection() {
      if (this.$refs.documentsTable) {
        this.$refs.documentsTable.$children[1].clearSelection();
      }
      if (this.documentSource && this.documentSource.length > 0) {
        this.documentSource = this.documentSource.map((x) => {
          x.markForDelete = false;
          return x;
        });
      }
    },
    /** @description save document details */
    saveDocumentDetails() {
      const self = this;

      return new Promise((resolve, reject) => {
        switch (self.documentModalMode) {
          case 'create':
            this.saveNewDocument(this.transformToOutputDocument(this.selectedDocument))
              .then((resp) => {
                if (resp.data && resp.status === 200) {
                  self.$message(self.$t('save_success'));
                  resolve();
                } else {
                  self.$message(self.$t('save_error'));
                  reject();
                }
              })
              .catch(() => {
                self.$message(self.$t('save_error'));
                reject();
              });
            break;
          case 'update':
            this.saveDirtyDocument(this.transformToOutputDocument(this.selectedDocument))
              .then((resp) => {
                if (resp.data && resp.status === 200) {
                  resolve();
                } else {
                  self.$message(self.$t('save_error'));
                  reject();
                }
              })
              .catch(() => {
                self.$message(self.$t('save_error'));
                reject();
              });
            break;
          default:
            break;
        }
      });
    },
    /** @description save new documents */
    saveNewDocument(data) {
      return this.create(data, documentApi);
    },
    /** @description save dirty documents */
    saveDirtyDocument(data) {
      return this.updateSingle(this.selectedDocument.documentId, data, documentApi);
    },
    /** @description on before close handler for documents dialog */
    onBeforeCloseDocumentDialog(done) {
      const self = this;
      this.$confirm(this.$t('close_dialog_confirm'))
        .then(() => {
          done();
          self.restoreSelectedDocumentToOldState();
          self.resetDocument('on_close');
        })
        .catch(() => {});
    },
    /** @description on close handler for documents dialog */
    onCloseDocumentDialog() {
      this.restoreSelectedDocumentToOldState();
      this.resetDocument('on_close');
    },
    /** @description restore selected document to old state */
    restoreSelectedDocumentToOldState() {
      let edited = {};
      switch (this.documentModalMode) {
        case 'create':
          this.resetCurrentDocument();
          break;
        case 'update':
          if (
            this.documentSource.filter(x => x.documentId === this.selectedDocument.documentId)
              .length > 0
          ) {
            edited = this.documentSource.filter(
              x => x.documentId === this.selectedDocument.documentId,
            )[0];
          }
          this.selectedDocument = Object.assign({}, edited);
          break;
        default:
          break;
      }
    },
    /** @description on save documents dialog */
    onSaveDocumentDialog() {
      const self = this;

      this.$refs.documentForm.validate((valid) => {
        if (valid) {
          self.saveDocumentDetails().then(() => {
            if (self.args.name.indexOf('documentCategoryDetails') !== -1) {
              // refresh documentDetails onCascadeNavigation full, documentCategories
              // onForce and documents onForce
              self.args.refreshTab([
                {
                  name: 'documentDetails',
                  type: 'onCascadeNavigation',
                  navigationProperty: self.selectedDocument.documentIdentity || '',
                  mode: 'update',
                  scope: 'full',
                },
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
              self.selectedDocument = {};
              self.resetDocument();

              self.loadDocuments({
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
              });
            } else if (self.args.name === 'documents') {
              // refresh documentCategories on Force,
              // documentCategoryDetails onCascadeNavigation
              // partial and documentDetails onCascadeNavigation full
              self.args.refreshTab([
                {
                  name: 'documentCategories',
                  type: 'onForce',
                  mode: 'update',
                },
                {
                  name: 'documentDetails',
                  type: 'onCascadeNavigation',
                  navigationProperty: self.selectedDocument.documentIdentity || '',
                  mode: 'update',
                  scope: 'full',
                },
                {
                  name: 'documentCategoryDetails',
                  type: 'onCascadeNavigation',
                  mode: 'update',
                  scope: 'partial',
                },
              ]);
              self.resetAfterSave();
            }
          });
        }
      });
    },
    /** @description on row clicked documents */
    onDocumentRowClicked(row) {
      if (row) {
        this.selectedDocument = Object.assign({}, row);
        if (this.args.name === 'documents') {
          this.loadDocumentDependents();
        }
      }
    },
    /** @description transform function for input documents */
    transformToInputDocument(data) {
      return [
        ...data.map(x => ({
          documentId: x.documentId || 0,
          documentIdentity: x.documentIdentity || '',
          documentCategoryId: x.documentCategoryId || 0,
          number: x.number || '',
          version: x.version || '',
          name: x.name || '',
          description: x.description,
          isActive: x.isActive || false,
          created: new Date(x.created).toLocaleDateString(),
          createdBy: x.createdBy,
          updated: new Date(x.updated).toLocaleDateString(),
          updatedBy: x.updatedBy,
          documentSource: x.documentSource != null ? x.documentSource.name || '' : '',
          documentSourceId: x.documentSourceId || 0,
          pages: x.pages,
          markForDelete: false,
        })),
      ];
    },
    /**
     * @description transform function for output documents
     * @param {*} x
     */
    transformToOutputDocument(x) {
      return {
        documentId: x.documentId || 0,
        documentIdentity: x.documentIdentity || '',
        documentCategoryId: x.documentCategoryId || 0,
        number: x.number || '',
        version: x.version || '',
        name: x.name || '',
        description: x.description,
        isActive: x.isActive || false,
        created: new Date(x.created).toLocaleDateString(),
        updated: new Date(x.updated).toLocaleDateString(),
        createdBy: x.createdBy,
        updatedBy: x.updatedBy,
        documentSourceId: x.documentSourceId || 0,
        pages: x.pages,
      };
    },
    /**
     * @description open document detailstab
     * @param {*} row
     */
    openDocumentDetailsTab(row) {
      this.redirectHandler('documentDetails', {
        type: 'onCascadeNavigation',
        additionalParam: {
          navigationProperty: row.documentIdentity || '',
        },
      });
    },

    /** @description load documents data with submitargs
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
    loadDocuments(args, makeLoading = false) {
      const self = this;
      return new Promise((resolve) => {
        try {
          self.loadingDocuments = true;
          if (makeLoading) {
            self.args.makeLoading(Object.assign({}, this.args), true);
          }
          this.submit(getalldocumentapi, args)
            .then((resp) => {
              try {
                if (makeLoading) {
                  self.args.makeLoading(Object.assign({}, this.args), false);
                }
                self.documentSource = [...this.transformToInputDocument(resp.data.result)];
                self.documentsTotal = resp.data.total;
                self.loadingDocuments = false;
                self.clearSelection.call(self);
                self.resetCurrentDocument();
                resolve();
              } catch (e) {
                throw e;
              }
            })
            .catch(() => {
              self.documentSource = [];
              self.documentsTotal = 0;
              self.loadingDocuments = false;
              resolve();
            });
        } catch (e) {
          self.documentSource = [];
          self.documentsTotal = 0;
          self.loadingDocuments = false;
          resolve();
        }
      });
    },
    /* end document grid transaction */
  },
};
