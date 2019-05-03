export type AppAction = {
  readonly type: string;
  readonly payload: {
    fromTime: Date,
    toTime: Date,
    reloadTime: number,
  };
}
