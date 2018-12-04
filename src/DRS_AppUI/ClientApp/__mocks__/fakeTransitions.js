/* global jest, beforeEach,afterEach */
export const fakeTransitions = () => {
  window.getComputedStyle = () => ({
    transitionDelay: '',
    animationDelay: '',
    transitionDuration: '',
    animationDuration: '',
  });
};

export const spyConsole = () => {
  const spy = {
    documentField: {},
    documentFieldSetting: {},
    documentRule: {},
    documentRuleSetting: {},
    schemaStepSetting: {},
  };

  beforeEach(() => {
    spy.console = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    if (spy.console) {
      spy.console.mockRestore();
    }
    if (spy.create) {
      spy.create.mockRestore();
    }
    if (spy.updateList) {
      spy.updateList.mockRestore();
    }
    if (spy.updateSingle) {
      spy.updateSingle.mockRestore();
    }
  });

  return spy;
};