declare module 'react-router-redux' {
  declare interface ReactRouterRedux {
    go: (number: number) => any;
    goBack: () => any;
    goForward: () => any;
    push: (location: Object) => any;
    replace: (location: Object) => any;
    syncHistoryWithStore: (history: Object, state: any, options: ?{
      adjustUrlOnReplay?: boolean,
      selectLocationState?: (state: any) => any,
    }) => Object;
    routerMiddleware: (history: Object) => any;
    routerReducer: Function;
    LOCATION_CHANGE: string;
  }
  declare var exports: ReactRouterRedux;
}
