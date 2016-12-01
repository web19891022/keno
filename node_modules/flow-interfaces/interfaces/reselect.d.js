declare module 'reselect' {
  declare class Reselect {
    createSelector(...selectors: Array<Function|Array<Function>>): Function;
    createSelectorCreator(memoize: Function, ...memoizeOptions?: Array<any>): Function;
    createStructuredSelector(inputSelectors: Object, selectorCreator: Function): Function;
    defaultMemoize(fn: Function, equalityCheck: (currentVal: any, nextVal: any) => boolean): Function;
  }
  declare var exports: Reselect;
}
