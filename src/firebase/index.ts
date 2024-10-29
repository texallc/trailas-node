
import dotenv from "dotenv";

dotenv.config();

import admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';

const storageBucket = process.env.STORAGE_BUCKET;

export const serviceAccount: admin.ServiceAccount = Object.freeze({
  projectId: process.env.PROJECT_ID,
  privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.CLIENT_EMAIL,
});

const app = admin.initializeApp({ credential: cert(serviceAccount), storageBucket });
const auth = app.auth();

export { app, auth };