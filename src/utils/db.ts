import { DateMoodMapping, MoodByPartOfDay } from "@/constants/Moods";
import { SQLiteDatabase } from "expo-sqlite";
import {
  DateMap,
  getLocalMidnightFromUTCString,
  getUTCMidnightFromLocalDate,
} from "./date";

export interface MoodDBEntry {
  date: string;
  partOfDay: string;
  moodId: string;
  note: string;
}

/**
 * Migrates the database to the latest version if needed.
 *
 * Use this as prop for SQLiteProvider.
 */
export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let result = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");

  if (!result || !("user_version" in result))
    throw new Error("Database error: Missing user_version.");

  let currentDbVersion = result["user_version"];
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS mood (
        date DATE NOT NULL,
        partOfDay VARCHAR(15) NOT NULL,
        moodId VARCHAR(20) NOT NULL,
        note VARCHAR(255),
        UNIQUE(date, partOfDay)
      );
    `);
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

/** Asynchronously retrieves mood entries from the database between the specified dates. */
export async function getMoodBetweenDates(
  db: SQLiteDatabase,
  fromDate: Date,
  toDate: Date,
) {
  return await db.getAllAsync<MoodDBEntry>(
    `SELECT date, partOfDay, moodId, note FROM mood
      WHERE date BETWEEN ? AND ?`,
    getUTCMidnightFromLocalDate(fromDate),
    getUTCMidnightFromLocalDate(toDate),
  );
}

export interface MoodDBInput {
  date: Date;
  partOfDay: string;
  moodId: string;
  note: string;
}

/** Asynchronously adds or replace a mood entry in the database. */
export async function addReplaceMoodAsync(
  db: SQLiteDatabase,
  moodData: MoodDBInput,
): Promise<void> {
  try {
    await db.runAsync(
      `INSERT OR REPLACE INTO mood (date, partOfDay, moodId, note)
        VALUES (?, ?, ?, ?);`,
      getUTCMidnightFromLocalDate(moodData.date),
      moodData.partOfDay,
      moodData.moodId,
      moodData.note,
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
}

/**
 * Transform mood data fetched from DB into a DateMap object where keys
 * are dates and values are mood data for this dates, , organized by
 * parts of the day.
 *
 * @param data - An array of {@link MoodDBEntry} objects.
 * @returns The {@link DateMap} object mapping dates and data about
 * mood for this dates.
 */
export function mapMoodEntriesToDateMapping(data: MoodDBEntry[]) {
  return data.reduce<DateMoodMapping>(
    (acc, { date, partOfDay, moodId, note }) => {
      const dateObj = getLocalMidnightFromUTCString(date);
      const moodByPartOfDay = acc.get(dateObj) ?? {};
      moodByPartOfDay[partOfDay] = { moodId, note };
      acc.set(dateObj, moodByPartOfDay);
      return acc;
    },
    new DateMap<MoodByPartOfDay>(),
  );
}
