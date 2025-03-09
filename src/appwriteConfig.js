import { Client, Account, Databases, Storage, ID } from "appwrite"; // Added ID

const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID = "67c6a5c10016ebc86b65";
const DATABASE_ID = "67c6ae2b003333b15b7a"; // Your Database ID
const USERS_COLLECTION_ID = "67c9a1f2001cefa65d5f"; // Users collection
const ORDERS_COLLECTION_ID = "67c9d7e0002d55ff5932"; // Orders collection
const BUCKET_ID = "67c6c224003c507f072a"; // Storage bucket
const PRODUCTS_COLLECTION_ID = "67c6ae48001b7a650f40";
const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage, ID, DATABASE_ID, USERS_COLLECTION_ID, ORDERS_COLLECTION_ID, BUCKET_ID,PRODUCTS_COLLECTION_ID };
