// services/db.ts
import * as SQLite from "expo-sqlite";

// Open (or create) the DB
export const db = SQLite.openDatabaseSync("flights.db");

// Initialize the table
export async function initDb() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS flightData (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      empId TEXT,
      projectName TEXT,
      droneId TEXT,
      batteryId TEXT,
      startVoltage TEXT,
      endVoltage TEXT,
      flightTime TEXT,
      flightArea TEXT,
      remarks TEXT,
      status TEXT
    );
  `);
}
