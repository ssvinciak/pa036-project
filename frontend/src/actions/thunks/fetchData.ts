//import { List } from 'immutable';
//import { DataModel } from '../../models/DbRecord';
//
//const getOptions = {
//  method: 'GET',
//  headers: {
//    'Content-Type': 'application/json',
//  },
//};
//
//
//
//export interface IGetDependencies {
//  readonly getFromServer: () => Promise<Response>;
//}
//
//export const getAllItemsActionCreator = (deps: IGetDependencies) => {
//  return () =>
//    async (): Promise<List<DataModel>> => {
//      const response: Response = await deps.getFromServer();
//      return getDataFromResponse(response);
//    };
//};
//
//
//const getDataFromResponse = async (response: Response): Promise<DataModel[]> => {
//  const jsonDataArray: Array<DataModel> = await response.json();
//  return jsonDataArray;
//};
//
//
//export const fetchData = getAllItemsActionCreator({
//  getFromServer: () => fetch('url goes here', getOptions),
//});
//
