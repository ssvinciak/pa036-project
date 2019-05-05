import { defaultUrl } from '../constants/defaultUrlSettings';

export const getTemperatureUrl = (cacheType: number, from: Date, to: Date) =>
    `${defaultUrl}?cacheType=${cacheType}&from=${from.toISOString()}&to=${to.toISOString()}`;
