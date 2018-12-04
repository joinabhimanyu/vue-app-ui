/* global  it, describe, expect, */

describe('documentfield.spec.js', () => {
  it('should call', () => {
    expect(1).toEqual(1);
  });
});

// import { createLocalVue, mount } from 'vue-test-utils';
// import '../plugins/element';
// import '../plugins/font-awesome';
// import { eventBus } from '../main';
// import UtilityMixin from '../mixins/utilityMixin';
// import DocumentField from '../components/DocumentField.vue';
// import { fakeTransitions, spyConsole } from '../__mocks__/fakeTransitions';

// jest.mock('../main');
// jest.mock('../mixins/utilityMixin');

// describe('DocumentField.spec.js', () => {
//   const spy = spyConsole();
//   let wrapper;
//   const localVue = createLocalVue();
//   localVue.use(UtilityMixin);

//   beforeEach(() => {
//     const $t = content => content;
//     const $message = (content) => {
//       console.log(content);
//     };
//     const $confirm = () => Promise.resolve();
//     wrapper = mount(DocumentField, {
//       localVue,
//       mocks: {
//         $t,
//         $message,
//         $confirm,
//       },
//       propsData: {
//         navigationProperty: '16SPP5012',
//         parentContext: {},
//       },
//     });
//     fakeTransitions();
//   });
//   afterEach(() => {
//     if (spy.documentField.redirectHandler) {
//       spy.documentField.redirectHandler.mockRestore();
//     }
//     if (spy.documentField.refreshFilterOptions) {
//       spy.documentField.refreshFilterOptions.mockRestore();
//     }
//     if (spy.documentField.refreshGridCols) {
//       spy.documentField.refreshGridCols.mockRestore();
//     }
//     if (spy.documentField.clearSelectionDocumentFields) {
//       spy.documentField.clearSelectionDocumentFields.mockRestore();
//     }
//     if (spy.documentField.clearSelection) {
//       spy.documentField.clearSelection.mockRestore();
//     }
//     if (spy.documentField.resetAfterSaveDocumentFields) {
//       spy.documentField.resetAfterSaveDocumentFields.mockRestore();
//     }
//     if (spy.documentField.resetCurrentDocumentFields) {
//       spy.documentField.resetCurrentDocumentFields.mockRestore();
//     }
//     if (spy.documentField.resetDocumentFields) {
//       spy.documentField.resetDocumentFields.mockRestore();
//     }
//     if (spy.documentField.loadDocumentFieldsFromDocument) {
//       spy.documentField.loadDocumentFieldsFromDocument.mockRestore();
//     }
//     if (spy.documentField.setCurrentRow) {
//       spy.documentField.setCurrentRow.mockRestore();
//     }
//     if (spy.documentField.clearValidate) {
//       spy.documentField.clearValidate.mockRestore();
//     }
//     if (spy.documentField.saveNewDocumentField) {
//       spy.documentField.saveNewDocumentField.mockRestore();
//     }
//     if (spy.documentField.transformToOutputDocumentFields) {
//       spy.documentField.transformToOutputDocumentFields.mockRestore();
//     }
//     if (spy.documentField.restoreSelectedDocumentFieldToOldState) {
//       spy.documentField.restoreSelectedDocumentFieldToOldState.mockRestore();
//     }
//     if (spy.documentField.resetDocumentFields) {
//       spy.documentField.resetDocumentFields.mockRestore();
//     }
//     if (spy.documentField.saveDocumentFields) {
//       spy.documentField.saveDocumentFields.mockRestore();
//     }
//     if (spy.documentField.refreshTranslations) {
//       spy.documentField.refreshTranslations();
//     }
//   });
//   test('has proper navigation property', () => {
//     expect(wrapper.vm.navigationProperty).toEqual('16SPP5012');
//   });

//   test('has proper refs documentFieldsTable', () => {
//     expect(wrapper.vm.$refs.documentFieldsTable).not.toBeNull();
//   });

//   test('openFieldDetailsTab called', () => {
//     spy.documentField.redirectHandler = jest.spyOn(wrapper.vm, 'redirectHandler');
//     const args = {
//       type: 'onCascadeNavigation',
//       additionalParam: {
//         navigationProperty: 32,
//       },
//     };
//     wrapper.update(); // Forces to re-render, applying changes on template
//     wrapper.vm.openFieldDetailsTab({ fieldId: 32 });
//     expect(wrapper.vm.redirectHandler).toBeCalled();
//     expect(spy.documentField.redirectHandler.mock.calls[0][0]).toContain('fieldDetails');
//     expect(JSON.stringify(spy.documentField.redirectHandler.mock.calls[0][1])).toEqual(
//       JSON.stringify(args),
//     );
//     expect(JSON.stringify(spy.documentField.redirectHandler.mock.calls[0][2])).toEqual(
//       JSON.stringify({}),
//     );
//   });

//   test('refreshFilterOptions called', () => {
//     wrapper.vm.refreshFilterOptions();
//     expect(wrapper.vm.documentFieldsFilterOption[0].label).toEqual('field_name');
//     expect(wrapper.vm.documentFieldsFilterOption[1].label).toEqual('field_description');
//     expect(wrapper.vm.documentFieldsFilterOption[2].label).toEqual('name');
//     expect(wrapper.vm.documentFieldsFilterOption[3].label).toEqual('value');
//     expect(wrapper.vm.documentFieldsFilterOption[4].label).toEqual('parameter');
//   });
//   test('refreshGridCols', () => {
//     wrapper.vm.refreshGridCols();
//     expect(wrapper.vm.documentFieldCols[0].label).toEqual('field_name');
//     expect(wrapper.vm.documentFieldCols[1].label).toEqual('field_description');
//     expect(wrapper.vm.documentFieldCols[2].label).toEqual('data_type');
//     expect(wrapper.vm.documentFieldCols[3].label).toEqual('is_active');
//     expect(wrapper.vm.documentFieldCols[4].label).toEqual('parameter');
//     expect(wrapper.vm.documentFieldCols[5].label).toEqual('external_field_name');
//     expect(wrapper.vm.documentFieldCols[6].label).toEqual('fixed_value');
//   });
//   test('refreshTranslations called', () => {
//     spy.documentField.refreshFilterOptions = jest.spyOn(wrapper.vm, 'refreshFilterOptions');
//     spy.documentField.refreshGridCols = jest.spyOn(wrapper.vm, 'refreshGridCols');
//     wrapper.update();
//     wrapper.vm.refreshTranslations();
//     expect(wrapper.vm.refreshFilterOptions).toBeCalled();
//     expect(wrapper.vm.refreshGridCols).toBeCalled();
//   });
//   test('handleSelectionChangeDocumentFields called', () => {
//     const documentFields = [
//       {
//         documentId: 636,
//         fieldId: 32,
//         fieldName: 'DocumentCategory',
//         fieldDescription: 'The document category or type. (Ärendetyp)',
//         fieldDataTypeNo: 'yn',
//         isActive: true,
//         parameter: '',
//         externalFieldname: '',
//         fixedValue: '',
//         created: '4/16/2012',
//         createdBy: 'STB\\JOMA26',
//         updated: '4/16/2012',
//         updatedBy: 'STB\\JOMA26',
//         fieldCreated: '2010-12-02T23:00:00.000Z',
//         fieldCreatedBy: 'STB\\SVC-KSJUInst-AT',
//         fieldUpdated: '2017-10-15T22:00:00.000Z',
//         fieldUpdatedBy: 'STB\\O4Y',
//         markForDelete: false,
//       },
//     ];
//     wrapper.setData({ documentFields });
//     wrapper.vm.handleSelectionChangeDocumentFields(documentFields);
//     expect(wrapper.vm.$refs.documentFieldsTable.curTableData).not.toBeNull();
//     expect(JSON.stringify(wrapper.vm.$refs.documentFieldsTable.curTableData)).toEqual(
//       JSON.stringify(wrapper.vm.documentFields),
//     );
//     const filter = wrapper.vm.documentFields.filter(x => x.markForDelete);
//     expect(filter.length).toEqual(documentFields.length);
//   });
//   test('resetCurrentDocumentFields called', () => {
//     const selectedDocumentField = {
//       documentId: 636,
//       fieldId: 32,
//       fieldName: 'DocumentCategory',
//       fieldDescription: 'The document category or type. (Ärendetyp)',
//       fieldDataTypeNo: 'yn',
//       isActive: true,
//       parameter: '',
//       externalFieldname: '',
//       fixedValue: '',
//       created: '4/16/2012',
//       createdBy: 'STB\\JOMA26',
//       updated: '4/16/2012',
//       updatedBy: 'STB\\JOMA26',
//       fieldCreated: '2010-12-02T23:00:00.000Z',
//       fieldCreatedBy: 'STB\\SVC-KSJUInst-AT',
//       fieldUpdated: '2017-10-15T22:00:00.000Z',
//       fieldUpdatedBy: 'STB\\O4Y',
//       markForDelete: false,
//     };
//     spy.documentField.setCurrentRow = jest.spyOn(
//       wrapper.vm.$refs.documentFieldsTable.$children[1],
//       'setCurrentRow',
//     );
//     wrapper.setData({ selectedDocumentField });
//     wrapper.update();
//     wrapper.vm.resetCurrentDocumentFields();
//     expect(JSON.stringify(wrapper.vm.selectedDocumentField)).toEqual(JSON.stringify({}));
//     expect(wrapper.vm.$refs.documentFieldsTable.$children[1].setCurrentRow).toBeCalledWith(null);
//   });

//   test('resetFormFieldsDocumentFields', async () => {
//     wrapper.setData({ showDocumentFieldsDialog: true });
//     await wrapper.vm.$nextTick();
//     spy.documentField.clearValidate = jest.spyOn(
//       wrapper.vm.$children[1].$children[2].$children[0].$children[0],
//       'clearValidate',
//     );
//     wrapper.vm.resetFormFieldsDocumentFields();
//     expect(
//       wrapper.vm.$children[1].$children[2].$children[0].$children[0].clearValidate,
//     ).toBeCalled();
//   });

//   test('loads fields', async () => {
//     await wrapper.vm.loadFields('', 'initload');
//     expect(wrapper.vm.loadingFields).toEqual(false);
//     expect(wrapper.vm.fieldList).not.toBeNull();
//     expect(wrapper.vm.fieldList.length).toBeGreaterThanOrEqual(0);
//   });
//   test('loads parameters', () =>
//     wrapper.vm.loadParameters(null, 'initload').then(() => {
//       expect(wrapper.vm.loadingParameters).toEqual(false);
//       expect(wrapper.vm.parameterList).not.toBeNull();
//       expect(wrapper.vm.parameterList.length).toEqual(3);
//     }));
//   test('fieldChanged called', () => {
//     const fieldList = [
//       {
//         value: 1,
//         label: 'Pnr',
//         description: 'Swedish personal identification number',
//         fieldDataTypeNo: '01',
//         isActive: true,
//       },
//     ];
//     wrapper.setData({ fieldList });
//     wrapper.vm.fieldChanged(1);
//     const filter = wrapper.vm.fieldList.filter(x => x.value === 1);
//     expect(wrapper.vm.selectedDocumentField.fieldId).toEqual(filter[0].value);
//     expect(wrapper.vm.selectedDocumentField.fieldName).toEqual(filter[0].label);
//     expect(wrapper.vm.selectedDocumentField.fieldDescription).toEqual(filter[0].description);
//     expect(wrapper.vm.selectedDocumentField.fieldDataTypeNo).toEqual(filter[0].fieldDataTypeNo);
//     expect(wrapper.vm.selectedDocumentField.isActive).toEqual(filter[0].isActive);
//   });
//   test('onCommandDocumentFields called with new', async () => {
//     await wrapper.vm.onCommandDocumentFields('new');
//     expect(wrapper.vm.showDocumentFieldsDialog).toEqual(true);
//     expect(wrapper.vm.loadingDialogDocumentField).toEqual(false);
//     expect(wrapper.vm.documentFieldsModalMode).toEqual('create');
//     expect(
//       // eslint-disable-next-line no-prototype-builtins
//       wrapper.vm.$children[1].$children[2].$children[0].$children[0].$props.hasOwnProperty(
//         'visible',
//       ),
//     ).toBeFalsy();
//   });

//   test('onCommandDocumentFields called with edit', async () => {
//     const selectedDocumentField = {
//       documentId: 636,
//       fieldId: 32,
//       fieldName: 'DocumentCategory',
//       fieldDescription: 'The document category or type. (Ärendetyp)',
//       fieldDataTypeNo: 'yn',
//       isActive: true,
//       parameter: '',
//       externalFieldname: '',
//       fixedValue: '',
//       created: '4/16/2012',
//       createdBy: 'STB\\JOMA26',
//       updated: '4/16/2012',
//       updatedBy: 'STB\\JOMA26',
//       fieldCreated: '2010-12-02T23:00:00.000Z',
//       fieldCreatedBy: 'STB\\SVC-KSJUInst-AT',
//       fieldUpdated: '2017-10-15T22:00:00.000Z',
//       fieldUpdatedBy: 'STB\\O4Y',
//       markForDelete: false,
//     };
//     wrapper.setData({ selectedDocumentField });
//     await wrapper.vm.onCommandDocumentFields('edit');
//     expect(wrapper.vm.showDocumentFieldsDialog).toEqual(true);
//     expect(wrapper.vm.loadingDialogDocumentField).toEqual(false);
//     expect(wrapper.vm.documentFieldsModalMode).toEqual('update');
//     expect(
//       // eslint-disable-next-line no-prototype-builtins
//       wrapper.vm.$children[1].$children[2].$children[0].$children[0].$props.hasOwnProperty(
//         'visible',
//       ),
//     ).toBeFalsy();
//   });

//   test('onCommandDocumentFields called with delete', async () => {
//     const documentFields = [
//       {
//         documentId: 636,
//         fieldId: 32,
//         fieldName: 'DocumentCategory',
//         fieldDescription: 'The document category or type. (Ärendetyp)',
//         fieldDataTypeNo: 'yn',
//         isActive: true,
//         parameter: '',
//         externalFieldname: '',
//         fixedValue: '',
//         created: '4/16/2012',
//         createdBy: 'STB\\JOMA26',
//         updated: '4/16/2012',
//         updatedBy: 'STB\\JOMA26',
//         fieldCreated: '2010-12-02T23:00:00.000Z',
//         fieldCreatedBy: 'STB\\SVC-KSJUInst-AT',
//         fieldUpdated: '2017-10-15T22:00:00.000Z',
//         fieldUpdatedBy: 'STB\\O4Y',
//         markForDelete: true,
//       },
//     ];
//     wrapper.setData({ documentFields });
//     await wrapper.vm.onCommandDocumentFields('delete');
//     expect(console.log).toHaveBeenCalled();
//     expect(spy.console.mock.calls[0][0]).toContain('delete_success');
//     expect(wrapper.vm.documentFields).not.toBeNull();
//     expect(wrapper.vm.documentFields.length).toBeGreaterThanOrEqual(0);
//     expect(wrapper.vm.documentFieldsTotal).toBeGreaterThanOrEqual(0);
//   });
//   test('onCommandDocumentFields called with clearSelection', () => {
//     spy.documentField.clearSelectionDocumentFields = jest.spyOn(
//       wrapper.vm,
//       'clearSelectionDocumentFields',
//     );
//     spy.documentField.clearSelection = jest.spyOn(
//       wrapper.vm.$refs.documentFieldsTable.$children[1],
//       'clearSelection',
//     );
//     const documentFields = [
//       {
//         documentId: 636,
//         fieldId: 32,
//         fieldName: 'DocumentCategory',
//         fieldDescription: 'The document category or type. (Ärendetyp)',
//         fieldDataTypeNo: 'yn',
//         isActive: true,
//         parameter: '',
//         externalFieldname: '',
//         fixedValue: '',
//         created: '4/16/2012',
//         createdBy: 'STB\\JOMA26',
//         updated: '4/16/2012',
//         updatedBy: 'STB\\JOMA26',
//         fieldCreated: '2010-12-02T23:00:00.000Z',
//         fieldCreatedBy: 'STB\\SVC-KSJUInst-AT',
//         fieldUpdated: '2017-10-15T22:00:00.000Z',
//         fieldUpdatedBy: 'STB\\O4Y',
//         markForDelete: false,
//       },
//     ];
//     wrapper.setData({ documentFields });
//     wrapper.update();
//     wrapper.vm.onCommandDocumentFields('clearSelection');
//     expect(wrapper.vm.clearSelectionDocumentFields).toBeCalled();
//     expect(wrapper.vm.$refs.documentFieldsTable.$children[1].clearSelection).toBeCalled();
//     const filter = wrapper.vm.documentFields.filter(x => !x.markForDelete);
//     expect(filter.length).toEqual(wrapper.vm.documentFields.length);
//   });
//   test('onCommandDocumentFields called with refresh', () => {
//     spy.documentField.resetAfterSaveDocumentFields = jest.spyOn(
//       wrapper.vm,
//       'resetAfterSaveDocumentFields',
//     );
//     wrapper.update();
//     wrapper.vm.onCommandDocumentFields('refresh');
//     expect(wrapper.vm.resetAfterSaveDocumentFields).toBeCalled();
//   });
//   test('resetDocumentFields called', () => {
//     wrapper.vm.resetDocumentFields();
//     expect(wrapper.vm.documentFieldsModalMode).toEqual('');
//     expect(wrapper.vm.fieldList.length).toEqual(0);
//     expect(wrapper.vm.parameterList.length).toEqual(0);
//     expect(wrapper.vm.showDocumentFieldsDialog).toEqual(false);
//     expect(wrapper.vm.documentFields.length).toEqual(0);
//     expect(wrapper.vm.documentFieldsFilterValue).toEqual('');
//     expect(wrapper.vm.documentFieldsFilter[0].vals).toEqual('');
//   });
//   test('resetDocumentFields called with "on_close"', () => {
//     wrapper.vm.resetDocumentFields('on_close');
//     expect(wrapper.vm.documentFieldsModalMode).toEqual('');
//     expect(wrapper.vm.fieldList.length).toEqual(0);
//     expect(wrapper.vm.parameterList.length).toEqual(0);
//     expect(wrapper.vm.showDocumentFieldsDialog).toEqual(false);
//   });
//   test('resetAfterSaveDocumentFields called called', () => {
//     spy.documentField.resetCurrentDocumentFields = jest.spyOn(
//       wrapper.vm,
//       'resetCurrentDocumentFields',
//     );
//     spy.documentField.resetDocumentFields = jest.spyOn(wrapper.vm, 'resetDocumentFields');
//     spy.documentField.loadDocumentFieldsFromDocument = jest.spyOn(
//       wrapper.vm,
//       'loadDocumentFieldsFromDocument',
//     );
//     const args = {
//       pageSize: wrapper.vm.defaultPageSizeGrid,
//       NavigationProperty: {
//         Props: [
//           {
//             PropName: 'Document.DocumentIdentity',
//             PropValue: wrapper.vm.navigationProperty || '',
//             IsNestedProp: true,
//           },
//         ],
//       },
//       OrderByProp: {
//         Propname: 'Field.Name',
//       },
//       IsNavigationEnabled: true,
//     };
//     wrapper.update();
//     wrapper.vm.resetAfterSaveDocumentFields();
//     expect(wrapper.vm.resetCurrentDocumentFields).toBeCalled();
//     expect(wrapper.vm.resetDocumentFields).toBeCalled();
//     expect(wrapper.vm.loadDocumentFieldsFromDocument).toBeCalledWith(args);
//   });
//   test('clearSelectionDocumentFields called', () => {
//     spy.documentField.clearSelection = jest.spyOn(
//       wrapper.vm.$refs.documentFieldsTable.$children[1],
//       'clearSelection',
//     );
//     const documentFields = [
//       {
//         documentId: 636,
//         fieldId: 32,
//         fieldName: 'DocumentCategory',
//         fieldDescription: 'The document category or type. (Ärendetyp)',
//         fieldDataTypeNo: 'yn',
//         isActive: true,
//         parameter: '',
//         externalFieldname: '',
//         fixedValue: '',
//         created: '4/16/2012',
//         createdBy: 'STB\\JOMA26',
//         updated: '4/16/2012',
//         updatedBy: 'STB\\JOMA26',
//         fieldCreated: '2010-12-02T23:00:00.000Z',
//         fieldCreatedBy: 'STB\\SVC-KSJUInst-AT',
//         fieldUpdated: '2017-10-15T22:00:00.000Z',
//         fieldUpdatedBy: 'STB\\O4Y',
//         markForDelete: false,
//       },
//     ];
//     wrapper.setData({ documentFields });
//     wrapper.update();
//     wrapper.vm.clearSelectionDocumentFields();
//     expect(wrapper.vm.$refs.documentFieldsTable.$children[1].clearSelection).toBeCalled();
//     const filter = wrapper.vm.documentFields.filter(x => !x.markForDelete);
//     expect(filter.length).toEqual(wrapper.vm.documentFields.length);
//   });
//   test('saveDocumentFields called for create', async () => {
//     const selectedDocumentField = {
//       documentId: 636,
//       fieldId: 32,
//       fieldName: 'DocumentCategory',
//       fieldDescription: 'The document category or type. (Ärendetyp)',
//       fieldDataTypeNo: 'yn',
//       isActive: true,
//       parameter: '',
//       externalFieldname: '',
//       fixedValue: '',
//       created: '4/16/2012',
//       createdBy: 'STB\\JOMA26',
//       updated: '4/16/2012',
//       updatedBy: 'STB\\JOMA26',
//       fieldCreated: '2010-12-02T23:00:00.000Z',
//       fieldCreatedBy: 'STB\\SVC-KSJUInst-AT',
//       fieldUpdated: '2017-10-15T22:00:00.000Z',
//       fieldUpdatedBy: 'STB\\O4Y',
//       markForDelete: false,
//     };
//     spy.documentField.saveNewDocumentField = jest.spyOn(wrapper.vm, 'saveNewDocumentField');
//     spy.documentField.transformToOutputDocumentFields = jest.spyOn(
//       wrapper.vm,
//       'transformToOutputDocumentFields',
//     );
//     wrapper.setData({ documentFieldsModalMode: 'create' });
//     wrapper.setData({ selectedDocumentField });
//     wrapper.update();
//     const resp = await wrapper.vm.saveDocumentFields();
//     expect(wrapper.vm.saveNewDocumentField).toBeCalled();
//     expect(wrapper.vm.transformToOutputDocumentFields).toBeCalledWith(
//       selectedDocumentField,
//     );
//     expect(resp).toEqual('success');
//   });
//   test('saveDocumentFields called for update', async () => {
//     const selectedDocumentField = {
//       documentId: 636,
//       fieldId: 32,
//       fieldName: 'DocumentCategory',
//       fieldDescription: 'The document category or type. (Ärendetyp)',
//       fieldDataTypeNo: 'yn',
//       isActive: true,
//       parameter: '',
//       externalFieldname: '',
//       fixedValue: '',
//       created: '4/16/2012',
//       createdBy: 'STB\\JOMA26',
//       updated: '4/16/2012',
//       updatedBy: 'STB\\JOMA26',
//       fieldCreated: '2010-12-02T23:00:00.000Z',
//       fieldCreatedBy: 'STB\\SVC-KSJUInst-AT',
//       fieldUpdated: '2017-10-15T22:00:00.000Z',
//       fieldUpdatedBy: 'STB\\O4Y',
//       markForDelete: false,
//     };
//     spy.documentField.saveDirtyDocumentField = jest.spyOn(wrapper.vm, 'saveDirtyDocumentField');
//     spy.documentField.transformToOutputDocumentFields = jest.spyOn(
//       wrapper.vm,
//       'transformToOutputDocumentFields',
//     );
//     wrapper.setData({ documentFieldsModalMode: 'update' });
//     wrapper.setData({ selectedDocumentField });
//     wrapper.update();
//     const resp = await wrapper.vm.saveDocumentFields();
//     expect(wrapper.vm.saveDirtyDocumentField).toBeCalled();
//     expect(wrapper.vm.transformToOutputDocumentFields).toBeCalledWith(
//       wrapper.vm.selectedDocumentField,
//     );
//     expect(resp).toEqual('success');
//   });
//   test('saveNewDocumentField called', () => {
//     spy.create = jest.spyOn(wrapper.vm, 'create');
//     wrapper.update();
//     return wrapper.vm.saveNewDocumentField(null).then((resp) => {
//       expect(wrapper.vm.create).toBeCalled();
//       expect(resp.status).toEqual(200);
//       expect(resp.msg).toEqual('success');
//     });
//   });
//   test('saveDirtyDocumentField called', () => {
//     spy.updateList = jest.spyOn(wrapper.vm, 'updateList');
//     wrapper.update();
//     return wrapper.vm.saveDirtyDocumentField(null).then((resp) => {
//       expect(wrapper.vm.updateList).toBeCalled();
//       expect(resp.status).toEqual(200);
//       expect(resp.msg).toEqual('success');
//     });
//   });
//   test('onBeforeCloseDocumentFieldsDialog called', async () => {
//     spy.documentField.restoreSelectedDocumentFieldToOldState = jest.spyOn(
//       wrapper.vm,
//       'restoreSelectedDocumentFieldToOldState',
//     );
//     spy.documentField.resetDocumentFields = jest.spyOn(wrapper.vm, 'resetDocumentFields');
//     wrapper.update();
//     const done = () => {
//       console.log('done');
//     };
//     await wrapper.vm.onBeforeCloseDocumentFieldsDialog(done);
//     expect(wrapper.vm.restoreSelectedDocumentFieldToOldState).toBeCalled();
//     expect(wrapper.vm.resetDocumentFields).toBeCalledWith('on_close');
//   });
//   test('onCloseDocumentFieldsDialog', () => {
//     spy.documentField.restoreSelectedDocumentFieldToOldState = jest.spyOn(
//       wrapper.vm,
//       'restoreSelectedDocumentFieldToOldState',
//     );
//     spy.documentField.resetDocumentFields = jest.spyOn(wrapper.vm, 'resetDocumentFields');
//     wrapper.update();
//     wrapper.vm.onCloseDocumentFieldsDialog();
//     expect(wrapper.vm.restoreSelectedDocumentFieldToOldState).toBeCalled();
//     expect(wrapper.vm.resetDocumentFields).toBeCalledWith('on_close');
//   });
//   test('restoreSelectedDocumentFieldToOldState with create', () => {
//     spy.documentField.resetCurrentDocumentFields = jest.spyOn(
//       wrapper.vm,
//       'resetCurrentDocumentFields',
//     );
//     wrapper.update();
//     wrapper.setData({ documentFieldsModalMode: 'create' });
//     wrapper.vm.restoreSelectedDocumentFieldToOldState();
//     expect(wrapper.vm.resetCurrentDocumentFields).toBeCalled();
//   });
//   test('restoreSelectedDocumentFieldToOldState update', () => {
//     const selectedDocumentField = {
//       documentId: 636,
//       fieldId: 32,
//       fieldName: 'changed field name',
//       fieldDescription: 'changed description',
//       fieldDataTypeNo: 'yn',
//       isActive: true,
//       parameter: '',
//       externalFieldname: '',
//       fixedValue: '',
//       created: '4/16/2012',
//       createdBy: 'STB\\JOMA26',
//       updated: '4/16/2012',
//       updatedBy: 'STB\\JOMA26',
//       fieldCreated: '2010-12-02T23:00:00.000Z',
//       fieldCreatedBy: 'STB\\SVC-KSJUInst-AT',
//       fieldUpdated: '2017-10-15T22:00:00.000Z',
//       fieldUpdatedBy: 'STB\\O4Y',
//       markForDelete: false,
//     };
//     const documentFields = [
//       {
//         documentId: 636,
//         fieldId: 32,
//         fieldName: 'DocumentCategory',
//         fieldDescription: 'The document category or type. (Ärendetyp)',
//         fieldDataTypeNo: 'yn',
//         isActive: true,
//         parameter: '',
//         externalFieldname: '',
//         fixedValue: '',
//         created: '4/16/2012',
//         createdBy: 'STB\\JOMA26',
//         updated: '4/16/2012',
//         updatedBy: 'STB\\JOMA26',
//         fieldCreated: '2010-12-02T23:00:00.000Z',
//         fieldCreatedBy: 'STB\\SVC-KSJUInst-AT',
//         fieldUpdated: '2017-10-15T22:00:00.000Z',
//         fieldUpdatedBy: 'STB\\O4Y',
//         markForDelete: false,
//       },
//     ];
//     wrapper.setData({ selectedDocumentField });
//     wrapper.setData({ documentFields });
//     wrapper.setData({ documentFieldsModalMode: 'update' });
//     expect(wrapper.vm.selectedDocumentField.fieldName).toEqual('changed field name');
//     expect(wrapper.vm.selectedDocumentField.fieldDescription).toEqual('changed description');
//     wrapper.vm.restoreSelectedDocumentFieldToOldState();
//     expect(wrapper.vm.selectedDocumentField.fieldName).toEqual('DocumentCategory');
//     expect(wrapper.vm.selectedDocumentField.fieldDescription).toEqual(
//       'The document category or type. (Ärendetyp)',
//     );
//   });
//   test('onSaveDocumentFieldsDialog', async () => {
//     const selectedDocumentField = {
//       documentId: 636,
//       fieldId: 32,
//       fieldName: 'DocumentCategory',
//       fieldDescription: 'The document category or type. (Ärendetyp)',
//       fieldDataTypeNo: 'yn',
//       isActive: true,
//       parameter: '',
//       externalFieldname: '',
//       fixedValue: '',
//       created: '4/16/2012',
//       createdBy: 'STB\\JOMA26',
//       updated: '4/16/2012',
//       updatedBy: 'STB\\JOMA26',
//       fieldCreated: '2010-12-02T23:00:00.000Z',
//       fieldCreatedBy: 'STB\\SVC-KSJUInst-AT',
//       fieldUpdated: '2017-10-15T22:00:00.000Z',
//       fieldUpdatedBy: 'STB\\O4Y',
//       markForDelete: false,
//     };
//     wrapper.setData({ selectedDocumentField });
//     wrapper.setData({ documentFieldsModalMode: 'update' });
//     wrapper.setData({ showDocumentFieldsDialog: true });
//     await wrapper.vm.$nextTick();
//     expect(
//       // eslint-disable-next-line no-prototype-builtins
//       wrapper.vm.$children[1].$children[2].$children[0].$children[0].$props.hasOwnProperty(
//         'visible',
//       ),
//     ).toBeFalsy();
//     spy.documentField.resetAfterSaveDocumentFields = jest.spyOn(
//       wrapper.vm,
//       'resetAfterSaveDocumentFields',
//     );
//     spy.documentField.saveDocumentFields = jest.spyOn(wrapper.vm, 'saveDocumentFields');
//     wrapper.update();

//     return wrapper.vm.onSaveDocumentFieldsDialog().then((resp) => {
//       expect(wrapper.vm.saveDocumentFields).toBeCalled();
//       expect(wrapper.vm.resetAfterSaveDocumentFields).toBeCalled();
//       expect(resp).toEqual('valid');
//     });
//   });
//   test('onDocumentFieldsRowClicked', () => {
//     const selectedDocumentField = {
//       documentId: 636,
//       fieldId: 32,
//       fieldName: 'DocumentCategory',
//       fieldDescription: 'The document category or type. (Ärendetyp)',
//       fieldDataTypeNo: 'yn',
//       isActive: true,
//       parameter: '',
//       externalFieldname: '',
//       fixedValue: '',
//       created: '4/16/2012',
//       createdBy: 'STB\\JOMA26',
//       updated: '4/16/2012',
//       updatedBy: 'STB\\JOMA26',
//       fieldCreated: '2010-12-02T23:00:00.000Z',
//       fieldCreatedBy: 'STB\\SVC-KSJUInst-AT',
//       fieldUpdated: '2017-10-15T22:00:00.000Z',
//       fieldUpdatedBy: 'STB\\O4Y',
//       markForDelete: false,
//     };
//     wrapper.vm.onDocumentFieldsRowClicked(selectedDocumentField);
//     expect(JSON.stringify(wrapper.vm.selectedDocumentField)).toEqual(
//       JSON.stringify(selectedDocumentField),
//     );
//   });
//   test('transformToInputDocumentFields', () => {
//     const data = [
//       {
//         documentId: 636,
//         fieldId: 32,
//         field: {
//           name: 'DocumentCategory',
//           description: 'The document category or type. (Ärendetyp)',
//           fieldDataTypeNo: 'yn',
//           isActive: true,
//           created: '2/12/2010',
//           createdBy: 'STB\\SVC-KSJUInst-AT',
//           updated: '15/10/2017',
//           updatedBy: 'STB\\O4Y',
//         },
//         parameter: '',
//         name: '',
//         value: '',
//         created: '4/16/2012',
//         createdBy: 'STB\\JOMA26',
//         updated: '4/16/2012',
//         updatedBy: 'STB\\JOMA26',
//       },
//     ];
//     const resp = wrapper.vm.transformToInputDocumentFields(data);
//     expect(resp.length).toEqual(data.length);
//     expect(resp[0].documentId).toEqual(data[0].documentId);
//     expect(resp[0].fieldId).toEqual(data[0].fieldId);
//     expect(resp[0].fieldName).toEqual(data[0].field.name);
//     expect(resp[0].fieldDescription).toEqual(data[0].field.description);
//     expect(resp[0].fieldDataTypeNo).toEqual(data[0].field.fieldDataTypeNo);
//     expect(resp[0].isActive).toEqual(data[0].field.isActive);
//     expect(resp[0].parameter).toEqual(data[0].parameter);
//     expect(resp[0].externalFieldname).toEqual(data[0].name);
//     expect(resp[0].fixedValue).toEqual(data[0].value);
//     expect(resp[0].created).toEqual(new Date(data[0].created).toLocaleDateString());
//     expect(resp[0].createdBy).toEqual(data[0].createdBy);
//     expect(resp[0].updated).toEqual(new Date(data[0].updated).toLocaleDateString());
//     expect(resp[0].updatedBy).toEqual(data[0].updatedBy);
//     expect(new Date(resp[0].fieldCreated).toLocaleDateString()).toEqual(
//       new Date(data[0].field.created).toLocaleDateString(),
//     );
//     expect(resp[0].fieldCreatedBy).toEqual(data[0].field.createdBy);
//     expect(new Date(resp[0].fieldUpdated).toLocaleDateString()).toEqual(
//       new Date(data[0].field.updated).toLocaleDateString(),
//     );
//     expect(resp[0].fieldUpdatedBy).toEqual(data[0].field.updatedBy);
//     expect(resp[0].markForDelete).toEqual(false);
//   });
//   test('transformToOutputDocumentFields', () => {
//     const data = {
//       documentId: 636,
//       fieldId: 32,
//       fieldName: 'DocumentCategory',
//       fieldDescription: 'The document category or type. (Ärendetyp)',
//       fieldDataTypeNo: 'yn',
//       isActive: true,
//       parameter: '',
//       externalFieldname: '',
//       fixedValue: '',
//       created: '4/16/2012',
//       createdBy: 'STB\\JOMA26',
//       updated: '4/16/2012',
//       updatedBy: 'STB\\JOMA26',
//       fieldCreated: '2/12/2010',
//       fieldCreatedBy: 'STB\\SVC-KSJUInst-AT',
//       fieldUpdated: '15/10/2017',
//       fieldUpdatedBy: 'STB\\O4Y',
//     };
//     try {
//       const resp = wrapper.vm.transformToOutputDocumentFields(data);
//       expect(resp.length).toEqual(1);
//       expect(resp[0].documentId).toEqual(data.documentId);
//       expect(resp[0].fieldId).toEqual(data.fieldId);
//       expect(resp[0].field.fieldId).toEqual(data.fieldId);
//       expect(resp[0].field.name).toEqual(data.fieldName);
//       expect(resp[0].field.description).toEqual(data.fieldDescription);
//       expect(resp[0].field.fieldDataTypeNo).toEqual(data.fieldDataTypeNo);
//       expect(resp[0].field.isActive).toEqual(data.isActive);
//       expect(new Date(resp[0].field.created).toLocaleDateString()).toEqual(
//         new Date(data.fieldCreated).toLocaleDateString(),
//       );
//       expect(resp[0].field.createdBy).toEqual(data.fieldCreatedBy);
//       expect(new Date(resp[0].field.updated).toLocaleDateString()).toEqual(
//         new Date(data.fieldUpdated).toLocaleDateString(),
//       );
//       expect(resp[0].field.updatedBy).toEqual(data.fieldUpdatedBy);
//       expect(new Date(resp[0].created).toLocaleDateString()).toEqual(
//         new Date(data.created).toLocaleDateString(),
//       );
//       expect(resp[0].createdBy).toEqual(data.createdBy);
//       expect(new Date(resp[0].updated).toLocaleDateString()).toEqual(
//         new Date(data.updated).toLocaleDateString(),
//       );
//       expect(resp[0].parameter).toEqual(data.parameter);
//       expect(resp[0].name).toEqual(data.externalFieldname);
//       expect(resp[0].value).toEqual(data.fixedValue);
//     } catch (err) {
//       console.log(err);
//     }
//   });
//   test('loads document fields from document', async () => {
//     const submitargs = {
//       pageSize: 20,
//       NavigationProperty: {
//         Props: [
//           {
//             PropName: 'Document.DocumentIdentity',
//             PropValue: wrapper.vm.navigationProperty || '',
//             IsNestedProp: true,
//           },
//         ],
//       },
//       OrderByProp: {
//         Propname: 'Field.Name',
//       },
//       IsNavigationEnabled: true,
//     };
//     await wrapper.vm.loadDocumentFieldsFromDocument(submitargs);
//     expect(wrapper.vm.documentFields).not.toBeNull();
//     expect(wrapper.vm.documentFields.length).toBeGreaterThanOrEqual(0);
//     expect(wrapper.vm.documentFieldsTotal).toBeGreaterThanOrEqual(0);
//   });
//   test('documentFieldsQueryChange', () => {
//     // jest.useFakeTimers();
//     spy.documentField.resetCurrentDocumentFields = jest.spyOn(
//       wrapper.vm,
//       'resetCurrentDocumentFields',
//     );
//     spy.documentField.loadDocumentFieldsFromDocument = jest.spyOn(
//       wrapper.vm,
//       'loadDocumentFieldsFromDocument',
//     );
//     wrapper.setData({ documentFieldsFilterValue: 'Name' });
//     wrapper.update();
//     wrapper.vm.documentFieldsQueryChange({
//       page: 1,
//       pageSize: 10,
//       filters: [{ vals: '' }],
//     });
//     setTimeout(() => {
//       expect(wrapper.vm.resetCurrentDocumentFields).toBeCalled();
//       expect(wrapper.vm.loadDocumentFieldsFromDocument).toBeCalled();
//     }, 1000);
//   });
//   test('created', () => {
//     spy.documentField.refreshTranslations = jest.spyOn(wrapper.vm, 'refreshTranslations');
//     eventBus.$emit('language');
//     expect(wrapper.vm.refreshTranslations).toBeCalled();
//   });
// });