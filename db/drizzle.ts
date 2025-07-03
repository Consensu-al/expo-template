import { open } from "@op-engineering/op-sqlite";
import { type OPSQLiteDatabase, drizzle } from "drizzle-orm/op-sqlite";
import { migrate } from "drizzle-orm/op-sqlite/migrator";
import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";

import { DATABASE_NAME } from "../constants/Database";
import migrations from "./migrations/migrations";

const AES_KEY_STORE = "AES_ENCRYPTION_KEY";

/**
 * Gets or creates an AES encryption key
 * @returns Promise<string> The encryption key
 */
export const getAesEncryptionKey = async (): Promise<string> => {
  try {
    // Try to retrieve existing key
    let key = await SecureStore.getItemAsync(AES_KEY_STORE);

    // If no key exists, create a new one
    if (!key) {
      // Generate 32 random bytes (256 bits) for AES-256
      const randomBytes = await Crypto.getRandomBytesAsync(32);

      // Convert to base64 string
      key = Buffer.from(randomBytes).toString("base64");

      // Store the new key securely
      await SecureStore.setItemAsync(AES_KEY_STORE, key);
    }

    return key;
  } catch (error) {
    console.error("Error handling AES encryption key:", error);
    throw error;
  }
};

let db: OPSQLiteDatabase;

export const initialize = async (): Promise<OPSQLiteDatabase> => {
  console.log("Opening database with encryption");
  const fpDb = open({
    name: DATABASE_NAME,
    encryptionKey: await getAesEncryptionKey(),
  });
  db = drizzle(fpDb);

  try {
    await migrate(db, migrations);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }

  return Promise.resolve(db);
};

export const getDb = async (): Promise<OPSQLiteDatabase> => {
  if (db) {
    return Promise.resolve(db);
  }
  return initialize();
};
