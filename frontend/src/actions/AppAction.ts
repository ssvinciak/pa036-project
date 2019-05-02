export type AppAction = {
  readonly type: string;
  readonly payload: {
    fromTime: string,
    toTime: string,
    reloadTime: number,
  };
}
