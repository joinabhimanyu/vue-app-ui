export default {
  data() {
    return {
      defaultPageSizeGrid: 20,
    };
  },
  methods: {
    wrapPromise() {
      return new Promise((resolve) => {
        const resp = {
          data: {},
          status: 200,
          msg: 'success',
        };
        setTimeout(() => {
          resolve(resp);
        }, 100);
      });
    },
    submit() {
      return new Promise((resolve) => {
        const resp = {
          data: {
            result: [{}, {}],
            total: 100,
          },
          status: 200,
          msg: 'success',
        };
        setTimeout(() => {
          resolve(resp);
        }, 100);
      });
    },
    redirectHandler(pageName, args = null, context = null) {
      console.log(`PageName: ${pageName}`);
      console.log(`Args: ${args}`);
      console.log(`ParentContext: ${context}`);
    },
    fetchData() {
      return this.wrapPromise();
    },
    find() {
      return this.wrapPromise();
    },
    create() {
      return this.wrapPromise();
    },
    updateList() {
      return this.wrapPromise();
    },
    updateSingle() {
      return this.wrapPromise();
    },
    deleteList() {
      return this.wrapPromise();
    },
    deleteSingle() {
      return this.wrapPromise();
    },
    runGenerator(g) {
      const it = g();
      let ret;

      // asynchronously iterate over generator
      (function iterate(val) {
        ret = it.next(val);

        if (!ret.done) {
          // poor man's "is it a promise?" test
          if ('then' in ret.value) {
            // wait on the promise
            ret.value.then(iterate);
          } else {
            // immediate value: just send right back in
            // avoid synchronous recursion
            setTimeout(() => {
              iterate(ret.value);
            }, 0);
          }
        }
      }());
    },
  },
};
