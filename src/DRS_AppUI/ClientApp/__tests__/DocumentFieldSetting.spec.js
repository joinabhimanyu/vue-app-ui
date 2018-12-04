/* global jest,test, describe, expect,beforeEach,afterEach */

import {
  createLocalVue,
  mount,
} from 'vue-test-utils';
import '../plugins/element';
import '../plugins/font-awesome';
import {
  eventBus,
} from '../main';
import UtilityMixin from '../mixins/utilityMixin';
import DocumentFieldSetting from '../components/DocumentFieldSetting.vue';
import {
  fakeTransitions,
  spyConsole,
} from '../__mocks__/fakeTransitions';

jest.mock('../main');
jest.mock('../mixins/utilityMixin');

describe('DocumentFieldSetting.spce.js', () => {
  const spy = spyConsole();
  let wrapper;
  const localVue = createLocalVue();
  localVue.use(UtilityMixin);

  beforeEach(() => {
    const $t = content => content;
    const $message = (content) => {
      console.log(content);
    };
    const $confirm = () => Promise.resolve();
    wrapper = mount(DocumentFieldSetting, {
      localVue,
      mocks: {
        $t,
        $message,
        $confirm,
      },
      propsData: {
        navigationProperty: '16SPP5012',
        parentContext: {},
      },
    });
    fakeTransitions();
  });
  afterEach(() => {
    if (spy.documentFieldSetting.refreshFormRules) {
      spy.documentFieldSetting.refreshFormRules.mockRestore();
    }
    if (spy.documentFieldSetting.refreshFilterOptions) {
      spy.documentFieldSetting.refreshFilterOptions.mockRestore();
    }
    if (spy.documentFieldSetting.refreshGridCols) {
      spy.documentFieldSetting.refreshGridCols.mockRestore();
    }
    if (spy.documentFieldSetting.setCurrentRow) {
      spy.documentFieldSetting.setCurrentRow.mockRestore();
    }
    if (spy.documentFieldSetting.clearValidate) {
      spy.documentFieldSetting.clearValidate.mockRestore();
    }
    if (spy.documentFieldSetting.clearSelectionDocumentFieldSettings) {
      spy.documentFieldSetting.clearSelectionDocumentFieldSettings.mockRestore();
    }
    if (spy.documentFieldSetting.clearSelection) {
      spy.documentFieldSetting.clearSelection.mockRestore();
    }
    if (spy.documentFieldSetting.resetAfterSaveDocumentFieldSettings) {
      spy.documentFieldSetting.resetAfterSaveDocumentFieldSettings.mockRestore();
    }
    if (spy.documentFieldSetting.resetCurrentDocumentFieldSettings) {
      spy.documentFieldSetting.resetCurrentDocumentFieldSettings.mockRestore();
    }
    if (spy.documentFieldSetting.resetDocumentFieldSettings) {
      spy.documentFieldSetting.resetDocumentFieldSettings.mockRestore();
    }
    if (spy.documentFieldSetting.loadDocumentFieldSettingsFromDocument) {
      spy.documentFieldSetting.loadDocumentFieldSettingsFromDocument.mockRestore();
    }
    if (spy.documentFieldSetting.saveNewDocumentFieldSetting) {
      spy.documentFieldSetting.saveNewDocumentFieldSetting.mockRestore();
    }
    if (spy.documentFieldSetting.transformToOutputDocumentFieldSettings) {
      spy.documentFieldSetting.transformToOutputDocumentFieldSettings.mockRestore();
    }
    if (spy.documentFieldSetting.saveDirtyDocumentFieldSetting) {
      spy.documentFieldSetting.saveDirtyDocumentFieldSetting.mockRestore();
    }
    if (
      spy.documentFieldSetting.restoreSelectedDocumentFieldSettingsToOldState
    ) {
      spy.documentFieldSetting.restoreSelectedDocumentFieldSettingsToOldState.mockRestore();
    }
    if (spy.documentFieldSetting.saveDocumentFieldSettings) {
      spy.documentFieldSetting.saveDocumentFieldSettings.mockRestore();
    }
    if (spy.documentFieldSetting.refreshTranslations) {
      spy.documentFieldSetting.refreshTranslations.mockRestore();
    }
  });
  test('has proper navigation property', () => {
    expect(wrapper.vm.navigationProperty).toEqual('16SPP5012');
  });
  test('has proper refs documentFieldSettingsTable', () => {
    expect(wrapper.vm.$refs.documentFieldSettingsTable).not.toBeNull();
  });
  test('refreshFormRules', () => {
    wrapper.vm.refreshFormRules();
    expect(wrapper.vm.documentFieldSettingsFormRules.name[0].message).toEqual(
      'name_blank',
    );
    expect(wrapper.vm.documentFieldSettingsFormRules.name[1].message).toEqual(
      'length_validation',
    );
    expect(wrapper.vm.documentFieldSettingsFormRules.value[0].message).toEqual(
      'value_blank',
    );
    expect(wrapper.vm.documentFieldSettingsFormRules.value[1].message).toEqual(
      'length_validation',
    );
    expect(
      wrapper.vm.documentFieldSettingsFormRules.description[0].message,
    ).toEqual('description_blank');
    expect(
      wrapper.vm.documentFieldSettingsFormRules.description[1].message,
    ).toEqual('length_validation');
  });
  test('refreshFilterOptions', () => {
    wrapper.vm.refreshFilterOptions();
    expect(wrapper.vm.documentFieldSettingsFilterOption[0].label).toEqual(
      'name',
    );
    expect(wrapper.vm.documentFieldSettingsFilterOption[1].label).toEqual(
      'value',
    );
    expect(wrapper.vm.documentFieldSettingsFilterOption[2].label).toEqual(
      'description',
    );
  });
  test('refreshGridCols', () => {
    wrapper.vm.refreshGridCols();
    expect(wrapper.vm.documentFieldSettingsCols[0].label).toEqual('name');
    expect(wrapper.vm.documentFieldSettingsCols[1].label).toEqual('value');
    expect(wrapper.vm.documentFieldSettingsCols[2].label).toEqual(
      'description',
    );
    expect(wrapper.vm.documentFieldSettingsCols[3].label).toEqual('is_active');
  });
  test('refreshTranslations', () => {
    spy.documentFieldSetting.refreshFormRules = jest.spyOn(
      wrapper.vm,
      'refreshFormRules',
    );
    spy.documentFieldSetting.refreshFilterOptions = jest.spyOn(
      wrapper.vm,
      'refreshFilterOptions',
    );
    spy.documentFieldSetting.refreshGridCols = jest.spyOn(
      wrapper.vm,
      'refreshGridCols',
    );
    wrapper.update();
    wrapper.vm.refreshTranslations();
    expect(wrapper.vm.refreshFormRules).toBeCalled();
    expect(wrapper.vm.refreshFilterOptions).toBeCalled();
    expect(wrapper.vm.refreshGridCols).toBeCalled();
  });
  test('handleSelectionChangeDocumentFieldSettings', () => {
    const documentFieldSettings = [{
      description: 'Dokumentnavn',
      documentFieldSettingId: 1,
      documentId: 351,
      fieldId: 42,
      isActive: true,
      markForDelete: false,
      name: 'Dokumentnavn',
      created: '1/26/2011',
      createdBy: 'STB\\T21',
      updated: '1/26/2011',
      updatedBy: 'STB\\T21',
      value: 'Bekreftelse utbetaling',
    }];
    wrapper.setData({
      documentFieldSettings,
    });
    // wrapper.vm.handleSelectionChangeDocumentFieldSettings(
    //   documentFieldSettings,
    // );
    expect(
      wrapper.vm.$refs.documentFieldSettingsTable.curTableData,
    ).not.toBeNull();
    expect(
      JSON.stringify(wrapper.vm.$refs.documentFieldSettingsTable.curTableData),
    ).toEqual(JSON.stringify(wrapper.vm.documentFieldSettings));
    // const filter = wrapper.vm.documentFieldSettings.filter(
    //   x => x.markForDelete,
    // );
    // expect(filter.length).toEqual(documentFieldSettings.length);
  });
  test('resetCurrentDocumentFieldSettings', () => {
    const selectedDocumentFieldSetting = {
      description: 'Dokumentnavn',
      documentFieldSettingId: 1,
      documentId: 351,
      fieldId: 42,
      isActive: true,
      markForDelete: false,
      name: 'Dokumentnavn',
      created: '1/26/2011',
      createdBy: 'STB\\T21',
      updated: '1/26/2011',
      updatedBy: 'STB\\T21',
      value: 'Bekreftelse utbetaling',
    };
    spy.documentFieldSetting.setCurrentRow = jest.spyOn(
      wrapper.vm.$refs.documentFieldSettingsTable.$children[1],
      'setCurrentRow',
    );
    wrapper.setData({
      selectedDocumentFieldSetting,
    });
    wrapper.update();
    wrapper.vm.resetCurrentDocumentFieldSettings();
    expect(JSON.stringify(wrapper.vm.selectedDocumentFieldSetting)).toEqual(
      JSON.stringify({}),
    );
    expect(
      wrapper.vm.$refs.documentFieldSettingsTable.$children[1].setCurrentRow,
    ).toBeCalledWith(null);
  });
  test('resetFormFieldsDocumentFieldSettings', async () => {
    wrapper.setData({
      showDocumentFieldSettingsDialog: true,
    });
    await wrapper.vm.$nextTick();
    spy.documentFieldSetting.clearValidate = jest.spyOn(
      wrapper.vm.$children[1].$children[2].$children[0].$children[0],
      'clearValidate',
    );
    wrapper.vm.resetFormFieldsDocumentFieldSettings();
    expect(
      wrapper.vm.$children[1].$children[2].$children[0].$children[0]
      .clearValidate,
    ).toBeCalled();
  });
  test('onCommandDocumentFieldSettings called with new', async () => {
    await wrapper.vm.onCommandDocumentFieldSettings('new');
    expect(wrapper.vm.showDocumentFieldSettingsDialog).toEqual(true);
    expect(wrapper.vm.loadingDialogDocumentFieldSettings).toEqual(false);
    expect(wrapper.vm.documentFieldSettingsModalMode).toEqual('create');
    expect(
      // eslint-disable-next-line no-prototype-builtins
      wrapper.vm.$children[1].$children[2].$children[0].$children[0].$props.hasOwnProperty(
        'visible',
      ),
    ).toBeFalsy();
  });
  test('onCommandDocumentFieldSettings called with edit', async () => {
    const selectedDocumentFieldSetting = {
      description: 'Dokumentnavn',
      documentFieldSettingId: 1,
      documentId: 351,
      fieldId: 42,
      isActive: true,
      markForDelete: false,
      name: 'Dokumentnavn',
      created: '1/26/2011',
      createdBy: 'STB\\T21',
      updated: '1/26/2011',
      updatedBy: 'STB\\T21',
      value: 'Bekreftelse utbetaling',
    };
    wrapper.setData({
      selectedDocumentFieldSetting,
    });
    await wrapper.vm.onCommandDocumentFieldSettings('edit');
    expect(wrapper.vm.showDocumentFieldSettingsDialog).toEqual(true);
    expect(wrapper.vm.loadingDialogDocumentFieldSettings).toEqual(false);
    expect(wrapper.vm.documentFieldSettingsModalMode).toEqual('update');
    expect(
      // eslint-disable-next-line no-prototype-builtins
      wrapper.vm.$children[1].$children[2].$children[0].$children[0].$props.hasOwnProperty(
        'visible',
      ),
    ).toBeFalsy();
  });
  test('onCommandDocumentFieldSettings called with delete', async () => {
    const documentFieldSettings = [{
      description: 'Dokumentnavn',
      documentFieldSettingId: 1,
      documentId: 351,
      fieldId: 42,
      isActive: true,
      markForDelete: true,
      name: 'Dokumentnavn',
      created: '1/26/2011',
      createdBy: 'STB\\T21',
      updated: '1/26/2011',
      updatedBy: 'STB\\T21',
      value: 'Bekreftelse utbetaling',
    }];
    wrapper.setData({
      documentFieldSettings,
    });
    await wrapper.vm.onCommandDocumentFieldSettings('delete');
    expect(console.log).toHaveBeenCalled();
    expect(spy.console.mock.calls[0][0]).toContain('delete_success');
    expect(wrapper.vm.documentFieldSettings).not.toBeNull();
    expect(wrapper.vm.documentFieldSettings.length).toBeGreaterThanOrEqual(0);
    expect(wrapper.vm.documentFieldSettingsTotal).toBeGreaterThanOrEqual(0);
  });
  test('onCommandDocumentFieldSettings called with clearSelection', () => {
    spy.documentFieldSetting.clearSelectionDocumentFieldSettings = jest.spyOn(
      wrapper.vm,
      'clearSelectionDocumentFieldSettings',
    );
    spy.documentFieldSetting.clearSelection = jest.spyOn(
      wrapper.vm.$refs.documentFieldSettingsTable.$children[1],
      'clearSelection',
    );
    const documentFieldSettings = [{
      description: 'Dokumentnavn',
      documentFieldSettingId: 1,
      documentId: 351,
      fieldId: 42,
      isActive: true,
      markForDelete: false,
      name: 'Dokumentnavn',
      created: '1/26/2011',
      createdBy: 'STB\\T21',
      updated: '1/26/2011',
      updatedBy: 'STB\\T21',
      value: 'Bekreftelse utbetaling',
    }];
    wrapper.setData({
      documentFieldSettings,
    });
    wrapper.update();
    wrapper.vm.onCommandDocumentFieldSettings('clearSelection');
    expect(wrapper.vm.clearSelectionDocumentFieldSettings).toBeCalled();
    expect(
      wrapper.vm.$refs.documentFieldSettingsTable.$children[1].clearSelection,
    ).toBeCalled();
    const filter = wrapper.vm.documentFieldSettings.filter(
      x => !x.markForDelete,
    );
    expect(filter.length).toEqual(wrapper.vm.documentFieldSettings.length);
  });
  test('onCommandDocumentFieldSettings called with refresh', () => {
    spy.documentFieldSetting.resetAfterSaveDocumentFieldSettings = jest.spyOn(
      wrapper.vm,
      'resetAfterSaveDocumentFieldSettings',
    );
    wrapper.update();
    wrapper.vm.onCommandDocumentFieldSettings('refresh');
    expect(wrapper.vm.resetAfterSaveDocumentFieldSettings).toBeCalled();
  });
  test('resetDocumentFieldSettings called', () => {
    wrapper.vm.resetDocumentFieldSettings();
    expect(wrapper.vm.documentFieldSettingsModalMode).toEqual('');
    expect(wrapper.vm.showDocumentFieldSettingsDialog).toEqual(false);
    expect(wrapper.vm.documentFieldSettings.length).toEqual(0);
    expect(wrapper.vm.documentFieldSettingsFilterValue).toEqual('');
    expect(wrapper.vm.documentFieldSettingsFilter[0].vals).toEqual('');
  });
  test('resetDocumentFieldSettings called with "on_close"', () => {
    wrapper.vm.resetDocumentFieldSettings('on_close');
    expect(wrapper.vm.documentFieldSettingsModalMode).toEqual('');
    expect(wrapper.vm.showDocumentFieldSettingsDialog).toEqual(false);
  });

  test('resetAfterSaveDocumentFieldSettings called called', async () => {
    spy.documentFieldSetting.resetCurrentDocumentFieldSettings = jest.spyOn(
      wrapper.vm,
      'resetCurrentDocumentFieldSettings',
    );
    spy.documentFieldSetting.resetDocumentFieldSettings = jest.spyOn(
      wrapper.vm,
      'resetDocumentFieldSettings',
    );
    spy.documentFieldSetting.loadDocumentFieldSettingsFromDocument = jest.spyOn(
      wrapper.vm,
      'loadDocumentFieldSettingsFromDocument',
    );
    const args = {
      pageSize: wrapper.vm.defaultPageSizeGrid,
      NavigationProperty: {
        Props: [{
          PropName: 'DocumentIdentity',
          PropValue: wrapper.vm.navigationProperty || '',
        }],
      },
      OrderByProp: {
        PropName: 'DocumentFieldSettingId',
      },
    };
    wrapper.update();
    await wrapper.vm.resetAfterSaveDocumentFieldSettings();
    expect(wrapper.vm.resetCurrentDocumentFieldSettings).toBeCalled();
    expect(wrapper.vm.resetDocumentFieldSettings).toBeCalled();
    expect(wrapper.vm.loadDocumentFieldSettingsFromDocument).toBeCalledWith(
      args,
    );
  });
  test('clearSelectionDocumentFieldSettings called', () => {
    spy.documentFieldSetting.clearSelection = jest.spyOn(
      wrapper.vm.$refs.documentFieldSettingsTable.$children[1],
      'clearSelection',
    );
    const documentFieldSettings = [{
      description: 'Dokumentnavn',
      documentFieldSettingId: 1,
      documentId: 351,
      fieldId: 42,
      isActive: true,
      markForDelete: false,
      name: 'Dokumentnavn',
      created: '1/26/2011',
      createdBy: 'STB\\T21',
      updated: '1/26/2011',
      updatedBy: 'STB\\T21',
      value: 'Bekreftelse utbetaling',
    }];
    wrapper.setData({
      documentFieldSettings,
    });
    wrapper.update();
    wrapper.vm.clearSelectionDocumentFieldSettings();
    expect(
      wrapper.vm.$refs.documentFieldSettingsTable.$children[1].clearSelection,
    ).toBeCalled();
    const filter = wrapper.vm.documentFieldSettings.filter(
      x => !x.markForDelete,
    );
    expect(filter.length).toEqual(wrapper.vm.documentFieldSettings.length);
  });
  test('saveDocumentFieldSettings called for create', async () => {
    const selectedDocumentFieldSetting = {
      description: 'Dokumentnavn',
      documentFieldSettingId: 1,
      documentId: 351,
      fieldId: 42,
      isActive: true,
      markForDelete: false,
      name: 'Dokumentnavn',
      created: '1/26/2011',
      createdBy: 'STB\\T21',
      updated: '1/26/2011',
      updatedBy: 'STB\\T21',
      value: 'Bekreftelse utbetaling',
    };
    spy.documentFieldSetting.saveNewDocumentFieldSetting = jest.spyOn(
      wrapper.vm,
      'saveNewDocumentFieldSetting',
    );
    spy.documentFieldSetting.transformToOutputDocumentFieldSettings = jest.spyOn(
      wrapper.vm,
      'transformToOutputDocumentFieldSettings',
    );
    wrapper.setData({
      documentFieldSettingsModalMode: 'create',
    });
    wrapper.setData({
      selectedDocumentFieldSetting,
    });
    wrapper.update();
    const resp = await wrapper.vm.saveDocumentFieldSettings();
    expect(wrapper.vm.saveNewDocumentFieldSetting).toBeCalled();
    expect(wrapper.vm.transformToOutputDocumentFieldSettings).toBeCalledWith(
      wrapper.vm.selectedDocumentFieldSetting,
    );
    expect(resp).toEqual('success');
  });
  test('saveDocumentFieldSettings called for update', async () => {
    const selectedDocumentFieldSetting = {
      description: 'Dokumentnavn',
      documentFieldSettingId: 1,
      documentId: 351,
      fieldId: 42,
      isActive: true,
      markForDelete: false,
      name: 'Dokumentnavn',
      created: '1/26/2011',
      createdBy: 'STB\\T21',
      updated: '1/26/2011',
      updatedBy: 'STB\\T21',
      value: 'Bekreftelse utbetaling',
    };
    spy.documentFieldSetting.saveDirtyDocumentFieldSetting = jest.spyOn(
      wrapper.vm,
      'saveDirtyDocumentFieldSetting',
    );
    spy.documentFieldSetting.transformToOutputDocumentFieldSettings = jest.spyOn(
      wrapper.vm,
      'transformToOutputDocumentFieldSettings',
    );
    wrapper.setData({
      documentFieldSettingsModalMode: 'update',
    });
    wrapper.setData({
      selectedDocumentFieldSetting,
    });
    wrapper.update();
    const resp = await wrapper.vm.saveDocumentFieldSettings();
    expect(wrapper.vm.saveDirtyDocumentFieldSetting).toBeCalled();
    expect(wrapper.vm.transformToOutputDocumentFieldSettings).toBeCalledWith(
      wrapper.vm.selectedDocumentFieldSetting,
    );
    expect(resp).toEqual('success');
  });
  test('saveNewDocumentFieldSetting called', () => {
    spy.create = jest.spyOn(wrapper.vm, 'create');
    wrapper.update();
    return wrapper.vm.saveNewDocumentFieldSetting(null).then((resp) => {
      expect(wrapper.vm.create).toBeCalled();
      expect(resp.status).toEqual(200);
      expect(resp.msg).toEqual('success');
    });
  });
  test('saveDirtyDocumentFieldSetting called', () => {
    spy.updateSingle = jest.spyOn(wrapper.vm, 'updateSingle');
    wrapper.update();
    return wrapper.vm.saveDirtyDocumentFieldSetting(null).then((resp) => {
      expect(wrapper.vm.updateSingle).toBeCalled();
      expect(resp.status).toEqual(200);
      expect(resp.msg).toEqual('success');
    });
  });
  test('onBeforeCloseDocumentFieldSettingsDialog called', async () => {
    spy.documentFieldSetting.restoreSelectedDocumentFieldSettingsToOldState = jest.spyOn(
      wrapper.vm,
      'restoreSelectedDocumentFieldSettingsToOldState',
    );
    spy.documentFieldSetting.resetDocumentFieldSettings = jest.spyOn(
      wrapper.vm,
      'resetDocumentFieldSettings',
    );
    wrapper.update();
    const done = () => {
      console.log('done');
    };
    await wrapper.vm.onBeforeCloseDocumentFieldSettingsDialog(done);
    expect(
      wrapper.vm.restoreSelectedDocumentFieldSettingsToOldState,
    ).toBeCalled();
    expect(wrapper.vm.resetDocumentFieldSettings).toBeCalledWith('on_close');
  });
  test('onCloseDocumentFieldSettingsDialog', () => {
    spy.documentFieldSetting.restoreSelectedDocumentFieldSettingsToOldState = jest.spyOn(
      wrapper.vm,
      'restoreSelectedDocumentFieldSettingsToOldState',
    );
    spy.documentFieldSetting.resetDocumentFieldSettings = jest.spyOn(
      wrapper.vm,
      'resetDocumentFieldSettings',
    );
    wrapper.update();
    wrapper.vm.onCloseDocumentFieldSettingsDialog();
    expect(
      wrapper.vm.restoreSelectedDocumentFieldSettingsToOldState,
    ).toBeCalled();
    expect(wrapper.vm.resetDocumentFieldSettings).toBeCalledWith('on_close');
  });
  test('restoreSelectedDocumentFieldSettingsToOldState with create', () => {
    spy.documentFieldSetting.resetCurrentDocumentFieldSettings = jest.spyOn(
      wrapper.vm,
      'resetCurrentDocumentFieldSettings',
    );
    wrapper.update();
    wrapper.setData({
      documentFieldSettingsModalMode: 'create',
    });
    wrapper.vm.restoreSelectedDocumentFieldSettingsToOldState();
    expect(wrapper.vm.resetCurrentDocumentFieldSettings).toBeCalled();
  });
  test('restoreSelectedDocumentFieldSettingsToOldState update', () => {
    const selectedDocumentFieldSetting = {
      description: 'changed description',
      documentFieldSettingId: 1,
      documentId: 351,
      fieldId: 42,
      isActive: true,
      markForDelete: false,
      name: 'changed name',
      created: '1/26/2011',
      createdBy: 'STB\\T21',
      updated: '1/26/2011',
      updatedBy: 'STB\\T21',
      value: 'Bekreftelse utbetaling',
    };
    const documentFieldSettings = [{
      description: 'Dokumentnavn',
      documentFieldSettingId: 1,
      documentId: 351,
      fieldId: 42,
      isActive: true,
      markForDelete: false,
      name: 'Dokumentnavn',
      created: '1/26/2011',
      createdBy: 'STB\\T21',
      updated: '1/26/2011',
      updatedBy: 'STB\\T21',
      value: 'Bekreftelse utbetaling',
    }];
    wrapper.setData({
      selectedDocumentFieldSetting,
    });
    wrapper.setData({
      documentFieldSettings,
    });
    wrapper.setData({
      documentFieldSettingsModalMode: 'update',
    });
    expect(wrapper.vm.selectedDocumentFieldSetting.name).toEqual(
      'changed name',
    );
    expect(wrapper.vm.selectedDocumentFieldSetting.description).toEqual(
      'changed description',
    );
    wrapper.vm.restoreSelectedDocumentFieldSettingsToOldState();
    expect(wrapper.vm.selectedDocumentFieldSetting.name).toEqual(
      'Dokumentnavn',
    );
    expect(wrapper.vm.selectedDocumentFieldSetting.description).toEqual(
      'Dokumentnavn',
    );
  });
  test('onSaveDocumentFieldSettingsDialog', async () => {
    const selectedDocumentFieldSetting = {
      description: 'Dokumentnavn',
      documentFieldSettingId: 1,
      documentId: 351,
      fieldId: 42,
      isActive: true,
      markForDelete: false,
      name: 'Dokumentnavn',
      created: '1/26/2011',
      createdBy: 'STB\\T21',
      updated: '1/26/2011',
      updatedBy: 'STB\\T21',
      value: 'Bekreftelse utbetaling',
    };
    wrapper.setData({
      selectedDocumentFieldSetting,
    });
    wrapper.setData({
      documentFieldSettingsModalMode: 'update',
    });
    wrapper.setData({
      showDocumentFieldSettingsDialog: true,
    });
    await wrapper.vm.$nextTick();
    expect(
      // eslint-disable-next-line no-prototype-builtins
      wrapper.vm.$children[1].$children[2].$children[0].$children[0].$props.hasOwnProperty(
        'visible',
      ),
    ).toBeFalsy();
    spy.documentFieldSetting.resetAfterSaveDocumentFieldSettings = jest.spyOn(
      wrapper.vm,
      'resetAfterSaveDocumentFieldSettings',
    );
    spy.documentFieldSetting.saveDocumentFieldSettings = jest.spyOn(
      wrapper.vm,
      'saveDocumentFieldSettings',
    );
    wrapper.update();

    return wrapper.vm.onSaveDocumentFieldSettingsDialog().then((resp) => {
      expect(wrapper.vm.saveDocumentFieldSettings).toBeCalled();
      expect(wrapper.vm.resetAfterSaveDocumentFieldSettings).toBeCalled();
      expect(resp).toEqual('valid');
    });
  });
  test('onDocumentFieldSettingsRowClicked', () => {
    const selectedDocumentFieldSetting = {
      description: 'Dokumentnavn',
      documentFieldSettingId: 1,
      documentId: 351,
      fieldId: 42,
      isActive: true,
      markForDelete: false,
      name: 'Dokumentnavn',
      created: '1/26/2011',
      createdBy: 'STB\\T21',
      updated: '1/26/2011',
      updatedBy: 'STB\\T21',
      value: 'Bekreftelse utbetaling',
    };
    wrapper.vm.onDocumentFieldSettingsRowClicked(selectedDocumentFieldSetting);
    expect(JSON.stringify(wrapper.vm.selectedDocumentFieldSetting)).toEqual(
      JSON.stringify(selectedDocumentFieldSetting),
    );
  });
  test('transformToInputDocumentFieldSettings', () => {
    const data = [{
      documentFieldSettingId: 1,
      documentId: 351,
      fieldId: 42,
      name: 'Dokumentnavn',
      description: 'Dokumentnavn',
      value: 'Bekreftelse utbetaling',
      isActive: true,
      created: '1/26/2011',
      createdBy: 'STB\\T21',
      updated: '1/26/2011',
      updatedBy: 'STB\\T21',
    }];
    const resp = wrapper.vm.transformToInputDocumentFieldSettings(data);
    expect(resp.length).toEqual(data.length);
    expect(resp[0].documentFieldSettingId).toEqual(
      data[0].documentFieldSettingId,
    );
    expect(resp[0].documentId).toEqual(data[0].documentId);
    expect(resp[0].fieldId).toEqual(data[0].fieldId);
    expect(resp[0].name).toEqual(data[0].name);
    expect(resp[0].description).toEqual(data[0].description);
    expect(resp[0].value).toEqual(data[0].value);
    expect(resp[0].isActive).toEqual(data[0].isActive);
    expect(resp[0].created).toEqual(
      new Date(data[0].created).toLocaleDateString(),
    );
    expect(resp[0].createdBy).toEqual(data[0].createdBy);
    expect(resp[0].updated).toEqual(
      new Date(data[0].updated).toLocaleDateString(),
    );
    expect(resp[0].updatedBy).toEqual(data[0].updatedBy);
    expect(resp[0].markForDelete).toEqual(false);
  });
  test('transformToOutputDocumentFieldSettings', () => {
    const data = {
      documentFieldSettingId: 1,
      documentId: 351,
      fieldId: 42,
      name: 'Dokumentnavn',
      description: 'Dokumentnavn',
      value: 'Bekreftelse utbetaling',
      isActive: true,
      created: '1/26/2011',
      createdBy: 'STB\\T21',
      updated: '1/26/2011',
      updatedBy: 'STB\\T21',
    };
    try {
      const resp = wrapper.vm.transformToOutputDocumentFieldSettings(data);
      expect(resp.documentFieldSettingId).toEqual(data.documentFieldSettingId);
      expect(resp.documentId).toEqual(data.documentId);
      expect(resp.fieldId).toEqual(data.fieldId);
      expect(resp.name).toEqual(data.name);
      expect(resp.description).toEqual(data.description);
      expect(resp.value).toEqual(data.value);
      expect(resp.isActive).toEqual(data.isActive);
      expect(new Date(resp.created).toLocaleDateString()).toEqual(
        new Date(data.created).toLocaleDateString(),
      );
      expect(resp.createdBy).toEqual(data.createdBy);
      expect(new Date(resp.updated).toLocaleDateString()).toEqual(
        new Date(data.updated).toLocaleDateString(),
      );
      expect(resp.updatedBy).toEqual(data.updatedBy);
    } catch (err) {
      console.log(err);
    }
  });
  test('loadDocumentFieldSettingsFromDocument', async () => {
    const submitargs = {
      pageSize: 20,
      NavigationProperty: {
        Props: [{
          PropName: 'DocumentIdentity',
          PropValue: wrapper.vm.navigationProperty || '',
        }],
      },
      OrderByProp: {
        Propname: 'DocumentFieldSettingId',
      },
    };
    await wrapper.vm.loadDocumentFieldSettingsFromDocument(
      submitargs,
    );
    expect(wrapper.vm.documentFieldSettings).not.toBeNull();
    expect(wrapper.vm.documentFieldSettings.length).toBeGreaterThanOrEqual(0);
    expect(wrapper.vm.documentFieldSettingsTotal).toBeGreaterThanOrEqual(0);
  });
  test('created', () => {
    spy.documentFieldSetting.refreshTranslations = jest.spyOn(
      wrapper.vm,
      'refreshTranslations',
    );
    eventBus.$emit('language');
    expect(wrapper.vm.refreshTranslations).toBeCalled();
  });
});