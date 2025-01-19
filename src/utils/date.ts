/**
 * Formats a date to a string in the format
 * "short weekday, numericmonth/day/year".
 *
 * @param date - The date to format.
 * @returns The formatted date string.
 */
export const formatDate = (date: Date): string =>
  date.toLocaleString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

/**
 * Returns a new `Date` object representing the local midnight of the
 * given date.
 *
 * @param date - The date to get the local midnight for.
 * @returns A new `Date` object representing the local midnight of the
 * given date.
 */
export function getLocalMidnight(date: Date): Date {
  date = new Date(date);
  date.setHours(0, 0, 0);
  date.setMilliseconds(0);
  return date;
}

/**
 * Extracts the date (without time) from the UTC string and returns
 * a `Date` object representing the local midnight for the extracted
 * date.
 *
 * @param dateString - The UTC date string in ISO format to extract the
 * date from.
 * @returns A new `Date` object representing the local midnight for the
 * extracted date.
 *
 * @example
 * Example for timezone GMT+0100:
 * ```
 * // Returns the Date object "Fri Jan 10 2025 00:00:00 GMT+0100"
 * getLocalMidnightFromUTCString("2025-01-10T10:10:10.000Z")
 * ```
 */
export function getLocalMidnightFromUTCString(dateString: string): Date {
  const utcDate = new Date(dateString);
  return new Date(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth(),
    utcDate.getUTCDate(),
  );
}

/**
 * Extracts the local date (without time) from the Date object and save
 * this date as UTC midnight string.
 *
 * @param date - The Date object to extract date from.
 * @returns The UTC string in ISO format representing midnight for the
 * extracted date.
 *
 * @example
 * Example for timezone GMT+0100:
 * ```
 * const d = new Date("2025-01-01T00:30:00")
 * getUTCMidnightFromLocalDate(d) // Returns "2025-01-01T00:00:00.000Z"
 * d.toISOString() // Returns "2024-12-31T23:30:00.000Z"
 *
 * ```
 */
export function getUTCMidnightFromLocalDate(date: Date): string {
  date = getLocalMidnight(date);
  // Adjust by timezone offset to maintain the same calendar date in UTC
  date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  return date.toISOString();
}

/**
 * Returns the date of the first day of the week for the given date.
 *
 * @param date - The date for which to get the first day of the week.
 * @returns A new `Date` object representing the first day of the week
 * for the given date.
 */
function getFirstDayOfWeek(date: Date): Date {
  date = getLocalMidnight(date);
  date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
  return date;
}

export function getWeekDates(date: Date): Date[] {
  const startOfWeek = getFirstDayOfWeek(date);
  let endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const datesOfWeek = [];
  for (
    let d = new Date(startOfWeek.getTime());
    d <= endOfWeek;
    d.setDate(d.getDate() + 1)
  ) {
    datesOfWeek.push(new Date(d.getTime()));
  }
  return datesOfWeek;
}

/**
 * A Map that uses local dates(without time) as keys.
 * The dates are saved as UTC midnight strings preserving original local
 * date without time
 */
export class DateMap<T> {
  private _map = new Map<string, T>();

  constructor(entries?: Iterable<readonly [Date, T]>) {
    if (entries) {
      for (const [key, value] of entries) {
        this.set(key, value);
      }
    }
  }

  private _convertKey(key: Date): string {
    if (!(key instanceof Date)) throw new Error("Key must be a date object");
    return getUTCMidnightFromLocalDate(key);
  }

  get(key: Date): T | undefined {
    const keyString = this._convertKey(key);
    return this._map.get(keyString);
  }

  set(key: Date, value: T): this {
    const keyString = this._convertKey(key);
    this._map.set(keyString, value);
    return this;
  }

  has(key: Date): boolean {
    const keyString = this._convertKey(key);
    return this._map.has(keyString);
  }
}
