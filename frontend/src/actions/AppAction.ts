export type AppAction = {
  readonly type: string;
  readonly payload: {
    fromTime: Date,
    toTime: string,
    reloadTime: number,
  };
}
