export interface TimestampLike {
  toDate: () => Date;
}

export function getTime(
  val: Date | number | TimestampLike | null | undefined,
): number {
  if (!val) return 0;
  if (val instanceof Date) return val.getTime();
  if (typeof val === "number") return val;
  if (typeof (val as TimestampLike).toDate === "function") {
    return (val as TimestampLike).toDate().getTime();
  }
  return 0;
}
