import { List } from 'immutable';
import { DataModel } from '../../models/DbRecord';


const a: DataModel = {
  id: '1',
  value: 32.1,
  dateTime: '2000-01-01/08:00',
};

const b: DataModel = {
  id: '2',
  value: 32.5,
  dateTime: '2000-01-01/09:00',
};

const c: DataModel = {
  id: '3',
  value: 32.7,
  dateTime: '2000-01-01/11:00',
};


const d: DataModel = {
  id: '4',
  value: 32.8,
  dateTime: '2000-01-01/13:00',
};

const e: DataModel = {
  id: '5',
  value: 33.5,
  dateTime: '2000-01-01/15:00',
};

const f: DataModel = {
  id: '6',
  value: 34.8,
  dateTime: '2000-01-01/17:00',
};

const g: DataModel = {
  id: '7',
  value: 30.8,
  dateTime: '2000-01-01/19:00',
};

const h: DataModel = {
  id: '8',
  value: 27.9,
  dateTime: '2000-01-01/21:00',
};

const i: DataModel = {
  id: '9',
  value: 25.9,
  dateTime: '2000-01-01/23:00',
};

const j: DataModel = {
  id: '10',
  value: 24.1,
  dateTime: '2000-01-02/01:00',
};

const k: DataModel = {
  id: '11',
  value: 22.6,
  dateTime: '2000-01-02/03:00',
};

const l: DataModel = {
  id: '12',
  value: 20.8,
  dateTime: '2000-01-02/05:00',
};

const m: DataModel = {
  id: '13',
  value: 23.8,
  dateTime: '2000-01-02/07:00',
};

const n: DataModel = {
  id: '14',
  value: 25.9,
  dateTime: '2000-01-02/09:00',
};

const o: DataModel = {
  id: '15',
  value: 27.6,
  dateTime: '2000-01-02/11:00',
};

const p: DataModel = {
  id: '16',
  value: 30.5,
  dateTime: '2000-01-02/13:00',
};

const q: DataModel = {
  id: '17',
  value: 18.9,
  dateTime: '2000-01-02/15:00',
};

const r: DataModel = {
  id: '18',
  value: 21.9,
  dateTime: '2000-01-02/17:00',
};

const s: DataModel = {
  id: '19',
  value: 22.8,
  dateTime: '2000-01-02/19:00',
};

const data: List<DataModel> = List<DataModel>([a, b, c, d, e, f, g, h, i, j, k, l,m, n, o, p, q, r, s]);

export const getData = (): List<DataModel> => {
  return data;
};
