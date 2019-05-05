import { OrderedMap } from 'immutable';
import { DataModel } from '../models/DbRecord';

declare global {
  export type DataType = OrderedMap<string, DataModel>;

  interface Date {
    addDays(days: number): Date;
  }
}
