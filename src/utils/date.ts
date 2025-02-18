export class DateOnly {
  private _year: number;
  private _month: number;
  private _day: number;

  /**
   * Create an instance
   * @param dateString - optional. A String in ISO format with zero time:
   * "YYYY-MM-DDT00:00:00.000Z". If date isn't provided, the current
   * local date is used.
   * @throws If the input string is invalid or contains non-zero
   * time components.
   */
  constructor(dateString?: string) {
    if (!dateString) {
      // If no date is provided, use the current local date
      const currentDate = new Date();
      this._year = currentDate.getFullYear();
      this._month = currentDate.getMonth();
      this._day = currentDate.getDate();
    } else {
      // UTC midnight in ISO format
      if (!this._isUTCMidnightString(dateString))
        throw new Error(
          `Date string must represent midnight UTC: ${dateString}`,
        );

      const utcDate = new Date(dateString);
      if (isNaN(utcDate.getTime())) {
        throw new Error(`String has invalid date format: ${dateString}`);
      }

      this._year = utcDate.getUTCFullYear();
      this._month = utcDate.getUTCMonth();
      this._day = utcDate.getUTCDate();
    }
  }

  /**
   * Check if string has ISO format with zero time "YYYY-MM-DDT00:00:00.000Z".
   */
  private _isUTCMidnightString(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}T00:00:00.000Z$/;
    return regex.test(dateString);
  }

  /**
   * Returns ISO string representation (UTC midnight) (YYYY-MM-DDT00:00:00.000Z)
   */
  public toISOString(): string {
    return this.toUTCDate().toISOString();
  }

  /**
   * Converts date to a Date object that stores the same date with a local
   * but the time component is set to local midnight.
   */
  public toLocalDate(): Date {
    return new Date(this._year, this._month, this._day);
  }

  /**
   * Converts date to a Date object that stores the same date
   * and the time component is set to UTC midnight.
   */
  private toUTCDate(): Date {
    return new Date(Date.UTC(this._year, this._month, this._day));
  }

  /**
   * Checks if two dates are equal
   */
  public isEqual(other: DateOnly): boolean {
    return this.toISOString() === other.toISOString();
  }

  /**
   * Checks if this date is after another date
   */
  public isAfter(other: DateOnly): boolean {
    return this.toISOString() > other.toISOString();
  }

  /**
   * Creates a new date shifted by specified number of days
   * @param days - Number of days to shift (positive or negative)
   * @returns New DateOnly instance
   */
  public shiftDays(days: number): DateOnly {
    const newDate = this.toUTCDate();
    newDate.setUTCDate(newDate.getUTCDate() + days);
    return new DateOnly(newDate.toISOString());
  }

  /**
   * Formats date according to current locale
   */
  public format(): string {
    const localDate = this.toLocalDate();
    return localDate.toLocaleString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }
}

/**
 * Returns the date of the first day of the week for the given date.
 *
 * @param date - The date for which to get the first day of the week.
 * @returns A new `Date` object representing the first day of the week
 * for the given date.
 */
function getFirstDayOfWeek(date: DateOnly): DateOnly {
  const daysBefore = (date.toLocalDate().getDay() + 6) % 7;
  return date.shiftDays(-daysBefore);
}

export function getWeekDates(date: DateOnly): DateOnly[] {
  const startOfWeek = getFirstDayOfWeek(date);

  const DAYS_IN_WEEK = 7;
  var datesOfWeek = Array.from({ length: DAYS_IN_WEEK }).map(function (_, i) {
    return startOfWeek.shiftDays(i);
  });

  return datesOfWeek;
}

/**
 * A Map that uses DateOnly instances as keys.
 * The dates are saved as UTC midnight strings in ISO format.
 */
export class DateMap<T> {
  private _map = new Map<string, T>();

  constructor(entries?: Iterable<readonly [DateOnly, T]>) {
    if (entries) {
      for (const [key, value] of entries) {
        this.set(key, value);
      }
    }
  }

  private _convertKey(key: DateOnly): string {
    if (!(key instanceof DateOnly))
      throw new Error("Key must be a DateOnly object");
    return key.toISOString();
  }

  get(key: DateOnly): T | undefined {
    const keyString = this._convertKey(key);
    return this._map.get(keyString);
  }

  set(key: DateOnly, value: T): this {
    const keyString = this._convertKey(key);
    this._map.set(keyString, value);
    return this;
  }

  has(key: DateOnly): boolean {
    const keyString = this._convertKey(key);
    return this._map.has(keyString);
  }
}

export interface DateRange {
  start: DateOnly;
  end: DateOnly;
}

export function isDateRangesEqual(
  firstDateRange: DateRange,
  secondDateRange: DateRange,
) {
  return (
    firstDateRange.start.isEqual(secondDateRange.start) &&
    firstDateRange.end.isEqual(secondDateRange.end)
  );
}
