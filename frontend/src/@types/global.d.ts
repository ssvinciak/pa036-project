export {} 

declare global {
  interface Date {
    addDays(days: number): Date;
  }
}
