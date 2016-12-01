declare module '@technologyadvice/redux-crud' {
  declare class TAReduxCrud {
    createActionsFor(resource: string): Object;
    getActionsFor(resource: string): Object;
    createConstantsFor(resource: string): Object;
    getConstantsFor(resource: string): Object;
    createReducerFor(resource: string): Function;
    getReducerFor(resource: string): Function;
    createRecordReducerFor(resource: string): Function;
    getRecordReducerFor(resource: string): Function;
    fetchedEntities(entities: Object): Action;
    ENTITIES_FETCHED: string;
  }
  declare var exports: TAReduxCrud;
}
