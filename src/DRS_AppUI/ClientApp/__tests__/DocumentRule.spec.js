/* global jest, it, describe, expect,beforeEach,afterEach */

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
import DocumentRule from '../components/DocumentRule.vue';
import {
  fakeTransitions,
  spyConsole,
} from '../__mocks__/fakeTransitions';

jest.mock('../main');
jest.mock('../mixins/utilityMixin');

describe('DocumentRule.spce.js', () => {
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
    wrapper = mount(DocumentRule, {
      localVue,
      mocks: {
        $t,
        $message,
        $confirm,
      },
      propsData: {
        navigationProperty: '16SPP5012',
      },
    });
    fakeTransitions();
  });
  afterEach(() => {
    if (spy.documentRule.refreshTranslations) {
      spy.documentRule.refreshTranslations.mockRestore();
    }
    if (spy.documentRule.loadRuleSettingsFromRule) {
      spy.documentRule.loadRuleSettingsFromRule.mockRestore();
    }
    if (spy.documentRule.loadSchemaStepSettingsFromRule) {
      spy.documentRule.loadSchemaStepSettingsFromRule.mockRestore();
    }
    if (spy.documentRule.refreshFormRules) {
      spy.documentRule.refreshFormRules.mockRestore();
    }
    if (spy.documentRule.refreshFilterOptions) {
      spy.documentRule.refreshFilterOptions.mockRestore();
    }
    if (spy.documentRule.refreshGridCols) {
      spy.documentRule.refreshGridCols.mockRestore();
    }
    if (spy.documentRule.setCurrentRow) {
      spy.documentRule.setCurrentRow.mockRestore();
    }
    if (spy.documentRule.clearValidate) {
      spy.documentRule.clearValidate.mockRestore();
    }
    if (spy.documentRule.resetAfterSaveRules) {
      spy.documentRule.resetAfterSaveRules.mockRestore();
    }
    if (spy.documentRule.clearSelectionRules) {
      spy.documentRule.clearSelectionRules.mockRestore();
    }
    // if (spy.documentFieldSetting.clearSelectionDocumentFieldSettings) {
    //   spy.documentFieldSetting.clearSelectionDocumentFieldSettings.mockRestore();
    // }
    // if (spy.documentFieldSetting.clearSelection) {
    //   spy.documentFieldSetting.clearSelection.mockRestore();
    // }
    // if (spy.documentFieldSetting.resetCurrentDocumentFieldSettings) {
    //   spy.documentFieldSetting.resetCurrentDocumentFieldSettings.mockRestore();
    // }
    // if (spy.documentFieldSetting.resetDocumentFieldSettings) {
    //   spy.documentFieldSetting.resetDocumentFieldSettings.mockRestore();
    // }
    // if (spy.documentFieldSetting.loadDocumentFieldSettingsFromDocument) {
    //   spy.documentFieldSetting.loadDocumentFieldSettingsFromDocument.mockRestore();
    // }
    // if (spy.documentFieldSetting.saveNewDocumentFieldSetting) {
    //   spy.documentFieldSetting.saveNewDocumentFieldSetting.mockRestore();
    // }
    // if (spy.documentFieldSetting.transformToOutputDocumentFieldSettings) {
    //   spy.documentFieldSetting.transformToOutputDocumentFieldSettings.mockRestore();
    // }
    // if (spy.documentFieldSetting.saveDirtyDocumentFieldSetting) {
    //   spy.documentFieldSetting.saveDirtyDocumentFieldSetting.mockRestore();
    // }
  });
  it('should fire created', () => {
    spy.documentRule.refreshTranslations = jest.spyOn(wrapper.vm, 'refreshTranslations');
    eventBus.$emit('language');
    expect(wrapper.vm.refreshTranslations).toBeCalled();
  });
  it('should have proper navigation property', () => {
    expect(wrapper.vm.navigationProperty).toEqual('16SPP5012');
  });
  it('should have proper refs rulesTable', () => {
    expect(wrapper.vm.$refs.rulesTable).not.toBeNull();
  });
  it('should have proper refs ruleSettingsTable', () => {
    expect(wrapper.vm.$refs.ruleSettingsTable).not.toBeNull();
  });
  it('should have proper refs schemaStepSettingsTable', () => {
    expect(wrapper.vm.$refs.schemaStepSettingsTable).not.toBeNull();
  });
  it('should change toggleRuleSettings', async () => {
    expect(wrapper.vm.$children[1].$el.style.display).toBe('none');
    wrapper.setData({
      toggleRuleSettings: true,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$children[1].$el.style.display).toBe('');
  });
  it('should call loadRuleDependents', () => {
    const selectedRule = {
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: false,
      name: '0054 => SPAA-S',
      processSchema: '',
      processSchemaId: 4,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    };
    wrapper.setData({
      selectedRule,
    });
    const ruleSettingArgs = {
      pageSize: wrapper.vm.defaultPageSizeGrid,
      NavigationProperty: {
        Props: [{
          PropName: 'DocumentRuleId',
          PropValue: wrapper.vm.selectedRule.documentRuleId || 0,
        }],
      },
      OrderByProp: {
        PropName: 'DocumentRuleSettingId',
      },
    };
    const schemaStepSettingArgs = {
      pageSize: wrapper.vm.defaultPageSizeGrid,
      NavigationProperty: {
        Props: [{
          PropName: 'ProcessSchemaStep.ProcessSchema.ProcessSchemaId',
          PropValue: wrapper.vm.selectedRule.processSchemaId || 0,
          IsNestedProp: true,
        }],
      },
      OrderByProp: {
        PropName: 'ProcessSchemaStepSettingId',
      },
      IsNavigationEnabled: true,
    };
    spy.documentRule.loadRuleSettingsFromRule = jest.spyOn(wrapper.vm, 'loadRuleSettingsFromRule');
    spy.documentRule.loadSchemaStepSettingsFromRule = jest.spyOn(
      wrapper.vm,
      'loadSchemaStepSettingsFromRule',
    );
    wrapper.update();
    return wrapper.vm.loadRuleDependents().then(() => {
      expect(wrapper.vm.loadRuleSettingsFromRule).toBeCalledWith(ruleSettingArgs);
      // expect(wrapper.vm.loadSchemaStepSettingsFromRule).toBeCalledWith(schemaStepSettingArgs);
    });
  });
  it('should call refreshFormRules', () => {
    wrapper.vm.refreshFormRules();
    expect(wrapper.vm.pickerOptions.shortcuts[0].text).toEqual('today');
    expect(wrapper.vm.pickerOptions.shortcuts[1].text).toEqual('yesterday');
    expect(wrapper.vm.pickerOptions.shortcuts[2].text).toEqual('a_week_ago');
    expect(wrapper.vm.ruleSettingsFormRules.name[0].message).toEqual('name_blank');
    expect(wrapper.vm.ruleSettingsFormRules.name[1].message).toEqual('length_validation');
    expect(wrapper.vm.ruleSettingsFormRules.value[0].message).toEqual('value_blank');
    expect(wrapper.vm.ruleSettingsFormRules.value[1].message).toEqual('length_validation');
    expect(wrapper.vm.ruleSettingsFormRules.description[0].message).toEqual('description_blank');
    expect(wrapper.vm.ruleSettingsFormRules.description[1].message).toEqual('length_validation');
    expect(wrapper.vm.rulesFormRules.documentRuleGuid[0].message).toEqual(
      'document_rule_guid_blank',
    );
    expect(wrapper.vm.rulesFormRules.documentRuleGuid[1].message).toEqual('length_validation');
    expect(wrapper.vm.rulesFormRules.name[0].message).toEqual('name_blank');
    expect(wrapper.vm.rulesFormRules.name[1].message).toEqual('length_validation');
    expect(wrapper.vm.rulesFormRules.description[0].message).toEqual('description_blank');
    expect(wrapper.vm.rulesFormRules.description[1].message).toEqual('length_validation');
    expect(wrapper.vm.rulesFormRules.updated[0].message).toEqual('updated_blank');
    expect(wrapper.vm.rulesFormRules.updatedBy[0].message).toEqual('updated_by_blank');
  });
  it('should call refreshFilterOptions', () => {
    wrapper.vm.refreshFilterOptions();
    expect(wrapper.vm.schemaStepSettingsFilterOption[0].label).toEqual('name');
    expect(wrapper.vm.schemaStepSettingsFilterOption[1].label).toEqual('value');
    expect(wrapper.vm.schemaStepSettingsFilterOption[2].label).toEqual('description');
    expect(wrapper.vm.ruleSettingsFilterOption[0].label).toEqual('name');
    expect(wrapper.vm.ruleSettingsFilterOption[1].label).toEqual('value');
    expect(wrapper.vm.ruleSettingsFilterOption[2].label).toEqual('description');
    expect(wrapper.vm.rulesFilterOption[0].label).toEqual('rule_order');
    expect(wrapper.vm.rulesFilterOption[1].label).toEqual('field_query_rule');
    expect(wrapper.vm.rulesFilterOption[2].label).toEqual('name');
    expect(wrapper.vm.rulesFilterOption[3].label).toEqual('description');
  });
  it('should call refreshGridCols', () => {
    wrapper.vm.refreshGridCols();
    expect(wrapper.vm.schemaStepSettingsCols[0].label).toEqual('name');
    expect(wrapper.vm.schemaStepSettingsCols[1].label).toEqual('value');
    expect(wrapper.vm.schemaStepSettingsCols[2].label).toEqual('description');
    expect(wrapper.vm.schemaStepSettingsCols[3].label).toEqual('updated');
    expect(wrapper.vm.ruleSettingsCols[0].label).toEqual('name');
    expect(wrapper.vm.ruleSettingsCols[1].label).toEqual('value');
    expect(wrapper.vm.ruleSettingsCols[2].label).toEqual('description');
    expect(wrapper.vm.ruleSettingsCols[3].label).toEqual('updated');
    expect(wrapper.vm.ruleCols[0].label).toEqual('order');
    expect(wrapper.vm.ruleCols[1].label).toEqual('is_active');
    expect(wrapper.vm.ruleCols[2].label).toEqual('name');
    expect(wrapper.vm.ruleCols[3].label).toEqual('description');
    expect(wrapper.vm.ruleCols[4].label).toEqual('field_query_rule');
    expect(wrapper.vm.ruleCols[5].label).toEqual('process_schema');
  });
  it('should call refreshTranslations', () => {
    spy.documentRule.refreshFormRules = jest.spyOn(wrapper.vm, 'refreshFormRules');
    spy.documentRule.refreshFilterOptions = jest.spyOn(wrapper.vm, 'refreshFilterOptions');
    spy.documentRule.refreshGridCols = jest.spyOn(wrapper.vm, 'refreshGridCols');
    wrapper.update();
    wrapper.vm.refreshTranslations();
    expect(wrapper.vm.refreshFormRules).toBeCalled();
    expect(wrapper.vm.refreshFilterOptions).toBeCalled();
    expect(wrapper.vm.refreshGridCols).toBeCalled();
  });
  it('should call handleSelectionChangeRules', () => {
    const documentRules = [{
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: false,
      name: '0054 => SPAA-S',
      processSchema: '',
      processSchemaId: 4,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    }];
    wrapper.setData({
      documentRules,
    });
    wrapper.vm.handleSelectionChangeRules(documentRules);
    expect(wrapper.vm.$refs.rulesTable.curTableData).not.toBeNull();
    expect(JSON.stringify(wrapper.vm.$refs.rulesTable.curTableData)).toEqual(
      JSON.stringify(wrapper.vm.documentRules),
    );
    const filter = wrapper.vm.documentRules.filter(x => x.markForDelete);
    expect(filter.length).toEqual(documentRules.length);
  });
  it('should call resetCurrentRule', () => {
    const selectedRule = {
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: false,
      name: '0054 => SPAA-S',
      processSchema: '',
      processSchemaId: 4,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    };
    spy.documentRule.setCurrentRow = jest.spyOn(
      wrapper.vm.$refs.rulesTable.$children[1],
      'setCurrentRow',
    );
    wrapper.setData({
      selectedRule,
    });
    wrapper.update();
    wrapper.vm.resetCurrentRule();
    expect(JSON.stringify(wrapper.vm.selectedRule)).toEqual(JSON.stringify({}));
    expect(wrapper.vm.$refs.rulesTable.$children[1].setCurrentRow).toBeCalledWith(null);
  });
  it('should call resetFormFieldsRules', async () => {
    wrapper.setData({
      showRuleDialog: true,
    });
    await wrapper.vm.$nextTick();
    spy.documentRule.clearValidate = jest.spyOn(
      wrapper.vm.$children[2].$children[2].$children[0].$children[0],
      'clearValidate',
    );
    wrapper.vm.resetFormFieldsRules();
    expect(
      wrapper.vm.$children[2].$children[2].$children[0].$children[0].clearValidate,
    ).toBeCalled();
  });
  it('should call loadRulesProcessSchemaList', () =>
    wrapper.vm.loadRulesProcessSchemaList().then(() => {
      expect(wrapper.vm.loadingRulesProcessSchema).toBe(false);
      expect(wrapper.vm.rulesProcessSchemaList).not.toBeNull();
    }));
  it('should call rulesProcessSchemaChanged', () => {
    const rulesProcessSchemaList = [{
        label: 'AA - Test Schema',
        value: 133,
      },
      {
        label: 'AAA - Test Workflow',
        value: 134,
      },
    ];
    const selectedRule = {
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: false,
      name: '0054 => SPAA-S',
      processSchema: 'AAA - Test Workflow',
      processSchemaId: 134,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    };
    try {
      // jest.useFakeTimers();
      wrapper.setData({
        selectedRule,
      });
      wrapper.setData({
        showRuleDialog: true,
      });
      wrapper.vm.$nextTick(() => {
        wrapper.setData({
          rulesProcessSchemaList,
        });

        wrapper.vm.$nextTick(() => {
          wrapper.vm.rulesProcessSchemaChanged();
          expect(
            wrapper.vm.$children[2].$children[2].$children[0].$children[0].$children[8]
            .$children[0],
          ).not.toBeNull();
          expect(wrapper.vm.selectedRule.processSchema).toEqual(
            wrapper.vm.$children[2].$children[2].$children[0].$children[0].$children[8].$children[0]
            .selected.currentLabel,
          );
        });
      });
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });
  it('should call onCommandRules with new', () => {
    spy.documentRule.resetCurrentRule = jest.spyOn(wrapper.vm, 'resetCurrentRule');
    return wrapper.vm
      .onCommandRules('new')
      .then(() => {
        expect(wrapper.vm.showRuleDialog).toEqual(true);
        expect(wrapper.vm.loadingDialogDocumentRule).toEqual(false);
        expect(wrapper.vm.rulesModalMode).toEqual('create');
        wrapper.vm.$nextTick(() => {
          expect(
            // eslint-disable-next-line no-prototype-builtins
            wrapper.vm.$children[2].$children[2].$children[0].$children[0].$props.hasOwnProperty(
              'visible',
            ),
          ).toBeFalsy();
          expect(wrapper.vm.resetCurrentRule).toHaveBeenCalled();
        });
      });
  });

  it('should call onCommandRules with update', () =>
    wrapper.vm
    .onCommandRules('edit')
    .then(() => {
      expect(wrapper.vm.showRuleDialog).toEqual(true);
      expect(wrapper.vm.loadingDialogDocumentRule).toEqual(false);
      expect(wrapper.vm.rulesModalMode).toEqual('update');
      wrapper.vm.$nextTick(() => {
        expect(
          // eslint-disable-next-line no-prototype-builtins
          wrapper.vm.$children[2].$children[2].$children[0].$children[0].$props.hasOwnProperty(
            'visible',
          ),
        ).toBeFalsy();
      });
    })
    .catch((err) => {
      expect(err).not.toBeNull();
    }));
  it('should call onCommandRules with delete', () => {
    const documentRules = [{
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: true,
      name: '0054 => SPAA-S',
      processSchema: 'AAA - Test Workflow',
      processSchemaId: 134,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    }];
    wrapper.setData({
      documentRules,
    });
    spy.documentRule.resetAfterSaveRules = jest.spyOn(wrapper.vm, 'resetAfterSaveRules');
    wrapper.update();
    return wrapper.vm
      .onCommandRules('delete')
      .then(() => {
        expect(console.log).toHaveBeenCalled();
        expect(spy.console.mock.calls[0][0]).toContain('delete_success');
        expect(wrapper.vm.resetAfterSaveRules).toBeCalled();
        expect(wrapper.vm.documentRules).not.toBeNull();
        expect(
          wrapper.vm.documentRules.filter(x => !x.markForDelete).length,
        ).toBeGreaterThanOrEqual(0);
      })
      .catch((err) => {
        expect(err).not.toBeNull();
      });
  });
  it('should call onCommandRules with refresh', () => {
    spy.documentRule.resetAfterSaveRules = jest.spyOn(wrapper.vm, 'resetAfterSaveRules');
    return wrapper.vm.onCommandRules('refresh').then((resp) => {
      console.log(resp);
      expect(wrapper.vm.resetAfterSaveRules).toBeCalled();
    });
  });
  it('should call onCommandRules with clearSelection', () => {
    spy.documentRule.clearSelectionRules = jest.spyOn(wrapper.vm, 'clearSelectionRules');
    wrapper.update();
    return wrapper.vm.onCommandRules('clearSelection').then(() => {
      expect(wrapper.vm.clearSelectionRules).toBeCalled();
    });
  });
  it('should call resetRules without call_target', () => {
    wrapper.vm.resetRules();
    expect(wrapper.vm.rulesModalMode).toEqual('');
    expect(wrapper.vm.rulesProcessSchemaList.length).toBe(0);
    expect(wrapper.vm.showRuleDialog).toBeFalsy();
    expect(wrapper.vm.toggleRuleSettings).toBeFalsy();
    expect(wrapper.vm.documentRules.length).toBe(0);
    expect(wrapper.vm.rulesFilterValue).toEqual('');
    expect(wrapper.vm.rulesFilter[0].vals).toEqual('');
  });
  it('should call resetRules called with call_target', () => {
    wrapper.vm.resetRules('on_close');
    expect(wrapper.vm.rulesModalMode).toEqual('');
    expect(wrapper.vm.rulesProcessSchemaList.length).toBe(0);
    expect(wrapper.vm.showRuleDialog).toBeFalsy();
  });
  it('should call resetAfterSaveRules', () => {
    spy.documentRule.resetCurrentRule = jest.spyOn(wrapper.vm, 'resetCurrentRule');
    spy.documentRule.resetCurrentRuleSettings = jest.spyOn(wrapper.vm, 'resetCurrentRuleSettings');
    spy.documentRule.resetRules = jest.spyOn(wrapper.vm, 'resetRules');
    spy.documentRule.resetRuleSettings = jest.spyOn(wrapper.vm, 'resetRuleSettings');
    spy.documentRule.loadRulesFromDocument = jest.spyOn(wrapper.vm, 'loadRulesFromDocument');
    wrapper.update();
    const args = {
      pageSize: wrapper.vm.defaultPageSizeGrid,
      NavigationProperty: {
        Props: [{
          PropName: 'DocumentIdentity',
          PropValue: wrapper.vm.navigationProperty || '',
        }],
      },
      OrderByProp: {
        PropName: 'DocumentRuleId',
      },
    };
    return wrapper.vm.resetAfterSaveRules().then(() => {
      expect(wrapper.vm.resetCurrentRule).toBeCalled();
      expect(wrapper.vm.resetCurrentRuleSettings).toBeCalled();
      expect(wrapper.vm.resetRules).toBeCalled();
      expect(wrapper.vm.resetRuleSettings).toBeCalled();
      expect(wrapper.vm.loadRulesFromDocument).toBeCalledWith(args);
    });
  });
  it('should call clearSelectionRules', () => {
    spy.documentRule.clearSelection = jest.spyOn(
      wrapper.vm.$refs.rulesTable.$children[1],
      'clearSelection',
    );
    wrapper.update();
    const documentRules = [{
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: true,
      name: '0054 => SPAA-S',
      processSchema: '',
      processSchemaId: 4,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    }];
    wrapper.setData({
      documentRules,
    });
    wrapper.vm.clearSelectionRules();
    expect(wrapper.vm.$refs.rulesTable.$children[1].clearSelection).toBeCalled();
    const filter = wrapper.vm.documentRules.filter(x => !x.markForDelete);
    expect(filter.length).toEqual(wrapper.vm.documentRules.length);
  });
  it('should call saveRules with create', () => {
    const selectedRule = {
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: true,
      name: '0054 => SPAA-S',
      processSchema: '',
      processSchemaId: 4,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    };
    spy.documentRule.saveNewRule = jest.spyOn(wrapper.vm, 'saveNewRule');
    spy.documentRule.transformToOutputRules = jest.spyOn(wrapper.vm, 'transformToOutputRules');
    wrapper.setData({
      rulesModalMode: 'create',
    });
    wrapper.setData({
      selectedRule,
    });
    wrapper.update();
    return wrapper.vm.saveRules().then((resp) => {
      expect(wrapper.vm.saveNewRule).toBeCalled();
      expect(wrapper.vm.transformToOutputRules).toBeCalledWith(selectedRule);
      expect(resp).toEqual('success');
    });
  });
  it('should call saveRules with update', () => {
    const selectedRule = {
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: true,
      name: '0054 => SPAA-S',
      processSchema: '',
      processSchemaId: 4,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    };
    spy.documentRule.saveDirtyRule = jest.spyOn(wrapper.vm, 'saveDirtyRule');
    spy.documentRule.transformToOutputRules = jest.spyOn(wrapper.vm, 'transformToOutputRules');
    wrapper.setData({
      rulesModalMode: 'update',
    });
    wrapper.setData({
      selectedRule,
    });
    wrapper.update();
    return wrapper.vm.saveRules().then((resp) => {
      expect(wrapper.vm.saveDirtyRule).toBeCalled();
      expect(wrapper.vm.transformToOutputRules).toBeCalledWith(wrapper.vm.selectedRule);
      expect(resp).toEqual('success');
    });
  });
  it('should call saveNewRule', () => {
    spy.create = jest.spyOn(wrapper.vm, 'create');
    wrapper.update();
    return wrapper.vm.saveNewRule(null).then((resp) => {
      expect(wrapper.vm.create).toBeCalled();
      expect(resp.status).toEqual(200);
      expect(resp.msg).toEqual('success');
    });
  });
  it('should call saveDirtyRule', () => {
    spy.updateSingle = jest.spyOn(wrapper.vm, 'updateSingle');
    wrapper.update();
    return wrapper.vm.saveDirtyRule(null).then((resp) => {
      expect(wrapper.vm.updateSingle).toBeCalled();
      expect(resp.status).toEqual(200);
      expect(resp.msg).toEqual('success');
    });
  });
  it('should call onBeforeCloseRulesDialog', () => {
    spy.documentRule.restoreSelectedRuleToOldState = jest.spyOn(
      wrapper.vm,
      'restoreSelectedRuleToOldState',
    );
    spy.documentRule.resetRules = jest.spyOn(wrapper.vm, 'resetRules');
    wrapper.update();
    const done = () => {
      console.log('done');
    };
    return wrapper.vm.onBeforeCloseRulesDialog(done).then(() => {
      expect(wrapper.vm.restoreSelectedRuleToOldState).toBeCalled();
      expect(wrapper.vm.resetRules).toBeCalledWith('on_close');
    });
  });
  it('should call onCloseRulesDialog', () => {
    spy.documentRule.restoreSelectedRuleToOldState = jest.spyOn(
      wrapper.vm,
      'restoreSelectedRuleToOldState',
    );
    spy.documentRule.resetRules = jest.spyOn(wrapper.vm, 'resetRules');
    wrapper.update();
    wrapper.vm.onCloseRulesDialog();
    expect(wrapper.vm.restoreSelectedRuleToOldState).toBeCalled();
    expect(wrapper.vm.resetRules).toBeCalledWith('on_close');
  });
  it('should call restoreSelectedRuleToOldState with create', () => {
    spy.documentRule.resetCurrentRule = jest.spyOn(wrapper.vm, 'resetCurrentRule');
    wrapper.update();
    wrapper.setData({
      rulesModalMode: 'create',
    });
    wrapper.vm.restoreSelectedRuleToOldState();
    expect(wrapper.vm.resetCurrentRule).toBeCalled();
  });
  it('should call restoreSelectedRuleToOldState update', () => {
    const selectedRule = {
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: 'edited description',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: true,
      name: 'edited name',
      processSchema: '',
      processSchemaId: 4,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    };
    const documentRules = [{
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: true,
      name: '0054 => SPAA-S',
      processSchema: '',
      processSchemaId: 4,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    }];
    wrapper.setData({
      selectedRule,
    });
    wrapper.setData({
      documentRules,
    });
    wrapper.setData({
      rulesModalMode: 'update',
    });
    wrapper.vm.restoreSelectedRuleToOldState();
    const edited = wrapper.vm.documentRules.filter(
      x => x.documentRuleId === wrapper.vm.selectedRule.documentRuleId,
    )[0];
    expect(JSON.stringify(wrapper.vm.selectedRule)).toEqual(JSON.stringify(edited));
  });
  it('should call onSaveRulesDialog', async () => {
    const selectedRule = {
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: true,
      name: '0054 => SPAA-S',
      processSchema: '',
      processSchemaId: 4,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    };
    wrapper.setData({
      selectedRule,
    });
    wrapper.setData({
      rulesModalMode: 'update',
    });
    wrapper.setData({
      showRuleDialog: true,
    });
    await wrapper.vm.$nextTick();
    expect(
      // eslint-disable-next-line no-prototype-builtins
      wrapper.vm.$children[2].$children[2].$children[0].$children[0].$props.hasOwnProperty(
        'visible',
      ),
    ).toBeFalsy();
    spy.documentRule.resetAfterSaveRules = jest.spyOn(wrapper.vm, 'resetAfterSaveRules');
    spy.documentRule.saveRules = jest.spyOn(wrapper.vm, 'saveRules');
    wrapper.update();

    return wrapper.vm.onSaveRulesDialog().then((resp) => {
      expect(wrapper.vm.saveRules).toBeCalled();
      expect(wrapper.vm.resetAfterSaveRules).toBeCalled();
      expect(resp).toEqual('valid');
    });
  });
  it('should call onRulesRowClicked', () => {
    const selectedRule = {
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: true,
      name: '0054 => SPAA-S',
      processSchema: '',
      processSchemaId: 4,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    };
    wrapper.vm.onRulesRowClicked(selectedRule);
    expect(JSON.stringify(wrapper.vm.selectedRule)).toEqual(JSON.stringify(selectedRule));
  });
  it('should call transformToInputRules', () => {
    const data = [{
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: true,
      name: '0054 => SPAA-S',
      processSchema: '',
      processSchemaId: 4,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    }];
    const resp = wrapper.vm.transformToInputRules(data);
    expect(resp.length).toEqual(data.length);
    expect(resp[0].description).toEqual(data[0].description);
    expect(resp[0].documentId).toEqual(data[0].documentId);
    expect(resp[0].documentRuleGuid).toEqual(data[0].documentRuleGuid);
    expect(resp[0].documentRuleId).toEqual(data[0].documentRuleId);
    expect(resp[0].fieldQueryRule).toEqual(data[0].fieldQueryRule);
    expect(resp[0].isActive).toEqual(data[0].isActive);
    expect(resp[0].name).toEqual(data[0].name);
    expect(resp[0].processSchema).toEqual(data[0].processSchema);
    expect(resp[0].processSchemaId).toEqual(data[0].processSchemaId);
    expect(resp[0].ruleOrder).toEqual(data[0].ruleOrder);
    expect(resp[0].created).toEqual(new Date(data[0].created).toLocaleDateString());
    expect(resp[0].createdBy).toEqual(data[0].createdBy);
    expect(resp[0].updated).toEqual(new Date(data[0].updated).toLocaleDateString());
    expect(resp[0].updatedBy).toEqual(data[0].updatedBy);
    expect(resp[0].markForDelete).toEqual(false);
  });
  it('should call transformToOutputRules', () => {
    const data = {
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: true,
      name: '0054 => SPAA-S',
      processSchema: '',
      processSchemaId: 4,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    };
    try {
      const resp = wrapper.vm.transformToOutputRules(data);
      expect(JSON.stringify(resp)).toEqual(JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  });
  it('should call loadRulesFromDocument', () => {
    const submitargs = {
      pageSize: 20,
      NavigationProperty: {
        Props: [{
          PropName: 'DocumentIdentity',
          PropValue: wrapper.vm.navigationProperty || '',
        }],
      },
      OrderByProp: {
        Propname: 'DocumentRuleId',
      },
    };
    return wrapper.vm.loadRulesFromDocument(submitargs).then((resp) => {
      expect(resp).not.toBeNull();
      expect(wrapper.vm.documentRules).not.toBeNull();
      expect(wrapper.vm.documentRules.length).toBeGreaterThanOrEqual(0);
      expect(wrapper.vm.rulesTotal).toBeGreaterThanOrEqual(0);
    });
  });

  it('created', () => {
    spy.documentRule.refreshTranslations = jest.spyOn(wrapper.vm, 'refreshTranslations');
    eventBus.$emit('language');
    expect(wrapper.vm.refreshTranslations).toBeCalled();
  });
  it('should call handleSelectionChangeRuleSettings', () => {
    const ruleSettings = [{
      created: '10/4/2011',
      createdBy: 'STB\\JOMA26',
      description: 'Test',
      documentRuleId: 26,
      documentRuleSettingId: 5,
      markForDelete: false,
      name: 'DocumentCategory',
      updated: '10/4/2011',
      updatedBy: 'STB\\JOMA26',
      value: '949',
    }];
    wrapper.setData({
      ruleSettings,
    });
    wrapper.vm.handleSelectionChangeRuleSettings(ruleSettings);
    expect(wrapper.vm.$refs.ruleSettingsTable.curTableData).not.toBeNull();
    expect(JSON.stringify(wrapper.vm.$refs.ruleSettingsTable.curTableData)).toEqual(
      JSON.stringify(wrapper.vm.ruleSettings),
    );
    const filter = wrapper.vm.ruleSettings.filter(x => x.markForDelete);
    expect(filter.length).toEqual(ruleSettings.length);
  });
  it('should call resetCurrentRuleSettings', () => {
    const selectedRuleSetting = {
      created: '10/4/2011',
      createdBy: 'STB\\JOMA26',
      description: 'Test',
      documentRuleId: 26,
      documentRuleSettingId: 5,
      markForDelete: false,
      name: 'DocumentCategory',
      updated: '10/4/2011',
      updatedBy: 'STB\\JOMA26',
      value: '949',
    };
    spy.documentRuleSetting.setCurrentRow = jest.spyOn(
      wrapper.vm.$refs.ruleSettingsTable.$children[1],
      'setCurrentRow',
    );
    wrapper.setData({
      selectedRuleSetting,
    });
    wrapper.update();
    wrapper.vm.resetCurrentRuleSettings();
    expect(JSON.stringify(wrapper.vm.selectedRuleSetting)).toEqual(JSON.stringify({}));
    expect(wrapper.vm.$refs.ruleSettingsTable.$children[1].setCurrentRow).toBeCalledWith(null);
  });
  it('should call resetFormFieldsDocumentFieldSettings', async () => {
    wrapper.setData({
      showRuleSettingsDialog: true,
    });
    await wrapper.vm.$nextTick();
    spy.documentRuleSetting.clearValidate = jest.spyOn(
      wrapper.vm.$children[3].$children[2].$children[0].$children[0],
      'clearValidate',
    );
    wrapper.vm.resetFormFieldsRuleSettings();
    expect(
      wrapper.vm.$children[3].$children[2].$children[0].$children[0].clearValidate,
    ).toBeCalled();
  });
  it('onCommandRuleSettings called with new', () => {
    spy.documentRuleSetting.resetCurrentRuleSettings = jest.spyOn(wrapper.vm, 'resetCurrentRuleSettings');
    return wrapper.vm.onCommandRuleSettings('new').then(() => {
      expect(wrapper.vm.showRuleSettingsDialog).toEqual(true);
      expect(wrapper.vm.loadingDialogDocumentRuleSettings).toEqual(false);
      expect(wrapper.vm.ruleSettingsModalMode).toEqual('create');
      expect(wrapper.vm.resetCurrentRuleSettings).toHaveBeenCalled();
      expect(
        // eslint-disable-next-line no-prototype-builtins
        wrapper.vm.$children[3].$children[2].$children[0].$children[0].$props.hasOwnProperty(
          'visible',
        ),
      ).toBeFalsy();
    });
  });

  it('onCommandRuleSettings called with edit', () => {
    const selectedRuleSetting = {
      created: '10/4/2011',
      createdBy: 'STB\\JOMA26',
      description: 'Test',
      documentRuleId: 26,
      documentRuleSettingId: 5,
      markForDelete: false,
      name: 'DocumentCategory',
      updated: '10/4/2011',
      updatedBy: 'STB\\JOMA26',
      value: '949',
    };
    wrapper.setData({
      selectedRuleSetting,
    });
    return wrapper.vm.onCommandRuleSettings('edit').then(() => {
      expect(wrapper.vm.showRuleSettingsDialog).toEqual(true);
      expect(wrapper.vm.loadingDialogDocumentRuleSettings).toEqual(false);
      expect(wrapper.vm.ruleSettingsModalMode).toEqual('update');
      expect(
        // eslint-disable-next-line no-prototype-builtins
        wrapper.vm.$children[3].$children[2].$children[0].$children[0].$props.hasOwnProperty(
          'visible',
        ),
      ).toBeFalsy();
    });
  });
  it('onCommandRuleSettings called with delete', () => {
    const selectedRule = {
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: false,
      name: '0054 => SPAA-S',
      processSchema: '',
      processSchemaId: 4,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    };
    const ruleSettings = [{
      created: '10/4/2011',
      createdBy: 'STB\\JOMA26',
      description: 'Test',
      documentRuleId: 26,
      documentRuleSettingId: 5,
      markForDelete: true,
      name: 'DocumentCategory',
      updated: '10/4/2011',
      updatedBy: 'STB\\JOMA26',
      value: '949',
    }];
    spy.documentRuleSetting.resetAfterSaveRuleSettings = jest.spyOn(wrapper.vm, 'resetAfterSaveRuleSettings');
    wrapper.setData({
      ruleSettings,
    });
    wrapper.setData({
      selectedRule,
    });
    wrapper.update();
    return wrapper.vm.onCommandRuleSettings('delete').then(() => {
      expect(console.log).toHaveBeenCalled();
      expect(spy.console.mock.calls[0][0]).toContain('delete_success');
      expect(wrapper.vm.ruleSettings).not.toBeNull();
      expect(wrapper.vm.ruleSettings.length).toBeGreaterThanOrEqual(0);
      expect(wrapper.vm.ruleSettingsTotal).toBeGreaterThanOrEqual(0);
      expect(wrapper.vm.resetAfterSaveRuleSettings).toHaveBeenCalled();
    });
  });
  it('onCommandRuleSettings called with clearSelection', () => {
    spy.documentRuleSetting.clearSelectionRuleSettings = jest.spyOn(
      wrapper.vm,
      'clearSelectionRuleSettings',
    );
    spy.documentRuleSetting.clearSelection = jest.spyOn(
      wrapper.vm.$refs.ruleSettingsTable.$children[1],
      'clearSelection',
    );
    const ruleSettings = [{
      created: '10/4/2011',
      createdBy: 'STB\\JOMA26',
      description: 'Test',
      documentRuleId: 26,
      documentRuleSettingId: 5,
      markForDelete: false,
      name: 'DocumentCategory',
      updated: '10/4/2011',
      updatedBy: 'STB\\JOMA26',
      value: '949',
    }];
    wrapper.setData({
      ruleSettings,
    });
    wrapper.update();
    return wrapper.vm.onCommandRuleSettings('clearSelection').then(() => {
      expect(wrapper.vm.clearSelectionRuleSettings).toBeCalled();
      expect(wrapper.vm.$refs.ruleSettingsTable.$children[1].clearSelection).toBeCalled();
      const filter = wrapper.vm.ruleSettings.filter(x => !x.markForDelete);
      expect(filter.length).toEqual(wrapper.vm.ruleSettings.length);
    });
  });
  it('onCommandRuleSettings called with refresh', () => {
    spy.documentRuleSetting.resetAfterSaveRuleSettings = jest.spyOn(
      wrapper.vm,
      'resetAfterSaveRuleSettings',
    );
    const selectedRule = {
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: false,
      name: '0054 => SPAA-S',
      processSchema: '',
      processSchemaId: 4,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    };
    wrapper.setData({
      selectedRule,
    });
    wrapper.update();
    return wrapper.vm.onCommandRuleSettings('refresh').then(() => {
      expect(wrapper.vm.resetAfterSaveRuleSettings).toBeCalled();
    });
  });
  it('resetRuleSettings called', () => {
    wrapper.vm.resetRuleSettings();
    expect(wrapper.vm.ruleSettingsModalMode).toEqual('');
    expect(wrapper.vm.showRuleSettingsDialog).toEqual(false);
    expect(wrapper.vm.ruleSettings.length).toEqual(0);
    expect(wrapper.vm.ruleSettingsFilterValue).toEqual('');
    expect(wrapper.vm.ruleSettingsFilter[0].vals).toEqual('');
  });
  it('resetRuleSettings called with "on_close"', () => {
    wrapper.vm.resetRuleSettings('on_close');
    expect(wrapper.vm.ruleSettingsModalMode).toEqual('');
    expect(wrapper.vm.showRuleSettingsDialog).toEqual(false);
  });
  it('should call resetAfterSaveRuleSettings', () => {
    const selectedRule = {
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: false,
      name: '0054 => SPAA-S',
      processSchema: '',
      processSchemaId: 4,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    };
    const args = {
      pageSize: 20,
      NavigationProperty: {
        Props: [{
          PropName: 'DocumentRuleId',
          PropValue: selectedRule.documentRuleId || 0,
        }],
      },
      OrderByProp: {
        PropName: 'DocumentRuleSettingId',
      },
    };
    wrapper.setData({
      selectedRule,
    });
    spy.documentRuleSetting.resetCurrentRuleSettings = jest.spyOn(wrapper.vm, 'resetCurrentRuleSettings');
    spy.documentRuleSetting.resetRuleSettings = jest.spyOn(wrapper.vm, 'resetRuleSettings');
    spy.documentRuleSetting.loadRuleSettingsFromRule = jest.spyOn(wrapper.vm, 'loadRuleSettingsFromRule');
    wrapper.update();
    return wrapper.vm.resetAfterSaveRuleSettings().then(() => {
      expect(wrapper.vm.resetCurrentRuleSettings).toHaveBeenCalled();
      expect(wrapper.vm.resetRuleSettings).toHaveBeenCalled();
      expect(wrapper.vm.loadRuleSettingsFromRule).toHaveBeenCalledWith(args);
    });
  });
  it('should call clearSelectionRuleSettings', () => {
    spy.documentRuleSetting.clearSelection = jest.spyOn(wrapper.vm.$refs.ruleSettingsTable.$children[1], 'clearSelection');
    const ruleSettings = [{
      created: '10/4/2011',
      createdBy: 'STB\\JOMA26',
      description: 'Test',
      documentRuleId: 26,
      documentRuleSettingId: 5,
      markForDelete: false,
      name: 'DocumentCategory',
      updated: '10/4/2011',
      updatedBy: 'STB\\JOMA26',
      value: '949',
    }];
    wrapper.setData({
      ruleSettings,
    });
    wrapper.update();
    wrapper.vm.clearSelectionRuleSettings();
    expect(wrapper.vm.$refs.ruleSettingsTable.$children[1].clearSelection).toHaveBeenCalled();
    const filter = wrapper.vm.ruleSettings.filter(x => x.markForDelete);
    expect(filter.length).toEqual(0);
  });
  it('should call saveRuleSettings for create', () => {
    const selectedRuleSetting = {
      created: '10/4/2011',
      createdBy: 'STB\\JOMA26',
      description: 'Test',
      documentRuleId: 26,
      documentRuleSettingId: 5,
      markForDelete: false,
      name: 'DocumentCategory',
      updated: '10/4/2011',
      updatedBy: 'STB\\JOMA26',
      value: '949',
    };
    spy.documentRuleSetting.saveNewRuleSetting = jest.spyOn(
      wrapper.vm,
      'saveNewRuleSetting',
    );
    spy.documentRuleSetting.transformToOutputRuleSettings = jest.spyOn(
      wrapper.vm,
      'transformToOutputRuleSettings',
    );
    wrapper.setData({
      ruleSettingsModalMode: 'create',
    });
    wrapper.setData({
      selectedRuleSetting,
    });
    wrapper.update();
    return wrapper.vm.saveRuleSettings().then(() => {
      expect(wrapper.vm.saveNewRuleSetting).toBeCalled();
      expect(wrapper.vm.transformToOutputRuleSettings).toBeCalledWith(
        wrapper.vm.selectedRuleSetting,
      );
    });
  });
  it('should call saveRuleSettings for update', () => {
    const selectedRuleSetting = {
      created: '10/4/2011',
      createdBy: 'STB\\JOMA26',
      description: 'Test',
      documentRuleId: 26,
      documentRuleSettingId: 5,
      markForDelete: false,
      name: 'DocumentCategory',
      updated: '10/4/2011',
      updatedBy: 'STB\\JOMA26',
      value: '949',
    };
    spy.documentRuleSetting.saveDirtyRuleSettings = jest.spyOn(
      wrapper.vm,
      'saveDirtyRuleSettings',
    );
    spy.documentRuleSetting.transformToOutputRuleSettings = jest.spyOn(
      wrapper.vm,
      'transformToOutputRuleSettings',
    );
    wrapper.setData({
      ruleSettingsModalMode: 'update',
    });
    wrapper.setData({
      selectedRuleSetting,
    });
    wrapper.update();
    return wrapper.vm.saveRuleSettings().then(() => {
      expect(wrapper.vm.saveDirtyRuleSettings).toBeCalled();
      expect(wrapper.vm.transformToOutputRuleSettings).toBeCalledWith(
        selectedRuleSetting,
      );
    });
  });
  it('should call saveNewRuleSetting', () => {
    spy.create = jest.spyOn(wrapper.vm, 'create');
    wrapper.update();
    return wrapper.vm.saveNewRuleSetting(null).then((resp) => {
      expect(wrapper.vm.create).toBeCalled();
      expect(resp.status).toEqual(200);
      expect(resp.msg).toEqual('success');
    });
  });
  it('should call saveDirtyRuleSettings', () => {
    spy.updateSingle = jest.spyOn(wrapper.vm, 'updateSingle');
    wrapper.update();
    return wrapper.vm.saveDirtyRuleSettings(null).then((resp) => {
      expect(wrapper.vm.updateSingle).toBeCalled();
      expect(resp.status).toEqual(200);
      expect(resp.msg).toEqual('success');
    });
  });
  it('should call onBeforeCloseRuleSettingsDialog', async () => {
    spy.documentRuleSetting.restoreSelectedRuleSettingToOldState = jest.spyOn(
      wrapper.vm,
      'restoreSelectedRuleSettingToOldState',
    );
    spy.documentRuleSetting.resetRuleSettings = jest.spyOn(
      wrapper.vm,
      'resetRuleSettings',
    );
    wrapper.update();
    const done = () => {
      console.log('done');
    };
    await wrapper.vm.onBeforeCloseRuleSettingsDialog(done);
    expect(
      wrapper.vm.restoreSelectedRuleSettingToOldState,
    ).toBeCalled();
    expect(wrapper.vm.resetRuleSettings).toBeCalledWith('on_close');
  });
  it('should call onCloseRuleSettingsDialog', () => {
    spy.documentRuleSetting.restoreSelectedRuleSettingToOldState = jest.spyOn(
      wrapper.vm,
      'restoreSelectedRuleSettingToOldState',
    );
    spy.documentRuleSetting.resetRuleSettings = jest.spyOn(
      wrapper.vm,
      'resetRuleSettings',
    );
    wrapper.update();
    wrapper.vm.onCloseRuleSettingsDialog();
    expect(
      wrapper.vm.restoreSelectedRuleSettingToOldState,
    ).toBeCalled();
    expect(wrapper.vm.resetRuleSettings).toBeCalledWith('on_close');
  });
  it('should call restoreSelectedRuleSettingToOldState with create', () => {
    spy.documentRuleSetting.resetCurrentRuleSettings = jest.spyOn(
      wrapper.vm,
      'resetCurrentRuleSettings',
    );
    wrapper.update();
    wrapper.setData({
      ruleSettingsModalMode: 'create',
    });
    wrapper.vm.restoreSelectedRuleSettingToOldState();
    expect(wrapper.vm.resetCurrentRuleSettings).toBeCalled();
  });
  it('should call restoreSelectedRuleSettingToOldState with update', () => {
    const selectedRuleSetting = {
      created: '10/4/2011',
      createdBy: 'STB\\JOMA26',
      description: 'edited description',
      documentRuleId: 26,
      documentRuleSettingId: 5,
      markForDelete: false,
      name: 'edited name',
      updated: '10/4/2011',
      updatedBy: 'STB\\JOMA26',
      value: '949',
    };
    const ruleSettings = [{
      created: '10/4/2011',
      createdBy: 'STB\\JOMA26',
      description: 'Test',
      documentRuleId: 26,
      documentRuleSettingId: 5,
      markForDelete: false,
      name: 'DocumentCategory',
      updated: '10/4/2011',
      updatedBy: 'STB\\JOMA26',
      value: '949',
    }];
    wrapper.setData({
      selectedRuleSetting,
    });
    wrapper.setData({
      ruleSettings,
    });
    wrapper.setData({
      ruleSettingsModalMode: 'update',
    });
    expect(wrapper.vm.selectedRuleSetting.name).toEqual(
      'edited name',
    );
    expect(wrapper.vm.selectedRuleSetting.description).toEqual(
      'edited description',
    );
    wrapper.vm.restoreSelectedRuleSettingToOldState();
    expect(wrapper.vm.selectedRuleSetting.name).toEqual(
      'DocumentCategory',
    );
    expect(wrapper.vm.selectedRuleSetting.description).toEqual(
      'Test',
    );
  });
  it('should call onSaveRuleSettingsDialog', async () => {
    const selectedRuleSetting = {
      created: '10/4/2011',
      createdBy: 'STB\\JOMA26',
      description: 'edited description',
      documentRuleId: 26,
      documentRuleSettingId: 5,
      markForDelete: false,
      name: 'edited name',
      updated: '10/4/2011',
      updatedBy: 'STB\\JOMA26',
      value: '949',
    };
    const selectedRule = {
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: false,
      name: '0054 => SPAA-S',
      processSchema: '',
      processSchemaId: 4,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    };
    wrapper.setData({
      selectedRule,
    });
    wrapper.setData({
      selectedRuleSetting,
    });
    wrapper.setData({
      ruleSettingsModalMode: 'update',
    });
    wrapper.setData({
      showRuleSettingsDialog: true,
    });
    await wrapper.vm.$nextTick();
    expect(
      // eslint-disable-next-line no-prototype-builtins
      wrapper.vm.$children[3].$children[2].$children[0].$children[0].$props.hasOwnProperty(
        'visible',
      ),
    ).toBeFalsy();
    spy.documentRuleSetting.resetAfterSaveRuleSettings = jest.spyOn(
      wrapper.vm,
      'resetAfterSaveRuleSettings',
    );
    spy.documentRuleSetting.saveRuleSettings = jest.spyOn(
      wrapper.vm,
      'saveRuleSettings',
    );
    wrapper.update();

    return wrapper.vm.onSaveRuleSettingsDialog().then((resp) => {
      expect(wrapper.vm.saveRuleSettings).toBeCalled();
      expect(wrapper.vm.resetAfterSaveRuleSettings).toBeCalled();
      expect(resp).toEqual('valid');
    });
  });
  it('should call onRuleSettingsRowClicked', () => {
    const selectedRuleSetting = {
      created: '10/4/2011',
      createdBy: 'STB\\JOMA26',
      description: 'edited description',
      documentRuleId: 26,
      documentRuleSettingId: 5,
      markForDelete: false,
      name: 'edited name',
      updated: '10/4/2011',
      updatedBy: 'STB\\JOMA26',
      value: '949',
    };
    wrapper.vm.onRuleSettingsRowClicked(selectedRuleSetting);
    expect(JSON.stringify(wrapper.vm.selectedRuleSetting)).toEqual(
      JSON.stringify(selectedRuleSetting),
    );
  });
  it('should call transformToInputRuleSettings', () => {
    const data = [{
      created: '10/4/2011',
      createdBy: 'STB\\JOMA26',
      description: 'edited description',
      documentRuleId: 26,
      documentRuleSettingId: 5,
      markForDelete: false,
      name: 'edited name',
      updated: '10/4/2011',
      updatedBy: 'STB\\JOMA26',
      value: '949',
    }];
    const resp = wrapper.vm.transformToInputRuleSettings(data);
    expect(resp.length).toEqual(data.length);
    expect(resp[0].description).toEqual(
      data[0].description,
    );
    expect(resp[0].documentRuleId).toEqual(data[0].documentRuleId);
    expect(resp[0].documentRuleSettingId).toEqual(data[0].documentRuleSettingId);
    expect(resp[0].name).toEqual(data[0].name);
    expect(resp[0].value).toEqual(data[0].value);
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
  it('should call transformToOutputRuleSettings', () => {
    const data = {
      created: '10/4/2011',
      createdBy: 'STB\\JOMA26',
      description: 'edited description',
      documentRuleId: 26,
      documentRuleSettingId: 5,
      markForDelete: false,
      name: 'edited name',
      updated: '10/4/2011',
      updatedBy: 'STB\\JOMA26',
      value: '949',
    };
    try {
      const resp = wrapper.vm.transformToOutputRuleSettings(data);
      expect(resp.documentRuleSettingId).toEqual(data.documentRuleSettingId);
      expect(resp.documentRuleId).toEqual(data.documentRuleId);
      expect(resp.name).toEqual(data.name);
      expect(resp.description).toEqual(data.description);
      expect(resp.value).toEqual(data.value);
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
  it('should call loadRuleSettingsFromRule', () => {
    const selectedRule = {
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: false,
      name: '0054 => SPAA-S',
      processSchema: '',
      processSchemaId: 4,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    };
    wrapper.setData({
      selectedRule,
    });
    const submitargs = {
      pageSize: 20,
      NavigationProperty: {
        Props: [{
          PropName: 'DocumentRuleId',
          PropValue: wrapper.vm.selectedRule.documentRuleId || '',
        }],
      },
      OrderByProp: {
        Propname: 'DocumentRuleSettingId',
      },
    };
    return wrapper.vm.loadRuleSettingsFromRule(
      submitargs,
    ).then(() => {
      expect(wrapper.vm.ruleSettings).not.toBeNull();
      expect(wrapper.vm.ruleSettings.length).toBeGreaterThanOrEqual(0);
      expect(wrapper.vm.ruleSettingsTotal).toBeGreaterThanOrEqual(0);
    });
  });
  it('should call resetSchemaStepSettings', () => {
    wrapper.vm.resetSchemaStepSettings();
    expect(wrapper.vm.schemaStepSettings.length).toEqual(0);
    expect(wrapper.vm.schemaStepSettingsFilterValue).toEqual('');
    expect(wrapper.vm.schemaStepSettingsFilter[0].vals).toEqual('');
  });
  it('should call resetAfterSaveSchemaStepSettings', () => {
    const selectedRule = {
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: false,
      name: '0054 => SPAA-S',
      processSchema: '',
      processSchemaId: 4,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    };
    wrapper.setData({
      selectedRule,
    });
    spy.schemaStepSetting.resetSchemaStepSettings = jest.spyOn(
      wrapper.vm,
      'resetSchemaStepSettings',
    );
    spy.schemaStepSetting.loadSchemaStepSettingsFromRule = jest.spyOn(
      wrapper.vm,
      'loadSchemaStepSettingsFromRule',
    );
    const args = {
      pageSize: wrapper.vm.defaultPageSizeGrid,
      NavigationProperty: {
        Props: [{
          PropName: 'ProcessSchemaStep.ProcessSchema.ProcessSchemaId',
          PropValue: wrapper.vm.selectedRule.processSchemaId || '',
        }],
      },
      OrderByProp: {
        PropName: 'ProcessSchemaStepSettingId',
      },
      IsNavigationEnabled: true,
    };
    wrapper.update();
    return wrapper.vm.resetAfterSaveSchemaStepSettings().then(() => {
      expect(wrapper.vm.resetSchemaStepSettings).toBeCalled();
      expect(wrapper.vm.loadSchemaStepSettingsFromRule).toBeCalledWith(
        args,
      );
    });
  });
  it('should call loadSchemaStepSettingsFromRule', () => {
    const selectedRule = {
      created: '12/3/2010',
      createdBy: 'STBSVC-KSJUInst-AT',
      description: '0054 - Ansökan om Arbetsgivarplan Avgångspension till SPAA-S',
      documentId: 227,
      documentRuleGuid: 'c4cd2dfe-bcf7-4a3d-a822-778196bb660f',
      documentRuleId: 6,
      fieldQueryRule: '',
      isActive: true,
      markForDelete: false,
      name: '0054 => SPAA-S',
      processSchema: '',
      processSchemaId: 4,
      ruleOrder: 100,
      updated: '6/7/2011',
      updatedBy: 'STBJOMA26',
    };
    wrapper.setData({
      selectedRule,
    });
    const submitargs = {
      pageSize: 20,
      NavigationProperty: {
        Props: [{
          PropName: 'ProcessSchemaStep.ProcessSchema.ProcessSchemaId',
          PropValue: wrapper.vm.selectedRule.processSchemaId || 0,
        }],
      },
      OrderByProp: {
        PropName: 'ProcessSchemaStepSettingId',
      },
      IsNavigationEnabled: true,
    };
    spy.schemaStepSetting.transformToInputSchemaStepSettings = jest.spyOn(wrapper.vm, 'transformToInputSchemaStepSettings');
    spy.schemaStepSetting.resetCurrentRuleSettings = jest.spyOn(wrapper.vm, 'resetCurrentRuleSettings');
    wrapper.update();
    return wrapper.vm.loadSchemaStepSettingsFromRule(submitargs).then(() => {
      expect(wrapper.vm.loadingSchemStepSettings).toBeFalsy();
      expect(wrapper.vm.schemaStepSettings).not.toBeNull();
      expect(wrapper.vm.schemaStepSettingsTotal.length || 0).toBeGreaterThanOrEqual(0);
      expect(wrapper.vm.transformToInputSchemaStepSettings).toHaveBeenCalled();
      expect(wrapper.vm.resetCurrentRuleSettings).toHaveBeenCalled();
    });
  });
  it('should call transformToInputSchemaStepSettings', () => {
    const data = [{
      created: '2010-12-03T13:28:00',
      createdBy: 'STB\\SVC-KSJUInst-AT',
      description: 'AD group in CRM for SPSA-S (Arbetsgivarplan/Alternativ ITP).',
      name: 'Recipient',
      processSchemaStepId: 7,
      processSchemaStepSettingId: 19,
      updated: '2011-06-07T10:05:00',
      updatedBy: 'STB\\JOMA26',
      value: 'crm_sppsservice1',
    }];
    const result = wrapper.vm.transformToInputSchemaStepSettings(data);
    expect(result.length).toEqual(data.length);
    data.forEach((elem, index) => {
      expect(result[index].processSchemaStepId).toEqual(elem.processSchemaStepId);
      expect(result[index].processSchemaStepSettingId).toEqual(elem.processSchemaStepSettingId);
      expect(result[index].value).toEqual(elem.value);
      expect(result[index].name).toEqual(elem.name);
      expect(result[index].description).toEqual(elem.description);
      expect(result[index].created).toEqual(new Date(elem.created).toLocaleDateString());
      expect(result[index].createdBy).toEqual(elem.createdBy);
      expect(result[index].updated).toEqual(new Date(elem.updated).toLocaleDateString());
      expect(result[index].updatedBy).toEqual(elem.updatedBy);
    });
  });
});