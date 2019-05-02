//import { DataModel } from '../../models/DbRecord';
//
//const getOptions = {
//  method: 'GET',
//  headers: {
//    'Content-Type': 'application/json',
//  },
//};
//
//export interface IGetDependencies {
//  readonly getFromServer: (url: string) => Promise<Response>;
//}
//
//const getDataFromResponse = async (response: Response): Promise<DataModel[]> => {
//  const jsonDataArray: Array<DataModel> = await response.json();
//  return jsonDataArray;
//};
//
//export const getAllItemsActionCreator = (deps: IGetDependencies) => {
//  return (url: string) =>
//    async (): Promise<Array<DataModel>> => {
//      const response: Response = await deps.getFromServer(url);
//      const data: DataModel[] = await getDataFromResponse(response);
//      return await data;
//    };
//};
//
//export const fetchData = getAllItemsActionCreator({
//  getFromServer: (url: string) => fetch(url, getOptions),
//});
